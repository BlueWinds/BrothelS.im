e.GameInit.push(function(done) {
  g.ownerAction = g.ownerAction || {
    morning: '',
    evening: ''
  };
  done();
});

(function() {
  var oldGirlSetAction = Girl.prototype.setAction;
  Girl.prototype.setAction = function(action, time, option) {
    if (g.ownerAction[time] == this.actions[time + 'Label'] + ' with ' + this.name) {
      g.ownerAction[time] = '';
    }
    oldGirlSetAction.call(this, action, time, option);
    if (action.ownerParticipation) {
      g.ownerAction[time] = action.label + ' with ' + this.name;
    }
  };

  var oldGirlActions = Girl.prototype.potentialActions;
  Girl.prototype.potentialActions = function(time) {
    var actions = oldGirlActions.call(this, time);
    var girl = this;
    $.each(actions, function(_id, action) {
      if (!action.ownerParticipation || action.disabled) {
        return;
      }
      var action_id = action.label + ' with ' + girl.name;
      if (g.ownerAction[time] && g.ownerAction[time] != action_id) {
        action.disabled = action.label + ' requires your participation, and you are already doing ' + g.ownerAction[time] + ' in the ' + time + '.';
        action.description = action.disabled;
      }
    });
    return actions;
  };
})();
