'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function () {
    return gulp.src('app/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('www/'));
});