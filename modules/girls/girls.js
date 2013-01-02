var Actions = {};
var Girls = {};
e.GirlsPostMorning = [];
e.GirlsPostEvening = [];

e.Ready.push(function(done) {
  $.each(Actions, function(_id, action) {
    action._id = _id;
  });
  $.each(Girls, function(name, girl) {
    girl.name = name;
    if (girl.actions) {
      $.each(girl.actions, function(_id, action) {
        action._id = _id;
      });
    }
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
        i = 0;
        e.invokeAll('GirlsPostMorning', next);
        return;
      } else {
        e.invokeAll('GirlsPostEvening', done);
        return;
      }
    } else {
      g.girls[names[i]].runDay(time, next);
      return;
    }
  };
  var time = 'morning';
  var i = -1;
  next();
});

e.GamePostDay.push(function(done) {
  $.each(g.girls, function(name, girl) {
    girl.turnDelta = girl.turnDelta();
    girl.verifyActions();
  });
  done();
});

e.GameRender.push(function(done) {
  var div = $(ejs.render($('#girls_list_template').html(), {
    g: g,
    girls: g.girls.Cfilter('status', 'Hired')
  })).prependTo('#content .second');
  $('.girl', div).click(function() {
    var girl = g.girls[$(this).attr('name')];

    var render = function() {
      girl.verifyActions();
      var context = {
        girl: girl,
        morningActions: girl.potentialActions('morning'),
        eveningActions: girl.potentialActions('evening')
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

      $('.action-list .action', view).click(function() {
        if ($(this).parent().hasClass('disabled')) { return; }
        var _id = $(this).parent().attr('name');
        var option = $(this).attr('name');
        var time = $(this).closest('div').attr('id');
        girl.setAction(context[time + 'Actions'][_id], time, option);
        render();
      });

      var old_view = $('#girl-view');
      old_view.remove();
      var opt = {
        title: girl.name,
        width: '35em',
        beforeClose: function() { g.render(); }
      };
      if (old_view.length) { opt.show = false; }
      view.dialog(opt);

      $('.action-list > ul', view).each(function() {
        var height = 0, above = 0;
        $(this).children().each(function() {
          var temp_height = above;
          $(this).find('li').each(function() { temp_height += $(this).outerHeight(); });
          height = Math.max(height, temp_height);
          above += $(this).outerHeight();
        });
        $(this).css('height', height);
      });
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
    lst.dialog({
      title: 'Hire Girl',
      width: '25em'
    });
  });
  done();
});

e.Autorender.push(function(element, done) {
  for (var stat in Girl.config.tooltips) {
    $('.' + stat, element).attr('title', Girl.config.tooltips[stat]);
  }
  done();
});
