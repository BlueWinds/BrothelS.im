define(['girls/schema', './schema', 'content/buildings', './buildingList', 'text!./list.html', 'text!./buy.html', 'text!./view.html'], function(Girl, Building, config, buildings, list_template, buy_template, view_template) {
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
  });
  e.GamePreDay.push(function() {
    $.each(g.buildings, function(name, building) {
      building.turnDelta = building.startDelta();
    });
  });
  e.GameNextDay.push(function() {
    $.each(g.buildings, function(name, building) {
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
      buildings: Building.buildings('Owned')
    })).appendTo('#content .second');
    $('.building', div).click(function() {
      var building = g.buildings[$(this).attr('name')];

      function render() {
        var context = {
          building: building,
          availableRooms: {}
        };
        for (var name in config.rooms) {
          var room = config.rooms[name];
          if (room.price > g.money) { continue; }
          if (room.max) {
            var count = 0;
            for (var i in building.rooms) { count += building.rooms[i].type == room.type; }
            if (count >= room.max) { continue; }
          }
          context.availableRooms[name] = room;
        }
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
        if (old_view.length) {
          old_view.empty().html(view.children());
          e.invokeAll('Autorender', old_view);
        }
        return view;
      }

      render().dialog({
        title: building.name,
        width: '35em',
        beforeClose: function() { g.render(); }
      });
      $('select').blur();
    });

    $('#buy-building').click(function() {
      var lst = $(ejs.render(buy_template, {
        g: g,
        buildings: Building.buildings('For Sale')
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
  Girl.prototype.desiredPay = function(happiness) {
    var pay = originalPay.call(this, happiness);
    return this.bedroom() ? pay : pay + config.noRoomDailyCost;
  };

  e.Autorender.push(function(element) {
    $('.clean', element).attr('title', config.cleanDescription);
    $('.rooms', element).attr('title', config.roomDescription);
    $('.bedroom', element).attr('title', config.rooms.bedroom.description);
  });
});