'use strict';

var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function () {
    return del.sync(['www']);
});

gulp.task('copy', function () {
    return gulp.src(['app/config.xml', 'app/index.html'], {base: 'app/'})
        .pipe(gulp.dest('www'));
});

gulp.task('build', ['clean', 'copy', 'styles'])