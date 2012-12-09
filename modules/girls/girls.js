define(['content/girls.js', './girlList', './schema', 'text!./list.html', 'text!./view.html', 'text!./hire.html', 'game/game'], function(config, girls, Girl, list_template, view_template, hire_template) {

  $('head').append('<link type="text/css" rel="stylesheet" href="modules/girls/style.css">');

  e.GameNew.push(function() {
    g.maxGirls = config.startMaxGirls;
    g.girls = g.girls || {};
    for (var name in girls) {
      g.girls[name] = Girl.create(name);
    }
  });
  e.GameInit.push(function() {
    $.each(g.girls, function(name, obj) {
      g.girls[name] = new Girl(obj);
    });
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
      if (!action || (action.conditions && !action.conditions.call(girl, 'morning'))) {
        this.actions.morning = 'Rest';
        this.actions.morningLabel = 'Rest';
      }
      action = girl.potentialActions('evening')[girl.actions.evening];
      if (!action || (action.conditions && !action.conditions.call(girl, 'evening'))) {
        this.actions.evening = 'Rest';
        this.actions.eveningLabel = 'Rest';
      }
    });
  });

  e.GameRender.push(function() {
    var div = $(ejs.render(list_template, {
      g: g,
      girls: Girl.girls('Hired')
    })).prependTo('#content .second');
    $('.girl', div).click(function() {
      var girl = g.girls[$(this).attr('name')];
      var context = {
        girl: girl,
        potentialMorning: girl.potentialActions('morning'),
        potentialEvening: girl.potentialActions('evening')
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

      $('#morning', view).change(function() {
        var val = $(this).val();
        girl.actions.morning = val;
        girl.actions.morningLabel = context.potentialMorning[val].label;
        var evening;
        if (context.potentialMorning[val].allDay) {
          evening = [val, context.potentialEvening[val].label];
        } else if (context.potentialEvening[girl.actions.evening].allDay) {
          evening = ['Rest', 'Rest'];
        }
        if (evening) {
          girl.actions.evening = evening[0];
          girl.actions.eveningLabel = evening[1];
          $('#evening', view).val(evening[0]);
        }
      });
      $('#evening', view).change(function() {
        var val = $(this).val();
        girl.actions.evening = val;
        girl.actions.eveningLabel = context.potentialEvening[val].label;
        var morning;
        if (context.potentialEvening[val].allDay) {
          morning = [val, context.potentialMorning[val].label];
        } else if (context.potentialMorning[girl.actions.morning].allDay) {
          morning = ['Rest', 'Rest'];
        }
        if (morning) {
          girl.actions.morning = morning[0];
          girl.actions.morningLabel = morning[1];
          $('#morning', view).val(morning[0]);
        }
      });

      view.dialog({
        title: girl.name,
        width: '35em',
        beforeClose: function() { g.render(); }
      });
    });

    $('#hire-girl').click(function() {
      var lst = $(ejs.render(hire_template, {
        girls: Girl.girls('For Hire'),
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
