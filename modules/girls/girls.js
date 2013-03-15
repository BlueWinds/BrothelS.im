"use strict";
var Girls = {};

e.Ready.push(function(done) {
  $('head').append('<link href="modules/girls/style.css" type="text/css" rel="stylesheet">');
  e.addTemplate('list-girls', 'modules/girls/list-girls.tpl.html');
  e.addTemplate('hire-girls', 'modules/girls/hire-girls.tpl.html');
  e.addTemplate('view-girl', 'modules/girls/view-girl.tpl.html');
  e.loadAll(Girl.girls, function() {
    $.each(Girls, function(name, girl) {
      girl.name = name;
    });
    done();
  });
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
  var div = e.render('list-girls', {
    girls: g.girls._filter('status', 'Hired')
  }).prependTo('#content .second');
  $('.girl .left, .girl .middle', div).click(function() {
    var girl = g.girls[$(this).parent().attr('name')];

    var context = {
      girl: girl,
      girls: g.girls._filter('status', 'Hired')
    };
    var mainView = e.render('view-girl', context);

    $('.girl-view', mainView).each(function() {
      var view = $(this);
      var girl = g.girls[view.attr('name')];
      var desired = girl.desiredPay();
      var happinessDelta = $('.pay .delta.happiness', view);
      var moneyDelta = $('.pay .delta.money', view);
      var slider = $('.pay .slider', view).slider({
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
    });

    var opt = {
      beforeClose: function() {
        g.render();
      }
    };
    mainView.dialog(opt);
    mainView.closest('.ui-dialog').addClass('tab-dialog');
  });

  $('#hire-girl').click(function() {
    var lst = e.render('hire-girls', {
      girls: g.girls._filter('status', 'For Hire'),
      hireHappiness: Girl.config.startHappiness
    });
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

Girl.renderConditions = function(conditions) {
  var text = [];
  $.each(conditions.max || {}, function(stat, value) {
    if (typeof(value) != "number") { return; }
    var span = '<span class="delta stat ' + stat + '">' + (stat == "money" ? "$" + value : value) + '-</span>';
    text.push(span);
  });
  $.each(conditions.min || {}, function(stat, value) {
    if (typeof(value) != "number") { return; }
    var span = '<span class="delta stat ' + stat + '">' + (stat == "money" ? "$" + value : value) + '+</span>';
    text.push(span);
  });
  return '<span>' + text.join(', ') + '</span>';
};
