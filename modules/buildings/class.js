"use strict";
function Building(obj) {
  $.extend(this, obj);
  // Add missing stats from base
  var base = this.base();
  for (var i in Building.stats) {
    var stat = Building.stats[i];
    if (this[stat] === undefined) {
      this[stat] = base[stat] !== undefined ? base[stat] : 30;
    }
  }
  this._class = 'Building';
  return this;
}

Building.prototype.base = function() {
  return Buildings[this.name];
};

Building.stats = [
  'clean', 'reputation'
];

Building.create = function(name) {
  var base = Buildings[name];
  var obj = {
    name: base.name,
    rooms: $.extend(true, [], base.rooms),
    status: base.status,
    maxRooms: base.maxRooms
  };
  var building = new Building(obj);
  return building;
};

Building.prototype.girls = function() {
  var girls = {};
  this.rooms._accumulate('girl').forEach(function(name) {
    girls[name] = g.girls[name];
  });
  return girls;
};

(function() {
  var oldGirlApply = Girl.prototype.apply;
  Girl.prototype.apply = function(stat, delta) {
    if (stat == 'building') {
      if (this.building()) {
        this.building().apply(delta);
      }
    } else {
      oldGirlApply.call(this, stat, delta);
    }
  };

  var oldGirlDelta = Girl.prototype.startDelta;
  Girl.prototype.startDelta = function() {
    var endDelta = oldGirlDelta.call(this);
    if (!this.building()) { return endDelta; }

    var delta = this.building().startDelta();
    return function() {
      return $.extend(endDelta(), delta());
    };
  };

  Building.prototype.startDelta = function(trackGirl) {
    var girl = this.girls()._first();
    var delta;
    if (girl && trackGirl) {
      delta = girl.startDelta();
    } else {
      delta = oldGirlDelta.call(this, Building.stats);
    }
    return delta;
  };

  var oldCompare = Girl.prototype.compare;
  Girl.prototype.compare = function(delta, explain) {
    var result = oldCompare.call(this, delta, explain);
    if (!delta.building || (result && explain)) { return result; }
    if (!this.building()) { return explain ? this.name + ' does not have a bedroom yet.' : false; }
    return this.building().compare(delta.building, explain);
  };
})();

Building.prototype.compare = function(delta, explain) {
  var result = this._compare(delta);
  // If !explain, then we return a boolean - does it match?
  // If explain, then we return a string saying *why* it doesn't match (or false if it does).
  return explain ? result : !result;
};

Building.prototype._compare = function(delta) {
  if (delta.name && this.name != delta.name) { return this.name + ' is not ' + delta.name; }
  if (this.status != (delta.status || 'Owned')) { return this.name + ' is not ' + delta.status; }
  if (delta.room) {
    var found = false;
    for (var i in this.rooms) {
      if (this.rooms[i].type == delta.room) {
        found = true;
        break;
      }
    }
    if (!found) { return 'The ' + this.name + ' does not have a ' + delta.room; }
  }
  var stat;
  if (delta.min) {
    for (stat in delta.min) {
      if (this[stat] < delta.min[stat]) {
        return this.name + ' does not have ' + __(stat) + ' ' + delta.min[stat];
      }
    }
  }
  if (delta.max) {
    for (stat in delta.min) {
      if (this[stat] > delta.max[stat]) {
        return this.name + ' does not have ' + __(stat) + ' ' + delta.min[stat] + ' or less.';
      }
    }
  }
  return false;
};

Building.prototype.apply = function(stat, delta) {
  if (typeof(delta) == 'number') {
    if (delta % 1) {
      delta = (Math.random() > delta % 1) ? Math.floor(delta) : Math.ceil(delta);
    }
    if (stat == 'money') {
      g.money += delta;
    } else if (Building.stats.indexOf(stat) != -1) {
      this[stat] += delta;
      this[stat] = Math.floor(Math.max(0, Math.min(100, this[stat])));
    }
  } else if (stat == 'girl') {
    $.each(this.girls(), function(name, girl) {
      girl.apply(delta);
    });
  } else {
    var building = this;
    $.each(stat, function(key, value) {
      building.apply(key, value);
    });
  }
};

Building.prototype.price = function(action) {
  var cost = this.base().basePrice;
  this.rooms._accumulate('type').forEach(function(type) {
    cost += Rooms[type].price;
  });
  if (action == 'Sell') {
    cost *= Building.config.sellRatio;
  }
  return cost;
};

Building.prototype.dailyDelta = function() {
  var base = this.base(), delta;
  if (this.clean > base.daily.breakpoint) {
    delta = $.extend(true, {}, base.daily.above);
  } else {
    delta = $.extend(true, {}, base.daily.below);
  }
  if (this.daily) {
    delta._add(this.daily);
  }
  return delta;
};

Building.prototype.runDay = function() {
  if (this.status != 'Owned') { return; }
  var endDelta = this.startDelta(true);
  var base = this.base(), text;
  if (this.clean > base.daily.breakpoint) {
    text = base.daily.clean;
  } else {
    text = base.daily.dirty;
  }
  this.apply(this.dailyDelta());
  g.messages.push(new Message({
    label: this.clean > base.daily.breakpoint ? 'Clean' : 'Dirty',
    image: base.image,
    text: text,
    delta: endDelta(),
    weight: 10,
    group: this.name
  }));
};

Building.prototype.S = function(stat) {
  var str = this[stat];
  if (stat == 'rooms') {
    str = this.rooms.length + ' / ' + this.maxRooms;
  }
  str = '<span class="' + stat + '">' + str;
  if (this.turnDelta && this.turnDelta[stat]) {
    var delta = this.turnDelta[stat];
    delta = delta < 0 ? delta : '+' + delta;
    str += ' <span class="delta">(' + delta + ')</span>';
  }
  return str + '</span>';
};

Building.prototype.buy = function() {
  this.status = 'Owned';
  g.money -= this.price();
};

Building.prototype.sell = function() {
  this.status = 'For Sale';
  g.money += this.price('Sell');
};

Girl.prototype.building = function() {
  var name = this.name;
  var finalBuilding;
  g.buildings._filter('status', 'Owned').forEach(function(building) {
    building.rooms._filter('type', 'Bedroom').forEach(function(room) {
      if (room.girl == name) { finalBuilding = building; }
    });
  });
  return finalBuilding;
};

Building.prototype.description = function() {
  return ejs.render(this.base().description, {});
};

Building.prototype.image = function() {
  return this.base().image;
};

Building.prototype.parseConditions = Girl.prototype.parseConditions;
