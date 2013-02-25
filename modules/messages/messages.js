"use strict";
e.GameUpgrade03.push(function(game, next) {
  var messages = game.messages;
  game.messages = [];
  for (var group in messages) {
    for (var i in messages[group]) {
      var message = messages[group][i];
      message.label = message.type;
      delete message.type;
      delete message.time;
      message.group = group;
      game.messages.push(message);
    }
  }
  next();
});

e.GameUpgrade04.push(function(game, next) {
  delete game.messagesShown;
  g.messages.forEach(function(message) {
    message._class = 'Message';
  });
  next();
});

var Message = function(obj) {
  $.extend(true, this, obj);
  this.weight = this.weight || 0;
  this._class = 'Message';
};

Message.send = function(obj, context) {
  var message = new Message(obj);
  if (context) {
    message.group = ejs.render(message.group, context);
    message.weight = message.weight || 0;
    message.label = ejs.render(message.label, context);
    message.image = ejs.render(message.image, context);
    message.text = ejs.render(message.text, context);
    message.delta = message.delta || {};
  }
  g.messages.push(message);
  return message;
};

e.GameNew.push(function(done) {
  g.messages = [];
  setTimeout(function() {
    $('#show-messages').click();
  }, 1000);
  done();
});

e.GamePreDay.push(function(done) {
  g.messages = [];
  done();
});

e.GamePostDay.push(function(done) {
  setTimeout(function() {
    $('#show-messages').click();
  }, 1);
  done();
});

e.GameRender.push(function(done) {
  var button = $('<button id="show-messages">').html('Messages');
  if (!g.messages.length) {
    button.attr('disabled', 'disabled');
  }
  $('#top-right').prepend(button);
  button.click(function() {
    if ($(this).attr('disabled')) { return; }
    var messages = {};
    var groups = {};
    g.messages.forEach(function(message) {
      var group = message.group;
      messages[group] = messages[group] || [];
      messages[group].push(message);
      groups[group] = Math.min(groups[group] || 100, message.weight);
    });
    groups = Object.keys(groups).sort(function(a, b) {
      return groups[a] - groups[b];
    });
    var view = $(ejs.render($('#messages_list_template').html(), {
      groups: groups,
      messages: messages
    }).trim());
    view.appendTo('body');
    e.invokeAll('Autorender', view, function() {
      view.dialog({
        title: 'Messages',
        maxHeight: '100%'
      });
      view.closest('.ui-dialog').addClass('tab-dialog');
    });
  });
  done();
});
