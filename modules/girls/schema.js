var Girl = function(obj) {
  $.extend(this, obj);
  this._ = Girls[this.name];
  return this;
};

Girl.stats = [
  'happiness', 'endurance', 'obedience', 'charisma', 'intelligence', 'constitution',
  'soft libido', 'hard libido', 'anal libido', 'fetish libido',
  'soft experience', 'hard experience', 'anal experience', 'fetish experience'
];

Girl.sex = ['soft', 'hard', 'anal', 'fetish'];

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
  Girl.stats.forEach(function(stat) {
    obj[stat] = base[stat];
  });
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
    if (Girl.stats.indexOf(key) == -1 && key != 'money') { return; }
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
  cost += (this.obedience + this.charisma + this.intelligence + this.constitution) * prices.stats;
  var girl = this;
  Girl.sex.forEach(function(type) {
    cost += (girl[type + ' libido'] + girl[type + ' experience']) * prices[type];
  });
  cost *= 1 - happiness / 150;
  return Math.floor(cost);
};

Girl.actionFunctions = {};

(function() {
  Girl.prototype.potentialActions = function(time) {
    var potentialActions = {};
    var girl = this;
    $.each(Actions, function(_id, action) {
      var new_action = checkAction.call(girl, time, action);
      if (new_action) {
        potentialActions[_id] = new_action;
      }
    });
    if (this._.actions) {
      $.each(this._.actions, function(_id, action) {
        var new_action = checkAction.call(girl, time, action);
        if (new_action) {
          potentialActions[_id] = new_action;
        }
      });
    }
    return potentialActions;
  };

  function checkAction(time, action) {
    if (action.tags && action.tags.tentacles && !g.tentacles) { return; }
      var new_action = $.extend(true, {}, action);
      delete new_action.disabled;
      if (action.disabled) {
        var disabled = action.disabled.call(this, time);
        if (disabled === true) {
          return;
        } else if (disabled) {
          new_action.disabled = disabled;
        }
      }
      if (!new_action.disabled && action.mins) {
        for (var stat in action.mins) {
          if (stat == 'money' && g.money < action.mins.money) {
            new_action.disabled = 'Not enough money';
          } else if (this[stat] < action.mins[stat]) {
            new_action.disabled = 'Not enough ' + stat;
            break;
          }
        }
      }
      var context = {
        girl: this
      };
      new_action.label = ejs.render(action.label, context);
      if (new_action.disabled) {
        new_action.description = new_action.disabled;
      } else {
        new_action.description = ejs.render(action.description, context);
      }
      return new_action;
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
    Girl.actionFunctions[action._id].call(this, time);
  }
  else {
    var endDelta = this.startDelta();
    if (typeof(action.variants) == 'function') {
      i = action.variants.call(action, this);
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
  return function() {
    var change = {};
    if (g.money - delta.money) {
      change.money = g.money - delta.money;
    }
    s.forEach(function(stat) {
      if (girl[stat] - delta[stat]) {
        change[stat] = girl[stat] - delta[stat];
      }
    });
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
  if (stat == 'experience') {
    return Math.floor((this['soft experience'] + this['hard experience'] + this['anal experience'] + this['fetish experience']) / 4);
  }
  if (stat == 'libido') {
    return Math.floor((this['soft libido'] + this['hard libido'] + this['anal libido'] + this['fetish libido']) / 4);
  }
  return this[stat];
};
