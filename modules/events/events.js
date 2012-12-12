define(['girls/schema', 'content/events/eventList.js', 'messages/messages'], function(Girl, events, Message) {

  e.GamePreDay.push(function() {
    $.each(events, function(_id, event) {
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
    var endDelta = this.startDelta();
    this.apply(event.results[i].delta || {});
    var context = {
      event: event,
      girl: this,
      time: time,
      action: action
    };
    function doMessage(image, text, delta) {
      var image = ejs.render(image, context);
      var message = new Message({
        type: ejs.render(event.label, context),
        text: ejs.render(text, context),
        delta: delta,
        image: image[0] == '/' ? image.substr(1) : context.girl.image(image),
        time: time
      }).save(context.girl.name);
    }
    var results = event.results[i];
    if (typeof(results.message) == 'object') {
      for (var j in results.message) {
        var d = results.message.length == j + 1 ? endDelta() : {};
        doMessage(results.image[j], results.message[j], d);
      }
    } else {
      doMessage(results.image, results.message, endDelta());
    }

    if (!event.disruptive || action.uninteruptable) {
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
      if (action.safety && event.dangerous) { likelyhood *= (1 - action.safety); }
      if (Math.random() < likelyhood) {
        return event;
      }
    }
  }

  function getEventsWithTags(time, tags) {
    var potentialEvents = {};
    $.each(events, function(_id, event) {
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
});