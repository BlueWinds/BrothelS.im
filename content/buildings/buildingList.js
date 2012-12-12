define([
  'Onsen',
  'Theater'
].prefix('./').combineWith('/base'), function() {
  var args = Array.prototype.slice.call(arguments, 0);
  var buildings = args.toObject('name');
  return buildings;
});