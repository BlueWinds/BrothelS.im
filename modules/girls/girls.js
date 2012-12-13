define(['content/girls', 'content/girls/girlList', './schema', 'text!./list.html', 'text!./view.html', 'text!./hire.html', 'game/game'], function(config, girls, Girl, list_template, view_template, hire_template) {

  $('head').append('<link type="text/css" rel="stylesheet" href="modules/girls/style.css">');

  e.GameNew.push(function() {
    g.maxGirls = config.startMaxGirls;
    g.girls = g.girls || {};
  });
  e.GameInit.push(function() {
    $.each(g.girls, function(name, obj) {
      g.girls[name] = new Girl(obj);
    });
    for (var name in girls) {
      if (!g.girls[name]) {
        g.girls[name] = Girl.create(name);
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
    var div = $(ejs.render(list_template, {
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
      var view = $(ejs.render(view_template, context));

      var desired = girl.desiredPay();
      var pay_delta = $('#pay .delta.happiness', view);
      function spin(event, ui) {
        var change = ui.value - desired;
        change = change > 0 ? change * config.pay.above : change * config.pay.below;
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

      $('#morning button', view).click(function() {
        if ($(this).hasClass('disabled')) { return; }
        var val = $(this).val();
        $('#morning button').removeClass('selected');
        $('#morning li').removeClass('selected');
        $(this).addClass('selected');
        var li = $('a[href="#' + $(this).parent().attr('id') + '"]').parent();
        li.addClass('selected');
        girl.actions.morning = val;
        girl.actions.morningLabel = context.morningActions[val].label;
        var evening;
        if (context.morningActions[val].allDay) {
          evening = [val, context.eveningActions[val].label];
        } else if (context.eveningActions[girl.actions.evening].allDay) {
          evening = ['Rest', 'Rest'];
        }
        if (evening) {
          girl.actions.evening = evening[0];
          girl.actions.eveningLabel = evening[1];
          $('#evening button').removeClass('selected');
          var new_button = $('#evening button[value="' + evening[0] + '"]', view);
          new_button.addClass('selected');
          li = $('a[href="#' + new_button.parent().attr('id') + '"]').parent();
          li.addClass('selected');
        }
      });
      $('#evening button', view).click(function() {
        if ($(this).hasClass('disabled')) { return; }
        var val = $(this).val();
        $('#evening button').removeClass('selected');
        $('#evening li').removeClass('selected');
        $(this).addClass('selected');
        var li = $('a[href="#' + $(this).parent().attr('id') + '"]').parent();
        li.addClass('selected');
        girl.actions.evening = val;
        girl.actions.eveningLabel = context.eveningActions[val].label;
        var morning;
        if (context.eveningActions[val].allDay) {
          morning = [val, context.morningActions[val].label];
        } else if (context.morningActions[girl.actions.morning].allDay) {
          morning = ['Rest', 'Rest'];
        }
        if (morning) {
          girl.actions.morning = morning[0];
          girl.actions.morningLabel = morning[1];
          $('#morning button').removeClass('selected');
          var new_button = $('#morning button[value="' + morning[0] + '"]', view);
          new_button.addClass('selected');
          li = $('a[href="#' + new_button.parent().attr('id') + '"]').parent();
          li.addClass('selected');
        }
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
      var lst = $(ejs.render(hire_template, {
        girls: g.girls.Cfilter('status', 'For Hire'),
        hireHappiness: config.startHappiness
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
    for (var stat in config.tooltips) {
      $('.' + stat, element).attr('title', config.tooltips[stat]);
    }
  });
});
