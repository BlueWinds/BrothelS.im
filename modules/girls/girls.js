var Actions = {};
var Girls = {};

e.Ready.push(function() {
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
});

e.GameNew.push(function() {
  g.maxGirls = Girl.config.startMaxGirls;
  g.girls = g.girls || {};
});

e.GameInit.push(function() {
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
});

e.GamePreDay.push(function() {
  $.each(g.girls, function(name, girl) {
    girl.turnDelta = girl.startDelta();
  });
});

e.GameNextDay.push(function() {
  $.each(g.girls, function(name, girl) {
    girl.runDay();
  });
});

e.GamePostDay.push(function() {
  $.each(g.girls, function(name, girl) {
    girl.turnDelta = girl.turnDelta();
    var action = girl.potentialActions('morning')[girl.actions.morning];
    if (!action || action.disabled) {
      this.actions.morning = 'Rest';
      this.actions.morningLabel = 'Rest';
    }
    action = girl.potentialActions('evening')[girl.actions.evening];
    if (!action || action.disabled) {
      this.actions.evening = 'Rest';
      this.actions.eveningLabel = 'Rest';
    }
  });
});

e.GameRender.push(function() {
  var div = $(ejs.render($('#girls_list_template').html(), {
    g: g,
    girls: g.girls.Cfilter('status', 'Hired')
  })).prependTo('#content .second');
  $('.girl', div).click(function() {
    var girl = g.girls[$(this).attr('name')];
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
        change = '+' + change;
      }
      girl.actions.pay = ui.value;
      pay_delta.html(change);
    }
    $('#pay input', view).spinner({
      min: 0,
      max: 500,
      numberFormat: 'C'
    }).bind('spin', spin);
    spin(null, {value: girl.actions.pay || 0});

    $('.checkbox input', view).change(function(event) {
      var check = $(event.currentTarget);
      var sex = check.attr('id');
      var checked = check.attr('checked');
      check.prev().toggleClass('checked', Boolean(checked));
      girl.actions[sex] = Boolean(checked);
    });

    $('.action-list li, .action-list a', view).mouseenter(function(event) {
      $('.action-list li').removeClass('hover');
      $('.action-list li:hover').addClass('hover');
      $(this).closest('.action-list').children('a').addClass('ui-state-hover');
      $(this).find('li').first().addClass('hover');
    }).mouseleave(function(event) {
      $(this).removeClass('hover');
    });
    $('.action-list > ul', view).mouseleave(function() {
      $('.action-list a').removeClass('ui-state-hover');
    });

    $('.action-list .action', view).click(function() {
      if ($(this).hasClass('disabled')) { return; }
      var _id = $(this).attr('name');
      var time = $(this).closest('div').attr('id');
      var other_time = time == 'morning' ? 'evening' : 'morning';
      var other_id = girl.actions[other_time];
      if (context[time + 'Actions'][_id].allDay) {
        other_id = _id;
      } else if (context[other_time + 'Actions'][other_id].allDay) {
        other_id = 'Rest';
      }
      var action = context[time + 'Actions'][_id];
      var other_action = context[other_time + 'Actions'][other_id];
      girl.actions[time] = _id;
      girl.actions[time + 'Label'] = action.label;
      girl.actions[other_time] = other_id;
      girl.actions[other_time + 'Label'] = other_action.label;
      $('.action-list li').removeClass('selected');
      $('#' + time + ' li[name="' + action.group + '"]').addClass('selected');
      $('#' + other_time + ' li[name="' + other_action.group + '"]').addClass('selected');
      $('#' + time + ' li.action[name="' + action._id + '"]').addClass('selected');
      $('#' + other_time + ' li.action[name="' + other_action._id + '"]').addClass('selected');
    });

    view.dialog({
      title: girl.name,
      width: '40em',
      beforeClose: function() { g.render(); }
    });

    $('button.selected', view).each(function() {
      var a = $('a[href="#' + $(this).parent().attr('id') + '"]');
      a.parent().addClass('selected');
      a.click();
    });
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
});

e.Autorender.push(function(element) {
  for (var stat in Girl.config.tooltips) {
    $('.' + stat, element).attr('title', Girl.config.tooltips[stat]);
  }
});
