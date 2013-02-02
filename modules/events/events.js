var Events = {};
e.GameUpgrade04.push(function(game, next) {
  for (var name in game.girls) {
    delete game.girls[name].events;
  }
  next();
});

function Event(obj) {
  Resolvable.call(this, obj);
}

Event.prototype = new Resolvable();

Event.prototype.context = function() {
  var context = Resolvable.prototype.context.call(this);
  context.action = this.action;
  return context;
};

Event.create = function(_id, context) {
  var event = Resolvable.create(_id, 'Event', context);
  if (!event) { return event; }
  var chance = 0;
  for (var tag in event.tags) {
    if (context.action.tags[tag]) {
      chance += event.tags[tag] * context.action.tags[tag];
    }
  }
  if (Math.random() > chance) {
    return false;
  }
  event.action = context.action;
  return event;
};

e.Ready.push(function(done) {
  $.each(Events, function(_id, event) {
    event._id = _id;
  });
  $.each(Girls, function(name, girl) {
    if (!girl.events) { return; }
    $.each(girl.events, function(_id, event) {
      event._id = _id;
    });
  });
  done();
});

e.GameInit.push(function(done) {
  // Add eventHistory to each girl to track the last time each event happened to her.
  $.each(g.girls, function(name, girl) {
    if (!girl.eventHistory) {
      girl.eventHistory = {};
    }
  });
  done();
});

Event.get = function(context) {
  if (!context.action.tags) { return; }
  var event;
  for (var _id in Events) {
    event = Event.create(_id, context);
    if (event) { return event; }
  }
  var base = context.girl.base();
  if (!base.Events) { return; }
  for (_id in base.Events) {
    event = Event.create(_id, context);
    if (event) { return event; }
  }
};

(function() {
  var oldGetResults = Action.prototype.getResults;
  Action.prototype.getResults = function(done) {
    var context = this.context();
    var event = Event.get(context);
    if (event) {
      event.getResults(done);
    } else {
      oldGetResults.call(this, done);
    }
  };
})();