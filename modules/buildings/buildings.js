var Buildings = {};

e.Ready.push(function(done) {
  $.each(Buildings, function(name, building) {
    building.name = name;
  });
  done();
});

e.GameNew.push(function(done) {
  g.maxBuildings = Building.config.startMaxBuildings;
  g.buildings = g.buildings || {};
  done();
});

e.GameInit.push(function(done) {
  $.each(g.buildings, function(name, obj) {
    g.buildings[name] = new Building(obj);
  });
  for (var name in Buildings) {
    if (!g.buildings[name]) {
      g.buildings[name] = Building.create(Buildings[name]);
    }
  }
  done();
});

e.GamePreDay.push(function(done) {
  $.each(g.buildings, function(name, building) {
    building.turnDelta = building.startDelta();
  });
  done();
});

e.GameNextDay.push(function(done) {
  $.each(g.buildings, function(name, building) {
    building.runDay();
  });
  done();
});

e.GamePostDay.push(function(done) {
  $.each(g.buildings, function(name, building) {
    building.turnDelta = building.turnDelta();
  });
  done();
});

e.GameRender.push(function(done) {
  var div = $(ejs.render($('#buildings_list_template').html(), {
    g: g,
    buildings: g.buildings.Cfilter('status', 'Owned')
  })).appendTo('#content .second');
  $('.building', div).click(function() {
    var building = g.buildings[$(this).attr('name')];

    function render() {
      var context = {
        building: building,
        availableRooms: {}
      };
      $.each(Building.config.rooms, function(name, room) {
        if (room.maxPerBuilding && room.maxPerBuilding <= building.rooms.Cfilter('type', name).length) {
          return;
        }
        context.availableRooms[name] = room;
      });
      var view = $(ejs.render($('#buildings_view_template').html(), context));
      $('#buy-room', view).click(function() {
        var room = $('#new-room', view).val();
        building.buyRoom(room);
        render();
      });
      building.rooms.forEach(function(room) {
        var div = Building.rooms[room.type].render.call(building, room, render);
        div.addClass('room');
        $('#rooms', view).append(div);
      });
      var old_view = $('#building-view');
      old_view.remove();
      var opt = {
        title: building.name,
        width: '35em',
        beforeClose: function() {
          $.each(g.girls, function(name, girl) {
            girl.verifyActions();
          });
          g.render();
        }
      };
      if (old_view) { opt.show = false; }
      view.dialog(opt);
      $('select').blur();
    }

    render();
  });

  $('#buy-building').click(function() {
    var lst = $(ejs.render($('#buildings_manage_template').html(), {
      g: g,
      action: 'Buy',
      buildings: g.buildings.Cfilter('status', 'For Sale')
    }));
    $('button.manage', lst).each(function() {
      var building = g.buildings[$(this).attr('name')];
      if (building.price() > g.money) {
        $(this).attr('disabled', true);
      } else {
        $(this).click(function() {
          building.buy();
          g.render();
          $('#manage-buildings').dialog('close');
        });
      }
    });
    lst.dialog({
      title: 'Buy Building',
      width: '30em'
    });
  });
  $('#sell-building').click(function() {
    var lst = $(ejs.render($('#buildings_manage_template').html(), {
      g: g,
      buildings: g.buildings.Cfilter('status', 'Owned'),
      action: 'Sell'
    }));
    $('button.manage', lst).each(function() {
      var building = g.buildings[$(this).attr('name')];
        $(this).click(function() {
          building.sell();
          g.render();
          $('#manage-buildings').dialog('close');
        });
    });
    lst.dialog({
      title: 'Sell Building',
      width: '30em'
    });
  });
  done();
});

(function() {
  var originalPay = Girl.prototype.desiredPay;
  Girl.prototype.desiredPay = function() {
    if (!g.missionsDone || !g.missionsDone.firstMoney) { return 0; }
    var pay = originalPay.call(this);
    return this.building() ? pay : pay + Building.config.noRoomDailyCost;
  };

  var oldGirlActions = Girl.prototype.potentialActions;
  Girl.prototype.potentialActions = function(time) {
    var actions = oldGirlActions.call(this, time);
    var girl = this;
    $.each(actions, function(_id, action) {
      if (!action.requiresRoom) {
        return;
      }
      var max = Building.roomKeySum(action.requiresRoom.type, action.requiresRoom.key);
      if (!max) {
        if (g.buildings.Cfilter('status', 'Owned').length) {
          action.disabled = 'You must have a ' + action.requiresRoom.type + ' to ' + action.label + ' girls. Add one to your building.';
          action.description = action.disabled;
        } else {
          delete actions[_id];
        }
        return;
      }
      var already = g.girls.Cfilter('actions', time, _id).length;
      if (already < max) {
        return;
      }
      if (already == max && girl.actions[time] == _id) {
        return;
      }
      action.disabled = 'You only have enough ' + action.requiresRoom.type + 's to ' + action.label + ' ' + max + ' girls at a time.';
      action.description = action.disabled;
    });
    return actions;
  };
})();

e.Autorender.push(function(element, done) {
  $('.clean', element).attr('title', Building.config.cleanDescription);
  $('.reputation', element).attr('title', Building.config.reputationDescription);
  $('.rooms', element).attr('title', Building.config.roomDescription);
  $('.bedroom', element).attr('title', Building.config.rooms.bedroom.description);
  done();
});