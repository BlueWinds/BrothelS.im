var Missions = {};

e.Ready.push(function(done) {
  $.each(Missions, function(_id, mission) {
    mission._id = _id;
  });
  $.each(Girls, function(name, girl) {
    if (!girl.Missions) { return; }
    $.each(girl.Missions, function(_id, mission) {
      mission._id = _id;
    });
  });
  done();
});

e.GameUpgrade03.push(function(game, done) {
  // If firstBuilding && !introConstitution, then this was a pre-new-tutorial game, and we should add
  // the intro missions so that the actions they introduce aren't disabled.
  game.missionsDone = game.missionsDone || {};
  $.extend(game.missionsDone, Mission.introMissions);
  for (var mission in Mission.introMissions) {
    delete game.missions[mission];
  }
  game.maxGirls = 5;
  game.maxBuildings = 1;
  delete game.missions.specialParty;
  var context = { day: Math.ceil((game.day - 10) / 30) * 30 - 15 };
  if (context.day > game.day - 5) {
    context.day += 30;
  }
  game.missions.specialPartyDelay = Mission.create('specialPartyDelay', context);
  for (mission in Girls.Sakuya.Missions) {
    if (game.missions[mission]) {
      g.girls.Sakuya = new Girl(g.girls.Sakuya);
      context = { girl: g.girls.Sakuya };
      game.missions[mission] = Mission.create(mission, context);
    }
  }
  done();
});

e.GameUpgrade04.push(function(game, next) {
  delete game.missions.setFirstAction;
  next();
});

Mission.checkStart = function(day, done) {
  var context = {
    day: day
  };
  var series = [];
  $.each(Missions, function(_id, mission) {
    if (!mission.conditions || g.missions[_id]) { return; }
    mission = Mission.create(_id, { day: day });
    if (mission) {
      g.missions[_id] = mission;
      if (!mission.getEnd()) {
        series.push(function(next) { mission.checkDay(next); });
      }
    }
  });
  $.each(Girls, function(name, girl) {
    if (!girl.Missions) { return; }
    $.each(girl.Missions, function(_id, mission) {
      context = { day: day, girl: g.girls[girl.name] };
      if (!mission.conditions || g.missions[_id]) { return; }
      mission = Mission.create(_id, context, true);
      if (mission) {
        g.missions[_id] = mission;
        if (!mission.getEnd()) {
          series.push(function(next) { mission.checkDay(next); });
        }
      }
    });
  });
  e.runSeries(series, done);
};

e.GameNew.push(function(done) {
  g.missions = {};
  g.missionsDone = {};
  if (g.skipIntro) {
    $.extend(g.missionsDone, Mission.introMissions);
    g.money = 1000;
    g.maxGirls = 5;
    g.maxBuildings = 1;
  }
  delete g.skipIntro;
  Mission.checkStart(-1, done);
});

e.GameNextDay.push(function(done) {
  var series = [];
  $.each(g.missions, function(_id, mission) {
    series.push(function(next) {
      mission.checkDay(next);
    });
  });
  e.runSeries(series, function() {
    Mission.checkStart(g.day, done);
  });
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
    }).trim());
    view.dialog({
      title: 'Missions',
      maxHeight: '100%'
    });
    view.closest('.ui-dialog').addClass('tab-dialog');
  });
  done();
});
