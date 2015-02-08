module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/element.js', 'src/file.js', 'src/finder.js'],
        dest: 'dist/finder.js',
      }
    },
    uglify: {
      build: {
        src: 'dist/finder.js',
        dest: 'dist/finder.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);

};