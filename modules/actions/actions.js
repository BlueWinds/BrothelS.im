e.GameUpgrade03.push(function(game, next) {
  for (var name in g.girls) {
    var girl = g.girls[name];
    delete girl.actions.morningLabel;
    delete girl.actions.eveningLabel;
    delete girl.actions.morningOption;
    delete girl.actions.eveningOption;
  }
  next();
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
  done();
});

e.GirlsPostMorning.push(function(done) {
  g.girls._filter('status', 'Hired').forEach(function(girl) {
    girl.verifyActions('evening');
  });
  done();
});

e.GirlNew.push(function(girl) {
  // Add action history, if it doesn't exist yet.
  if (!girl.actions.history) {
    girl.actions.history = {};
  }
  if (!girl.actions.morning && !girl.actions.evening) {
    girl.setAction(girl.action('Rest', { time: 'morning' }));
    girl.setAction(girl.action('Rest', { time: 'evening' }));
  }
});

e.GamePostDay.push(function(done) {
  g.girls._filter('status', 'Hired').forEach(function(girl) {
    girl.verifyActions();
  });
  done();
});

e.GamePreRender.push(function(done) {
  g.girls._filter('status', 'Hired').forEach(function(girl) {
    girl.verifyActions();
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
      $('.action:not(.disabled) ul', div).click(function() {
        var $this = $(this);
        var action = $this.attr('name');
        action = context.actions[action];
        $('li.this', div).fadeOut('fast', function() {
          $(this).fadeIn('fast').appendTo($this);
        });
        girl.setAction(action);
      });
      $('.action ol.dropdown li', div).click(function() {
        var action = $(this).closest('.action').children('ul').attr('name');
        action = context.actions[action];
        $(this).parent().children('li').removeClass('selected');
        $(this).addClass('selected');
        action.setOption($(this).attr('name'));
        $(this).closest('.action').children('ul').click();
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
  if (girl.status == 'Hired' && girl.actions[time]) {
    girl.actions[time].applyResults(done);
    return;
  }
  done();
});
