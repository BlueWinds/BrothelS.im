"use strict";
function Girl(obj) {
  var girl = this;
  var base;
  this._class = 'Girl';
  if (typeof(obj) == 'string') {
    base = Girls[obj];
    obj = {
      name: base.name,
      status: base.status,
      specialRules: $.extend(true, {}, base.specialRules),
      actions: {}
    };
  }
  $.extend(this, obj);
  base = this.base();

  // Add missing stats from base
  Girl.stats.forEach(function(stat) {
    if (girl[stat] === undefined) {
      girl[stat] = base[stat] !== undefined ? base[stat] : 30;
    }
  });
  Girl.sexStats.forEach(function(sex) {
    if (girl[sex] === undefined) {
      girl[sex] = (base[sex] !== undefined ? base[sex] : 30);
    }
  });
  if (Girl.config.pay[this.actions.pay] === undefined) {
    this.actions.pay = 1;
  }
  if (!this.specialRules) { this.specialRules = {}; }
  e.invokeAllSync('GirlNew', this);
}

Girl.stats = [
  'happiness', 'endurance', 'obedience', 'modesty', 'charisma', 'constitution', 'intelligence'
];

Girl.sex = ['soft', 'hard', 'anal', 'fetish'];
Girl.sexStats = ['softLibido', 'softExperience', 'hardLibido', 'hardExperience', 'analLibido', 'analExperience', 'fetishLibido', 'fetishExperience'];

Girl.prototype.base = function() {
  return Girls[this.name];
};

Girl.prototype.apply = function(stat, delta) {
  if (stat == 'money') {
    g.money += Math.floor(delta);
    return;
  }
  if (stat == 'specialRules') {
    var girl = this;
    $.each(delta, function(key, value) {
      if (key == 'function') {
        value.call(girl);
        return;
      }
      if (value === false) {
        delete girl.specialRules[key];
      } else {
        girl.specialRules[key] = (girl.specialRules[key] || 0) + value;
      }
    });
    return;
  }
  if (typeof(delta) == 'number') {
    if (this.specialRules && this.specialRules.dependentStats) {
      var dependency;
      if (delta > 0) {
        dependency = this.specialRules.dependentStats[stat];
      } else {
        dependency = this.specialRules.dependentStats['-' + stat];
      }
      if (dependency) {
        dependency = $.extend({}, dependency);
        dependency._multiply(Math.abs(delta));
        if (dependency[stat] !== undefined) {
          delta += dependency[stat];
          delete dependency[stat];
        }
        if (!$.isEmptyObject(dependency)) {
          this.apply(dependency);
        }
      }
    }
    if (stat.indexOf(' experience') != -1) {
      delta *= this.intelligence / 100;
    }
    if (stat != 'endurance' && stat != 'happiness') {
      if (delta > 0) {
        delta *= (133 - this[stat]) / 100;
      } else {
        delta *= (this[stat] + 33) / 100;
      }
    }
    if (delta % 1) {
      delta = (Math.random() > delta % 1) ? Math.floor(delta) : Math.ceil(delta);
    }
    this[stat] += delta;
    this[stat] = Math.floor(Math.max(0, Math.min(100, this[stat])));
    return;
  }
  if (stat == 'status') {
    this.setStatus(delta);
    return;
  }
  for (var key in stat) {
    this.apply(key, stat[key]);
  }
};

Girl.prototype.compare = function(delta, explain) {
  var result = this._compare(delta);
  // If !explain, then we return a boolean - does it match?
  // If explain, then we return a string saying *why* it doesn't match (or false if it does).
  return explain ? result : !result;
};

Girl.prototype._compare = function(delta) {
  if (delta.name && this.name != delta.name) { return this.name + ' is not ' + delta.name; }
  if (delta.status && this.status != delta.status) { return this.name + ' is not ' + delta.status; }
  var stat, rule, newDelta = $.extend(true, {}, delta);
  if (newDelta.min) {
    if (newDelta.min.specialRules) {
      for (rule in newDelta.min.specialRules) {
        if ((this.specialRules[rule] || 0) < newDelta.min.specialRules[rule]) {
          return this.name + ' does not have ' + rule + ' ' + newDelta.min.specialRules[rule] + '.';
        }
      }
      delete newDelta.min.specialRules;
    }
    for (stat in newDelta.min) {
      if (this[stat] < newDelta.min[stat]) {
        return this.name + ' does not have ' + __(stat) + ' ' + newDelta.min[stat];
      }
    }
  }
  if (newDelta.max) {
    if (newDelta.max.specialRules) {
      for (rule in newDelta.max.specialRules) {
        if ((this.specialRules[rule] || 0) > newDelta.max.specialRules[rule]) {
          return this.name + ' does not have ' + newDelta.max.specialRules[rule] + ' ' + rule + ' or less.';
        }
      }
    }
    delete newDelta.max.specialRules;
    for (stat in newDelta.max) {
      if (this[stat] > newDelta.max[stat]) {
        return this.name + ' does not have ' + __(stat) + ' ' + newDelta.max[stat] + ' or less.';
      }
    }
  }
  return false;
};

