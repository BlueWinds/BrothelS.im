function Mission(obj) {
  Resolvable.call(this, obj);
}

Mission.prototype = new Resolvable();

Mission.create = function(_id, context) {
  var mission = Resolvable.create(_id, 'Mission', context);
  if (!mission) { return mission; }
  var base = mission.base();
  if (typeof(mission.end) == 'function') {
    delete mission.end;
  } else if (mission.end) {
    mission.end = mission.parseConditions(mission.end, context);
  }
  if (mission.display) {
    message = new Message(mission.display, mission.context());
    // We save the rendered strings, since they probably contain context-sensitive data, but not the full Message object.
    mission.display.label = message.label;
    mission.display.image = message.image;
    mission.display.group = message.group;
    mission.display.text = message.text;
    delete mission.display._class;
    g.messages.push(message);
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
  var mission = this;
  var conditions = this.getEnd() || {};
  var result = this.checkConditions(conditions);
  if (result) {
    mission.setContext(result);
    delete g.missions[mission._id];
    g.missionsDone[mission._id] = true;
    mission.getResults(function(results) {
      mission.applyResults(results, done);
    });
    return;
  }
  if (mission.display && conditions.max && conditions.max.day && conditions.max.day - 1 == g.day) {
    g.messages.push(new Message(mission.display));
  }
  done();
};
