define(['girls/schema', 'content/events/eventList.js', 'messages/messages'], function(Girl, events, Message) {

  Girl.eventFunctions = {};

  e.GamePreDay.push(function() {
    for (var _id in events) {
      var event = events[_id];
      if (!event.day || event.day != g.day) { continue; }
      var text = event.message;
      var image = event.image;
      if (event.chances) {
        var rand = Math.random();
        var i = 0;
        while (i < event.chances.length) {
          if (rand < event.chances[i]) { break; }
          rand -= event.chances[i];
          i++;
        }
        text = text[i];
        image = image[i];
      }
      text = typeof(text) == 'object' ? Math.choice(text) : text;
      var message = new Message({
        type: event.label,
        text: text,
        image: image
      }).save('Events');
    }
  });

  var oldPotentialActions = Girl.prototype.potentialActions;
  Girl.prototype.potentialActions = function(time, ignoreMin) {
    var actions = oldPotentialActions.call(this, time, ignoreMin);
    $.each(actions, function(_id, action) {
      if (action.tags && action.tags.tentacles && !game.tentacles) {
        delete actions[_id];
        return;
      }
    });
    return actions;
  };

  var oldDoAction = Girl.prototype.doAction;
  Girl.prototype.doAction = function(time, action) {
    var event = getEvent(time, action);
    if (!event) {
      oldDoAction.call(this, time, action);
      return;
    }
    if (event.extraData) {
      if (event.func) {
        event.func.call(this, event.extraData, time);
      } else {
        Girl.eventFunctions[event._id].call(this, event.extraData, time);
      }
    } else {
      var endDelta = this.startDelta();
      var delta = event.delta;
      var text = event.message;
      var image = event.image;
      if (event.chances) {
        var rand = Math.random();
        var i = 0;
        while (i < event.chances.length) {
          if (rand < event.chances[i]) { break; }
          rand -= event.chances[i];
          i++;
        }
        delta = delta[i];
        text = text[i];
        image = image[i];
      }
      this.apply(delta || {});
      text = typeof(text) == 'object' ? Math.choice(text) : text;
      var context = {
        event: event,
        girl: this,
        time: time,
        action: action
      };
      var message = new Message({
        type: ejs.render(event.label, context),
        text: ejs.render(text, context),
        delta: endDelta(),
        image: this.image(image),
        time: time
      }).save(this.name);
    }
    if (!event.disruptive || action.tags && action.tags.uninteruptable) {
      oldDoAction.call(this, time, action);
    }
  };

  function getEvent(time, action) {
    if (!action.tags) { return; }
    var potentialEvents = getEventsWithTags(time, action.tags);
    for (var _id in potentialEvents) {
      var event = potentialEvents[_id];
      if (event.minDay && g.day < event.minDay) { continue; }
      var likelyhood = event.likelyhood;
      if (action.safety && event.tags.dangerous) { likelyhood *= (1 - action.safety); }
      if (Math.random() < likelyhood) {
        return event;
      }
    }
  }

  function getEventsWithTags(time, tags) {
    var potentialEvents = {};
    for (var _id in events) {
      var event = events[_id];
      if (event.day) { continue; }
      if (event.tags.tentacles && !g.tentacles) { continue; }
      if (event.time && event.time != time) { continue; }
      for (var tag in tags) {
        if (event.tags[tag]) { potentialEvents[_id] = event; }
      }
    }
    return potentialEvents;
  }
});