module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015'],
      },
      dist: {
        files: {
          'dist.js': 'index.js',
        },
      },
    },
  });

  grunt.registerTask('build', ['babel']);
};
