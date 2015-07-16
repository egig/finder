'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');

var config = {
    srcDir: './src',
    distDir: './dist',
};

gulp.task('concat', function(cb) {
    var stream = gulp.src([
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
    ])
        .pipe(concat('finder.js', {newLine: ';'}))
        .pipe(gulp.dest(config.distDir));

    // return stream to do these in series
    return stream;
});

gulp.task('uglify', ['concat'], function() {
    var stream = gulp.src('./dist/finder.js')
    .pipe(uglify('finder.min.js'))
    .pipe(gulp.dest(config.distDir));

    return stream;
});

gulp.task('default', ['concat','uglify']);
