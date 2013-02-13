/*global console */
"use strict";

var Schemas = {};

e.Ready.push(function(done) {
  var classes = ['Girl', 'Room', 'Building', 'Mission', 'Action', 'Event'];
  for (var schema in Schemas) {
    tv4.addSchema(schema, Schemas[schema]);
  }
  classes.forEach(function(type) {
    $.each(window[type + 's'], function(key, obj) {
      var success = tv4.validate(obj, type);
      if (!success) {
        if (tv4.error.subErrors) {
          tv4.error.subErrors.forEach(function(error) {
            var subError = $('<div>').appendTo('#error');
            $('<div>').html(type + ' - ' + (obj.name || obj._id)).appendTo(subError);
            $('<div>').html(error.message + ':').appendTo(subError);
            $('<div>').html((obj.name || obj._id) + error.dataPath).appendTo(subError);
          });
        }
        var error = $('<div>').appendTo('#error');
        $('<div>').html(type + ' - ' + (obj.name || obj._id)).appendTo(error);
        $('<div>').html(tv4.error.message + ':').appendTo(error);
        $('<div>').html((obj.name || obj._id) + tv4.error.dataPath).appendTo(error);
        console.log(tv4.error);
        console.log(obj);
      }
    });
  });
  done();
});

e.Autorender.push(function(element, done) {
  if (!tv4.validate(g, 'Game')) {
    if (tv4.error.subErrors) {
      tv4.error.subErrors.forEach(function(error) {
        var subError = $('<div>').appendTo('#error');
        $('<div>').html(error.message + ':').appendTo(subError);
        $('<div>').html(error.dataPath).appendTo(subError);
        $('<div>').html(error.schemaPath).appendTo(error);
      });
    }
    var error = $('<div>').appendTo('#error');
    $('<div>').html('Live Game');
    $('<div>').html(tv4.error.message).appendTo(error);
    $('<div>').html('g' + tv4.error.dataPath).appendTo(error);
    $('<div>').html(tv4.error.schemaPath).appendTo(error);
    console.log(tv4.error);
    console.log(g);
  }
  done();
});

(function() {
  var oldApply = Resolvable.prototype.applyResults;
  Resolvable.prototype.applyResults = function(results, done, context) {
    if (!tv4.validate(results, 'Result')) {
      console.log(tv4.error);
      console.log(this);
      console.log(results);
    }
    if (context) {
      if (!tv4.validate(context, 'Context')) {
        console.log(tv4.error);
        console.log(this);
        console.log(context);
      }
    }
    return oldApply.call(this, results, done, context);
  };
})();
