var gulp = require ('gulp');
var plumber = require ('gulp-plumber')
var regenerator = require ('gulp-regenerator');
var replace = require ('gulp-replace');

var client_path_re = /("|\')\/?client(\/?)/g;
var client_path_repl = '$1/dist$2';

gulp.task ('default', ['watch'], function () { });

gulp.task ('regenerate', ['watch'], function () {
    gulp.src ('client/**/*.js')
        .pipe (plumber ())
        .pipe (regenerator ())
        .pipe (replace (client_path_re, client_path_repl))
        .pipe (gulp.dest ('dist'));
});

gulp.task ('watch', function () {
  gulp.watch (['client/**/*.js'], ['regenerate', 'copy']);
});

gulp.task ('copy', function () {
    gulp.src ('client/**/*.css')
        .pipe (gulp.dest ('dist'));
    gulp.src ('*.html')
        .pipe (replace (client_path_re, client_path_repl))
        .pipe (gulp.dest ('dist'));
});
