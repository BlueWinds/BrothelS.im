"use strict";
var e = {
  // (hook, [arg1, ...], done)
  invokeAll: function invokeAll(hook) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = e[hook];
    e.runSeries.apply(this, args);
  },
  // (hook, [arg1, ...])
  invokeAllSync: function invokeAllSync(hook) {
    if (!e[hook]) { return; }
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i in e[hook]) {
      e[hook][i].apply(this, args);
    }
  },
  // (items, [arg1, ...])
  runSeries: function runSeries(items) {
    var args = Array.prototype.slice.call(arguments, 1);
    var done = typeof(args._last()) == 'function' ? args.pop() : $.noop;
    if (!items || !items.length) { setTimeout(done, 0); return; }
    var $this = this;
    function next() {
      i++;
      if (i == items.length) {
        setTimeout(done, 0);
        return;
      }
      items[i].apply($this, args);
    }
    args.push(next);
    var i = -1;
    next();
  },
  loadAll: function loadAll() {
    var args = $.extend([], arguments);
    args = args._flatten();
    var done = args.pop();
    args = args.map(i => i + '?v=' + gameVersion);
    args.push(done);
    head.js.apply(this, args);
  },
  addTemplate: function addTemplate(name, url, done) {
    var promise = $.ajax(url + '?v=' + gameVersion).done(data => {
      e.render.cache[name] = ejs.compile(data);
    });
    if (done) { promise.done(done); }
  },
  render: function render(name, context, string) {
    var item = e.render.cache[name](context || {});
    return string ? item : $(item);
  },
  Ready: []
};

e.render.cache = {};

Storage.prototype.setObject = function setObject(key, value) {
  this.setItem(key, JSON.stringify(value));
};

Object.defineProperty(Object.prototype, "_first", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function _first() {
    return this[Object.keys(this)[0]];
  }
});

Object.defineProperty(Object.prototype, "_last", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function _last() {
    return this[Object.keys(this)[Object.keys(this).length - 1]];
  }
});

Object.defineProperty(Object.prototype, "_multiply", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function _multiply(val) {
    for (var i in this) {
      this[i] *= val;
    }
    return this;
  }
});

Object.defineProperty(Object.prototype, "_add", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function _add(delta) {
    var i;
    if (typeof(delta) == 'object') {
      for (i in delta) {
        if (typeof(delta[i]) == 'object') {
          this[i] = this[i] || {};
          this[i]._add(delta[i]);
        } else {
          this[i] = (this[i] || 0) + delta[i];
        }
      }
      return this;
    }
    for (i in this) {
      this[i] += delta;
    }
    return this;
  }
});

Object.defineProperty(Object.prototype, "_prefix", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function _prefix(str) {
    for (var i in this) {
      this[i] = str + this[i];
    }
    return this;
  }
});

Object.defineProperty(Object.prototype, "_filter", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function _filter(key, value, value2) {
    var result = [];
    var i;
    if (value2) {
      for (i in this) {
        if (this[i][key] && this[i][key][value] === value2) { result.push(this[i]); }
      }
    } else if (value !== undefined) {
      for (i in this) {
        if (this[i][key] === value) { result.push(this[i]); }
      }
    } else {
      for (i in this) {
        if (this[i][key] !== undefined) { result.push(this[i]); }
      }
    }
    return result;
  }
});

Object.defineProperty(Object.prototype, "_flatten", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function _flatten() {
    var flat = [];
    for (var key in this) {
      if (typeof(this[key]) == 'object' || typeof(this[key]) == 'array') {
        Array.prototype.push.apply(flat, this[key]);
      } else {
        flat.push(this[key]);
      }
    }
    return flat;
  }
});

Object.defineProperty(Object.prototype, "_accumulate", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function _accumulate(key) {
    var acc = [];
    for (var i in this) {
      if (this[i][key] !== undefined) {
        acc.push(this[i][key]);
      }
    }
    return acc;
  }
});

Object.defineProperty(Object.prototype, "_sum", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function _sum(key) {
    if (key) {
      return this._accumulate(key)._sum();
    }
    var sum = 0;
    for (var i in this) { sum += this[i]; }
    return sum;
  }
});

Object.defineProperty(Object.prototype, "_toObject", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function _toObject(key) {
    var obj = {};
    for (var i in this) {
      obj[this[i][key]] = this[i];
    }
    return obj;
  }
});

Object.defineProperty(Object.prototype, "_toArray", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function _toArray() {
    var arr = [];
    for (var i in this) {
      arr.push(this[i]);
    }
    return arr;
  }
});

Object.defineProperty(Object.prototype, "_sortToObject", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function _sortToObject(key) {
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

Object.defineProperty(Object.prototype, "_sort", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function _sort(key, reverse) {
    var ret = this._toArray();
    ret.sort((a, b) => reverse ? b[key] - a[key] : a[key] - b[key]);
    return ret;
  }
});

Object.defineProperty(Array.prototype, "_append", {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function _append(items) {
    this.push(...items);
    return this;
  }
});

Storage.prototype.getObject = function getObject(key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
};

String.prototype.capitalize = function capitalize() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Math.shuffle = function shuffle(myArray) {
  var i = myArray.length;
  if (i === 0) {
    return;
  }
  while (--i) {
    var j = Math.floor(Math.random() * (i + 1));
    var tempi = myArray[i];
    var tempj = myArray[j];
    myArray[i] = tempj;
    myArray[j] = tempi;
  }
};
Math.choice = function choice(obj) {
  var keys = Object.keys(obj);
  var i = Math.floor(Math.random() * keys.length);
  return obj[keys[i]];
};

Math.weightedRandom = function weightedRandom(variants) {
  var i = 0;
  var rand = Math.random();
  while (i < variants.length) {
    if (rand < variants[i]) { break; }
    rand -= variants[i];
    i++;
  }
  return i;
};

if (window.ejs) {
  ejs.open = '<<';
  ejs.close = '>>';
}

window.onerror = function onerror(message, file, line) {
  var error = $('<div>');
  $('<div class="text">').html(message).appendTo(error);
  $('<div class="file">').html(file).appendTo(error);
  $('<div class="line">').html('Line ' + line).appendTo(error);
  $('<div class="request">').html('Attach an export of your current game when reporting bugs.').appendTo(error);
  $('#error').append(error);
};
