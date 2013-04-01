var module;
module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'modules/**/*.js', 'content/**/*.js']
    },
    jshint: {
      options: {
        globalstrict: true,
        browser: true,
        jquery: true,
        validthis: true,
        bitwise: true,
        camelcase: true,
        curly: true,
        indent: 2,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        undef: true,
        unused: true,
        strict: true,
        trailing: true
      },
      globals: {
        URL: true,
        head: true,
        ejs: true,
        tv4: true,
        Storage: true,
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
        T: true,
        Actions: true,
        Missions: true,
        Events: true,
        Girls: true,
        Buildings: true,
        Rooms: true,
        g: true,
        Person: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint');
};
