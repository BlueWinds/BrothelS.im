var Girl = function(obj) {
  $.extend(this, obj);
  this._ = Girls[this.name];

  // Add missing stats from base
  for (var i in Girl.stats) {
    var stat = Girl.stats[i];
    if (this[stat] === undefined) {
      this[stat] = this._[stat] !== undefined ? this._[stat] : 30;
    }
  }
  for (i in Girl.sexStats) {
    var sex = Girl.sexStats[i];
    if (this[sex] === undefined) {
      this[sex] = (this._[sex] !== undefined ? this._[sex] : 30);
    }
  }
  e.invokeAllSync('GirlNew', this);
  return this;
};

Girl.stats = [
  'happiness', 'endurance', 'obedience', 'modesty', 'charisma', 'constitution', 'intelligence'
];

Girl.sex = ['soft', 'hard', 'anal', 'fetish'];
Girl.sexStats = ['soft libido', 'soft experience', 'hard libido', 'hard experience', 'anal libido', 'anal experience', 'fetish libido', 'fetish experience'];

Girl.create = function(base) {
  var obj = {
    name: base.name,
    actions: {}
  };
  var girl = new Girl(obj);
  girl.status = girl.randomStatus();
  if (girl.status == 'Hired') {
    girl.actions.pay = girl.desiredPay();
    girl.hireDay = g.day;
  }
  return girl;
};

Girl.prototype.randomStatus = function() {
  if (this.status == 'Hired') { return 'Hired'; }
  var status = this._.status;
  if (typeof(status) == 'String') { return status; }
  if (this.status && Math.random() < (this._.stayChance || 0.5)) {
    return this.status;
  }
  var d = Math.random();
  for (var i in status) {
    if (d <= status[i]) {
      return i;
    }
    d -= status[i];
  }
  return 'Town';
};

Girl.prototype.apply = function(stat, delta) {
  if (typeof(delta) == 'number') {
    if (this._.specialRules && this._.specialRules.dependentStats) {
      var dependency;
      if (delta > 0) {
        dependency = this._.specialRules.dependentStats[stat];
      } else {
        dependency = this._.specialRules.dependentStats['-' + stat];
      }
      if (dependency) {
        if (typeof(dependency) == 'function') {
          dependency = dependency.call(this);
        } else {
          dependency = $.extend({}, dependency);
        }
        dependency.Cmultiply(delta);
        if (dependency[stat]) {
          delta += dependency[stat];
          delete dependency[stat];
        }
        this.apply(dependency);
      }
    }
    if (stat.indexOf(' experience') != -1) {
      delta *= this.intelligence / 100;
    }
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
    if (Girl.stats.indexOf(key) == -1 && key != 'money') {
      if (Girl.sexStats.indexOf(key) == -1) {
        continue;
      }
    }
    this.apply(key, stat[key]);
  }
};

Girl.prototype.desiredPay = function() {
  var pay = Math.floor(this.hirePrice(50) / 20);
  if (this._.specialRules && this._.specialRules.payRatio !== undefined) {
    pay *= this._.specialRules.payRatio;
  }
  return pay;
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
    cost += (girl[type + ' libido'] + girl[type + ' experience']) * prices[type];
  });
  cost *= 1 - happiness / 150;
  return Math.floor(cost);
};

Girl.prototype.image = function(type) {
  var img = this._.images[type];
  if (!img) { img = this._.images.base; }
  if (typeof(img) == 'object') {
    img = Math.choice(img);
  }
  img = this._.images.basePath + '/' + img;
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
  this.endurance = 100;
  this.happiness = Girl.config.startHappiness;
  this.actions.pay = this.desiredPay();
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
      sum += this[Girl.sex[i] + ' experience'];
    }
    return Math.floor(sum / Girl.sex.length);
  }
  if (stat == 'libido') {
    for (i in Girl.sex) {
      sum += this[Girl.sex[i] + ' libido'];
    }
    return Math.floor(sum / Girl.sex.length);
  }
  return this[stat];
};

Game.getResults = function(time, item, girl, done) {
  if (typeof(item.variants) == 'function') {
    item.variants.call(girl, time, item, function(i) {
      done(item.results[i]);
    });
  } else {
    var i = Math.weightedRandom(item.variants || [1]);
    done(item.results[i]);
  }
};