Girl.prototype.desiredPay = function() {
  if (!g.missionsDone.firstMoney) { return 0; }
  var pay = this.hirePrice(50) * Girl.config.payRatio;
  if (this.intelligence < 20 && this.get('libido') > 50 ) {
    pay *= (this.intelligence / 40) + this.get('libido') / 100;
  }
  if (this.specialRules.payRatio !== undefined) {
    pay *= this.specialRules.payRatio;
  }
  return Math.floor(pay);
};

Girl.prototype.payHappiness = function() {
  return Girl.config.pay[this.actions.pay];
};

Girl.prototype.hirePrice = function(happiness) {
  happiness = happiness === undefined ? this.happiness : happiness;
  var prices = Girl.config.hirePrice;
  var cost = prices.base;
  for (var i in Girl.stats) {
    var stat = Girl.stats[i];
    cost += this[stat] * prices[stat];
  }
  var girl = this;
  Girl.sex.forEach(function(type) {
    cost += (girl[type + 'Libido'] + girl[type + 'Experience']) * prices[type];
  });
  cost *= 1 - happiness / 150;
  return Math.floor(cost);
};

Girl.prototype.image = function(type) {
  var img = this.base().images[type];
  if (!img) { img = this.base().images.base; }
  if (typeof(img) == 'object') {
    img = Math.choice(img);
  }
  img = this.base().images.basePath + '/' + img;
  return img;
};

Girl.prototype.startDelta = function(s) {
  s = s || Girl.stats;
  var girl = this;
  var delta = {
    money: g.money
  };
  s.forEach(function(stat) {
    delta[stat] = girl[stat];
  });
  if (s === Girl.stats) {
    Girl.sexStats.forEach(function(sex) {
      delta[sex] = girl[sex];
    });
  }
  return function() {
    var change = {};
    if (g.money - delta.money) {
      change.money = g.money - delta.money;
    }
    for (var stat in delta) {
      if (girl[stat] - delta[stat]) {
        change[stat] = girl[stat] - delta[stat];
      }
    }
    return change;
  };
};

Girl.prototype.hire = function() {
  g.money -= this.hirePrice();
  this.apply('status', 'Hired');
  this.happiness = Girl.config.startHappiness;
  this.hireDay = g.day;
};

Girl.prototype.S = function(stat) {
  var str = '<span class="' + stat + '">' + this[stat];
  if (this.turnDelta && this.turnDelta[stat]) {
    var delta = this.turnDelta[stat];
    delta = delta < 0 ? delta : '+' + delta;
    str += ' <span class="delta">(' + delta + ')</span>';
  }
  return str + '</span>';
};

Girl.prototype.get = function(stat) {
  if (stat.substr(0, 1) == '-') {
    return 100 - this.get(stat.substr(1));
  }
  var sum = 0, i;
  if (stat == 'experience') {
    for (i in Girl.sex) {
      sum += this[Girl.sex[i] + 'Experience'];
    }
    return Math.floor(sum / Girl.sex.length);
  }
  if (stat == 'libido') {
    for (i in Girl.sex) {
      sum += this[Girl.sex[i] + 'Libido'];
    }
    return Math.floor(sum / Girl.sex.length);
  }
  return this[stat];
};

Girl.prototype.parseConditions = function(conditions) {
  var oldInt;
  for (var cond in {min: 1, max: 1}) {
    if (!conditions[cond]) {
      continue;
    }
    for (var stat in conditions[cond]) {
      if (stat == 'specialRules') {
        for (var rule in conditions[cond].specialRules) {
          if (typeof(conditions[cond].specialRules[rule]) == 'string') {
            oldInt = parseFloat(conditions[cond].specialRules[rule], 10);
            oldInt += this.specialRules[rule] || 0;
            conditions[cond].specialRules[rule] = oldInt;
          }
        }
      } else if (typeof(conditions[cond][stat]) == 'string') {
        oldInt = parseInt(conditions[cond][stat], 10);
        conditions[cond][stat] = this[stat] + oldInt;
        conditions[cond][stat] = Math.min(100, Math.max(0, conditions[cond][stat]));
      }
    }
  }
  return conditions;
};

Girl.prototype.setStatus = function(status) {
  this.status = status;
  e.invokeAllSync('GirlSetStatus', this);
};
