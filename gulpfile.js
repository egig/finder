'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');

var config = {
    srcDir: './src',
    distDir: './dist',
};

gulp.task('css', function() {
    return gulp.src(config.srcDir+'/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.distDir + '/css'));

});

gulp.task('concat', function(cb) {
    var stream = gulp.src([
        'src/js/plugin-boilerplate.js',
        'src/js/finder.js',
        'src/js/locale.js',
        'src/js/template.js',
        'src/js/DOM.js',
        'src/js/tree.js',
        'src/js/file.js',
        'src/js/layout.js',
        'src/js/locale.js',
        'src/js/jquery.finder.js'
    ])
        .pipe(concat('finder.js', {newLine: ';'}))
        .pipe(gulp.dest(config.distDir+'/js'));

    // return stream to do these in series
    return stream;
});

gulp.task('uglify', ['concat'], function() {
    var stream = gulp.src('./dist/js/finder.js')
    .pipe(uglify('finder.min.js'))
    .pipe(gulp.dest(config.distDir+'/js'));

    return stream;
});

gulp.task('default', ['css', 'concat','uglify']);
