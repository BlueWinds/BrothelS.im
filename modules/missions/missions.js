var Missions = {};

e.Ready.push(function() {
  $.each(Missions, function(_id, mission) {
    mission._id = _id;
  });
});

e.GameNew.push(function() {
  g.missions = g.missions || {};
  g.day = -1;
  $.each(Missions, function(_id, mission) {
    if (mission.start) {
      var result = Mission.prototype.checkConditions.call(mission, mission.start);
      if (result) {
        Mission.start(mission, result);
      }
    }
  });
  $.each(Girls, function(name, girl) {
    if (!girl.missions) { return; }
    $.each(girl.missions, function(_id, mission) {
      if (Missions[_id] || !mission.start) { return; }
      var result = Mission.prototype.checkConditions.call(mission, mission.start, girl);
      if (result) {
        Mission.start(mission, result);
      }
    });
  });
  g.day = 0;
});

e.GameInit.push(function() {
  $.each(g.missions, function(_id, mission) {
    g.missions[_id] = new Mission(mission);
  });
  g.missionsDone = g.missionsDone || {};
});

e.GameNextDay.push(function() {
  $.each(g.missions, function(_id, mission) {
    mission.checkDay();
    // Send a reminder message the day before a mission ends
    if (mission.end.maxDay == g.day + 1) {
      new Message({
        type: 'Last Day - ' + mission.label,
        text: mission.description,
        image: mission.image
      }).save(mission.group);
    }
  });
  $.each(Missions, function(_id, mission) {
    if (g.missions[_id] || g.missionsDone[_id] || !mission.start) {
      return;
    }
    var result = Mission.prototype.checkConditions.call(mission, mission.start);
    if (result) {
      Mission.start(mission, result);
    }
  });
  g.girls.Cfilter('status', 'Hired').each(function(girl) {
    if (!girl._.missions) { return; }
    $.each(girl._.missions, function(_id, mission) {
      if (g.missions[_id] || g.missionsDone[_id] || !mission.start) {
        return;
      }
      var result = Mission.prototype.checkConditions.call(mission, mission.start, girl);
      if (result) {
        Mission.start(mission, result);
      }
    });
  });
});

e.GameRender.push(function() {
  var count = Object.keys(g.missions).length;
  if (!count) {
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
});
