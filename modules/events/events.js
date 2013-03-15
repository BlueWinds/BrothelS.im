"use strict";
var Events = {};

e.Ready.push(function(done) {
  $.each(Events, function(_id, event) {
    event._id = _id;
  });
  $.each(Girls, function(name, girl) {
    if (!girl.Events) { return; }
    $.each(girl.Events, function(_id, event) {
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
