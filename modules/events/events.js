var Events = {};

e.Ready.push(function(done) {
  $.each(Events, function(_id, event) {
    event._id = _id;
  });
  done();
});

(function() {
  var oldDoAction = Girl.prototype.doAction;
  Girl.prototype.doAction = function(time, action) {
    var event = getEvent(time, action, this);
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

  function getEvent(time, action, girl) {
    if (!action.tags) { return; }
    var potentialEvents = getEventsWithTags(time, action.tags, girl);
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

  function getEventsWithTags(time, tags, girl) {
    var potentialEvents = {};
    $.each(Events, function(_id, event) {
      for (var fet in event.fetishes) {
        if (event.fetishes[fet] && !g.fetishes[fet]) { return; }
      }
      if (event.time && event.time != time) { return; }
      for (var tag in tags) {
        if (event.tags[tag]) { potentialEvents[_id] = event; break; }
      }
    });
    if (girl._.events) {
      $.each(girl._.events, function(_id, event) {
        var new_event;
        if (Events[_id]) {
          new_event = $.extend(true, {}, Events[_id], event);
          delete potentialEvents[_id];
        } else {
          new_event = $.extend(true, {}, event);
        }
        for (var fet in new_event.fetishes) {
          if (new_event.fetishes[fet] && !g.fetishes[fet]) { return; }
        }
        if (new_event.time && new_event.time != time) { return; }
        for (var tag in tags) {
          if (new_event.tags[tag]) { potentialEvents[_id] = new_event; break; }
        }
      });
    }
    return potentialEvents;
  }
})();