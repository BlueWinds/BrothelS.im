define(['content/girls/girlList', 'content/girls', 'messages/messages', 'content/actions/actionsList'], function(girls, config, Message, actionsList) {
  var stats = [
    'happiness', 'endurance', 'obedience', 'charisma', 'intelligence', 'constitution',
    'soft libido', 'hard libido', 'anal libido', 'fetish libido',
    'soft experience', 'hard experience', 'anal experience', 'fetish experience'
  ];

  var sex = ['soft', 'hard', 'anal', 'fetish'];

  var Girl = function(obj) {
    $.extend(this, obj);
    this._ = girls[this.name];
    return this;
  };
  Girl.create = function(name) {
    var base = girls[name];
    var obj = {
      name: name,
      _: base,
      actions: {
        morning: 'Rest',
        evening: 'Rest',
        morningLabel: 'Rest',
        eveningLabel: 'Rest'
      }
    };
    for (var i in stats) {
      obj[stats[i]] = base[stats[i]];
    }
    var girl = new Girl(obj);
    girl.status = girl.randomStatus();
    if (girl.status == 'Hired') { girl.actions.pay = girl.desiredPay(); }
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
      if (stats.indexOf(key) == -1 && key != 'money') { continue; }
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
    var prices = config.hirePrice;
    var cost = prices.base;
    cost += (this.obedience + this.charisma + this.intelligence + this.constitution) * prices.stats;
    for (var i in sex) {
      cost += (this[sex[i] + ' libido'] + this[sex[i] + ' experience']) * prices[sex[i]];
    }
    cost *= 1 - happiness / 150;
    return Math.floor(cost);
  };

  Girl.actionFunctions = {};

  Girl.prototype.potentialActions = function(time, ignoreMin) {
    var actions = {};
    for (var id_ in actionsList) {
      var action = actionsList[id_];
      if (!action.conditions || action.conditions.call(this, time)) {
        var fail = false;
        for (var stat in action.mins) {
          if (this[stat] < action.mins[stat]) { fail = stat; break; }
        }
        if (fail && !ignoreMin) { continue; }
        actions[id_] = $.extend(true, {}, action);
        actions[id_].label = ejs.render(actions[id_].label, this);
        if (ignoreMin && fail) {
          actions[id_].label += ' - ' + fail + ' too low';
          actions[id_].disabled = true;
        }
        actions[id_].description = ejs.render(actions[id_].description, this);
      }
    }
    return actions;
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

  Girl.prototype.doAction = function(time) {
    var actions = this.potentialActions(time);
    var type = this.actions[time];
    var action = actions[type] || actions.Rest;
    if (time == 'morning' && action.allDay) { return; }
    if (action.extraData) {
      if (action.func) {
        action.func.call(this, action.extraData, time);
      } else {
        Girl.actionFunctions[type].call(this, action.extraData, time);
      }
    }
    else {
      var endDelta = this.startDelta();
      var delta = action.delta;
      var text = action.message;
      var image = action.image;
      if (action.chances) {
        var rand = Math.random();
        var i = 0;
        while (i < action.chances.length) {
          if (rand < action.chances[i]) { break; }
          rand -= action.chances[i];
          i++;
        }
        delta = delta[i];
        text = text[i];
        image = image[i];
      }
      this.apply(delta || {});
      text = typeof(text) == 'object' ? Math.choice(text) : text;
      var message = new Message({
        type: type,
        text: ejs.render(text, this),
        delta: endDelta(),
        image: this.image(image),
        time: time
      }).save(this.name);
    }
  };

  Girl.prototype.runDay = function() {
    if (this.status != 'Hired') {
      this.status = this.randomStatus();
      return;
    }
    this.doAction('morning');
    this.doAction('evening');
    this.apply('money', -this.actions.pay);
    var change = this.actions.pay - this.desiredPay();
    change = change > 0 ? change * config.pay.above : change * config.pay.below;
    this.apply('happiness', change);
  };

  Girl.prototype.startDelta = function(s) {
    if (!s) { s = stats; }
    var girl = this;
    var delta = {
      money: g.money
    };
    for (var i in s) {
      delta[s[i]] = this[s[i]];
    }
    return function() {
      var change = {};
      if (g.money - delta.money) {
        change.money = g.money - delta.money;
      }
      for (var i in s) {
        if (girl[s[i]] - delta[s[i]]) {
          change[s[i]] = girl[s[i]] - delta[s[i]];
        }
      }
      return change;
    };
  };

  Girl.prototype.hire = function() {
    g.money -= this.hirePrice();
    this.status = 'Hired';
    this.endurance = 100;
    this.happiness = config.startHappiness;
    this.actions.pay = this.desiredPay();
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

  Girl.girls = function(status) {
    var girl_list = [];
    for (var name in g.girls) {
      if (g.girls[name].status == status) { girl_list.push(g.girls[name]); }
    }
    return girl_list;
  };

  return Girl;
});