"use strict";
e.GameUpgrade03.push(function(game, next) {
  for (var name in g.buildings) {
    game.buildings[name]._class = 'Building';
    game.buildings[name].maxRooms = Buildings[name].maxRooms;
  }
  next();
});
e.GameUpgrade04.push(function(game, next) {
  $.each(game.buildings, function(name, building) {
    building.rooms.forEach(function(room) {
      room.type = room.type.charAt(0).toUpperCase() + room.type.slice(1);
    });
  });
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
  $('.building .right', div).click(function() {
    var dialog = $('<div>');
    function render(element) {
      var context = {
        buildings: g.buildings._filter('status', 'Owned'),
        innGirls: []
      };
      g.girls._filter('status', 'Hired').forEach(function(girl) {
        if (!girl.building()) {
          context.innGirls.push(girl);
        }
      });

      var view = $(ejs.render($('#buildings_view_template').html(), context).trim());
      element.html(view);
      $('.building', view).each(function() {
        var name = $(this).attr('name');
        var selector = '.building[name="' + name +'"]';
        $('.built-rooms', this).sortable({
          connectWith: selector + ' .available-rooms',
          handle: 'label',
          receive: function(event, ui) {
            var type = ui.item.attr('name');
            g.buildings[name].buyRoom(type);
            render(dialog);
          },
          update: function(event, ui) {
            if (ui.item.attr('index') !== undefined && ui.item.closest(this).length) {
              var i = ui.item.parent().children().index(ui.item);
              var old = ui.item.attr('index');
              var rooms = g.buildings[name].rooms;
              var room = rooms[old];
              rooms[old] = rooms[i];
              rooms[i] = room;
              render(dialog);
            }
          }
        });
        $('.available-rooms', this).sortable({
          connectWith: selector + ' .built-rooms',
          handle: 'label',
          helper: 'clone',
          items: 'li:not(.disabled)',
          start: function(event, ui) {
            ui.item.css('display', 'list-item');
            $(this).children('.ui-sortable-placeholder').appendTo(this);
          },
          receive: function(event, ui) {
            var index = ui.item.attr('index');
            g.buildings[name].sellRoom(index);
            render(dialog);
          }
        });
      });
      $('#inn, .room[name="Bedroom"] ul', view).sortable({
        connectWith: '#inn, .room[name="Bedroom"] ul',
        opacity: 0.7,
        receive: function(event, ui) {
          var list = $(this);
          var senderIndex = ui.sender.parent().attr('index');
          if (senderIndex !== undefined) {
            var sender = ui.sender.closest('.building').attr('name');
            delete g.buildings[sender].rooms[senderIndex].girl;
          }
          var receiverIndex = list.parent().attr('index');
          if (receiverIndex !== undefined) {
            var receiver = list.closest('.building').attr('name');
            g.buildings[receiver].rooms[receiverIndex].girl = ui.item.attr('name');
          }
          // Now we send any previously occupying girl to the inn.
          if (list.attr('id') != 'inn' && list.children().length > 1) {
            $('#inn').append($('li', list).not(ui.item));
          } else if (list.attr('id') == 'inn') {
            ui.item.css('position', '');
          }
        }
      });
    }

    var opt = {
      beforeClose: g.render,
      width: '45em'
    };
    render(dialog);
    render(dialog.dialog(opt));
  });
  $('.building .left, .building .middle').click(function() {
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

  done();
});
