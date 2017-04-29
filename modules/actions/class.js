"use strict";
function Action(obj) {
  Resolvable.call(this, obj);
  delete this.enableConditions;
  delete this.disable;
  delete this.tags;
  if (!this.gerund) { this.gerund = this.label + 'ing'; }
}

Action.prototype = new Resolvable();

Action.create = function createAction(_id, context, allowFalseConditions) {
  var action = Resolvable.create(_id, 'Action', context, allowFalseConditions);
  if (!action) { return action; }
  var options = action.getOptions(context);
  var keys = options._flatten('key');
  var option = context.option;
  if (!context.option || keys.indexOf(context.option) == -1) {
    if (options.length) { option = options[0].key; }
  }
  action.setOption(option);
  action.disabled = action.checkDisabled(undefined, context);
  if (action.disabled) { action.description = action.disabled; }
  action.label = ejs.render(action.label, context);
  action.description = ejs.render(action.description, context);
  action.gerund = ejs.render(action.gerund, context);
  return action;
};

Action.prototype.checkDisabled = function checkDisabled(cond, context) {
  context = context || this.context();
  var realAction = context.girl.actions[this.time];
  if (realAction && realAction.locked && realAction._id != this._id) {
    return context.girl.name + ' cannot ' + this.label + ' until she\'s done ' + realAction.gerund + '.';
  }
  cond = cond || this.base().enableConditions;
  if (!cond) { return; }
  var disabled;
  if (cond.min) {
    if (cond.min.day > g.day) {
      return 'Not yet day ' + cond.min.day + '.';
    }
    if (cond.min.girls > g.girls._filter('status', 'Hired').length) {
      return 'Need to hire at least ' + cond.min.girls + ' girls.';
    }
    if (cond.min.buildings > g.buildings._filter('status', 'Owned').length) {
      return 'Need to own at least ' + cond.min.buildings + ' buildings.';
    }
    if (cond.min.money > g.money) {
      return 'Need at least $' + cond.min.money + '.';
    }
  }
  if (cond.max) {
    if (cond.max.day <  g.day) {
      return 'Past day ' + g.day;
    }
    if (cond.max.girls < g.girls._filter('status', 'Hired').length) {
      return 'Have ' + cond.girls.max + ' or fewer girls hired.';
    }
    if (cond.max.buildings < g.buildings._filter('status', 'Owned').length) {
      return 'Own ' + cond.max.buildings + ' or fewer buildings.';
    }
    if (cond.max.money < g.money) {
      return 'Have $' + g.money + ' or less.';
    }
  }
  if (cond.girl && context.girl) {
    disabled = context.girl.compare(cond.girl, true);
    if (disabled) { return disabled; }
  }
  if (cond.building && context.building) {
    disabled = context.building.compare(cond.building, true);
    if (disabled) { return disabled; }
  }
  realAction = g.ownerAction(this.time);
  if (realAction && this.girl !== realAction.girl && this.ownerParticipation) {
    return 'You are already ' + realAction.gerund + ' with ' + realAction.girl + ' in the ' + this.time;
  }
  if (this.base().disable) {
    return this.base().disable.call(this, context);
  }
};

Action.prototype.applyResults = function applyResults(results, done, context) {
  context = context || this.context();
  if (results.lock === true) {
    this.locked = true;
    if (this.allDay) {
      context.girl.actions.morning.locked = true;
    }
  } else if (results.lock === false) {
    delete this.locked;
    if (this.allDay) {
      delete context.girl.actions.morning.locked;
    }
  }
  Resolvable.prototype.applyResults.call(this, results, done, context);
};

Action.prototype.getTags = function getTags(context) {
  var base = this.base();
  if (typeof(base.tags) == 'function') {
    context = context || this.context();
    return base.tags.call(this, context);
  }
  return base.tags || {};
};

