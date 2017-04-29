"use strict";

e.Ready.push(function messagesReady(done) {
  $('head').append('<link href="modules/messages/messages.css" type="text/css" rel="stylesheet">');
  e.addTemplate('list-messages', 'modules/messages/list-messages.tpl.html');
  done();
});

function Message(obj) {
  $.extend(true, this, obj);
  this.weight = this.weight || 0;
  this._class = 'Message';
}

Message.send = function sendMessage(obj, context) {
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

e.Autorender.push(function messagesAutorender(element, done) {
  $('#image-size').remove();
  var text = '.message img, .mission img { max-width: ' + Game.config.imageSize + 'em; }';
  if (Game.config.imageSize === 0) {
    text += 'img { visibility: hidden; }';
    $('head title').remove();
  } else if (!$('head title').length) {
    $('<title>BrothelS.im</title>').prependTo('head');
  }
  $('<style type="text/css">').attr('id', 'image-size')
  .appendTo('head').html(text);
  done();
});

e.GameNew.push(function messagesGameNew(done) {
  g.messages = [];
  setTimeout(function openMessages() {
    $('#show-messages').click();
  }, 1000);
  done();
});

e.GamePreDay.push(function messagesPreDay(done) {
  g.messages = [];
  done();
});

e.GamePostDay.push(function messagesPostDay(done) {
  setTimeout(function openMessages() {
    $('#show-messages').click();
  }, 1);
  done();
});

e.GameRender.push(function messagesGameRender(done) {
  var button = $('<button id="show-messages">').html('Messages');
  if (!g.messages.length) {
    button.attr('disabled', 'disabled');
  }
  $('#top-right').prepend(button);
  button.click(function openMessages() {
    if ($(this).attr('disabled')) { return; }
    var messages = {};
    var groups = {};
    g.messages.forEach(function sortGroups(message) {
      var group = message.group;
      messages[group] = messages[group] || [];
      messages[group].push(message);
      groups[group] = Math.min(groups[group] || 100, message.weight);
    });
    groups = Object.keys(groups).sort((a, b) => groups[a] - groups[b]);
    var view = e.render('list-messages', {
      groups,
      messages
    });
    view.addClass('hidden').appendTo('body');
    e.invokeAll('Autorender', view, () => {
      view.dialog({
        title: 'Messages',
        maxHeight: '100%'
      });
      view.closest('.ui-dialog').addClass('tab-dialog');
      view.removeClass('hidden');
    });
  });
  done();
});
