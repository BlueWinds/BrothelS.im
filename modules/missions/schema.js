define(['messages/messages', './missionList', 'randomPerson/randomPerson', 'girls/schema', 'buildings/schema', 'content/strings'], function(Message, missions, randPerson, Girl, Building, strings) {
  var Mission = function(obj) {
    $.extend(this, obj);
    this._ = missions[obj._id];
  };

  Mission.start = function(_id) {
    var base = missions[_id];
    var obj = {
      _id: _id
    };
    var context = {
      mission: obj,
      Str: strings
    };
    if (base.people) {
      obj.people = [];
      for (var i in base.people) {
        obj.people.push(randPerson(base.people[i]));
      }
    }

    if (typeof(base.end) == 'function') { obj.end = base.end.call(obj); }
    else { obj.end = base.end; }
    if (typeof(base.success) == 'function') { obj.success = base.success(); }
    else { obj.success = base.success; }
    if (typeof(base.fail) == 'function') { obj.fail = base.fail(); }
    else { obj.fail = base.fail; }

    obj.name = ejs.render(base.name, context);
    obj.description = ejs.render(base.description, context);

    if (typeof(base.image) == 'function') { obj.image = base.image.call(obj); }
    else { obj.image = base.image; }

    var mission = new Mission(obj);

    new Message({
      type: 'Started - ' + mission.name,
      text: mission.description,
      image: mission.image
    }).save('Missions');
    g.missions[_id] = mission;
  };

  Mission.prototype.checkConditions = function(cond) {
    if (!cond || $.isEmptyObject(cond)) { return true; }
    if (cond.day && g.day != cond.day) { return false; }
    if (cond.money && g.money < cond.money) { return false; }
    if (cond.girls && Girl.girls('Hired').length < cond.girls) { return false; }
    if (cond.buildings && Building.buildings('Owned').length < cond.buildings) { return false; }

    if (cond.action) {
      var found = false;
      for (var name in g.girls) {
        var girl = g.girls[name];
        if (girl.status != 'Hired') { continue; }
        if (girl.actions.morning == cond.action || girl.actions.evening == cond.action) {
          found = true;
          break;
        }
      }
      if (!found) { return false; }
    }

    return true;
  };

  Mission.prototype.checkDay = function() {
    if (this.checkConditions(this.end)) {
      delete g.missions[this._id];
      if (this.checkConditions(this.conditions)) {
        this.applyResults(this.success);
      } else {
        this.applyResults(this.fail);
      }
    }
  };

  Mission.prototype.applyResults = function(result) {
    if (!result) { return; }
    var delta = {};
    if (result.money) {
      g.money += result.money;
      delta.money = result.money;
    }
    if (result.maxGirls) {
      g.maxGirls = result.maxGirls;
    }
    if (result.maxBuildings) {
      g.maxBuildings = result.maxBuildings;
    }
    if (result.description) {
      var desc = typeof(result.description) == 'object' ? result.description : [result.description];
      var img = typeof(result.image) == 'object' ? result.image : [result.image];
      var context = {
        mission: this,
        Str: strings,
        g: g
      };
      for (var i in desc) {
        new Message({
          type: 'Finished - ' + this.name,
          text: ejs.render(desc[i], context),
          image: img[i],
          delta: i == desc.length - 1 ? delta : {}
        }).save('Missions');
      }
    }
    if (result.mission) {
      Mission.start(result.mission);
    }
  };

  return Mission;
});