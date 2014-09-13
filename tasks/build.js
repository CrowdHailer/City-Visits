'use strict';

var gulp = require('gulp');
var del = require('del');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var inject = require('gulp-inject');

// Returns File object as string, to inject in html file
function fileContents(filePath, file) {
    return file.contents.toString('utf8');
}

// Add's display none propery to svg with definitions
function transformSvg(svg, cb) {
    svg.attr({ style: 'display:none' });
    cb(null);
}

gulp.task('clean', function () {
    return del.sync(['www']);
});

gulp.task('copy', function () {
    return gulp.src(['app/config.xml'], {base: 'app/'})
        .pipe(gulp.dest('www'));
});

gulp.task('content', function () {
    var svgs = gulp.src('app/resources/symbols/*.svg')
        .pipe(svgmin())
        .pipe(svgstore({inlineSvg: true, transformSvg: transformSvg}));

    return gulp.src('app/index.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('www/'));
});


gulp.task('build', ['clean', 'copy', 'styles', 'content'])