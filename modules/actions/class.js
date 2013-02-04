function Action(obj) {
  Resolvable.call(this, obj);
  delete this.enableConditions;
  delete this.options;
  delete this.disable;
  if (!this.gerund) { this.gerund = this.label + 'ing'; }
}

Action.prototype = new Resolvable();

Action.create = function(_id, context) {
  var action = Resolvable.create(_id, 'Action', context);
  if (!action) { return action; }
  var option = context.option || Object.keys(action.options())[0];
  if (option) { action.setOption(option); }
  action.disabled = action.checkDisabled();
  if (action.disabled) { action.description = action.disabled; }
  action.label = ejs.render(action.label, context);
  action.description = ejs.render(action.description, context);
  action.tags = action.tags || {};
  action.gerund = ejs.render(action.gerund, context);
  return action;
};

Action.prototype.options = function() {
  var name, options = this.base().options;
  if (typeof(options) == 'function') {
    options = options.call(this, this.context());
  } else if (options == 'girls') {
    options = {};
    g.girls._filter('status', 'Hired').forEach(function(girl) {
      options[girl.name] = girl.name;
    });
    delete options[this.girl];
  } else if (options == 'buildings') {
    options = {};
    g.buildings._filter('status', 'Owned').forEach(function(building) {
      options[building.name] = building.name;
    });
  }
  return options || {};
};

Action.prototype.setOption = function(option) {
  this.option = option;
  if (this.optionsKey) {
    this[this.optionsKey] = option;
  }
};

Action.prototype.checkDisabled = function() {
  var context = this.context();
  var cond = this.base().enableConditions;
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
  if (this.base().disable) {
    return this.base().disable.call(this, context);
  }
};

Girl.actions = function(time) {
  var list = {};
  g.girls._filter('status', 'Hired').forEach(function(girl) {
    list[girl.actions[time]._id] = list[girl.actions[time]._id] || [];
    list[girl.actions[time]._id].push(girl.name);
  });
  return list;
};

Girl.prototype.action = function(_id, context) {
  context.girl = this;
  var action = Action.create(_id, context);
  if (this.actions[context.time] && _id == this.actions[context.time]._id) {
    if (this.actions[context.time].option) {
      action.setOption(this.actions[context.time].option);
    }
  }
  return action;
};

Girl.prototype.setAction = function(action) {
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

Girl.prototype.verifyActions = function(time, rebuild) {
  var m, e;
  if (!time || time == 'morning') {
    m = this.actions.morning;
    m = m && m.label && m.checkConditions() && !m.checkDisabled();
    if (!m) {
      this.setAction(this.action('Rest', { time: 'morning' }));
    }
  }
  if (!time || time == 'evening') {
    e = this.actions.evening;
    e = e && e.label && e.checkConditions() && !e.checkDisabled();
    if (!e) {
      this.setAction(this.action('Rest', { time: 'evening' }));
    }
  }
  if (rebuild) {
    m = this.actions.morning;
    e = this.actions.evening;
    this.actions.morning = this.action(m._id, {time: 'morning'});
    this.actions.evening = this.action(e._id, {time: 'evening'});
    if (m.option) { this.actions.morning.setOption(m.option); }
    if (e.option) { this.actions.evening.setOption(e.option); }
  }
};

Girl.prototype.potentialActions = function(time) {
  var actions = {};
  var context = {
    time: time
  };
  for (var _id in Actions) {
    actions[_id] = this.action(_id, context);
  }
  if (this.base().Actions) {
    for (_id in this.base().Actions) {
      if (actions[_id] === undefined) {
        actions[_id] = this.action(_id, context);
      }
    }
  }
  for (_id in actions) {
    if (!actions[_id]) {
      delete actions[_id];
    }
  }
  return actions;
};
