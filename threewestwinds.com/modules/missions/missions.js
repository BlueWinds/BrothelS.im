define(['./schema', './missionList', 'text!./list.html', 'content/strings', 'messages/messages', 'girls/girls', 'buildings/buildings'], function(Mission, missions, list_template, strings, Message) {

  $('head').append('<link type="text/css" rel="stylesheet" href="modules/missions/missions.css">');

  e.GameNew.push(function() {
    g.missions = g.missions || {};
    g.day = -1;
    for (var _id in missions) {
      var mission = missions[_id];
      if (mission.start && Mission.prototype.checkConditions.call(mission, mission.start)) {
        Mission.start(_id);
      }
    }
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
    for (var _id in missions) {
      if (g.missions[_id]) {
        continue;
      }
      var mission = missions[_id];
      if (mission.start && Mission.prototype.checkConditions.call(mission, mission.start)) {
        Mission.start(_id);
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
      var view = $(ejs.render(list_template, {
        g: g,
        missions: g.missions,
        Str: strings
      }));
      view.dialog({
        title: 'Missions',
        maxHeight: '100%',
        width: '45em'
      });
      view.closest('.ui-dialog').addClass('tab-dialog');
    });
  });
});