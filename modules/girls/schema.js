var Girl = function(obj) {
  $.extend(this, obj);
  this._ = Girls[this.name];

  // Upgrade function to add missing stats
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
    _: base,
    actions: {
      morning: 'Rest',
      evening: 'Rest',
      morningLabel: 'Rest',
      eveningLabel: 'Rest'
    }
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
        return;
      }
    }
    this.apply(key, stat[key]);
  }
};

Girl.prototype.desiredPay = function() {
  var pay = Math.floor(this.hirePrice(50) / 20);
  if (this._.specialRules.payRatio !== undefined) {
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

(function() {
  Girl.prototype.potentialActions = function(time) {
    var potentialActions = {};
    var girl = this;
    $.each(Actions, function(_id, action) {
      var new_action = $.extend(true, {}, action);
      new_action = checkAction.call(girl, time, new_action);
      if (new_action) {
        potentialActions[_id] = new_action;
      }
    });
    if (this._.actions) {
      $.each(this._.actions, function(_id, action) {
        var new_action;
        if (Actions[_id]) {
          new_action = $.extend(true, {}, Actions[_id], action);
        } else {
          new_action = $.extend(true, {}, action);
        }
        new_action = checkAction.call(girl, time, new_action);
        if (new_action) {
          potentialActions[_id] = new_action;
        } else {
          delete potentialActions[_id];
        }
      });
    }
    return potentialActions;
  };

  function checkAction(time, action) {
    if (action.tags && action.tags.tentacles && !g.tentacles) { return; }
    if (typeof(action.disabled) == 'function') {
      var disabled = action.disabled.call(this, time);
      if (disabled === true) {
        return;
      } else if (disabled) {
        action.disabled = disabled;
      } else {
        delete action.disabled;
      }
    }
    if (!action.disabled && action.mins) {
      for (var stat in action.mins) {
        if (stat == 'money' && g.money < action.mins.money) {
          action.disabled = 'Not enough money';
          break;
        } else if (this[stat] < action.mins[stat]) {
          action.disabled = 'Not enough ' + Game.strings.noun[stat];
          break;
        }
      }
      for (stat in action.maxes) {
        if (stat == 'money' && g.money > action.maxes.money) {
          action.disabled = 'Too much money';
          break;
        } else if (this[stat] > action.maxes[stat]) {
          action.disabled = 'Too much ' + Game.strings.noun[stat];
          break;
        }
      }
    }
    var context = {
      girl: this
    };
    action.label = ejs.render(action.label, context);
    if (action.disabled) {
      action.description = action.disabled;
    } else {
      action.description = ejs.render(action.description, context);
    }
    return action;
  }
})();

Girl.prototype.image = function(type) {
  var img = this._.images[type];
  if (!img) { img = this._.images.base; }
  if (typeof(img) == 'object') {
    img = Math.choice(img);
  }
  img = this._.images.basePath + '/' + img;
  return img;
};

Girl.prototype.doAction = function(time, action) {
  if (time == 'morning' && action.allDay) { return; }
  if (action.externalFunction) {
    action.externalFunction.call(this, time, action);
  }
  else {
    var endDelta = this.startDelta();
    if (typeof(action.variants) == 'function') {
      i = action.variants.call(this, time, action);
    } else {
      i = Math.weightedRandom(action.variants || [1]);
    }
    var context = {
      girl: this,
      action: action,
      time: time
    };
    var doMessage = function(image, text, delta) {
      image = ejs.render(image, context);
      var message = new Message({
        type: action.label,
        text: ejs.render(text, context),
        delta: delta,
        image: image[0] == '/' ? image.substr(1) : context.girl.image(image),
        time: time
      }).save(context.girl.name);
    };
    var results = action.results[i];
    if (typeof(results.delta) == 'function') {
      var delta = results.delta.call(this, time, action);
      this.apply(delta);
    } else {
      this.apply(results.delta || {});
    }
    if (typeof(results.message) == 'object') {
      for (var j in results.message) {
        var d = results.message.length - 1 == j ? endDelta() : {};
        doMessage(results.image[j], results.message[j], d);
      }
    } else {
      doMessage(results.image, results.message, endDelta());
    }
  }
};

Girl.prototype.runDay = function() {
  if (this.status != 'Hired') {
    this.status = this.randomStatus();
    return;
  }
  var acts= this.potentialActions('morning');

  var action = acts[this.actions.morning] || acts.Rest;
  if (action.disabled) { action = acts.Rest; }
  this.doAction('morning', action);

  acts = this.potentialActions('evening');
  action = acts[this.actions.evening] || acts.Rest;
  if (action.disabled) { action = acts.Rest; }
  this.doAction('evening', action);

  this.apply('money', -this.actions.pay);
  var change = this.actions.pay - this.desiredPay();
  change = change > 0 ? change * Girl.config.pay.above : change * Girl.config.pay.below;
  this.apply('happiness', change);
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
