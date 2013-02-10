/*global Schema */
/* Any JavaScript here will be loaded for all users on every page load. */
var gameSchemas;
var Schemas = window.Schemas || {};
$(function() {
  "use strict";
  var scripts = ["game.js", "girls.js", "messages.js", "buildings.js", "resolvable.js", "missions.js", "actions.js", "events.js"];
  var series = [];
  series.push(function(next) {
    $.getScript('../jSunny/jSunny.js', next);
  });
  scripts.forEach(function(script) {
    series.push(function(next) {
      $.getScript('http://brothels.im/modules/validator/' + script, next);
    });
  });
  $.getScript('http://brothels.im/modules/core.js', function() {
    e.runSeries(series, function() {
      gameSchemas = new Schema(Schemas.Game);
      $.each(Schemas, function(type, schema) {
        gameSchemas.addSchema(schema);
      });
    });
  });
});
