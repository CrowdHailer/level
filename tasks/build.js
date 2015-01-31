var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

gulp.task('build-scripts', function() {
  return browserify('./app/js/index.js')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('index.js'))
    .pipe(gulp.dest('./www/'));
});
