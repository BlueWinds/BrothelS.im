function Resolvable(obj) {
  $.extend(true, this, obj);
  delete this.initialize;
  delete this.variants;
  delete this.conditions;
  this.constructor = window[this._class];
}

Resolvable.create = function(_id, _class, context) {
  var base = Resolvable.base(_id, _class, context);
  var res = new window[_class](base);
  res._class = _class;
  context = res.checkConditions(base.conditions, context);
  if (!context) { return false; }
  if (base.initialize) {
    var ret = base.initialize.call(res, context);
    if (ret === false) { return false; }
  }
  res.setContext(context);
  return res;
};

Resolvable.prototype.context = function() {
  var context = {};
  if (this.girl) { context.girl = g.girls[this.girl]; }
  if (this.building) { context.building = g.buildings[this.building]; }
  if (this.time) { context.time = this.time; }
  context[this._class.toLowerCase()] = this;
  return context;
};

Resolvable.prototype.setContext = function(context) {
  this.girl = context.girl && context.girl.name;
  this.building = context.building && context.building.name;
  this.time = context.time;
};

Resolvable.base = function(_id, _class, context) {
  var base = {};
  var prop = _class + 's';
  if (window[prop][_id]) {
    $.extend(true, base, window[prop][_id]);
  }
  if (context.girl) {
   var girl = context.girl.base();
   if (girl && girl[prop] && girl[prop][_id]) {
     $.extend(true, base, girl[prop][_id]);
    }
  }
  if (context.building) {
   var building = context.building.base();
   if (building && building[prop] && building[prop][_id]) {
     $.extend(true, base, building[prop][_id]);
    }
  }
  return base;
};

Resolvable.prototype.base = function() {
  return Resolvable.base(this._id, this._class, this.context());
};

Resolvable.prototype.checkConditions = function(cond, context) {
  cond = cond || this.base().conditions;
  context = context || this.context(context);
  if (!cond) { return context; }
  if (cond.fetishes) {
    for (var fet in cond.fetishes) {
      if (cond.fetishes[fet] && !g.fetishes[fet]) {
        return false;
      }
    }
  }
  if (cond.time && context.time && context.time != cond.time) { return false; }
  if (cond.likelyhood && Math.random() > cond.likelyhood) { return false; }
  if (cond.min && (
    cond.min.day > (context.day || g.day) ||
    cond.min.girls > g.girls._filter('status', 'Hired').length ||
    cond.min.buildings > g.buildings._filter('status', 'Owned').length ||
    cond.min.money > g.money
  )) { return false; }
  if (cond.max && (
    cond.max.day < (context.day || g.day) ||
    cond.max.girls < g.girls._filter('status', 'Hired').length ||
    cond.max.buildings < g.buildings._filter('status', 'Owned').length ||
    cond.max.money < g.money
  )) { return false; }
  var i;
  if (cond.girl) {
    var girls = context.girl ? [context.girl] : g.girls;
    if (!cond.girl.status) { girls = girls._filter('status', 'Hired'); }
    delete context.girl;
    for (i in girls) {
      if (girls[i].compare(cond.girl)) {
        context.girl = girls[i];
        break;
      }
    }
    if (!context.girl) { return false; }
  }
  if (cond.building) {
    var buildings = context.building ? [context.building] : g.buildings;
    delete context.building;
    for (i in buildings) {
      if (buildings[i].compare(cond.building)) {
        context.building = buildings[i];
        break;
      }
    }
    if (!context.building) { return false; }
  }
  if (cond.missions) {
    for (var _id in cond.missions) {
      switch (cond.missions[_id]) {
        case -3:
          if (g.missions[_id] || g.missionsDone[_id]) { return false; }
          break;
        case -2:
          if (g.missionsDone[_id]) { return false; }
          break;
        case -1:
          if (g.missions[_id]) { return false; }
          break;
        case 1:
          if (!g.missions[_id]) { return false; }
          break;
        case 2:
          if (!g.missionsDone[_id]) { return false; }
          break;
        case 3:
          if (!g.missions[_id] && !g.missionsDone[_id]) { return false; }
          break;
      }
    }
  }
  return context;
};

Resolvable.prototype.getResults = function(done) {
  var base = this.base();
  if (typeof(base.variants) == 'function') {
    base.variants.call(this, this.context(), done);
    return;
  }
  if (this.results && base.variants) {
    var rand = Math.random();
    for (var i in base.variants) {
      if (typeof(base.variants[i]) == 'number') {
        rand -= base.variants[i];
        if (rand <= 0) { break; }
      } else {
        if (this.checkConditions(base.variants[i])) {
          break;
        }
      }
    }
    done(this.results[i]);
    return;
  }
  done(Math.choice(base.results));
};

Resolvable.prototype.applyResults = function(results, done) {
  var res = this;
  if (!done) {
    done = results;
    this.getResults(function(results) {
      res.applyResults(results, done);
    });
    return;
  }
  var changes = [];
  var context = this.context();
  if (context.girl) {
    changes.push(context.girl.startDelta());
  }
  if (context.building && (!context.girl || context.girl.building() !== context.building)) {
    changes.push(context.building.startDelta());
  }
  if (results.money) { g.money += results.money; }
  if (results.girl && context.girl) {
    context.girl.apply(results.girl);
  }
  if (results.building && context.building) { context.building.apply(results.building); }
  if (results.message) {
    var delta = {};
    changes.forEach(function(d) { delta._add(d()); });
    var messages = results.message.length ? results.message : [results.message];
    messages.forEach(function(message) {
      var live = new Message(message, context);
      live.delta = message.delta === false ? {} : delta;
      g.messages.push(live);
    });
  }
  if (results.mission) {
    var mission = Mission.create(results.mission, context);
    if (mission) {
      g.missions[results.mission] = mission;
    }
  }
  e.invokeAll('ApplyResults', results, context, done);
};

Resolvable.prototype.parseConditions = function(conditions, context) {
  conditions = $.extend(true, {}, conditions);
  var old_int;
  for (var cond in {min: 1, max: 1}) {
    if (conditions[cond]) {
      if (typeof(conditions[cond].money) == 'string') {
        old_int = parseInt(conditions[cond].money, 10);
        conditions[cond].money = g.money + old_int;
      }
      if (typeof(conditions[cond].day) == 'string') {
        old_int = parseInt(conditions[cond].day, 10);
        conditions[cond].day = (context.day || g.day) + old_int;
      }
      if (typeof(conditions[cond].girls) == 'string') {
        old_int = parseInt(conditions[cond].girls, 10);
        conditions[cond].girls = g.girls._filter('status', 'Hired').length + old_int;
      }
      if (typeof(conditions[cond].buildings) == 'string') {
        old_int = parseInt(conditions[cond].buildings, 10);
        conditions[cond].girls = g.buildings._filter('status', 'Owned').length + old_int;
      }
    }
  }
  if (conditions.girl && context.girl) {
    context.girl.parseConditions(conditions.girl);
  }
  if (conditions.building && context.building) {
    context.building.parseConditions(conditions.building);
  }
  return conditions;
};
