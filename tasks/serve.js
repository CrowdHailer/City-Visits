'use strict';

var gulp = require('gulp');

function startExpress(port, path) {
    var express = require('express'),
        app = express();

    app.use(require('connect-livereload')());
    app.use(express.static(path));
    app.listen(port);
}

var lr;
function startLivereload() {
    lr = require('tiny-lr')();
    lr.listen(35729);
}

function notifyLivereload(event) {
    gulp.src(event.path, {read: false})
        .pipe(require('gulp-livereload')(lr));
}

gulp.task('serve', function () {
    var open = require("open"),
        args = require('./argv'),
        port = 4000;

    startExpress(port, 'www');
    startLivereload();

    gulp.watch('www/*', notifyLivereload);
    // gulp.watch('app/js/*.js', ['scripts']);
    gulp.watch('app/scss/*.scss', ['styles']);
    // gulp.watch(['app/index.html', 'app/partials/*.html'], ['content']);
    gulp.watch(['app/index.html'], ['copy'])

    if (args.open) {
        open('http://localhost:' + port);
    }
});