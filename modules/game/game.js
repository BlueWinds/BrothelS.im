"use strict";
var g;

$.extend(e, {
  GameInit: [],
  GameNew: [],
  GamePreRender: [],
  GameRender: [],
  GamePreDay: [],
  GameNextDay: [],
  GamePostDay: []
});

Game.includes = [];

var __ = function(string, type) {
  type = type || 'noun';
  if (Game.strings[type] && Game.strings[type][string]) {
    var _class = string[0] == '-' ? string.substr(1) : string;
    return '<span class="' + _class + ' ' + type + '">' + Game.strings[type][string] + '</span>';
  }
  return string;
};

Object.defineProperty(Object.prototype, "_toString", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function(form) {
    var items = [];
    for (var key in this) {
      var t = __(this[key], form);
      if (items.indexOf(t) == -1) {
        items.push(t);
      }
    }
    if (items.length == 1) { return items[0]; }
    var str = items.slice(0, -1).join(', ');
    return str + ' and ' + items._last();
  }
});

Game.fetishes = ['tentacles', 'rape'];

Game.load = function(name) {
  if (!name && name !== false) {
    name = localStorage.getItem('current-game');
  }
  var list = localStorage.getObject('saved-games') || {};
  var value = localStorage.getItem(list[name]);
  localStorage.setItem('current-game', name);
  if (value) {
    Game.loadFromText(value);
  } else {
    $('#content').html(e.render('intro'));
    e.invokeAll('Autorender', $('#content'), function() {});
    $('#save').addClass('disabled');
  }
};

Game.loadFromText = function(value) {
  value.replace(/T\(/g, '__(');
  g = JSON.parse(value, function(key, value) {
    if (value === null) { return; }
    if (value._class && window[value._class]) {
      return new window[value._class](value);
    }
    return value;
  });
  e.invokeAll('GameInit', function() {
    g.render();
    $('#save').removeClass('disabled');
  });
};

Game.save = function(name) {
  if (name != g.name || !g._id) {
    var S4 = function () {
      return Math.floor(
        Math.random() * 0x10000 /* 65536 */
      ).toString(16);
    };
    g.name = name;
    g._id = S4() + S4() + S4();
  }
  localStorage.setItem(g._id, JSON.stringify(g));
  var list = localStorage.getObject('saved-games') || {};
  list[name] = g._id;
  localStorage.setObject('saved-games', list);
  localStorage.setItem('current-game', name);
};

Game.remove = function(name) {
  var list = localStorage.getObject('saved-games');
  var _id = list[name];
  localStorage.removeItem(_id);
  delete list[name];
  localStorage.setObject('saved-games', list);
};

Game.list = function() {
  var list = localStorage.getObject('saved-games');
  return Object.keys(list || {});
};

Game.start = function(opt) {
  opt = $.extend({
    day: 0,
    version: Game.config.version,
    money: Game.config.startMoney,
    moneyHistory: []
  }, opt);
  g = new Game(opt);
  e.runSeries([
    function(next) { e.invokeAll('GameNew', next); },
    function(next) { e.invokeAll('GameInit', next); }
  ], g.render);
};

e.Ready.push(function(done) {
  $('#header img').attr('title', 'Return to front page').click(function() {
    Game.load(false);
  });

  $('#save').addClass('disabled');
  if (Game.list().length === 0) {
    $('#load').addClass('disabled');
  }

  $('#new').click(function() {
    if ($(this).hasClass('disabled')) {
      return;
    }
    var form = e.render('new-game');
    $('#fetishes .checkbox').click(function() {
      $(this).toggleClass('checked');
    });
    $('button', form).click(function(event) {
      event.preventDefault();
      var game = {
        fetishes: {},
        skipIntro: $('#skip-intro').hasClass('checked'),
        autosave: $('#autosave').hasClass('checked')
      };
      $('#fetishes .checkbox').each(function() {
        if ($(this).hasClass('checked')) {
          game.fetishes[$(this).attr('name')] = true;
        }
      });
      Game.start(game);
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
    var form = e.render('save-game');
    $('#fetishes .checkbox', form).click(function() {
      var check = !$(this).hasClass('checked');
      var fetish = $(this).attr('name');
      if (check) {
        g.fetishes[fetish] = true;
      } else {
        delete g.fetishes[fetish];
      }
    });
    $('#autosave', form).click(function() {
      var check = !$(this).hasClass('checked');
      if (check) { g.autosave = true; }
      else { delete g.autosave; }
    });
    if (g.name) {
      $('#game-name', form).val(g.name);
    }
    var blob = new Blob([JSON.stringify(g, null, 2)], { type: 'text/json' });
    $('#export-game', form).attr('href', URL.createObjectURL(blob));
    $('#save-game', form).click(function(event) {
      event.preventDefault();
      Game.save($('#game-name', form).val());
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
    var form = e.render('load-game', {
      games: Game.list()
    });
    $('#delete-game', form).click(function(event) {
      event.preventDefault();
      var name = $('#game-name').val();
      Game.remove(name);
      form.dialog('close');
      if (Game.list().length === 0) {
        $('#load').addClass('disabled');
      }
      $('#load-game').click();
      return false;
    });
    $('#import-game', form).click(function(event) {
      event.preventDefault();
      $('#import-game-file').click();
      return false;
    });
    $('#import-game-file', form).change(function() {
      var reader = new FileReader();
      reader.onload = function() {
        Game.loadFromText(reader.result);
        form.dialog('close');
      };
      reader.readAsText(this.files[0]);
    });
    $('#load-game', form).click(function(event) {
      event.preventDefault();
      Game.load($('#game-name').val());
      form.dialog('close');
      return false;
    });
    form.dialog({
      title: 'Load Game'
    });
  });
  $(document).keydown(function(event) {
    var item = Game.hotkeys[event.keyCode];
    if (item && (!$('.ui-dialog').length || item.allowDialogs)) {
      if (item.callback) {
        item.callback(event);
      } else {
        $(item.selector).click();
      }
      event.preventDefault();
      return false;
    }
  });
  $('#hotkeys').click(function() {
    var dialog = e.render('hotkeys');
    dialog.dialog({
      title: 'Hotkeys'
    });
  });
  e.addTemplate('hotkeys', 'modules/game/hotkeys.tpl.html');
  e.addTemplate('load-game', 'modules/game/load-game.tpl.html');
  e.addTemplate('new-game', 'modules/game/new-game.tpl.html');
  e.addTemplate('render-delta', 'modules/game/render-delta.tpl.html');
  e.addTemplate('save-game', 'modules/game/save-game.tpl.html');
  e.addTemplate('user-input', 'modules/game/user-input.tpl.html');
  e.addTemplate('intro', 'modules/game/intro.tpl.html',
    function() {
      e.addTemplate('view-game', 'modules/game/view-game.tpl.html', function() {
        e.loadAll(Game.includes, done);
      });
    }
  );
});

Game.getUserInput = function(text, image, options, done) {
  var context = {
    text: text,
    image: image,
    options: options
  };
  var form = e.render('user-input', context);
  $('button', form).click(function(event) {
    event.preventDefault();
    var value = $(this).text();
    form.remove();
    done(value);
    return false;
  });
  form.appendTo('body');
  $('#required-user-input').position({
    my: 'center center',
    at: 'center center',
    of: window,
    collision: 'none'
  });
  e.invokeAll('Autorender', form, function() {});
};

e.Autorender.push(function(element, done) {
  $.each(Game.tooltips, function(item, tip) {
    $('.' + item, element).attr('title', tip).each(function() {
      $(this).tooltip({
        show: { delay: 300 },
        content: tip
      });
    });
  });
  done();
});
