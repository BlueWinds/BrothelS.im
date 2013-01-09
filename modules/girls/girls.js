var Girls = {};
e.GirlNew = [];
e.GirlsPostMorning = [];
e.GirlsPostEvening = [];
e.GirlRunTime = [];
e.GirlRender = [];

e.Ready.push(function(done) {
  $.each(Girls, function(name, girl) {
    girl.name = name;
  });
  done();
});

e.GameNew.push(function(done) {
  g.maxGirls = Girl.config.startMaxGirls;
  g.girls = g.girls || {};
  done();
});

e.GameInit.push(function(done) {
  $.each(g.girls, function(name, obj) {
    var girl = new Girl(obj);
    g.girls[name] = girl;
    // This only triggers when loading old save games. Set it to the current day, so that events/missions will all start triggering.
    if (girl.status == 'Hired' && girl.hireDay === undefined) {
      girl.hireDay = g.day;
    }
    // Update old savegames with per-instance specialRules.
    if (!girl.specialRules) {
      girl.specialRules = Girls[name].specialRules || {};
    }
  });
  for (var name in Girls) {
    if (!g.girls[name]) {
      g.girls[name] = Girl.create(Girls[name]);
    }
  }
  done();
});

e.GamePreDay.push(function(done) {
  $.each(g.girls, function(name, girl) {
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
      e.invokeAll('GirlRunTime', next, g.girls[names[i]], time);
      return;
    }
  };
  var time = 'morning';
  var i = -1;
  next();
});

e.GirlRunTime.push(function(girl, time, done) {
  if (girl.status != 'Hired') {
    girl.status = girl.randomStatus();
  }
  done();
});

e.GamePostDay.push(function(done) {
  $.each(g.girls, function(name, girl) {
    girl.turnDelta = girl.turnDelta();
  });
  done();
});

e.GameRender.push(function(done) {
  var div = $(ejs.render($('#girls_list_template').html(), {
    g: g,
    girls: g.girls.Cfilter('status', 'Hired')
  })).prependTo('#content .second');
  $('.girl .left, .girl .middle', div).click(function() {
    var girl = g.girls[$(this).parent().attr('name')];

    var render = function() {
      var context = {
        girl: girl
      };

      var view = $(ejs.render($('#girls_view_template').html(), context));

      var desired = girl.desiredPay();
      var pay_delta = $('#pay .delta.happiness', view);
      function spin(event, ui) {
        var change = ui.value - desired;
        change = change > 0 ? change * Girl.config.pay.above : change * Girl.config.pay.below;
        change = Math.floor(change);
        if (change > -1) {
          change = '+' + Math.floor(Math.pow(change, 0.66));
        }
        girl.actions.pay = ui.value;
        pay_delta.html(change);
      }
      $('#pay input', view).spinner({
        step: 10,
        min: 0,
        max: 500,
        numberFormat: 'C'
      }).bind('spin', spin);
      spin(null, {value: girl.actions.pay || 0});

      $('.checkbox', view).click(function(event) {
        var check = !$(this).hasClass('checked');
        var sex = $(this).attr('id');
        if (check) {
          girl.actions[sex] = true;
        } else {
          delete girl.actions[sex];
        }
        render();
      });

      e.invokeAll('GirlRender', function() {
        var old_view = $('#girl-view');
        old_view.remove();
        var opt = {
          title: girl.name,
          width: '35em',
          beforeClose: function() { g.render(); }
        };
        if (old_view.length) { opt.show = false; }
        view.dialog(opt);
      }, girl, view);
    };

    render();
  });

  $('#hire-girl').click(function() {
    var lst = $(ejs.render($('#girls_hire_template').html(), {
      girls: g.girls.Cfilter('status', 'For Hire'),
      hireHappiness: Girl.config.startHappiness
    }));
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

e.Autorender.push(function(element, done) {
  for (var stat in Girl.config.tooltips) {
    $('.' + stat, element).attr('title', Girl.config.tooltips[stat]);
  }
  done();
});
