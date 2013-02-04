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
    if (this.specialRules.dependentStats) {
      var dependency;
      if (delta > 0) {
        dependency = this.specialRules.dependentStats[stat];
      } else {
        dependency = this.specialRules.dependentStats['-' + stat];
      }
      if (dependency) {
        dependency = $.extend({}, dependency);
        dependency._multiply(delta);
        if (dependency[stat]) {
          delta += dependency[stat];
          delete dependency[stat];
        }
      }
    }
    if (stat.indexOf(' experience') != -1) {
      delta *= this.intelligence / 100;
    }
    if (delta % 1) {
      delta = (Math.random() > delta % 1) ? Math.floor(delta) : Math.ceil(delta);
    }
    this[stat] += delta;
    this[stat] = Math.floor(Math.max(0, Math.min(100, this[stat])));
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
  var stat, rule, new_d = $.extend(true, {}, delta);
  if (new_d.min) {
    if (new_d.min.specialRules) {
      for (rule in new_d.min.specialRules) {
        if ((this.specialRules[rule] || 0) < new_d.min.specialRules[rule]) {
          return this.name + ' does not have ' + rule + ' ' + new_d.min.specialRules[rule] + '.';
        }
      }
      delete new_d.min.specialRules;
    }
    for (stat in new_d.min) {
      if (this[stat] < new_d.min[stat]) {
        return this.name + ' does not have ' + T(stat) + ' ' + new_d.min[stat];
      }
    }
  }
  if (new_d.max) {
    if (new_d.max.specialRules) {
      for (rule in new_d.max.specialRules) {
        if ((this.specialRules[rule] || 0) > new_d.max.specialRules[rule]) {
          return this.name + ' does not have ' + new_d.max.specialRules[rule] + ' ' + rule + ' or less.';
        }
      }
    }
    delete new_d.max.specialRules;
    for (stat in new_d.max) {
      if (this[stat] > new_d.max[stat]) {
        return this.name + ' does not have ' + T(stat) + ' ' + new_d.max[stat] + ' or less.';
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
  this.status = 'Hired';
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
  var old_int;
  for (var cond in {min: 1, max: 1}) {
    if (conditions[cond]) {
      for (var stat in conditions[cond]) {
        if (stat == 'specialRules') {
          for (var rule in conditions[cond].specialRules) {
            if (typeof(conditions[cond].specialRules[rule]) == 'string') {
              old_int = parseFloat(conditions[cond].specialRules[rule], 10);
              old_int += this.specialRules[rule] || 0;
              conditions[cond].specialRules[rule] = old_int;
            }
          }
        } else if (typeof(conditions[cond][stat]) == 'string') {
          old_int = parseInt(conditions[cond][stat], 10);
          conditions[cond][stat] = this[stat] + old_int;
          conditions[cond][stat] = Math.min(100, Math.max(0, conditions[cond][stat]));
        }
      }
    }
  }
  return conditions;
};
