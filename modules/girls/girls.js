"use strict";
var Girls = {};
e.GirlNew = [];
e.GirlsPostMorning = [];
e.GirlsPostEvening = [];
e.GirlRunTime = [];
e.GameUpgrade03.push(function(game, next) {
  for (var name in game.girls) {
    game.girls[name]._class = 'Girl';
  }
  next();
});
e.GameUpgrade04.push(function(game, next) {
  var stats = {
    'soft libido': 'softLibido',
    'soft experience': 'softExperience',
    'hard libido': 'hardLibido',
    'hard experience': 'hardExperience',
    'anal libido': 'analLibido',
    'anal experience': 'analExperience',
    'fetish libido': 'fetishLibido',
    'fetish experience': 'fetishExperience'
  };
  if (!game.girls.Kirino.specialRules) {
    game.girls.Kirino.specialRules = {};
  }
  game.girls.Kirino.specialRules.payRatio = Girls.Kirino.specialRules.payRatio;
  for (var name in game.girls) {
    if (!game.girls[name].hireDay) {
      game.girls[name].hireDay = 0;
    }
    for (var old in stats) {
      game.girls[name][stats[old]] = game.girls[name][old];
      delete game.girls[name][old];
    }
  }
  next();
});

e.Ready.push(function(done) {
  $.each(Girls, function(name, girl) {
    girl.name = name;
  });
  done();
});

e.GameNew.push(function(done) {
  g.maxGirls = Girl.config.startMaxGirls;
  g.girls = g.girls || {};
  for (var name in Girls) {
    if (!g.girls[name]) {
      g.girls[name] = new Girl(name);
    }
  }
  done();
});

e.GameInit.push(function(done) {
  g.girls._filter('status', 'Hired').forEach(function(girl) {
    if (!girl.hireDay) {
      girl.hireDay = g.day;
    }
  });
  for (var name in Girls) {
    if (!g.girls[name]) {
      g.girls[name] = new Girl(name);
    }
  }
  done();
});

e.GamePreDay.push(function(done) {
  g.girls._filter('status', 'Hired').forEach(function(girl) {
    girl.turnDelta = girl.startDelta();
  });
  done();
});

e.GameNextDay.push(function(done) {
  var names = Object.keys(g.girls);
  var next = function() {
    i++;
    if (i == names.length) {
      if (time == 'morning') {
        time = 'evening';
        i = -1;
        e.invokeAll('GirlsPostMorning', next);
        return;
      } else {
        e.invokeAll('GirlsPostEvening', done);
        return;
      }
    } else {
      e.invokeAll('GirlRunTime', g.girls[names[i]], time, next);
      return;
    }
  };
  var time = 'morning';
  var i = -1;
  next();
});

e.GamePostDay.push(function(done) {
  g.girls._filter('status', 'Hired').forEach(function(girl) {
    g.money -= Math.floor(girl.actions.pay * girl.desiredPay());
    girl.apply('happiness', girl.payHappiness());
    girl.turnDelta = girl.turnDelta();
  });
  done();
});

e.GameRender.push(function(done) {
  var div = $(ejs.render($('#girls_list_template').html(), {
    girls: g.girls._filter('status', 'Hired')
  }).trim()).prependTo('#content .second');
  $('.girl .left, .girl .middle', div).click(function() {
    var girl = g.girls[$(this).parent().attr('name')];

    var context = {
      girl: girl,
      girls: g.girls._filter('status', 'Hired')
    };
    var view = $(ejs.render($('#girls_view_template').html(), context).trim());

    var desired = girl.desiredPay();
    var happinessDelta = $('#pay .delta.happiness', view);
    var moneyDelta = $('#pay .delta.money', view);
    var slider = $('#pay .slider', view).slider({
      step: 0.01,
      min: Math.min.apply(undefined, Object.keys(Girl.config.pay)),
      max: Math.max.apply(undefined, Object.keys(Girl.config.pay)),
      slide: function(event, ui) {
        var closest = 100;
        for (var mult in Girl.config.pay) {
          closest = Math.abs(ui.value - mult) < Math.abs(ui.value - closest) ? mult : closest;
        }
        if (girl.actions.pay != closest) {
          girl.actions.pay = parseFloat(closest);
          var happiness = girl.payHappiness();
          happinessDelta.html(happiness < 0 ? happiness : '+' + happiness);
          moneyDelta.html('$' + Math.floor(desired * girl.actions.pay));
          slider.slider('value', closest);
        }
        event.preventDefault();
      }
    }).slider('value', girl.actions.pay);

    $('.checkbox', view).click(function() {
      var check = !$(this).hasClass('checked');
      var sex = $(this).attr('id');
      if (check) {
        girl.actions[sex] = true;
      } else {
        delete girl.actions[sex];
      }
    });

    var opt = {
      beforeClose: function() {
        g.render();
      }
    };
    view.dialog(opt);
    view.closest('.ui-dialog').addClass('tab-dialog');
  });

  $('#hire-girl').click(function() {
    var lst = $(ejs.render($('#girls_hire_template').html(), {
      girls: g.girls._filter('status', 'For Hire'),
      hireHappiness: Girl.config.startHappiness
    }).trim());
    $('button.hire', lst).each(function() {
      var girl = g.girls[$(this).attr('name')];
      if (girl.hirePrice() > g.money) {
        $(this).attr('disabled', true);
      } else {
        $(this).click(function() {
          girl.hire();
          g.render();
          $('#hire-girls').dialog('close');
        });
      }
    });
    lst.dialog({});
    lst.closest('.ui-dialog').addClass('tab-dialog');
  });
  done();
});
