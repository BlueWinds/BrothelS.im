var Mission = function(obj, base) {
  $.extend(true, this, obj);
  this._ = base || obj;
};

Mission.start = function(base, girl, done) {
  if (base.fetishes) {
    for (var fet in base.fetishes) {
      if (base.fetishes[fet] && !g.fetishes[fet]) {
        done();
        return;
      }
    }
  }
  mission = new Mission(base);
  if (typeof(girl) == 'object') { mission.girl = girl.name; }

  var context = {
    mission: mission,
    girl: girl
  };
  if (mission.people) {
    $.each(mission.people, function(i, person) {
      mission.people[i] = randomPerson(person);
    });
  }
  mission.end = mission.end || {};
  if (typeof(mission.end) == 'function') { mission.end = mission.end.call(mission, girl); }
  if (typeof(mission.end.minDay) == 'string') {
    mission.end.minDay = g.day + parseInt(mission.end.minDay, 10);
  }
  if (typeof(mission.end.maxDay) == 'string') {
    mission.end.maxDay = g.day + parseInt(mission.end.maxDay, 10);
  }
  if (mission.label) {
    mission.label = ejs.render(mission.label, context);
  }

  if (mission.description && mission.image) {
    mission.description = ejs.render(mission.description, context);
    mission.image = ejs.render(mission.image, context);
    if (mission.image[0] == '/' ) {
      mission.image = mission.image.substr(1);
    } else if (girl) {
      mission.image = girl.image(mission.image);
    }
    mission.group = ejs.render(mission.group || 'Missions', context);

    new Message({
      type: mission.label,
      text: mission.description,
      image: mission.image
    }).save(mission.group);
  }

  if (!$.isEmptyObject(mission.end)) {
    g.missions[mission._id] = mission;
    done();
  } else {
    mission.applyResults(mission.success, done, girl);
    g.missionsDone[mission._id] = true;
  }
};

Mission.prototype.checkConditions = function(cond, girl) {
  if (!cond || $.isEmptyObject(cond)) { return girl || true; }
  if (cond.minDay && g.day < cond.minDay) { return false; }
  if (cond.maxDay && g.day > cond.maxDay) { return false; }
  if (cond.likelyhood && Math.random() > cond.likelyhood) { return false; }
  if (cond.money && g.money < cond.money) { return false; }
  if (cond.girls && g.girls.Cfilter('status', 'Hired').length < cond.girls) { return false; }
  if (cond.buildings && g.buildings.Cfilter('status', 'Owned').length < cond.buildings) { return false; }

  if (cond.girlMin || cond.girlMax) {
    var match = false;
    var girls = girl ? [girl] : g.girls.Cfilter('status', 'Hired');
    girls.forEach(function(girl) {
      var specialRule;
      for (var stat in cond.girlMin) {
        if (girl[stat] < cond.girlMin[stat] && stat != 'specialRules') { return; }
        if (stat == 'specialRules') {
          for (specialRule in cond.girlMin.specialRules) {
            if ((girl.specialRules[specialRule] || 0) < cond.girlMin.specialRules[specialRule]) {
              return;
            }
          }
        }
      }
      for (stat in cond.girlMax) {
        if (girl[stat] > cond.girlMax[stat] && stat != 'specialRules') { return; }
        if (stat == 'specialRules') {
          for (specialRule in cond.girlMax.specialRules) {
            if ((girl.specialRules[specialRule] || 0) < cond.girlMax.specialRules[specialRule]) {
              return;
            }
          }
        }
      }
      match = girl;
    });
    return match;
  }

  return girl || true;
};

Mission.prototype.checkDay = function(done) {
  var result = this.checkConditions(this.end, g.girls[this.girl]);
  function finished() {
    g.missionsDone[this._id] = true;
    done();
  }
  if (result) {
    delete g.missions[this._id];
    g.missionsDone[this._id] = true;
    var success = this.success || this._ && this._.success;
    this.applyResults(success, finished, result);
  } else if (this.end.maxDay <= g.day) {
    delete g.missions[this._id];
    var fail = this.fail || this._ && this._.fail;
    this.applyResults(fail, finished, result);
  } else {
    done();
  }
};

(function() {
  Mission.prototype.applyResults = function(result, done, girl, context) {
    if (!result) { done(); return; }
    var mission = this;
    if (typeof(result) == 'function') {
      result.call(this, girl, function(new_result) {
        apply.call(mission, new_result, girl, context, done);
      });
    } else {
      apply.call(this, result, girl, context, done);
    }
  };

  function apply(result, girl, context, done) {
    if (typeof(girl) != 'object') { girl = false; }
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
      var base = Missions[result.mission] || girl._.missions && girl._.missions[result.mission];
      Mission.start(base, girl, done);
    } else {
      done();
    }
  }
}) ();
