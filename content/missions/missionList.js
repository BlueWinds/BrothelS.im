define([
  'intro',
  'specialParty'
].prefix('./'), function() {
  var args = Array.prototype.slice.call(arguments, 0);
  return args.flatten().toObject('_id');
});