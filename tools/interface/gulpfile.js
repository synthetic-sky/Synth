var fs = require('fs');
var gulp = require ('gulp');
var plumber = require ('gulp-plumber')
var regenerator = require ('gulp-regenerator');
var replace = require ('gulp-replace');
var watch = require ('gulp-watch');

var client_path_re = /("|\')\/?client(\/?)/g;
var client_path_repl = '$1/dist$2';

gulp.task ('default', ['watch']);

gulp.task ('copy', ['copy-css', 'copy-js'], function () {
  gulp.src ('index.html')
      .pipe (replace (client_path_re, client_path_repl))
      .pipe (gulp.dest ('dist'));
});

gulp.task ('copy-js', function () {
  gulp.src ('client/**/*.js')
    .pipe (plumber ())
    .pipe (regenerator ())
      .pipe (replace (client_path_re, client_path_repl))
      .pipe (gulp.dest ('dist'));
});

gulp.task ('copy-css', function () {
  gulp.src ('client/**/*.css')
    .pipe (gulp.dest ('dist'));
});


gulp.task ('watch', function () {

  watch ({ glob: 'client/**/*.js' })
    .pipe (plumber ())
    .pipe (regenerator ())
      .pipe (replace (client_path_re, client_path_repl))
      .pipe (gulp.dest ('dist'));

  watch ({ glob: 'index.html' }, function () {
    require ('child_process') .exec ("gulp copy");
  });

  watch ({ glob: 'client/**/*.css' })
    .pipe (gulp.dest ('dist'));
});


gulp.task ('watch-manually', function () {
  setInterval (function () {
    console.log ("triggering manual update");
    gulp.start ('copy');
  }, 5000);
});
