
var Message = function(obj) {
  $.extend(this, obj);
};

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
    var view = $(ejs.render($('#messages_list_template').html(), {
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
