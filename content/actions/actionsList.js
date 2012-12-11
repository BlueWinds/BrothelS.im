(function() {
  var files = [
    'Simple',
    'Prostitution',
    'specialParty',
    'Schools'
  ];
  for (var i in files) {
    files[i] = 'content/actions/' + files[i];
  }
  define(files, function() {
    var actions = {};
    for (var i in arguments) {
      var action = arguments[i];
      if (!action[0]) {
        action = [action];
      }
      for (var j in action) {
        actions[action[j]._id] = action[j];
      }
    }
    return actions;
  });
})();