(function() {
  var files = [
    'tentacleAttack'
  ];
  for (var i in files) {
    files[i] = 'content/events/' + files[i];
  }
  define(files, function() {
    var events = {};
    for (var i in arguments) {
      var event = arguments[i];
      if (!event[0]) {
        event = [event];
      }
      for (var j in event) {
        events[event[j]._id] = event[j];
      }
    }
    return events;
  });
})();