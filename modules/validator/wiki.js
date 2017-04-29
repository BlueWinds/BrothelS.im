/*global Schema */
/* Any JavaScript here will be loaded for all users on every page load. */
var gameSchemas;
var Schemas = window.Schemas || {};
window.initSchema = function initSchema(loadPath) {
  "use strict";
  loadPath = loadPath || '';
  var scripts = ["game.js", "girls.js", "messages.js", "buildings.js", "resolvable.js", "missions.js", "actions.js", "events.js"];
  var series = [];
  series.push(next => {
    $('head').append('<link href="' + loadPath + 'libraries/ui-darkness.css" type="text/css" rel="stylesheet">');
    $.getScript(loadPath + 'libraries/jquery-ui-1.10.js', next);
  });
  series.push(next => {
    $('head').append('<link href="' + loadPath + 'libraries/jSchemaView/jSchemaView.css" type="text/css" rel="stylesheet">');
    $.getScript(loadPath + 'libraries/jSchemaView/jSchemaView.js', next);
  });
  scripts.forEach(script => {
    series.push(next => {
      $.getScript(loadPath + 'modules/validator/' + script, next);
    });
  });
  $.getScript(loadPath + 'modules/core.js', () => {
    e.runSeries(series, () => {
      gameSchemas = new Schema(Schemas.Game);
      $.each(Schemas, (type, schema) => {
        gameSchemas.addSchema(schema);
      });
    });
  });

  $('a').click(function () {
    var schema = $(this).attr('href').substr(1);
    loadSchema(schema);
  });
  $('span.mw-headline').click(function () {
    var schema = $(this).attr('id');
    loadSchema(schema);
  });

  function loadSchema(schema) {
    if (schema && gameSchemas.getId(schema)) {
      gameSchemas.getId(schema).render();
    }
  }
};
