ejs = ((() => {

// CommonJS require()

function require(p){
  if ('fs' == p) return {};
  var path = require.resolve(p);
  var mod = require.modules[path];
  if (!mod) throw new Error('failed to require "' + p + '"');
  if (!mod.exports) {
    mod.exports = {};
    mod.call(mod.exports, mod, mod.exports, require.relative(path));
  }
  return mod.exports;
}

require.modules = {};

require.resolve = path => {
  var orig = path;
  var reg = path + '.js';
  var index = path + '/index.js';
  return require.modules[reg] && reg
    || require.modules[index] && index
    || orig;
};

require.register = (path, fn) => {
    require.modules[path] = fn;
  };

require.relative = parent => p => {
  if ('.' != p.substr(0, 1)) return require(p);

  var path = parent.split('/');
  var segs = p.split('/');
  path.pop();

  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];
    if ('..' == seg) path.pop();
    else if ('.' != seg) path.push(seg);
  }

  return require(path.join('/'));
};


require.register("ejs.js", (module, exports, require) => {
  /*!
   * EJS
   * Copyright(c) 2012 TJ Holowaychuk <tj@vision-media.ca>
   * MIT Licensed
   */

  /**
   * Module dependencies.
   */

  var utils = require('./utils');

  var fs = require('fs');

  /**
   * Library version.
   */

  exports.version = '0.7.2';

  /**
   * Filters.
   *
   * @type Object
   */

  var filters = exports.filters = require('./filters');

  /**
   * Intermediate js cache.
   *
   * @type Object
   */

  var cache = {};

  /**
   * Clear intermediate js cache.
   *
   * @api public
   */

  exports.clearCache = () => {
    cache = {};
  };

  /**
   * Translate filtered code into function calls.
   *
   * @param {String} js
   * @return {String}
   * @api private
   */

  function filtered(js) {
    return js.substr(1).split('|').reduce((js, filter) => {
      var parts = filter.split(':');
      var name = parts.shift();
      var args = parts.shift() || '';
      if (args) args = ', ' + args;
      return 'filters.' + name + '(' + js + args + ')';
    });
  }

  /**
   * Re-throw the given `err` in context to the
   * `str` of ejs, `filename`, and `lineno`.
   *
   * @param {Error} err
   * @param {String} str
   * @param {String} filename
   * @param {String} lineno
   * @api private
   */

  function rethrow(err, str, filename, lineno){
    var lines = str.split('\n');
    var start = Math.max(lineno - 3, 0);
    var end = Math.min(lines.length, lineno + 3);

    // Error context
    var context = lines.slice(start, end).map((line, i) => {
      var curr = i + start + 1;
      return (curr == lineno ? ' >> ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');

    // Alter exception message
    err.path = filename;
    err.message = (filename || 'ejs') + ':'
      + lineno + '\n'
      + context + '\n\n'
      + err.message;

    throw err;
  }

  /**
   * Parse the given `str` of ejs, returning the function body.
   *
   * @param {String} str
   * @return {String}
   * @api public
   */

  var parse = exports.parse = (str, options) => {
    var options = options || {};
    var open = options.open || exports.open || '<<';
    var close = options.close || exports.close || '>>';

    var buf = [
        "var buf = [];"
      , "\nwith (locals) {"
      , "\n  buf.push('"
    ];

    var lineno = 1;

    var consumeEOL = false;
    if (!str) { console.log(options); }
    for (var i = 0, len = str.length; i < len; ++i) {
      if (str.slice(i, open.length + i) == open) {
        i += open.length

        var prefix;
        var postfix;
        var line = '__stack.lineno=' + lineno;
        switch (str.substr(i, 1)) {
          case '=':
            prefix = "', escape((" + line + ', ';
            postfix = ")), '";
            ++i;
            break;
          case '-':
            prefix = "', (" + line + ', ';
            postfix = "), '";
            ++i;
            break;
          default:
            prefix = "');" + line + ';';
            postfix = "; buf.push('";
        }

        var end = str.indexOf(close, i);
        var js = str.substring(i, end);
        var start = i;
        var n = 0;

        if ('-' == js[js.length-1]){
          js = js.substring(0, js.length - 2);
          consumeEOL = true;
        }

        while (~(n = js.indexOf("\n", n))) n++, lineno++;
        if (js.substr(0, 1) == ':') js = filtered(js);
        buf.push(prefix, js, postfix);
        i += end - start + close.length - 1;
      } else if (str.substr(i, 1) == "\\") {
        buf.push("\\\\");
      } else if (str.substr(i, 1) == "'") {
        buf.push("\\'");
      } else if (str.substr(i, 1) == "\r") {
        buf.push(" ");
      } else if (str.substr(i, 1) == "\n") {
        if (consumeEOL) {
          consumeEOL = false;
        } else {
          buf.push("\\n");
          lineno++;
        }
      } else {
        buf.push(str.substr(i, 1));
      }
    }

    buf.push("');\n}\nreturn buf.join('');");
    return buf.join('');
  };

  /**
   * Compile the given `str` of ejs into a `Function`.
   *
   * @param {String} str
   * @param {Object} options
   * @return {Function}
   * @api public
   */

  var compile = exports.compile = (str, options) => {
    options = options || {};

    var input = JSON.stringify(str);

    var filename = options.filename
          ? JSON.stringify(options.filename)
          : 'undefined';

    // Adds the fancy stack trace meta info
    str = [
      'var __stack = { lineno: 1, input: ' + input + ', filename: ' + filename + ' };',
      rethrow.toString(),
      'try {',
      exports.parse(str, options),
      '} catch (err) {',
      '  rethrow(err, __stack.input, __stack.filename, __stack.lineno);',
      '}'
    ].join("\n");

    if (options.debug) console.log(str);
    try {
      var fn = new Function('locals, filters, escape', str);
    } catch(err) {
      console.log(str);
      throw err;
    }
    return function(locals){
      return fn.call(this, locals, filters, utils.escape);
    }
  };

  /**
   * Render the given `str` of ejs.
   *
   * Options:
   *
   *   - `locals`          Local variables object
   *   - `cache`           Compiled functions are cached, requires `filename`
   *   - `filename`        Used by `cache` to key caches
   *   - `scope`           Function execution context
   *   - `debug`           Output generated function body
   *   - `open`            Open tag, defaulting to "<<"
   *   - `close`           Closing tag, defaulting to ">>"
   *
   * @param {String} str
   * @param {Object} options
   * @return {String}
   * @api public
   */

  exports.render = (str, options) => {
    var fn;
    var options = options || {};
    //   console.log(str);

    if (options.cache) {
      if (options.filename) {
        fn = cache[options.filename] || (cache[options.filename] = compile(str, options));
      } else {
        throw new Error('"cache" option requires "filename".');
      }
    } else {
      fn = compile(str, options);
    }

    options.__proto__ = options.locals;
    try {
      return fn.call(options.scope, options);
    } catch(err) {
      console.log(str);
      console.log(options);
      throw err;
    }
  };

  /**
   * Render an EJS file at the given `path` and callback `fn(err, str)`.
   *
   * @param {String} path
   * @param {Object|Function} options or callback
   * @param {Function} fn
   * @api public
   */

  exports.renderFile = (path, options, fn) => {
    var key = path + ':string';

    if ('function' == typeof options) {
      fn = options, options = {};
    }

    options.filename = path;

    try {
      var str = options.cache
        ? cache[key] || (cache[key] = fs.readFileSync(path, 'utf8'))
        : fs.readFileSync(path, 'utf8');

      fn(null, exports.render(str, options));
    } catch (err) {
      fn(err);
    }
  };

  // express support

  exports.__express = exports.renderFile;

  /**
   * Expose to require().
   */

  if (require.extensions) {
    require.extensions['.ejs'] = (module, filename) => {
      source = require('fs').readFileSync(filename, 'utf-8');
      module._compile(compile(source, {}), filename);
    };
  } else if (require.registerExtension) {
    require.registerExtension('.ejs', src => compile(src, {}));
  }
}); // module: ejs.js

require.register("filters.js", (module, exports, require) => {

/*!
 * EJS - Filters
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * First element of the target `obj`.
 */

exports.first = obj => obj[0];

/**
 * Last element of the target `obj`.
 */

exports.last = obj => obj[obj.length - 1];

/**
 * Capitalize the first letter of the target `str`.
 */

exports.capitalize = str => {
  str = String(str);
  return str[0].toUpperCase() + str.substr(1, str.length);
};

/**
 * Downcase the target `str`.
 */

exports.downcase = str => String(str).toLowerCase();

/**
 * Uppercase the target `str`.
 */

exports.upcase = str => String(str).toUpperCase();

/**
 * Sort the target `obj`.
 */

exports.sort = obj => Object.create(obj).sort();

/**
 * Sort the target `obj` by the given `prop` ascending.
 */

exports.sort_by = (obj, prop) => Object.create(obj).sort((a, b) => {
  a = a[prop], b = b[prop];
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
});

/**
 * Size or length of the target `obj`.
 */

exports.size = exports.length = obj => obj.length;

/**
 * Add `a` and `b`.
 */

exports.plus = (a, b) => Number(a) + Number(b);

/**
 * Subtract `b` from `a`.
 */

exports.minus = (a, b) => Number(a) - Number(b);

/**
 * Multiply `a` by `b`.
 */

exports.times = (a, b) => Number(a) * Number(b);

/**
 * Divide `a` by `b`.
 */

exports.divided_by = (a, b) => Number(a) / Number(b);

/**
 * Join `obj` with the given `str`.
 */

exports.join = (obj, str) => obj.join(str || ', ');

/**
 * Truncate `str` to `len`.
 */

exports.truncate = (str, len) => {
  str = String(str);
  return str.substr(0, len);
};

/**
 * Truncate `str` to `n` words.
 */

exports.truncate_words = (str, n) => {
  var str = String(str);
  var words = str.split(/ +/);
  return words.slice(0, n).join(' ');
};

/**
 * Replace `pattern` with `substitution` in `str`.
 */

exports.replace = (str, pattern, substitution) => String(str).replace(pattern, substitution || '');

/**
 * Prepend `val` to `obj`.
 */

exports.prepend = (obj, val) => Array.isArray(obj)
  ? [val].concat(obj)
  : val + obj;

/**
 * Append `val` to `obj`.
 */

exports.append = (obj, val) => Array.isArray(obj)
  ? obj.concat(val)
  : obj + val;

/**
 * Map the given `prop`.
 */

exports.map = (arr, prop) => arr.map(obj => obj[prop]);

/**
 * Reverse the given `obj`.
 */

exports.reverse = obj => Array.isArray(obj)
  ? obj.reverse()
  : String(obj).split('').reverse().join('');

/**
 * Get `prop` of the given `obj`.
 */

exports.get = (obj, prop) => obj[prop];

/**
 * Packs the given `obj` into json string
 */
exports.json = obj => JSON.stringify(obj);
}); // module: filters.js

require.register("utils.js", (module, exports, require) => {

/*!
 * EJS
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = html => String(html)
  .replace(/&(?!\w+;)/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

}); // module: utils.js

 return require("ejs");
}))();
