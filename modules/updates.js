"use strict";
e.GameInit.unshift(function updatesGameInit(done) {
  if (!g.version) {
    $('#load-game-form').dialog('close');
    throw new TypeError("Saves from versions below 0.5 are no longer supported.");
  }
  if (g.version < 0.51 && g.missions.avengeGuardRape) {
    var str = g.missions.avengeGuardRape.display.text.replace('Investigating the Guards', 'Exploring the Garrison');
    g.missions.avengeGuardRape.display.text = str;
  }
  if (g.version < 0.511) {
    g.girls._filter('status', 'Hired').forEach(function fixTentacleAbduction(girl) {
      if (girl.actions.morning._id == 'tenacleManAbduction') {
        girl.actions.morning._id = 'tentacleManAbduction';
        girl.actions.evening._id = 'tentacleManAbduction';
        if (!girl.specialRules.tentacleManProgress) {
          delete girl.actions.morning.locked;
          delete girl.actions.evening.locked;
        }
      }
    });
  }
  if (g.version < 0.512 && g.missionsDone.buyRooms) {
    g.missionsDone.exploreCity = true;
  }
  if (g.version < 0.52) {
    var girl = g.girls['Dark Magician Girl'];
    delete g.girls['Dark Magician Girl'];
    girl.name = 'Mana';
    g.girls.Mana = girl;
    if (girl.actions.morning) {
      girl.actions.morning.girl = 'Mana';
      girl.actions.evening.girl = 'Mana';
    }
    g.missions._filter('girl', 'Dark Magician Girl').forEach(function fixManaName(mission) {
      mission.girl = 'Mana';
      if (mission.display) {
        mission.display.image = mission.display.image.replace('DarkMagicianGirl', 'Mana');
        mission.display.group = mission.display.group.replace('Dark Magician Girl', 'Mana');
        mission.display.text = mission.display.text.replace(/Dark Magician Girl/g, 'Mana');
      }
    });
    g.messages._filter('group', 'Dark Magician Girl').forEach(function fixManaMessages(message) {
      message.group = 'Mana';
      message.image = message.image.replace('DarkMagicianGirl', 'Mana');
      message.text = message.text.replace(/Dark Magician Girl/g, 'Mana');
    });
    var room = Building.roomsByType('Bedroom', 'Owned')._filter('girl', 'Dark Magician Girl');
    if (room.length) {
      room[0].girl = 'Mana';
    }
  }
  if (g.version < 0.521) {
    $.each(g.girls, function (name, girl) {
      delete girl.reputation;
    });
  }
  g.version = Game.config.version;
  done();
});
