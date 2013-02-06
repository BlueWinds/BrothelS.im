"use strict";
e.Autorender = [];
e.Autorender.push(function(element, done) {
  $('button, a.button', element).button();
  $('*[title]', element).each(function() {
    $(this).tooltip({
      show: {
        delay: 300
      },
      content: $(this).attr('title')
    });
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

      var tabCount = $('.ui-tabs-panel', view).length;
      prev.click(function() {
        var activeTab = view.tabs('option', 'active');
        var tab = $('.ui-tabs-panel', view).eq(activeTab);
        var activeAccord = accordion && tab.accordion('option', 'active');
        if (activeAccord > 0) {
          activeAccord -= 1;
        }
        else if (activeTab > 0) {
          activeTab -= 1;
          tab = $('.ui-tabs-panel', view).eq(activeTab);
          activeAccord = $('.ui-accordion-header', tab).length - 1;
        }
        view.tabs('option', 'active', activeTab);
        if (accordion) {
          tab.accordion('option', 'active', activeAccord);
        }
      });
      next.click(function() {
        var activeTab = view.tabs('option', 'active');
        var tab = $('.ui-tabs-panel', view).eq(activeTab);
        var activeAccord = accordion && tab.accordion('option', 'active');
        if ($('.ui-accordion-header', tab).length > activeAccord + 1) {
          activeAccord += 1;
        } else if (tabCount > activeTab) {
          activeTab += 1;
          tab = $('.ui-tabs-panel', view).eq(activeTab);
          activeAccord = 0;
        }
        view.tabs('option', 'active', activeTab);
        if (accordion) {
          tab.accordion('option', 'active', activeAccord);
        }
      });

      close.click(function() {
        view.dialog('close');
      });

      var checkActive = function() {
        prev.button('option', 'disabled', false);
        next.button('option', 'disabled', false);
        var activeTab = view.tabs('option', 'active');
        var tab = $('.ui-tabs-panel', view).eq(activeTab);
        var activeAccord = accordion && tab.accordion('option', 'active');
        if (activeTab + 1 == tabCount) {
          if (!accordion || activeAccord + 1 == $('.ui-accordion-header', tab).length) {
            next.button('option', 'disabled', true).removeClass('ui-state-hover');
          }
        }
        if (!activeTab && !activeAccord) {
          prev.button('option', 'disabled', true).removeClass('ui-state-hover');
        }
      };

      if (accordion) {
        $('.ui-tabs-panel', view).bind('accordionactivate', checkActive);
      }
      view.bind('tabsactivate', checkActive);
      checkActive();
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
  $.ui.dialog.prototype.options.draggable = false;
  $.ui.tabs.prototype._tabKeydown = function() {};
  $.ui.sortable.prototype.options.distance = 20;
  $(document).on('dialogclose', function(event) {
    $(event.target).dialog('destroy').remove();
  }).on("dialogcreate", function(event) {
    e.invokeAll('Autorender', event.target);
  });
  $(document).keydown(function(event) {
    if (event.keyCode == 37) {
      $('.nav > .previous.button').click();
    } else if (event.keyCode == 39) {
      $('.nav > .next.button').click();
    }
  });
});