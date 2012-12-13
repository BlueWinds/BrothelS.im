var g = {};

define(['text!./intro.html', './schema', 'text!./new-form.html', 'text!./save-form.html', 'text!./load-form.html', 'content/game', 'autorender/autorender'], function(intro, Game, new_template, save_template, load_template, config) {

  $.extend(e, {
    GameRender: [],
    GameInit: [],
    GameNew: [],
    GamePreDay: [],
    GameNextDay: [],
    GamePostDay: []
  });

  var module = {
    loadCurrent: function() {
      name = localStorage.getItem('current-game');
      module.load(name);
    },
    load: function(name) {
      if (!name && name !== false) {
        name = localStorage.getItem('current-game');
      }
      var list = localStorage.getObject('saved-games') || {};
      var value = localStorage.getItem(list[name]);
      if (value) {
        module.loadFromText(value);
      } else {
        $('#content').html(intro);
        e.invokeAll('Autorender', $('#content'));
        $('#save').addClass('disabled');
      }
      localStorage.setItem('current-game', name);
    },
    loadFromText: function(value) {
      value = JSON.retrocycle(JSON.parse(value));
      g = new Game(value);
      e.invokeAll('GameInit');
      g.render();
      $('#save').removeClass('disabled');
    },
    save: function(name) {
      if (name != g.name || !g._id) {
        var S4 = function () {
          return Math.floor(
            Math.random() * 0x10000 /* 65536 */
          ).toString(16);
        };
        g.name = name;
        g._id = S4() + S4() + S4();
      }
      var string = JSON.stringify(JSON.decycle(g), function(key, val) {
        if (key == '_' || key.substr(0, 6) == 'jQuery') {
          return undefined;
        }
        return val;
      });
      localStorage.setItem(g._id, string);
      var list = localStorage.getObject('saved-games') || {};
      list[name] = g._id;
      localStorage.setObject('saved-games', list);
      localStorage.setItem('current-game', name);
    },
    remove: function(name) {
      var list = localStorage.getObject('saved-games');
      var _id = list[name];
      localStorage.removeItem(_id);
      delete list[name];
      localStorage.setObject('saved-games', list);
    },
    list: function() {
      var list = localStorage.getObject('saved-games');
      return Object.keys(list || {});
    },
    start: function(opt) {
      opt = $.extend({
        day: 0,
        money: config.startMoney,
        moneyHistory: []
      }, opt);
      g = new Game(opt);
      e.invokeAll('GameNew');
      e.invokeAll('GameInit');
      g.render();
    }
  };

  $('#header img').attr('title', 'Return to front page').click(function() {
    module.load(false);
  });

  $('#save').addClass('disabled');
  if (module.list().length === 0) {
    $('#load').addClass('disabled');
  }

  $('#new').click(function() {
    if ($(this).hasClass('disabled')) {
      return;
    }
    var form = $(new_template);
    $('button', form).click(function(event) {
      event.preventDefault();
      module.start({
        tentacles: Boolean($('#game-tentacles', form).val())
      });
      form.dialog('close');
      return false;
    });
    form.dialog({
      title: 'New Game'
    });
    $('#save').removeClass('disabled');
  });

  $('#save').click(function() {
    if ($(this).hasClass('disabled')) {
      return;
    }
    var form = $(save_template);
    if (g.name) {
      $('#game-name', form).val(g.name);
    }
    $('#export-game', form).click(function(event) {
      var game = JSON.stringify(JSON.decycle(g), function(key, val) {
        if (key == '_' || key.substr(0, 6) == 'jQuery') {
          return undefined;
        }
        return val;
      });
      $('<div>').text(game).dialog();
      event.preventDefault();
      return false;
    });
    $('#save-game', form).click(function(event) {
      event.preventDefault();
      module.save($('#game-name', form).val());
      form.dialog('close');
      $('#load').removeClass('disabled');
      return false;
    });
    form.dialog({
      title: 'Save Game'
    });
  });

  $('#load').click(function() {
    if ($(this).hasClass('disabled')) {
      return;
    }
    var form = $(ejs.render(load_template, {
      games: module.list()
    }));
    $('#delete', form).click(function(event) {
      event.preventDefault();
      var name = $('#game-name').val();
      module.remove(name);
      form.dialog('close');
      if (module.list().length === 0) {
        $('#load').addClass('disabled');
      }
      $('#load').click();
      return false;
    });
    $('#import', form).click(function(event) {
      event.preventDefault();
      var game = $('textarea', form).val();
      module.loadFromText(game);
      form.dialog('close');
      return false;
    });
    $('#load', form).submit(function(event) {
      event.preventDefault();
      module.load($('#game-name').val());
      form.dialog('close');
      return false;
    });
    form.dialog({
      title: 'Load Game'
    });
  });
  return module;
});