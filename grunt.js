module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'modules/**/*.js', 'content/**/*.js']
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint');
};