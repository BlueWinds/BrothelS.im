define(['girls/schema', './buildingList', 'content/buildings', 'text!./bedroom.html', 'messages/messages'], function(Girl, buildings, config, bedroom_template, Message) {
  var stats = [
    'clean'
  ];
  var Building = function(obj) {
    $.extend(this, obj);
    this._ = buildings[this.name];
    return this;
  };

  Building.create = function(name) {
    var base = buildings[name];
    var obj = {
      name: name,
      status: base.status,
      _: base,
      clean: base.clean,
      rooms: $.extend(true, [], base.rooms)
    };
    var building = new Building(obj);
    return building;
  };
  Building.buildings = function(status) {
    var building_list = [];
    for (var name in g.buildings) {
      if (g.buildings[name].status == status) { building_list.push(g.buildings[name]); }
    }
    return building_list;
  };
  Building.prototype.girls = function() {
    var girls = {};
    for (var i in this.rooms) {
      if (!this.rooms[i].girl) { continue; }
      var girl = g.girls[this.rooms[i].girl];
      girls[girl.name] = girl;
    }
    return girls;
  };

  var oldGirlApply = Girl.prototype.apply;
  Girl.prototype.apply = function(stat, delta) {
    if (this.building()) {
      if (stat == 'clean') {
        this.building().apply(stat, delta);
      }
      if (typeof(stat) == 'object' && stat.clean) {
        this.building().apply('clean', stat.clean);
        delete stat.clean;
      }
    }
    oldGirlApply.call(this, stat, delta);
  };
  var oldGirlDelta = Girl.prototype.startDelta;
  Girl.prototype.startDelta = function() {
    var delta;
    if (this.building()) {
      delta = this.building().startDelta();
    }
    var endDelta = oldGirlDelta.call(this);
    return function() {
      if (delta) {
        return $.extend(endDelta(), delta());
      }
      return endDelta();
    };
  };

  Building.prototype.startDelta = function(trackGirl) {
    var girls = this.girls();
    var girl = girls[Object.keys(girls)[0]];
    var girlDelta;
    if (girl && trackGirl) {
      girlDelta = oldGirlDelta.call(girl);
    }
    var endDelta = oldGirlDelta.call(this, stats);
    return function() {
      var end = endDelta();
      if (girlDelta) { $.extend(end, girlDelta()); }
      return end;
    };
  };
  Building.prototype.apply = function(stat, delta) {
    if (typeof(delta) == 'number') {
      if (delta % 1) {
        delta = (Math.random() > delta % 1) ? Math.floor(delta) : Math.ceil(delta);
      }
      if (stat == 'money') {
        g.money += delta;
        return;
      }
      this[stat] += delta;
      this[stat] = Math.floor(Math.max(0, Math.min(100, this[stat])));
      return;
    }
    for (var key in stat) {
      if (stats.indexOf(key) == -1 && key != 'money') { continue; }
      this.apply(key, stat[key]);
      delete stat[key];
    }
    var girls = this.girls();
    if (stat == 'money') { return; }
    for (var name in girls) {
      girls[name].apply(stat, delta);
    }
  };

  Building.prototype.price = function() {
    var cost = this._.baseCost;
    for (var i in this.rooms) {
      var type = this.rooms[i].type;
      cost += (config.rooms[type].price);
    }
    return cost;
  };

  Building.prototype.runDay = function() {
    if (this.status != 'Owned') { return; }
    var endDelta = this.startDelta(true);
    var breakpoint = this.clean - this._.cleanEffect.breakpoint;
    this.apply(this.dailyDelta());
    var text = breakpoint >= 0 ? this._.cleanEffect.clean : this._.cleanEffect.dirty;
    new Message({
      type: breakpoint >= 0 ? 'Clean' : 'Dirty',
      image: this._.image,
      text: ejs.render(text, this),
      delta: endDelta()
    }).save(this.name);
    for (var i in this.rooms) {
      var room = this.rooms[i];
      if (Building.rooms[room.type].daily) {
        Building.rooms[room.type].daily.call(this, room);
      }
    }
  };

  Building.prototype.S = function(stat) {
    var str = this[stat];
    if (stat == 'rooms') {
      str = this.rooms.length + ' / ' + this._.maxRooms;
    }
    str = '<span class="' + stat + '">' + str;
    if (this.turnDelta && this.turnDelta[stat]) {
      var delta = this.turnDelta[stat];
      delta = delta < 0 ? delta : '+' + delta;
      str += ' <span class="delta">(' + delta + ')</span>';
    }
    return str + '</span>';
  };

  Building.prototype.dailyDelta = function() {
    var breakpoint = this.clean - this._.cleanEffect.breakpoint;
    var delta = $.extend({}, breakpoint >= 0 ? this._.cleanEffect.above : this._.cleanEffect.below);
    for (var key in delta) {
      delta[key] *= breakpoint;
    }
    for (key in this._.daily) {
      delta[key] = (delta[key] || 0) + this._.daily[key];
    }
    return delta;
  };

  Building.prototype.buy = function() {
    this.status = 'Owned';
    g.money -= this.price();
  };

  Building.rooms = {
    bedroom: {
      render: function(room, rerender) {
        var girls = [];
        $.each(Girl.girls('Hired'), function(name, girl) {
          if (!girl.bedroom() || girl.bedroom() === room) {
            girls.push(girl);
          }
        });
        var context = {
          building: this,
          room: room,
          girls: girls
        };
        var div = $(ejs.render(bedroom_template, context));
        $('select', div).change(function() {
          room.girl = $(this).val();
          rerender();
        });
        return div;
      }
    },
    dungeon: {
      render: function(room, rerender) {
        var div = $('<div>');
        div.prepend('<h6>Dungeon</h6>');
        $('<p>').html(config.rooms.dungeon.shortDesc).appendTo(div);
        return div;
      }
    }
  };

  Building.prototype.buyRoom = function(type) {
    var base = config.rooms[type];
    g.money -= base.price;
    var room = {
      type: type
    };
    this.rooms.push(room);
  };

  Girl.prototype.building = function() {
    for (var name in g.buildings) {
      if (g.buildings[name].status != 'Owned') { continue; }
      for (var i in g.buildings[name].rooms) {
        var room = g.buildings[name].rooms[i];
        if (room.type == 'bedroom' && room.girl == this.name) { return g.buildings[name]; }
      }
    }
  };
  Girl.prototype.bedroom = function() {
    for (var name in g.buildings) {
      if (g.buildings[name].status != 'Owned') { continue; }
      for (var i in g.buildings[name].rooms) {
        var room = g.buildings[name].rooms[i];
        if (room.type == 'bedroom' && room.girl == this.name) { return room; }
      }
    }
  };

  return Building;
});
