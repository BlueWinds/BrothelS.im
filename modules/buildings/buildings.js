define(['girls/schema', './schema', 'content/buildings', 'content/buildings/buildingList', 'text!./list.html', 'text!./buy.html', 'text!./view.html', './rooms'], function(Girl, Building, config, buildings, list_template, buy_template, view_template) {
  $('head').append('<link type="text/css" rel="stylesheet" href="modules/buildings/style.css">');

  e.GameNew.push(function() {
    g.maxBuildings = config.startMaxBuildings;
    g.buildings = g.buildings || {};
    for (var name in buildings) {
      g.buildings[name] = Building.create(name);
    }
  });

  e.GameInit.push(function() {
    $.each(g.buildings, function(name, obj) {
      g.buildings[name] = new Building(obj);
    });
    for (var name in buildings) {
      if (!g.buildings[name]) {
        g.buildings[name] = Building.create(name);
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
    var div = $(ejs.render(list_template, {
      g: g,
      buildings: g.buildings.flt('status', 'Owned')
    })).appendTo('#content .second');
    $('.building', div).click(function() {
      var building = g.buildings[$(this).attr('name')];

      function render() {
        var context = {
          building: building,
          availableRooms: {}
        };
        $.each(config.rooms, function(name, room) {
          if (room.price > g.money) { return; }
          if (room.max && room.max > building.rooms.flt('type', room.type).length) {
            return;
          }
          context.availableRooms[name] = room;
        });
        var view = $(ejs.render(view_template, context));
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
          beforeClose: function() { g.render(); }
        };
        if (old_view) { opt.show = false; }
        view.dialog(opt);
        $('select').blur();
      }

      render();
    });

    $('#buy-building').click(function() {
      var lst = $(ejs.render(buy_template, {
        g: g,
        buildings: g.buildings.flt('status', 'For Sale')
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

  var originalPay = Girl.prototype.desiredPay;
  Girl.prototype.desiredPay = function() {
    var pay = originalPay.call(this);
    return this.building() ? pay : pay + config.noRoomDailyCost;
  };

  e.Autorender.push(function(element) {
    $('.clean', element).attr('title', config.cleanDescription);
    $('.rooms', element).attr('title', config.roomDescription);
    $('.bedroom', element).attr('title', config.rooms.bedroom.description);
  });
});