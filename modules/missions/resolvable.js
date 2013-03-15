"use strict";
function Resolvable(obj) {
  $.extend(true, this, obj);
  delete this.initialize;
  delete this.variants;
  delete this.results;
  delete this.conditions;
  this.constructor = window[this._class];
}

Resolvable.create = function(_id, _class, context, allowFalseConditions) {
  var base = Resolvable.base(_id, _class, context);
  var res = new window[_class](base);
  res.constructor = window[_class];
  res._class = _class;
  context = res.checkConditions(base.conditions, context, allowFalseConditions);
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
  if (this.girl && g.girls[this.girl]) { context.girl = g.girls[this.girl]; }
  if (this.building && g.buildings[this.building]) { context.building = g.buildings[this.building]; }
  if (this.time) { context.time = this.time; }
  context[this._class.toLowerCase()] = this;
  return context;
};

Resolvable.prototype.setContext = function(context) {
  if (context.girl) {
    this.girl = context.girl && context.girl.name;
  } else {
    delete this.girl;
  }
  if (context.building) {
    this.building = context.building && context.building.name;
  } else {
    delete this.building;
  }
  if (context.time) {
    this.time = context.time;
  } else {
    delete this.time;
  }
};

Resolvable.base = function(_id, _class, context) {
  var prop = _class + 's';
  if (context.girl) {
    var girl = context.girl.base();
    if (girl && girl[prop] && girl[prop][_id]) {
      return $.extend(true, {}, girl[prop][_id]);
    }
  }
  if (context.building) {
    var building = context.building.base();
    if (building && building[prop] && building[prop][_id]) {
      return $.extend(true, {}, building[prop][_id]);
    }
  }
  return $.extend(true, {}, window[prop][_id]);
};

Resolvable.prototype.base = function() {
  return Resolvable.base(this._id, this._class, this.context());
};

Resolvable.prototype.checkConditions = function(cond, context, allowFalseConditions) {
  cond = cond || this.base().conditions;
  context = context || this.context(context);
  if (cond === false) {
    return allowFalseConditions ? context : false;
  }
  if (!cond) { return context; }
  if (cond.fetishes) {
    for (var fet in cond.fetishes) {
      if (cond.fetishes[fet] && !g.fetishes[fet]) {
        return false;
      } else if (!cond.fetishes[fet] && g.fetishes[fet]) {
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
    var matchingGirls = [];
    if (!cond.girl.status) { girls = girls._filter('status', 'Hired'); }
    for (i in girls) {
      if (girls[i].compare(cond.girl)) {
        matchingGirls.push(girls[i]);
      }
    }
    if (!matchingGirls.length) { return false; }
    context.girl = Math.choice(matchingGirls);
  }
  if (cond.building) {
    var buildings = context.building ? [context.building] : g.buildings;
    delete context.building;
    var matchingBuildings = [];
    for (i in buildings) {
      if (buildings[i].compare(cond.building)) {
        matchingBuildings.push(buildings[i]);
      }
    }
    if (!matchingBuildings.length) { return false; }
    context.building = Math.choice(matchingBuildings);
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
  if (cond.option && this.option != cond.option) { return false; }
  return context;
};

Resolvable.prototype.getResults = function(done, context) {
  var base = this.base();
  if (typeof(base.variants) == 'function') {
    context = context || this.context();
    base.variants.call(this, context, done);
    return;
  }
  if (base.variants) {
    var extra = [];
    for (var i in base.results) {
      if (base.variants[i]) {
        if (this.checkConditions(base.variants[i])) {
          done(base.results[i]);
          return;
        }
      } else {
        extra.push(i);
      }
    }
    done(base.results[Math.choice(extra)]);
    return;
  } else {
    done(Math.choice(base.results));
  }
};

Resolvable.prototype.applyResults = function(results, done, context) {
  var series = [function(next) {
    e.invokeAll('ApplyResults', results, context, next);
  }];
  var changes = [];
  context = context || this.context();
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
      var live = Message.send(message, context);
      live.delta = message.delta === false ? {} : delta;
    });
  }
  if (results.mission) {
    var missions = typeof(results.mission) == 'object' ? results.mission : [results.mission];
    missions.forEach(function(_id) {
      context = $.extend({}, context);
      var mission = Mission.create(_id, context, true);
      if (mission) {
        if (mission.getEnd()) {
          g.missions[results.mission] = mission;
        } else {
          series.push(function(next) { mission.checkDay(next); });
        }
      }
    });
  }
  if (results.missionsDone) {
    for (var _id in results.missionsDone) {
      if (results.missionsDone[_id]) {
        g.missionsDone[_id] = true;
      } else { delete g.missionsDone[_id]; }
    }
  }
  e.runSeries(series, done);
};

Resolvable.prototype.parseConditions = function(conditions, context) {
  conditions = $.extend(true, {}, conditions);
  var oldInt;
  for (var cond in {min: 1, max: 1}) {
    if (conditions[cond]) {
      if (typeof(conditions[cond].money) == 'string') {
        oldInt = parseInt(conditions[cond].money, 10);
        conditions[cond].money = g.money + oldInt;
      }
      if (typeof(conditions[cond].day) == 'string') {
        oldInt = parseInt(conditions[cond].day, 10);
        conditions[cond].day = (context.day || g.day) + oldInt;
      }
      if (typeof(conditions[cond].girls) == 'string') {
        oldInt = parseInt(conditions[cond].girls, 10);
        conditions[cond].girls = g.girls._filter('status', 'Hired').length + oldInt;
      }
      if (typeof(conditions[cond].buildings) == 'string') {
        oldInt = parseInt(conditions[cond].buildings, 10);
        conditions[cond].girls = g.buildings._filter('status', 'Owned').length + oldInt;
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
