(function() {
  var files = [
    'Kirino',
    'Sakuya',
    'Sophitia',
    'Dark Magician Girl'
  ];
  for (var i in files) {
    files[i] = 'content/girls/' + files[i] + '/base';
  }
  define(files, function() {
    var girls = {};
    for (var i in arguments) {
      var girl = arguments[i];
      girls[girl.name] = girl;
    }
    return girls;
  });
})();