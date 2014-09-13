var gulp = require('gulp')
var requireDir = require('require-dir');
var dir = requireDir('./tasks');

gulp.task('default', ['build'], function () {
  // Watch only tracks files that exist when fired up
  gulp.start('serve');
})