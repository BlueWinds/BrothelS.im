var Events = {};

e.Ready.push(function() {
  $.each(Events, function(_id, event) {
    event._id = _id;
  });
});

e.GamePreDay.push(function() {
  $.each(Events, function(_id, event) {
    if (!event.oneTime) { return; }

    if (event.day != g.day) { return; }
    var i;
    if (typeof(event.variants) == 'function') {
      i = event.variants.call(event, this);
    } else {
      i = Math.weightedRandom(event.variants || [1]);
    }
    function doMessage(image, text) {
      var message = new Message({
        type: event.label,
        text: text,
        image: image.substr(1)
      }).save('Events');
    }
    var results = event.results[i];
    if (typeof(results.message) == 'object') {
      for (var j in results.message) {
        doMessage(results.image[j], results.message[j]);
      }
    } else {
      doMessage(results.image, results.message);
    }
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
    var i;
    if (typeof(event.variants) == 'function') {
      i = event.variants.call(event, this);
    } else {
      i = Math.weightedRandom(event.variants || [1]);
    }
    var results = event.results[i];
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
      if (action.uninteruptable && event.disruptive) { continue; }
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
        if (event.fetishes[fet] && !g[fet]) { return; }
      }
      if (event.time && event.time != time) { return; }
      for (var tag in tags) {
        if (event.tags[tag]) { potentialEvents[_id] = event; break; }
      }
    });
    return potentialEvents;
  }
})();