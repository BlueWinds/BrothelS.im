define([
  'Kirino',
  'Sakuya',
  'Sophitia',
  'Dark Magician Girl'
].prefix('./').combineWith('/base'), function() {
  var args = Array.prototype.slice.call(arguments, 0);
  return args.toObject('name');
});