var Missions = {};

e.Ready.push(function(done) {
  $.each(Missions, function(_id, mission) {
    mission._id = _id;
  });
  $.each(Girls, function(name, girl) {
    if (!girl.missions) { return; }
    $.each(girl.missions, function(_id, mission) {
      mission._id = _id;
    });
  });
  done();
});

e.GameNew.push(function(done) {
  g.missions = g.missions || {};
  g.day = -1;
  var series = [];
  $.each(Missions, function(_id, mission) {
    if (mission.start) {
      var result = Mission.prototype.checkConditions.call(mission, mission.start);
      if (result) {
        series.push(function(next) {
          Mission.start(mission, result, next);
        });
      }
    }
  });
  $.each(Girls, function(name, girl) {
    if (!girl.missions) { return; }
    $.each(girl.missions, function(_id, mission) {
      if (Missions[_id] || !mission.start) { return; }
      var result = Mission.prototype.checkConditions.call(mission, mission.start, girl);
      if (result) {
        series.push(function(next) {
          Mission.start(mission, result, next);
        });
      }
    });
  });
  g.day = 0;
  e.runSeries(series, done);
});

e.GameInit.push(function(done) {
  $.each(g.missions, function(_id, mission) {
    base = Missions[_id];
    if (!base && mission.girl) {
      base = Girls[mission.girl].missions[_id];
    }
    g.missions[_id] = new Mission(mission, base);
  });
  g.missionsDone = g.missionsDone || {};
  // If firstBuilding && !introConstitution, then this was a pre-new-tutorial game, and we should add
  // the intro missions so that the actions they introduce aren't disabled.
  if (g.missionsDone.firstBuilding && !g.missionsDone.introConstitution) {
    $.extend(g.missionsDone, {
      introConstitution: true,
      obedienceAndModesty: true,
      enduranceAndHappiness: true,
      charismaAndIntelligence: true,
      libidoAndExperience: true,
      firstMoney: true,
      firstThousand: true,
      secondGirl: true,
      firstBuilding: true,
      cleanBuilding: true
    });
  }
  done();
});

e.GameNextDay.push(function(done) {
  var series = [];
  $.each(g.missions, function(_id, mission) {
    series.push(function(next) {
      // Send a reminder message the day before a mission ends
      if (mission.end.maxDay == g.day + 1 && mission.description && mission.image) {
        new Message({
          type: mission.label,
          text: mission.description,
          image: mission.image
        }).save(mission.group);
      }
      mission.checkDay(next);
    });
  });
  $.each(Missions, function(_id, mission) {
    if (g.missions[_id] || g.missionsDone[_id] || !mission.start) {
      return;
    }
    series.push(function(next) {
      var result = Mission.prototype.checkConditions.call(mission, mission.start);
      if (result) {
        Mission.start(mission, result, next);
      } else {
        next();
      }
    });
  });
  $.each(g.girls, function(name, girl) {
    if (!girl._.missions) { return; }
    $.each(girl._.missions, function(_id, mission) {
      if (g.missions[_id] || g.missionsDone[_id] || !mission.start) {
        return;
      }
      series.push(function(next) {
        var result = Mission.prototype.checkConditions.call(mission, mission.start, girl);
        if (result) {
          Mission.start(mission, result, next);
        } else {
          next();
        }
      });
    });
  });
  e.runSeries(series, done);
});

e.GameRender.push(function(done) {
  var count = Object.keys(g.missions).length;
  if (!count) {
    done();
    return;
  }
  var button = $('<button>').html('Missions').button();
  if ($.isEmptyObject(g.missions)) {
    button.button('disabled', true);
  }
  $('#top-right').prepend(button);
  button.click(function() {
    var view = $(ejs.render($('#missions_list_template').html(), {
      missions: g.missions
    }));
    view.dialog({
      title: 'Missions',
      maxHeight: '100%'
    });
    view.closest('.ui-dialog').addClass('tab-dialog');
  });
  done();
});
