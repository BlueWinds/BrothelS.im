define(['girls/schema', 'content/buildings/buildingList', 'content/buildings', 'messages/messages'], function(Girl, buildings, config, Message) {
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
  Building.roomsByType = function(type, status) {
    status = status || 'Owned';
    if (!g.buildings) { return []; }
    var rooms = g.buildings.flt('status', status).accumulate('rooms');
    return rooms.flatten().flt('type', type);
  };

  Building.prototype.girls = function() {
    return this.rooms.accumulate('girl');
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
    var girl = this.girls().first();
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
    var building = this;
    $.each(stat, function(key, value) {
      if (stats.indexOf(key) == -1 && key != 'money') { return; }
      building.apply(key, value);
      delete stat[key];
    });
    if (stat == 'money') { return; }
    this.girls().forEach(function(name) {
      g.girls[name].apply(stat, delta);
    });
  };

  Building.prototype.price = function() {
    var cost = this._.baseCost;
    this.rooms.accumulate('type').forEach(function(type) {
      cost += config.rooms[type].price;
    });
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
    var building = this;
    this.rooms.forEach(function(room) {
      if (Building.rooms[room.type].daily) {
        Building.rooms[room.type].daily.call(building, room);
      }
    });
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
    delta.multiply(Math.abs(breakpoint));
    delta.combineWith(this._.daily);
    return delta;
  };

  Building.prototype.buy = function() {
    this.status = 'Owned';
    g.money -= this.price();
  };

  Building.prototype.buyRoom = function(type) {
    var base = config.rooms[type];
    g.money -= base.price;
    var room = {
      type: type
    };
    if (base.size) { room.size = base.size; }
    this.rooms.push(room);
  };

  Girl.prototype.building = function() {
    var name = this.name;
    var final_building;
    g.buildings.flt('status', 'Owned').forEach(function(building) {
      building.rooms.flt('type', 'bedroom').forEach(function(room) {
        if (room.girl == name) { final_building = building; }
      });
    });
    return final_building;
  };
  Girl.prototype.bedroom = function() {
    var rooms = Building.roomsByType('bedroom', 'Owned');
    return rooms.flt('girl', this.name)[0];
  };

  return Building;
});
