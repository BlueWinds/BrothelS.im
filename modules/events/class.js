"use strict";
function Event(obj) {
  Resolvable.call(this, obj);
}

Event.prototype = new Resolvable();

Event.prototype.getTags = Action.prototype.getTags;

Event.prototype.context = function getContext() {
  var context = Resolvable.prototype.context.call(this);
  context.action = this.action;
  return context;
};

Event.create = function createEvent(_id, context, actionTags) {
  var event = Resolvable.create(_id, 'Event', context);
  if (!event) { return event; }
  var chance = 0;
  actionTags = actionTags || context.action.getTags(context);
  var eventTags = event.getTags(context);
  for (var tag in eventTags) {
    if (actionTags[tag]) {
      chance += eventTags[tag] * actionTags[tag];
    }
  }
  var rand = Math.random();
  if (rand > chance) {
    return false;
  }
  event.action = context.action;
  return event;
};

Event.get = function getEvent(context) {
  var tags = context.action.getTags();
  if ($.isEmptyObject(tags)) { return; }
  var event;
  for (var _id in Events) {
    event = Event.create(_id, context, tags);
    if (event) { return event; }
  }
  var base = context.girl.base();
  if (!base.Events) { return; }
  for (_id in base.Events) {
    event = Event.create(_id, context);
    if (event) { return event; }
  }
};

(function () {
  var oldGetResults = Action.prototype.getResults;
  Action.prototype.getResults = function getResults(done, context) {
    context = context || this.context();
    var event = Event.get(context);
    if (event) {
      $.extend(context, event.context());
      event.getResults(function (results) {
        done(results, context);
      }, context);
    } else {
      oldGetResults.call(this, done, context);
    }
  };
})();
