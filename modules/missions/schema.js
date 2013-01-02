var Mission = function(obj, base) {
  $.extend(this, obj);
  this._ = base;
};

Mission.start = function(base, girl) {
  console.log(base);
  if (base.fetishes) {
    for (var fet in base.fetishes) {
      if (base.fetishes[fet] && !g.fetishes[fet]) {
        return;
      }
    }
  }
  console.log(base);
  var mission = $.extend(true, {}, base);
  if (typeof(girl) == 'object') { mission.girl = girl; }

  var context = {
    mission: mission,
    girl: mission.girl
  };
  if (mission.people) {
    $.each(mission.people, function(i, person) {
      mission.people[i] = randomPerson(person);
    });
  }

  if (typeof(mission.end) == 'function') { mission.end = mission.end.call(mission); }
  mission.label = ejs.render(mission.label, context);

  mission = new Mission(mission, base);
  if (mission.description && mission.image) {
    mission.description = ejs.render(mission.description, context);
    mission.image = ejs.render(mission.image, context);
    if (mission.image[0] == '/' ) {
      mission.image = mission.image.substr(1);
    } else if (mission.girl) {
      mission.image = mission.girl.image(mission.image);
    }
    if (mission.group) {
      mission.group = ejs.render(mission.group, context);
    } else {
      mission.group = 'Missions';
    }

    new Message({
      type: mission.label,
      text: mission.description,
      image: mission.image
    }).save(mission.group);
  }

  if (mission.end) {
    g.missions[mission._id] = mission;
  } else {
    mission.applyResults(mission.success);
    g.missionsDone[mission._id] = true;
  }
};

Mission.prototype.checkConditions = function(cond, girl) {
  if (!cond || $.isEmptyObject(cond)) { return true; }
  if (cond.minDay && g.day < cond.minDay) { return false; }
  if (cond.maxDay && g.day > cond.maxDay) { return false; }
  if (cond.money && g.money < cond.money) { return false; }
  if (cond.girls && g.girls.Cfilter('status', 'Hired').length < cond.girls) { return false; }
  if (cond.buildings && g.buildings.Cfilter('status', 'Owned').length < cond.buildings) { return false; }

  if (cond.girlMin || cond.girlMax) {
    var match = false;
    var girls = girl ? [girl] : g.girls.Cfilter('status', 'Hired');
    girls.forEach(function(girl) {
      for (var stat in cond.girlMin) {
        if (girl[stat] < cond.girlMin[stat]) { return; }
      }
      for (stat in cond.girlMax) {
        if (girl[stat] > cond.girlMax[stat]) { return; }
      }
      match = girl;
    });
    return match;
  }

  return true;
};

Mission.prototype.checkDay = function() {
  var result = this.checkConditions(this.end, this.girl);
  if (result) {
    delete g.missions[this._id];
    g.missionsDone[this._id] = true;
    this.applyResults(this.success);
  } else if (this.end.maxDay <= g.day) {
    delete g.missions[this._id];
    this.applyResults(this.fail);
    g.missionsDone[this._id] = true;
  }
};

Mission.prototype.applyResults = function(result, girl, context) {
  if (!result) { return; }
  var delta = girl && girl.startDelta() || {};
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
  if (girl && result.girl) {
    girl.apply(result.girl);
  }
  if (result.message) {
    context = $.extend({
      mission: this,
      girl: girl
    }, context);
    var text = typeof(result.message) == 'object' ? result.message : [result.message];
    var img = typeof(result.image) == 'object' ? result.image : [result.image];
    if (typeof(delta) == 'function') { delta = delta(); }
    for (var i in text) {
      var img_render = ejs.render(img[i], context);
      if (img_render[0] == '/' ) {
        img_render = img_render.substr(1);
      } else if (girl) {
        img_render = girl.image(img_render);
      }
      new Message({
        type: this.label,
        text: ejs.render(text[i], context),
        image: img_render,
        delta: i == text.length - 1 ? delta : {}
      }).save(this.group);
    }
  }
  if (result.mission) {
    Mission.start(Missions[result.mission], girl);
  }
};
