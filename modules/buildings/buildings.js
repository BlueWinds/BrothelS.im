var Buildings = {};

e.Ready.push(function() {
  $.each(Buildings, function(name, building) {
    building.name = name;
  });
});

e.GameNew.push(function() {
  g.maxBuildings = Building.config.startMaxBuildings;
  g.buildings = g.buildings || {};
});

e.GameInit.push(function() {
  $.each(g.buildings, function(name, obj) {
    g.buildings[name] = new Building(obj);
  });
  for (var name in Buildings) {
    if (!g.buildings[name]) {
      g.buildings[name] = Building.create(Buildings[name]);
    }
  }
});

e.GamePreDay.push(function() {
  $.each(g.buildings, function(name, building) {
    building.turnDelta = building.startDelta();
    building.runDay();
  });
});

e.GamePostDay.push(function() {
  $.each(g.buildings, function(name, building) {
    building.turnDelta = building.turnDelta();
  });
});

e.GameRender.push(function() {
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
        if (room.price > g.money) { return; }
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
    var lst = $(ejs.render($('#buildings_buy_template').html(), {
      g: g,
      buildings: g.buildings.Cfilter('status', 'For Sale')
    }));
    $('button.buy', lst).each(function() {
      var building = g.buildings[$(this).attr('name')];
      if (building.price() > g.money) {
        $(this).attr('disabled', true);
      } else {
        $(this).click(function() {
          building.buy();
          g.render();
          $('#buy-buildings').dialog('close');
        });
      }
    });
    lst.dialog({
      title: 'Buy Building',
      width: '30em'
    });
  });
});

(function() {
  var originalPay = Girl.prototype.desiredPay;
  Girl.prototype.desiredPay = function() {
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
        delete actions[_id];
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

e.Autorender.push(function(element) {
  $('.clean', element).attr('title', Building.config.cleanDescription);
  $('.reputation', element).attr('title', Building.config.reputationDescription);
  $('.rooms', element).attr('title', Building.config.roomDescription);
  $('.bedroom', element).attr('title', Building.config.rooms.bedroom.description);
});