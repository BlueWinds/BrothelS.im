var e = {
  invokeAll: function(hook) {
    if (!e[hook]) { return; }
    var args = Array.prototype.slice.call(arguments, 1);
    var $this = this;
    e[hook].forEach(function(func) {
      func.apply($this, args);
    });
  }
};

Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
};

Object.defineProperty(Object.prototype, "first", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function() {
    return this[Object.keys(this)[0]];
  }
});

Object.defineProperty(Object.prototype, "multiply", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function(val) {
    for (var i in this) {
      this[i] *= val;
    }
    return this;
  }
});

Object.defineProperty(Object.prototype, "add", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function(delta) {
    var i;
    if (typeof(delta) == 'object') {
      for (i in delta) {
        this[i] = this[i] || 0 + delta[i];
      }
      return this;
    }
    for (i in this) {
      this[i] += delta;
    }
    return this;
  }
});

Object.defineProperty(Object.prototype, "prefix", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function(str) {
    for (var i in this) {
      this[i] = str + this[i];
    }
    return this;
  }
});

Object.defineProperty(Object.prototype, "flt", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: filter = function(key, value, value2) {
    var result = [], i;
    if (value2) {
      for (i in this) {
        if (this[i][key] && this[i][key][value] === value2) { result.push(this[i]); }
      }
    } else {
      for (i in this) {
        if (this[i][key] === value) { result.push(this[i]); }
      }
    }
    return result;
  }
});

Object.defineProperty(Object.prototype, "flatten", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: flatten = function() {
    var flat = [];
    for (var key in this) {
      if (this[key][0]) {
        Array.prototype.push.apply(flat, this[key]);
      } else {
        flat.push(this[key]);
      }
    }
    return flat;
  }
});

Object.defineProperty(Object.prototype, "sum", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function(key) {
    if (key) {
      return this.accumulate(key).sum();
    }
    var sum = 0;
    for (var i in this) { sum += this[i]; }
    return sum;
  }
});

Object.defineProperty(Object.prototype, "accumulate", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function(key) {
    var acc = [];
    for (var i in this) {
      if (this[i][key] !== undefined) {
        acc.push(this[i][key]);
      }
    }
    return acc;
  }
});

Object.defineProperty(Object.prototype, "toObject", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function(key) {
    var obj = {};
    for (var i in this) {
      obj[this[i][key]] = this[i];
    }
    return obj;
  }
});

Object.defineProperty(Object.prototype, "sortToObject", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function(key) {
    var obj = {};
    for (var i in this) {
      if (!obj[this[i][key]]) {
        obj[this[i][key]] = [];
      }
      obj[this[i][key]].push(this[i]);
    }
    return obj;
  }
});

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


$(function() {
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
});
