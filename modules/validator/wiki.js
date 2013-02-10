/*global Schema */
/* Any JavaScript here will be loaded for all users on every page load. */
var gameSchemas;
var Schemas = window.Schemas || {};
initSchema = function(loadPath) {
  "use strict";
  loadPath = loadPath || '';
  var scripts = ["game.js", "girls.js", "messages.js", "buildings.js", "resolvable.js", "missions.js", "actions.js", "events.js"];
  var series = [];
  series.push(function(next) {
    $('head').append('<link href="' + loadPath + 'libraries/jSunny/jSunny.css" type="text/css" rel="stylesheet">');
    $.getScript(loadPath + 'libraries/jSunny/jSunny.js', next);
  });
  scripts.forEach(function(script) {
    series.push(function(next) {
      $.getScript(loadPath + 'modules/validator/' + script, next);
    });
  });
  $.getScript(loadPath + 'modules/core.js', function() {
    e.runSeries(series, function() {
      gameSchemas = new Schema(Schemas.Game);
      $.each(Schemas, function(type, schema) {
        gameSchemas.addSchema(schema);
      });
    });
  });
};
