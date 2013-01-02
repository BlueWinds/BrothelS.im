var Missions = {};

e.Ready.push(function(done) {
  $.each(Missions, function(_id, mission) {
    mission._id = _id;
  });
  done();
});

e.GameNew.push(function(done) {
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
  done();
});

e.GameInit.push(function(done) {
  $.each(g.missions, function(_id, mission) {
    g.missions[_id] = new Mission(mission);
  });
  g.missionsDone = g.missionsDone || {};
  done();
});

e.GameNextDay.push(function(done) {
  $.each(g.missions, function(_id, mission) {
    mission.checkDay();
    // Send a reminder message the day before a mission ends
    if (mission.end.maxDay == g.day + 1 && mission.description && mission.image) {
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
  g.girls.Cfilter('status', 'Hired').forEach(function(girl) {
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
  done();
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
