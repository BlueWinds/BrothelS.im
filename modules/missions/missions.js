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
    if (mission.start && Mission.prototype.checkConditions.call(mission, mission.start)) {
      Mission.start(mission);
    }
  });
  g.day = 0;
});

e.GameInit.push(function() {
  $.each(g.missions, function(_id, mission) {
    g.missions[_id] = new Mission(mission);
  });
});

e.GameNextDay.push(function() {
  $.each(g.missions, function(_id, mission) {
    mission.checkDay();
    // Send a reminder message the day before a mission ends
    if (mission.end.day == g.day + 1) {
      new Message({
        type: 'Last Day - ' + mission.name,
        text: mission.description,
        image: mission.image
      }).save('Missions');
    }
  });
  for (var _id in Missions) {
    if (g.missions[_id]) {
      continue;
    }
    var mission = Missions[_id];
    if (mission.start && Mission.prototype.checkConditions.call(mission, mission.start)) {
      Mission.start(mission);
    }
  }
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
