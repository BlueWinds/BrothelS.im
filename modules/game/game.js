var g;

$.extend(e, {
  GameInit: [],
  GameNew: [],
  GamePreRender: [],
  GameRender: [],
  GamePreDay: [],
  GameNextDay: [],
  GamePostDay: [],
  GameUpgrade03: [function(g, next) {
    g._class = 'Game';
    var list = localStorage.getObject('saved-games')._toArray();
    list.push('saved-games', 'current-game');
    for (var _id in localStorage) {
      if (list.indexOf(_id) == -1) {
        delete localStorage[_id];
      }
    }
    next();
  }],
  GameUpgrade04: [function(game, next) {
    for (var fetish in game.fetishes) {
      if (!game.fetishes[fetish]) {
        delete game.fetishes[fetish];
      }
    }
    next();
  }]
});

T = function(string, type) {
  type = type || 'noun';
  if (Game.strings[type] && Game.strings[type][string]) {
    var _class = string[0] == '-' ? string.substr(1) : string;
    return '<span class="' + _class + ' ' + type + '">' + Game.strings[type][string] + '</span>';
  }
  return string;
};

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
    $('#content').html($('#game_intro_template').html());
    e.invokeAll('Autorender', $('#content'), function() {});
    $('#save').addClass('disabled');
  }
};

Game.loadFromText = function(value) {
  g = JSON.parse(value, function(key, value) {
    if (value === null) { return; }
    if (value._class && window[value._class]) {
      return new window[value._class](value);
    }
    return value;
  });
  e.invokeAll('GameInit', function() {
    if (!g.girls.Kirino._class) {
      e.invokeAll('GameUpgrade03', g, function() {
        Game.loadFromText(JSON.stringify(g));
      });
      return;
    } else if (g.girls.Kirino['soft libido']) {
      e.invokeAll('GameUpgrade04', g, function() {
        Game.loadFromText(JSON.stringify(g));
      });
      return;
    } else {
      g.render();
    }
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
    Game.load();
  });

  $('#save').addClass('disabled');
  if (Game.list().length === 0) {
    $('#load').addClass('disabled');
  }

  $('#new').click(function() {
    if ($(this).hasClass('disabled')) {
      return;
    }
    var form = $(ejs.render($('#game_new_template').html()).trim());
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
    var form = $(ejs.render($('#game_save_template').html(), {}).trim());
    $('#fetishes .checkbox', form).click(function(event) {
      var check = !$(this).hasClass('checked');
      var fetish = $(this).attr('name');
      if (check) {
        g.fetishes[fetish] = true;
      } else {
        delete g.fetishes[fetish];
      }
    });
    $('#autosave', form).click(function(event) {
      var check = !$(this).hasClass('checked');
      if (check) { g.autosave = true; }
      else { delete g.autosave; }
    });
    if (g.name) {
      $('#game-name', form).val(g.name);
    }
    $('#export-game', form).click(function(event) {
      var textarea = $('<textarea>').text(JSON.stringify(g)).css('width', '15em').css('height', '10em');
      $('<div>').append(textarea).dialog({
        title: 'Save the text below'
      }).css('overflow', 'auto');
      textarea.select();
      event.preventDefault();
      return false;
    });
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
    var form = $(ejs.render($('#game_load_template').html(), {
      games: Game.list()
    }).trim());
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
      var game = $('textarea', form).val();
      if (game) {
        Game.loadFromText(game);
        form.dialog('close');
      }
      return false;
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
    if (event.keyCode == 13 && !$('.ui-dialog').length) {
      $('#next').click();
    }
  });
  done();
});

Game.getUserInput = function(text, image, options, done) {
  var context = {
    text: text,
    image: image,
    options: options
  };
  var form = $(ejs.render($('#game_user_input_template').html(), context).trim());
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