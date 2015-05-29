var gulp = require('gulp')
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var del = require('del');

gulp.task('clean', function () {
  return del.sync(['www']);
});

gulp.task('copy', function () {
  return gulp.src(['app/index.html'], {base: 'app/'})
    .pipe(gulp.dest('www'));
});

gulp.task('build-scripts', function() {
  return browserify('./app/js/index.js')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('index.js'))
    .pipe(gulp.dest('./www/'));
});

gulp.task('build', ['clean', 'copy', 'build-scripts'])
