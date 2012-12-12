define(['text!./messages.html', 'game/game'], function(message_template) {
  $('head').append('<link type="text/css" rel="stylesheet" href="modules/messages/messages.css">');

  function Message(obj) {
    $.extend(this, obj);
  }

  Message.prototype.save = function(target) {
    if (!g.messages) {
      g.messages = {};
    }
    g.messages[target] = g.messages[target] || [];
    g.messages[target].push(this);
  };

  e.GameInit.push(function() {
    g.messages = g.messages || {};
    $.each(g.messages, function(target, messages) {
      $.each(messages, function(i, message) {
        g.messages[target][i] = new Message(message);
      });
    });
  });
  e.GamePreDay.push(function() {
    g.messagesShown = false;
    g.messages = {};
  });

  e.GameRender.push(function() {
    var button = $('<button>').html('Messages').button();
    $('#top-right').prepend(button);
    button.click(function() {
      g.messagesShown = true;
      var view = $(ejs.render(message_template, {
        messages: g.messages
      }));
      view.appendTo('body');
      e.invokeAll('Autorender', view);
      view.dialog({
        title: 'Messages',
        maxHeight: '100%'
      });
      view.closest('.ui-dialog').addClass('tab-dialog');
    });
    if (!g.messagesShown) {
      button.click();
    }
  });

  return Message;
});