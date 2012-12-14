var Mission = function(obj) {
  $.extend(this, obj);
  this._ = Missions[obj._id];
};

Mission.start = function(base) {
  if (base.fetishes) {
    for (var fet in base.fetishes) {
      if (base.fetishes[fet] && !g[fet]) {
        return;
      }
    }
  }
  var obj = {
    _id: base._id
  };
  var context = {
    mission: obj
  };
  if (base.people) {
    obj.people = [];
    base.people.forEach(function(person) {
      obj.people.push(randomPerson(person));
    });
  }

  if (typeof(base.end) == 'function') { obj.end = base.end.call(obj); }
  else { obj.end = base.end; }
  if (typeof(base.success) == 'function') { obj.success = base.success(); }
  else { obj.success = base.success; }
  if (typeof(base.fail) == 'function') { obj.fail = base.fail(); }
  else { obj.fail = base.fail; }

  obj.name = ejs.render(base.name, context);
  obj.description = ejs.render(base.description, context);
  obj.image = ejs.render(base.image, context);

  var mission = new Mission(obj);

  new Message({
    type: 'Started - ' + mission.name,
    text: mission.description,
    image: mission.image
  }).save('Missions');
  g.missions[mission._id] = mission;
};

Mission.prototype.checkConditions = function(cond) {
  if (!cond || $.isEmptyObject(cond)) { return true; }
  if (cond.day && g.day != cond.day) { return false; }
  if (cond.money && g.money < cond.money) { return false; }
  if (cond.girls && g.girls.Cfilter('status', 'Hired').length < cond.girls) { return false; }
  if (cond.buildings && g.buildings.Cfilter('status', 'Owned').length < cond.buildings) { return false; }

  if (cond.action) {
    var girls = g.girls.Cfilter('status', 'Hired');
    if (!girls.Cfilter('actions', 'morning', cond.action).length && !girls.Cfilter('actions', 'evening', cond.action).length) { return false; }
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
      mission: this
    };
    console.log(context);
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
    Mission.start(Missions[result.mission]);
  }
};
