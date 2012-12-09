(function() {
  var files = [
    'intro',
    'specialParty'
  ];
  for (var i in files) {
    files[i] = 'content/missions/' + files[i];
  }
  define(files, function() {
    var missions = {};
    for (var j in arguments) {
      var mission = arguments[j];
      if (!mission[0]) {
        mission = [mission];
      }
      for (var i in mission) {
        missions[mission[i]._id] = mission[i];
      }
    }
    return missions;
  });
})();