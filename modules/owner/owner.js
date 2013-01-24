e.GameUpgrade03.push(function(game, next) {
  delete g.ownerAction;
  next();
});

Game.prototype.ownerAction = function(time) {
  var action;
  g.girls._filter('status', 'Hired').forEach(function(girl) {
    if (girl.actions[time] && girl.actions[time].ownerParticipation) {
      action = girl.actions[time];
    }
  });
  return action;
};

(function() {

  var oldCheckDisabled = Action.prototype.checkDisabled;

  Action.prototype.checkDisabled = function() {
    var reason = oldCheckDisabled.call(this);
    if (reason || !this.ownerParticipation) { return reason; }
    var action = g.ownerAction(this.time);
    if (action && this.girl !== action.girl) {
      return 'You are already ' + action.label + 'ing with ' + action.girl + ' in the ' + action.time;
    }
  };
})();
