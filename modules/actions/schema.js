(function() {
  var oldCreate = Girl.create;
  Girl.create = function(base) {
    var girl = oldCreate(base);
    $.extend(girl.actions, {
      morning: 'Rest',
      evening: 'Rest',
      morningLabel: 'Rest',
      eveningLabel: 'Rest'
    });
    return girl;
  };
})();

Girl.prototype.otherActionsList = function(time) {
  var list = {};
  var primary = this;
  g.girls.Cfilter('status', 'Hired').forEach(function(girl) {
    if (girl === primary) { return; }
    list[girl.actions[time]] = list[girl.actions[time]] || [];
    list[girl.actions[time]].push(girl.name);
  });
  return list;
};

Girl.prototype.setAction = function(action, time, option) {
  if (action == 'Rest') {
    action = Actions.Rest;
  }
  this.actions[time] = action._id;
  this.actions[time + 'Label'] = action.label;
  if (option) {
    this.actions[time + 'Option'] = option;
  } else {
    delete this.actions[time + 'Option'];
  }
  var other_time = time == 'morning' ? 'evening' : 'morning';
  if (this.actions.allDay) {
    this.actions[other_time] = 'Rest';
    this.actions[other_time + 'Label'] = 'Rest';
    delete this.actions[other_time + 'Option'];
    delete this.actions.allDay;
  }
  if (action.allDay) {
    this.actions[other_time] = action._id;
    this.actions[other_time + 'Label'] = action.label;
    this.actions.allDay = true;
    if (option) {
      this.actions[other_time + 'Option'] = option;
    } else {
      delete this.actions[other_time + 'Option'];
    }
  }
};

Girl.prototype.verifyActions = function() {
  var morning = this.potentialActions('morning');
  var evening = this.potentialActions('evening');
  if (!morning[this.actions.morning] || morning[this.actions.morning].disabled) {
    this.setAction('Rest', 'morning');
  }
  if (!evening[this.actions.evening] || evening[this.actions.evening].disabled) {
    this.setAction('Rest', 'evening');
  }
};

(function() {
  Girl.prototype.potentialActions = function(time) {
    var potentialActions = {};
    var girl = this;
    $.each(Actions, function(_id, action) {
      var new_action = $.extend(true, {}, action);
      new_action = checkAction.call(girl, time, new_action);
      if (new_action) {
        potentialActions[_id] = new_action;
      }
    });
    if (this._.actions) {
      $.each(this._.actions, function(_id, action) {
        var new_action;
        if (Actions[_id]) {
          new_action = $.extend(true, {}, Actions[_id], action);
        } else {
          new_action = $.extend(true, {}, action);
        }
        new_action = checkAction.call(girl, time, new_action);
        if (new_action) {
          potentialActions[_id] = new_action;
        } else {
          delete potentialActions[_id];
        }
      });
    }
    return potentialActions;
  };

  function checkAction(time, action) {
    if (action.tags && action.tags.tentacles && !g.tentacles) { return; }
    if (typeof(action.disabled) == 'function') {
      var disabled = action.disabled.call(this, time);
      if (disabled === true) {
        return;
      } else if (disabled) {
        action.disabled = disabled;
      } else {
        delete action.disabled;
      }
    }
    var specialRule;
    if (!action.disabled && action.mins) {
      for (var stat in action.mins) {
        if (stat == 'money' && g.money < action.mins.money) {
          action.disabled = 'Not enough money';
          break;
        } else if (stat == 'specialRules') {
          for (specialRule in action.mins.specialRules) {
            if (this.specialRules[specialRule] < action.maxes.specialRules[specialRule]) {
              this.disabled = true;
              break;
            }
            if (this.disabled) { break; }
          }
        } else if (this[stat] < action.mins[stat]) {
          action.disabled = 'Not enough ' + T(stat);
          break;
        }
      }
      for (stat in action.maxes) {
        if (stat == 'money' && g.money > action.maxes.money) {
          action.disabled = 'Too much money';
          break;
        } else if (stat == 'specialRules') {
          for (specialRule in action.maxes.specialRules) {
            if (this.specialRules[specialRule] < action.maxes.specialRules[specialRule]) {
              this.disabled = true;
              break;
            }
            if (this.disabled) { break; }
          }
        } else if (this[stat] > action.maxes[stat]) {
          action.disabled = 'Too much ' + T(stat);
          break;
        }
      }
    }
    var context = {
      girl: this
    };
    action.label = ejs.render(action.label, context);
    if (action.disabled) {
      action.description = action.disabled;
    } else {
      action.description = ejs.render(action.description, context);
    }
    return action;
  }
})();

Girl.prototype.doAction = function(time, action, done) {
  if (time == 'morning' && action.allDay) { done(); return; }
  this.actions.history[action._id] = g.day;
  if (action.externalFunction) {
    action.externalFunction.call(this, time, action, done);
  }
  else {
    var endDelta = this.startDelta();
    var context = {
      girl: this,
      action: action,
      time: time
    };
    var doMessage = function(image, text, delta) {
      image = ejs.render(image, context);
      var message = new Message({
        type: action.label,
        text: ejs.render(text, context),
        delta: delta,
        image: image[0] == '/' ? image.substr(1) : context.girl.image(image),
        time: time
      }).save(context.girl.name);
    };
    var girl = this;
    Game.getResults(time, action, this, function(results) {
      if (typeof(results.delta) == 'function') {
        var delta = results.delta.call(girl, time, action);
        girl.apply(delta);
      } else {
        girl.apply(results.delta || {});
      }
      if (typeof(results.message) == 'object') {
        for (var j in results.message) {
          var d = results.message.length - 1 == j ? endDelta() : {};
          doMessage(results.image[j], results.message[j], d);
        }
      } else {
        doMessage(results.image, results.message, endDelta());
      }
      done();
    });
  }
};
