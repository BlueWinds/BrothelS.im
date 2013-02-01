e.GameUpgrade03.push(function(game, next) {
  for (var name in g.buildings) {
    game.buildings[name]._class = 'Building';
    game.buildings[name].maxRooms = Buildings[name].maxRooms;
  }
  next();
});
e.GameUpgrade04.push(function(game, next) {
  for (var name in game.buildings) {
    game.buildings[name].rooms.forEach(function(room) {
      room.type = room.type.charAt(0).toUpperCase() + room.type.slice(1);
    });
  }
  next();
});

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
  for (var name in Buildings) {
    if (!g.buildings[name]) {
      g.buildings[name] = Building.create(name);
    }
  }
  done();
});

e.GamePreDay.push(function(done) {
  g.buildings._filter('status', 'Owned').forEach(function(building) {
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
  g.buildings._filter('status', 'Owned').forEach(function(building) {
    building.turnDelta = building.turnDelta();
  });
  done();
});

e.GameRender.push(function(done) {
  var div = $(ejs.render($('#buildings_list_template').html(), {
    buildings: g.buildings._filter('status', 'Owned')
  }).trim()).appendTo('#content .second');
  $('.building', div).click(function() {
    var building = g.buildings[$(this).attr('name')];

    function render() {
      var context = {
        building: building
      };

      var view = $(ejs.render($('#buildings_view_template').html(), context).trim());
      $('#buy-room', view).click(function() {
        var room = $('#new-room', view).val();
        building.buyRoom(room);
        render();
      });
      building.rooms.forEach(function(room) {
        context.room = room;
        var div = $('<div>').addClass('room');
        var base = Rooms[room.type];
        div.append('<h6>').html(base.label);
        if (base.render) {
          div.append(base.render.call(room, building, render));
        } else {
          div.append(ejs.render(base.description, context));
        }
        div.change(function(event) {
          var target = $(event.target);
          room[target.attr('name')] = target.val();
        });
        $('#rooms', view).append(div);
      });
      var old_view = $('#building-view');
      old_view.remove();
      var opt = {
        title: building.name,
        width: '35em',
        beforeClose: g.render
      };
      if (old_view) { opt.show = false; }
      view.dialog(opt);
      $('select').blur();
    }

    render();
  });

  $('#buy-building').click(function() {
    var lst = $(ejs.render($('#buildings_manage_template').html(), {
      action: 'Buy',
      buildings: g.buildings._filter('status', 'For Sale')
    }).trim());
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
      buildings: g.buildings._filter('status', 'Owned'),
      action: 'Sell'
    }).trim());
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
})();

e.Autorender.push(function(element, done) {
  $('.clean', element).attr('title', Building.config.cleanDescription);
  $('.reputation', element).attr('title', Building.config.reputationDescription);
  $('.rooms', element).attr('title', Building.config.roomDescription);
  $('.bedroom', element).attr('title', Rooms.Bedroom.description);
  done();
});