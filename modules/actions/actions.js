var Actions = {};

e.Ready.push(function(done) {
  $.each(Actions, function(_id, action) {
    action._id = _id;
  });
  $.each(Girls, function(name, girl) {
    if (!girl.actions) { return; }
    $.each(girl.actions, function(_id, action) {
      action._id = _id;
    });
  });
  done();
});

e.GirlNew.push(function(girl) {
  // Add action history, if it doesn't exist yet.
  if (!girl.actions.history) {
    girl.actions.history = {};
  }
});

e.GamePostDay.push(function(done) {
  $.each(g.girls, function(name, girl) {
    girl.verifyActions();
  });
  done();
});

e.GirlRender.push(function(girl, view, done) {
  girl.verifyActions();
  done();
});

e.GameRender.push(function(done) {
  $('.girl .right > div').click(function() {
    var time = $(this).attr('name');
    var girl = g.girls[$(this).parent().parent().attr('name')];
    function renderActions(girl, time) {
      var context = {
        girl: girl,
        time: time,
        otherActionList: girl.otherActionsList(time),
        potentialActions: girl.potentialActions(time)
      };
      var div = $(ejs.render($('#actions_girl_template').html(), context));
      $('.action:not(.disabled) ul', div).sortable({
        connectWith: '.action:not(.disabled) ul',
        distance: 10,
        items: 'li.this',
        stop: function(event, ui) {
          var action = ui.item.parent().attr('name');
          var option;
          if (ui.item.parent().parent().find('ol li.selected')) {
            option = ui.item.parent().parent().find('ol li.selected').attr('name');
          }
          girl.setAction(context.potentialActions[action], time, option);
        }
      }).click(function() {
        var $this = $(this);
        var action = $this.attr('name');
        var option;
        if ($this.parent().find('ol li.selected')) {
          option = $this.parent().find('ol li.selected').attr('name');
        }
        $('li.this', div).fadeOut('fast', function() {
          $(this).fadeIn('fast').appendTo($this);
        });
        girl.setAction(context.potentialActions[action], time, option);
      });
      $('.action ol.dropdown li', div).click(function() {
        var action = $(this).closest('.action').children('ul').attr('name');
        action = context.potentialActions[action];
        $(this).parent().children('li').removeClass('selected');
        $(this).addClass('selected');
        if ($(this).closest('.action').find('.this').length) {
          girl.setAction(action, time, $(this).attr('name'));
        }
      });
      return div;
    }
    var context = {
      girls: g.girls.Cfilter('status', 'Hired'),
      girl: girl,
      time: time
    };
    var view = $(ejs.render($('#actions_list_template').html(), context));
    var tab = $('.girl[name="' + girl.name + '"] .' + time, view);
    tab.append(renderActions(girl, time));
    if (tab[0] !== $('.girl .morning', view)[0]) {
      var temp_tab = $('.girl .morning', view).first();
      var temp_girl = tab.parent().attr('name');
      temp_tab.append(renderActions(g.girls[temp_girl], 'morning'));
    }
    var opt = {
      beforeClose: g.render
    };
    view.dialog(opt);
    view.closest('.ui-dialog').addClass('tab-dialog').on( "accordionbeforeactivate", function(event, ui) {
      var girl = ui.newPanel.parent().attr('name');
      var time = ui.newPanel.hasClass('morning') ? 'morning' : 'evening';
      ui.newPanel.html(renderActions(g.girls[girl], time));
    }).on('tabsbeforeactivate', function(event, ui) {
      ui.newPanel.accordion('option', 'active', 1);
      ui.newPanel.accordion('option', 'active', 0);
    });
  });
  done();
});

e.GirlRunTime.push(function(girl, time, done) {
  if (girl.status != 'Hired') { done(); return; }

  var actions= girl.potentialActions(time);
  var action = actions[girl.actions[time]] || actions.Rest;
  if (action.disabled) { action = actions.Rest; }
  if (action.options) {
    if (girl.actions[time + 'Option'] !== undefined) {
      action.options = girl.actions[time + 'Option'];
    } else {
      action.options = Object.keys(action.options)[0];
    }
  }
  girl.doAction(time, action, function() {
    if (time == 'evening') {
      girl.apply('money', -girl.actions.pay);
      var change = girl.actions.pay - girl.desiredPay();
      change = change > 0 ? change * Girl.config.pay.above : change * Girl.config.pay.below;
      if (change > 0) {
        change = Math.pow(change, 0.66);
      }
      girl.apply('happiness', change);
    }
    done();
  });
});