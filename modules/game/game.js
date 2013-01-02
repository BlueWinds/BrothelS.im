var g = {};

$.extend(e, {
  GameRender: [],
  GameInit: [],
  GameNew: [],
  GamePreDay: [],
  GameNextDay: [],
  GamePostDay: []
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

Game.loadCurrent = function() {
    name = localStorage.getItem('current-game');
    Game.load(name);
  };

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
    e.invokeAll('Autorender', function() {}, $('#content'));
    $('#save').addClass('disabled');
  }
};

Game.loadFromText = function(value) {
  value = JSON.retrocycle(JSON.parse(value));
  g = new Game(value);
  $('#save').removeClass('disabled');
  e.invokeAll('GameInit', g.render);
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
  e.invokeAll('GameNew', function() {
    e.invokeAll('GameInit', g.render);
  });
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
    var form = $(ejs.render($('#game_new_template').html()));
    $('#fetishes .checkbox').click(function() {
      $(this).toggleClass('checked');
    });
    $('button', form).click(function(event) {
      event.preventDefault();
      var game = {
        fetishes: {}
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
    var form = $($('#game_save_template').html());
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
    }));
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
      Game.loadFromText(game);
      form.dialog('close');
      return false;
    });
    $(form).submit(function(event) {
      event.preventDefault();
      Game.load($('#game-name').val());
      form.dialog('close');
      return false;
    });
    form.dialog({
      title: 'Load Game'
    });
  });
  done();
});

Game.getUserInput = function(text, image, options, done) {
  var context = {
    text: text,
    image: image,
    options: options
  };
  var form = $(ejs.render($('#game_user_input_template').html(), context));
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
  e.invokeAll('Autorender', function() {}, form);
};
