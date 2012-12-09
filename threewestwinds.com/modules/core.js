var e = {};

define(['autorender/autorender', 'libraries/jquery-ui'], function(autorender) {
  e.invokeAll = function(hook) {
    if (!e[hook]) { return; }
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i in e[hook]) {
      e[hook][i].apply(this, args);
    }
  };

  Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
  };

  Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
  };

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  Math.shuffle = function (myArray) {
    var i = myArray.length;
    if ( i === 0 ) {
      return;
    }
    while ( --i ) {
      var j = Math.floor( Math.random() * ( i + 1 ) );
      var tempi = myArray[i];
      var tempj = myArray[j];
      myArray[i] = tempj;
      myArray[j] = tempi;
    }
  };
  Math.choice = function(obj) {
    var keys = Object.keys(obj);
    var i = Math.floor(Math.random() * keys.length);
    return obj[keys[i]];
  };

  $.ui.dialog.prototype.options.show = 'fade';
  $.ui.dialog.prototype.options.hide = 'fade';
  $.ui.dialog.prototype.options.modal = true;
  $.ui.dialog.prototype.options.width = 'auto';
  $.ui.dialog.prototype.options.resizable = false;

  $(document).on("dialogcreate", function(event, ui) {
    e.invokeAll('Autorender', event.target);
  }).on('dialogclose', function(event) {
    $(event.target).remove();
  });

  e.Autorender = [autorender];

  return {};
});