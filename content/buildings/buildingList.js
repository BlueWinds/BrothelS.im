define([
  'Onsen',
  'Theater'
].Cprefix('./').Cadd('/base'), function() {
  var args = Array.prototype.slice.call(arguments, 0);
  var buildings = args.CtoObject('name');
  return buildings;
});