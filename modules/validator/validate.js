JSV.masterEnv = JSV.createEnvironment();

e.Ready.push(function(done) {
  var classes = ['Girl', 'Room', 'Building', 'Mission', 'Action', 'Event'];
  for (var schema in Schemas) {
    JSV.masterEnv.createSchema(Schemas[schema], undefined, schema);
  }
  classes.forEach(function(type) {
    for (var item in window[type + 's']) {
      report = JSV.masterEnv.validate(window[type + 's'][item], JSV.masterEnv.findSchema(type));
      if (report.errors.length) {
        console.log(report.errors);
        console.log(window[type + 's'][item]);
        return;
      }
    }
  });
  done();
});