((() => {
  // This goes here instead of in Buildings, because otherwise we'd just be writing one function, then undoing the changes under some circumstances with a second, more advanced copy of the exact same one.
  var originalPay = Girl.prototype.desiredPay;
  Girl.prototype.desiredPay = function desiredPay() {
    if (!g.missionsDone.firstMoney) { return 0; }
    var pay = originalPay.call(this);
    return this.building() || this.awayFromHome() ? pay : pay + Building.config.noRoomDailyCost;
  };
}))();

Girl.actions = function actions(time) {
  var list = {};
  g.girls._filter('status', 'Hired').forEach(girl => {
    list[girl.actions[time]._id] = list[girl.actions[time]._id] || [];
    list[girl.actions[time]._id].push(girl.name);
  });
  return list;
};

Girl.prototype.action = function createAction(_id, context) {
  context.girl = this;
  var action = Action.create(_id, context, true);
  if (this.actions[context.time] && _id == this.actions[context.time]._id) {
    if (this.actions[context.time].option) {
      action.setOption(this.actions[context.time].option);
    }
  }
  return action;
};

Girl.prototype.setAction = function setAction(action) {
  if (action.allDay) {
    this.actions.morning = action;
    this.actions.evening = action;
    return;
  }
  if (this.actions.evening && this.actions.evening.allDay) {
    this.actions.morning = this.action('Rest', { time: 'morning' });
    this.actions.evening = this.action('Rest', { time: 'evening' });
  }
  this.actions[action.time] = action;
};

Girl.prototype.verifyAction = function verifyAction(time, rebuild, allowFalseConditions) {
  var a = this.actions[time];
  if (a && a.locked) { return; }
  a = a && a.checkConditions(undefined, undefined, allowFalseConditions) && !a.checkDisabled() && a;
  if (!a) {
    this.setAction(this.action('Rest', { time }));
    a = this.actions[time];
  }
  if (a.option) {
    var options = a.getOptions();
    if (options._accumulate('key').indexOf(a.option) == -1) {
      a.setOption(options[0].key);
    }
  }
  if (rebuild) {
    this.setAction(this.action(a._id, {time}));
    if (a.option) { this.actions[time].setOption(a.option); }
  }
};

Girl.prototype.potentialActions = function potentialActions(time) {
  var actions = {};
  var context = {
    time
  };
  var _id;
  if (this.base().Actions) {
    for (_id in this.base().Actions) {
      actions[_id] = this.action(_id, context);
    }
  }
  for (_id in Actions) {
    if (actions[_id] === undefined) {
      actions[_id] = this.action(_id, context);
    }
  }
  for (_id in actions) {
    if (!actions[_id]) {
      delete actions[_id];
    }
  }
  return actions;
};

Girl.prototype.awayFromHome = function awayFromHome() {
  return (this.actions.morning && this.actions.morning.awayFromHome) || (this.actions.evening && this.actions.evening.awayFromHome);
};

Game.prototype.ownerAction = function ownerAction(time) {
  var action;
  g.girls._filter('status', 'Hired').forEach(girl => {
    if (girl.actions[time] && girl.actions[time].ownerParticipation) {
      action = girl.actions[time];
    }
  });
  return action;
};

// Yep, completely overwriting the original function with this slightly more advanced one.
Building.prototype.girls = function getGirls() {
  var girls = {};
  this.rooms._accumulate('girl').forEach(name => {
    if (!g.girls[name].awayFromHome()) {
      girls[name] = g.girls[name];
    }
  });
  return girls;
};

((() => {
  var oldCheckConditions = Resolvable.prototype.checkConditions;
  Resolvable.prototype.checkConditions = function checkConditions(cond, context, allowFalseConditions) {
    cond = cond || this.base().conditions;
    var result = oldCheckConditions.call(this, cond, context, allowFalseConditions);
    if (!result) { return result; }
    if (cond && cond.ownerParticipation && !context.action.ownerParticipation) { return false; }
    if (cond && cond.ownerParticipation === false && context.action && context.action.ownerParticipation) { return false; }
    return result;
  };
}))();
