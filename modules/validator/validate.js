e.Ready.push(function(done) {
  var classes = ['Girl', 'Room', 'Building', 'Mission', 'Action', 'Event'];
  for (var schema in Schemas) {
    tv4.addSchema(schema, Schemas[schema]);
  }
  classes.forEach(function(type) {
    for (var item in window[type + 's']) {
      var success = tv4.validate(window[type + 's'][item], tv4.getSchema(type));
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
  var success = tv4.validate(g, tv4.getSchema('Game'));
  if (!success) {
    console.log(tv4.error);
    console.log(g);
  }
  done();
});

(function() {
  var oldApply = Resolvable.prototype.applyResults;
  Resolvable.prototype.applyResults = function(results, done) {
    if (done) {
      var success = tv4.validate(results, tv4.getSchema('Result'));
      if (!success) {
        console.log(tv4.error);
        console.log(result);
      }
    }
    return oldApply.call(this, results, done);
  };
})();
