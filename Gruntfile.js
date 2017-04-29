/* global require, __dirname */
var module;
var fs = require('fs');
module.exports = function doGrunt(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['*.js', 'modules/**/*.js', 'content/**/*.js'],
      options: {
        bitwise: true,
        camelcase: true,
        curly: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        strict: true,
        undef: true,
        unused: true,
        trailing: true,
        /* Relaxing */
        asi: true,
        globalstrict: true,
        multistr: true,
        validthis: true,
        /* Environment */
        jquery: true,
        browser: true,
        globals: {
          Storage: true,
          URL: true,
          head: true,
          ejs: true,
          tv4: true,
          nameGen: true,
          e: true,
          Schemas: true,
          __: true,
          Game: true,
          Girl: true,
          Building: true,
          Action: true,
          Resolvable: true,
          Mission: true,
          Message: true,
          Event: true,
          Actions: true,
          Missions: true,
          Events: true,
          Girls: true,
          Buildings: true,
          Rooms: true,
          g: true,
          Person: true,
          gameVersion: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('addVersion', function () {
    var done = this.async();
    var index = __dirname + '/index.html';
    fs.readFile(index, 'utf-8', (err, data) => {
      var version = data.match(/Version = ([0-9\.]+)/)[0];
      version = version.substr(10);
      data = (data).replace(/\?v=[0-9\.]+/g, '?v=' + version);
      grunt.log.ok('Set script query-string to ' + version);
      fs.writeFile(index, data, done);
    });
  });
  // Default task.
  grunt.registerTask('default', ['jshint', 'addVersion']);
};
