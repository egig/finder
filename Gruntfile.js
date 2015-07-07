module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
            'src/plugin-boilerplate.js',
            'src/finder.js',
            'src/locale.js',
            'src/template.js',
            'src/DOM.js',
            'src/tree.js',
            'src/file.js',
            'src/layout.js',
            'src/locale.js',
            'src/jquery.finder.js'
        ],
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
