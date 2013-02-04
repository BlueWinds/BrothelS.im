e.Ready.push(function(done) {
  var classes = ['Girl', 'Room', 'Building', 'Mission', 'Action', 'Event'];
  for (var schema in Schemas) {
    tv4.addSchema(schema, Schemas[schema]);
  }
  classes.forEach(function(type) {
    for (var item in window[type + 's']) {
      var obj = window[type + 's'][item];
      var success = tv4.validate(obj, type);
      if (!success) {
        var error = $('<div>');
        $('<div>').html(type + ' - ' + (obj.name || obj._id)).appendTo(error);
        $('<div>').html(tv4.error.message + ':').appendTo(error);
        $('<div>').html((obj.name || obj._id) + tv4.error.dataPath).appendTo(error);
        $('#error').append(error);
        console.log(tv4.error);
        console.log(obj);
        return;
      }
    }
  });
  done();
});

e.Autorender.push(function(element, done) {
  if (!tv4.validate(g, 'Game')) {
    var error = $('<div>');
    $('<div>').html('Live Game');
    $('<div>').html(tv4.error.message).appendTo(error);
    $('<div>').html('g' + tv4.error.dataPath).appendTo(error);
    $('<div>').html(tv4.error.schemaPath).appendTo(error);
    $('#error').append(error);
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
