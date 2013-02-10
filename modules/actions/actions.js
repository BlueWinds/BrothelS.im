"use strict";
e.GameUpgrade03.push(function(game, next) {
  for (var name in g.girls) {
    var girl = g.girls[name];
    delete girl.actions.morningLabel;
    delete girl.actions.eveningLabel;
    delete girl.actions.morningOption;
    delete girl.actions.eveningOption;
  }
  delete g.ownerAction;
  next();
});

e.GameUpgrade05.push(function(game, done) {
  $.each(game.girls, function(name, girl) {
    if (girl.status == 'Hired') {
      girl.setAction(girl.action('Rest', { time: 'morning' }));
      girl.setAction(girl.action('Rest', { time: 'evening' }));
    } else {
      delete girl.actions.morning;
      delete girl.actions.evening;
    }
  });
  done();
});

var Actions = {};

e.Ready.push(function(done) {
  $.each(Actions, function(_id, action) {
    action._id = _id;
  });
  $.each(Girls, function(name, girl) {
    if (!girl.Actions) { return; }
    $.each(girl.Actions, function(_id, action) {
      action._id = _id;
    });
  });
  $(document).keydown(function(event) {
    if (!$('.ui-dialog').length && event.keyCode <= 53 && event.keyCode >= 49) {
      $('#girls div[name="morning"]').eq(event.keyCode - 49).click();
      event.preventDefault();
      return false;
    }
  });
  done();
});

e.GirlNew.push(function(girl) {
  // Add action history, if it doesn't exist yet.
  if (!girl.actions.history) {
    girl.actions.history = {};
  }
});

e.GirlRunTime.push(function(girl, time, done) {
  if (girl.status == 'Hired' && (time == 'evening' || !girl.actions[time].allDay)) {
    girl.verifyAction(time, true);
    girl.actions[time].getResults(function(results, context) {
      girl.actions[time].applyResults(results, done, context);
    });
    return;
  }
  done();
});

e.GamePreRender.push(function(done) {
  g.girls._filter('status', 'Hired').forEach(function(girl) {
    girl.verifyAction('morning');
    girl.verifyAction('evening');
  });
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
        otherActions: Girl.actions(time),
        actions: girl.potentialActions(time)
      };
      var div = $(ejs.render($('#actions_girl_template').html(), context).trim());
      $('.action:not(.disabled)', div).click(function() {
        var $this = $(this);
        var action = $this.children('ul').attr('name');
        action = context.actions[action];
        $('li.this', div).fadeOut('fast', function() {
          $(this).fadeIn('fast').appendTo($this.children('ul'));
        });
        girl.setAction(action);
      });
      $('.action ol.dropdown li', div).click(function() {
        var action = $(this).closest('.action').children('ul').attr('name');
        action = context.actions[action];
        $(this).parent().children('li').removeClass('selected');
        $(this).addClass('selected');
        action.setOption($(this).attr('name'));
      });
      e.invokeAll('Autorender', div);
      return div;
    }
    var context = {
      girls: g.girls._filter('status', 'Hired'),
      girl: girl,
      time: time
    };
    var view = $(ejs.render($('#actions_list_template').html(), context).trim());
    var tab = $('.girl[name="' + girl.name + '"] .' + time, view);
    tab.append(renderActions(girl, time));
    if (tab[0] !== $('.girl .morning', view)[0]) {
      var tempGirl = g.girls[tab.parent().attr('name')];
      var actionDiv = renderActions(tempGirl, 'morning');
      $('.girl .morning', view).first().append(actionDiv);
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

e.GirlSetStatus.push(function(girl) {
  if (girl.status == 'Hired') {
    girl.setAction(girl.action('Rest', { time: 'morning' }));
    girl.setAction(girl.action('Rest', { time: 'evening' }));
  } else {
    delete girl.actions.morning;
    delete girl.actions.evening;
  }
});
