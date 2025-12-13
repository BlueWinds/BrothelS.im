"use strict";
var Events = {};

e.Ready.push(function eventsReady(done) {
  $.each(Events, (_id, event) => {
    event._id = _id;
  });
  $.each(Girls, (name, girl) => {
    if (!girl.Events) { return; }
    $.each(girl.Events, (_id, event) => {
      event._id = _id;
    });
  });
  done();
});

e.GameInit.push(function eventsGameInit(done) {
  // Add eventHistory to each girl to track the last time each event happened to her.
  $.each(g.girls, (name, girl) => {
    if (!girl.eventHistory) {
      girl.eventHistory = {};
    }
  });
  done();
});
