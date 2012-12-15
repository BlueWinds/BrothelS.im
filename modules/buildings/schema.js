var Building = function(obj) {
  $.extend(this, obj);
  this._ = Buildings[this.name];
  // Add missing stats from base
  for (var i in Building.stats) {
    var stat = Building.stats[i];
    if (this[stat] === undefined) {
      this[stat] = this._[stat] !== undefined ? this._[stat] : 30;
    }
  }

  return this;
};

Building.stats = [
  'clean', 'reputation'
];

Building.create = function(base) {
  var obj = {
    name: base.name,
    rooms: $.extend(true, [], base.rooms)
  };
  var building = new Building(obj);
  return building;
};

Building.roomsByType = function(type, status) {
  status = status || 'Owned';
  if (!g.buildings) { return []; }
  var rooms = g.buildings.Cfilter('status', status).Caccumulate('rooms');
  return rooms.Cflatten().Cfilter('type', type);
};

Building.roomKeySum = function(type, key, status) {
  status = status || 'Owned';
  return Building.roomsByType(type, status).Caccumulate(key).Csum();
};

Building.prototype.girls = function() {
  return this.rooms.Caccumulate('girl');
};

(function() {
  var oldGirlApply = Girl.prototype.apply;
  Girl.prototype.apply = function(stat, delta) {
    if (this.building()) {
      if (typeof(stat) == 'object') {
        for (var s in stat) {
          if (Building.stats.indexOf(s) != -1) {
            this.building().apply(s, stat[s]);
            delete stat[s];
          }
        }
      } else if (Building.stats.indexOf(stat) != -1) {
        this.building().apply(stat, delta);
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
    var girl = this.girls().Cfirst();
    var girlDelta;
    if (girl && trackGirl) {
      girlDelta = oldGirlDelta.call(g.girls[girl]);
    }
    var endDelta = oldGirlDelta.call(this, Building.stats);
    return function() {
      var end = endDelta();
      if (girlDelta) {
        end.Cadd(girlDelta());
        end.money /= 2;
      }
      return end;
    };
  };

  var oldGirlActions = Girl.prototype.potentialActions;
  Girl.prototype.potentialActions = function(time) {
    var actions = oldGirlActions.call(this, time);
    var girl = this;
    $.each(actions, function(_id, action) {
      if (!action.requiresRoom) {
        return;
      }
      var max = Building.roomKeySum(action.requiresRoom.type, action.requiresRoom.key);
      if (!max) {
        delete actions[_id];
        return;
      }
      var already = g.girls.Cfilter('actions', time, _id).length;
      if (already < max) {
        return;
      }
      if (already == max && girl.actions[time] == _id) {
        return;
      }
      action.disabled = 'You only have enough ' + action.requiresRoom.type + ' to ' + action.label + ' ' + max + ' girls at a time.';
      action.description = action.disabled;
    });
    return actions;
  };
})();

Building.prototype.apply = function(stat, delta) {
  if (typeof(delta) == 'number') {
    if (delta % 1) {
      delta = (Math.random() > delta % 1) ? Math.floor(delta) : Math.ceil(delta);
    }
    if (stat == 'money') {
      g.money += delta;
      return;
    } else if (Building.stats.indexOf(stat) != -1) {
      this[stat] += delta;
      this[stat] = Math.floor(Math.max(0, Math.min(100, this[stat])));
    } else {
      this.girls().forEach(function(name) {
        g.girls[name].apply(stat, delta);
      });
    }
  } else {
    var building = this;
    $.each(stat, function(key, value) {
      building.apply(key, value);
    });
  }
};

Building.prototype.price = function() {
  var cost = this._.baseCost;
  this.rooms.Caccumulate('type').forEach(function(type) {
    cost += Building.config.rooms[type].price;
  });
  return cost;
};

Building.prototype.runDay = function() {
  if (this.status != 'Owned') { return; }
  var endDelta = this.startDelta(true);
  var breakpoint = this.clean - this._.cleanEffect.breakpoint;
  this.apply(this.dailyDelta());
  var building = this;
  this.rooms.forEach(function(room) {
    if (Building.rooms[room.type].daily) {
      building.apply(Building.rooms[room.type].daily);
    }
  });
  var text = breakpoint >= 0 ? this._.cleanEffect.clean : this._.cleanEffect.dirty;
  var message = new Message({
    type: breakpoint >= 0 ? 'Clean' : 'Dirty',
    image: this._.image,
    text: ejs.render(text, this),
    delta: endDelta()
  });
  message.save(this.name);
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
  delta.Cmultiply(Math.abs(breakpoint));
  delta.Cadd(this._.daily);
  return delta;
};

Building.prototype.buy = function() {
  this.status = 'Owned';
  g.money -= this.price();
};

Building.prototype.buyRoom = function(type) {
  var base = Building.config.rooms[type];
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
  g.buildings.Cfilter('status', 'Owned').forEach(function(building) {
    building.rooms.Cfilter('type', 'bedroom').forEach(function(room) {
      if (room.girl == name) { final_building = building; }
    });
  });
  return final_building;
};

Girl.prototype.bedroom = function() {
  var rooms = Building.roomsByType('bedroom', 'Owned');
  return rooms.Cfilter('girl', this.name)[0];
};
