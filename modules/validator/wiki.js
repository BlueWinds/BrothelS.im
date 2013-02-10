/* Any JavaScript here will be loaded for all users on every page load. */
var gameSchemas;
var Schemas = {};
$(function() {
  var loaded = 0;
  var scripts = ["game.js", "girls.js", "messages.js", "buildings.js", "resolvable.js", "missions.js", "actions.js", "events.js"];
  $.getScript('http://brothels.im/modules/core.js', function() {
    scripts.forEach(function(script) {
      $.getScript('http://brothels.im/modules/validator/' + script, function() {
        loaded++;
        console.log(loaded);
        if (loaded == scripts.length) { scriptsLoaded(); }
      }
    });
  });
  function scriptsLoaded() {
    gameSchemas = new Schema(Schemas.g);
    $.each(Schemas, function(type, schema) {
      gameSchemas.addSchema(schema);
    });
  };
});
