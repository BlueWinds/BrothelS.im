e.Ready.push(function(done) {
  var classes = ['Girl', 'Room', 'Building', 'Mission', 'Action', 'Event'];
  for (var schema in Schemas) {
    tv4.addSchema(schema, Schemas[schema]);
  }
  classes.forEach(function(type) {
    for (var item in window[type + 's']) {
      var success = tv4.validate(window[type + 's'][item], type);
      if (!success) {
        console.log(tv4.error);
        console.log(window[type + 's'][item]);
        return;
      }
    }
  });
  done();
});

e.Autorender.push(function(element, done) {
  var success = tv4.validate(g, 'Game');
  if (!success) {
    console.log(tv4.error);
    console.log(g);
  }
  done();
});

(function() {
  var oldApply = Resolvable.prototype.applyResults;
  Resolvable.prototype.applyResults = function(results, done, context) {
    if (done) {
      var success = tv4.validate(results, 'Result');
      if (!success) {
        console.log(tv4.error);
        console.log(this);
        console.log(results);
      }
    }
    if (context) {
      var success = tv4.validate(context, 'Context');
      if (!success) {
        console.log(tv4.error);
        console.log(this);
        console.log(context);
      }
    }
    return oldApply.call(this, results, done, context);
  };
})();
