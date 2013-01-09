Globalize.cultures.en.numberFormat.currency.decimals = 0;

e.Autorender = e.Autorender || [];
e.Autorender.push(function(element, done) {
  $('button, a.button', element).button();
  $(element).tooltip({
    show: {
      delay: 300
    }
  });
  $('.bar-sparkline', element).sparkline('html', {
    lineColor: '#E3AC00',
    tooltipPrefix: '$',
    type: 'line',
    spotRadius: 0,
    fillColor: false,
    width: '120px',
    height: '25px'
  });
  $('.accordion', element).accordion({
    heightStyle: 'content'
  }).each(function() {
    var accordion = $(this);
    if (accordion.find('.ui-accordion-content.active').length) {
      var active = accordion.find('.ui-accordion-content').index(accordion.find('.ui-accordion-content.active'));
      accordion.accordion('option', 'active', active);
    }
  });
  $('select:not([multiple])', element).wrap('<div class="styled-select">');
  var view = $(element);
  if (view.hasClass('vertical-tabs')) {
    view.tabs({
      heightStyle: 'content',
      hide: {
        effect: 'fadeOut',
        duration: 200
      },
      show: {
        effect: 'fadeIn',
        duration: 200
      }
    }).addClass("ui-tabs-vertical ui-helper-clearfix");
    if (view.find('.ui-tabs-panel.active').length) {
      var active = view.find('.ui-tabs-panel').index(view.find('.ui-tabs-panel.active'));
      view.tabs('option', 'active', active);
    }
    $('li', element).removeClass("ui-corner-top").addClass("ui-corner-left ui-helper-clearfix");
    $('.ui-tabs-nav', element).removeClass("ui-corner-all").addClass("ui-corner-left");
    $('.ui-tabs-panel', element).addClass("ui-corner-right");

    if (view.hasClass('navigable') && !$('.nav', element).length) {
      var accordion = Boolean($('.accordion', view).length);
      var nav = $('<div class="nav">').prependTo(view);
      var prev = $('<a class="previous button">Previous</button>').appendTo(nav).button();
      var next = $('<a class="next button">Next</button>').appendTo(nav).button();
      var close = $('<a class="close button">x</button>').appendTo(nav).button();

      var tab_count = $('.ui-tabs-panel', view).length;
      prev.click(function(event) {
        var active_tab = view.tabs('option', 'active');
        var tab = $('.ui-tabs-panel', view).eq(active_tab);
        var active_acc = accordion && tab.accordion('option', 'active');
        if (active_acc > 0) {
          active_acc -= 1;
        }
        else if (active_tab > 0) {
          active_tab -= 1;
          tab = $('.ui-tabs-panel', view).eq(active_tab);
          active_acc = $('.ui-accordion-header', tab).length - 1;
        }
        view.tabs('option', 'active', active_tab);
        if (accordion) {
          tab.accordion('option', 'active', active_acc);
        }
      });
      next.click(function(event) {
        var active_tab = view.tabs('option', 'active');
        var tab = $('.ui-tabs-panel', view).eq(active_tab);
        var active_acc = accordion && tab.accordion('option', 'active');
        if ($('.ui-accordion-header', tab).length > active_acc + 1) {
          active_acc += 1;
        } else if (tab_count > active_tab) {
          active_tab += 1;
          tab = $('.ui-tabs-panel', view).eq(active_tab);
          active_acc = 0;
        }
        view.tabs('option', 'active', active_tab);
        if (accordion) {
          tab.accordion('option', 'active', active_acc);
        }
      });

      close.click(function(event) {
        view.dialog('close');
      });

      var check_active = function(event, ui) {
        prev.button('option', 'disabled', false);
        next.button('option', 'disabled', false);
        var active_tab = view.tabs('option', 'active');
        var tab = $('.ui-tabs-panel', view).eq(active_tab);
        var active_acc = accordion && tab.accordion('option', 'active');
        if (active_tab + 1 == tab_count) {
          if (!accordion || active_acc + 1 == $('.ui-accordion-header', tab).length) {
            next.button('option', 'disabled', true).removeClass('ui-state-hover');
          }
        }
        if (!active_tab && !active_acc) {
          prev.button('option', 'disabled', true).removeClass('ui-state-hover');
        }
      };

      if (accordion) {
        $('.ui-tabs-panel', view).bind('accordionactivate', check_active);
      }
      view.bind('tabsactivate', check_active);
      check_active();
    }
  }
  $('.horizontal-tabs', view).tabs();
  $('label.checkbox', view).click(function() {
    $(this).toggleClass('checked');
  });
  done();
});

$(function() {
  $.ui.dialog.prototype.options.show = 'fade';
  $.ui.dialog.prototype.options.hide = 'fade';
  $.ui.dialog.prototype.options.modal = true;
  $.ui.dialog.prototype.options.width = 'auto';
  $.ui.dialog.prototype.options.resizable = false;
  $.ui.dialog.prototype.options.position = {
    my: 'center center',
    at: 'center center',
    of: window,
    collision: 'fit'
  };
  $.ui.tabs.prototype._tabKeydown = function() {};
  $(document).on('dialogclose', function(event) {
    $(event.target).dialog('destroy').remove();
  }).on("dialogcreate", function(event, ui) {
    e.invokeAll('Autorender', function() {}, event.target);
  });
  $(document).keydown(function(event) {
    if (event.keyCode == 37) {
      $('.nav > .previous.button').click();
    } else if (event.keyCode == 39) {
      $('.nav > .next.button').click();
    }
  });
});