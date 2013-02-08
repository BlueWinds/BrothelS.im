"use strict";
function Mission(obj) {
  Resolvable.call(this, obj);
}

Mission.prototype = new Resolvable();

Mission.create = function(_id, context) {
  var mission = Resolvable.create(_id, 'Mission', context);
  if (!mission) { return mission; }
  if (typeof(mission.end) == 'function') {
    delete mission.end;
  } else if (mission.end) {
    mission.end = mission.parseConditions(mission.end, context);
  }
  if (mission.display) {
    var message = Message.send(mission.display, mission.context());
    // We save the rendered strings, since they probably contain context-sensitive data, but not the full Message object.
    mission.display.label = message.label;
    mission.display.image = message.image;
    mission.display.group = message.group;
    mission.display.text = message.text;
  }
  return mission;
};

Mission.prototype.getEnd = function() {
  if (this.end) {
    return this.end;
  } else if (typeof(this.base().end) == 'function') {
    return this.base().end.call(this, this.context());
  }
};

Mission.prototype.checkDay = function(done) {
  var conditions = this.getEnd() || {};
  var result = this.checkConditions(conditions);
  if (result) {
    this.setContext(result);
    delete g.missions[this._id];
    g.missionsDone[this._id] = true;
    var mission = this;
    this.getResults(function(results) {
      mission.applyResults(results, done);
    });
    return;
  } else if (conditions.max && conditions.max.day <= g.day) {
    delete g.missions[this._id];
  }
  if (this.display && conditions.max && conditions.max.day && conditions.max.day - 1 == g.day) {
    Message.send(this.display);
  }
  done();
};
