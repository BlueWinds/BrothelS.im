define([
  'Kirino',
  'Sakuya',
  'Sophitia',
  'Dark Magician Girl'
].Cprefix('./').Cadd('/base'), function() {
  var args = Array.prototype.slice.call(arguments, 0);
  return args.CtoObject('name');
});