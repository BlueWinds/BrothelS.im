"use strict";

var Buildings = {};

e.Ready.push(function buildingsReady(done) {
  $('head').append('<link href="modules/buildings/style.css" type="text/css" rel="stylesheet">');
  e.addTemplate('manage-buildings', 'modules/buildings/manage-buildings.tpl.html');
  e.addTemplate('view-building', 'modules/buildings/view-building.tpl.html');
  $.each(Buildings, (name, building) => {
    building.name = name;
  });
  e.addTemplate('list-buildings', 'modules/buildings/list-buildings.tpl.html', done);
});

e.GameNew.push(function buildingsNewGame(done) {
  g.maxBuildings = Building.config.startMaxBuildings;
  g.buildings = g.buildings || {};
  done();
});

e.GameInit.push(function buildingsGameInit(done) {
  for (var name in Buildings) {
    if (!g.buildings[name]) {
      g.buildings[name] = Building.create(name);
    }
  }
  done();
});

e.GamePreDay.push(function buildingsPreDay(done) {
  g.buildings._filter('status', 'Owned').forEach(building => {
    building.turnDelta = building.startDelta();
  });
  $.each(g.buildings, function runBuildingDay(name, building) {
    building.runDay();
  });
  done();
});

e.GamePostDay.push(function buildingsPostDay(done) {
  g.buildings._filter('status', 'Owned').forEach(building => {
    building.turnDelta = building.turnDelta();
  });
  done();
});

e.GameRender.push(function buildingsGameRender(done) {
  var div = e.render('list-buildings', {
    buildings: g.buildings._filter('status', 'Owned')
  }).appendTo('#content .second');
  $('.building .right', div).click(function openBuildingDialog() {
    var dialog = $('<div>');
    function render(element, autorender) {
      var context = {
        buildings: g.buildings._filter('status', 'Owned'),
        innGirls: []
      };
      g.girls._filter('status', 'Hired').forEach(girl => {
        if (!girl.building()) {
          context.innGirls.push(girl);
        }
      });

      var view = e.render('view-building', context);
      element.html(view);
      $('.building', view).each(function buildBuildingSortable() {
        var name = $(this).attr('name');
        var selector = '.building[name="' + name + '"]';
        $('.built-rooms', this).sortable({
          connectWith: selector + ' .available-rooms',
          handle: 'label',
          receive: function buildingBuyRoom(event, ui) {
            var type = ui.item.attr('name');
            g.buildings[name].buyRoom(type);
            render(dialog);
          },
          update: function buildingReorderRoom(event, ui) {
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
          start(event, ui) {
            ui.item.css('display', 'list-item');
            $(this).children('.ui-sortable-placeholder').appendTo(this);
          },
          receive: function buildingSellRoom(event, ui) {
            var index = ui.item.attr('index');
            g.buildings[name].sellRoom(index);
            render(dialog);
          }
        });
      });
      $('#inn, .room[name="Bedroom"] ul', view).sortable({
        connectWith: '#inn, .room[name="Bedroom"] ul',
        opacity: 0.7,
        receive: function buildingRecieveGirl(event, ui) {
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
      if (autorender === undefined || autorender) {
        e.invokeAll('Autorender', element);
      }
    }

    var opt = {
      beforeClose: g.render,
      width: '45em'
    };
    render(dialog, false);
    render(dialog.dialog(opt));
  });
  $('.building .left, .building .middle').click(function openManageBuildings() {
    var lst = e.render('manage-buildings', {
      buildings: g.buildings._filter('status', 'Owned'),
      action: 'Sell'
    });
    $('button.manage', lst).each(function manageBuildingButton() {
      var building = g.buildings[$(this).attr('name')];
      $(this).click(function sellBuilding() {
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
  $('#buy-building').click(function openBuyBuildings() {
    var lst = e.render('manage-buildings', {
      action: 'Buy',
      buildings: g.buildings._filter('status', 'For Sale')
    });
    $('button.manage', lst).each(function buyBuildingButton() {
      var building = g.buildings[$(this).attr('name')];
      if (building.price() > g.money) {
        $(this).attr('disabled', true);
      } else {
        $(this).click(function buyBuilding() {
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
