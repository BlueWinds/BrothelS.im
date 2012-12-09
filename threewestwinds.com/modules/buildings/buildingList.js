(function() {
  var files = [
    'Onsen'
  ];
  for (var i in files) {
    files[i] = 'content/buildings/' + files[i] + '/base';
  }
  define(files, function() {
    var buildings = {};
    for (var i in arguments) {
      var building = arguments[i];
      buildings[building.name] = building;
    }
    return buildings;
  });
})();