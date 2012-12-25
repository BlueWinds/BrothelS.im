var Events = {};

e.Ready.push(function() {
  $.each(Events, function(_id, event) {
    event._id = _id;
  });
});

(function() {
  var oldDoAction = Girl.prototype.doAction;
  Girl.prototype.doAction = function(time, action) {
    var event = getEvent(time, action);
    if (!event) {
      oldDoAction.call(this, time, action);
      return;
    }
    var results = Game.getResults(time, event, this);
    var endDelta = this.startDelta();
    var context = {
      event: event,
      action: action,
      time: time
    };
    event.group = this.name;
    Mission.prototype.applyResults.call(event, results, this, context);

    if (!event.disruptive) {
      oldDoAction.call(this, time, action);
    }
  };

  function getEvent(time, action) {
    if (!action.tags) { return; }
    var potentialEvents = getEventsWithTags(time, action.tags);
    for (var _id in potentialEvents) {
      var event = potentialEvents[_id];
      if (event.minDay && g.day < event.minDay) { continue; }
      if (action.uninterupretable && event.disruptive) { continue; }
      var likelyhood = event.likelyhood;
      if (action.safety && event.dangerous) { likelyhood *= (1 - action.safety); }
      if (Math.random() < likelyhood) {
        return event;
      }
    }
  }

  function getEventsWithTags(time, tags) {
    var potentialEvents = {};
    $.each(Events, function(_id, event) {
      if (event.oneTime) { return true; }
      for (var fet in event.fetishes) {
        if (event.fetishes[fet] && !g.fetishes[fet]) { return; }
      }
      if (event.time && event.time != time) { return; }
      for (var tag in tags) {
        if (event.tags[tag]) { potentialEvents[_id] = event; break; }
      }
    });
    return potentialEvents;
  }
})();