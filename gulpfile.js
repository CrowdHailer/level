'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Clean the compiled folder before building or developing
gulp.task('clean', function () {
    var del = require('del');

    return del.sync(['www']);
});

// Copy static items to the publishable folder
gulp.task('public', function () {
    return gulp.src(['app/index.html', 'app/robots.txt', 'app/favicon.ico', 'app/favicon.png', 'app/images/*'], {base: 'app/'})
    .pipe(gulp.dest('www'))
    .pipe(browserSync.stream());
});

// Use sass to compile all styles from source
gulp.task('styles', function () {
    var sass = require('gulp-sass');
    var prefix = require('gulp-autoprefixer');

    return gulp.src('app/styles/app.scss', {base: './app'})
    .pipe(sass(
        {outputStyle: 'compressed'}
    ))
    .pipe(prefix())
    .pipe(gulp.dest('./www'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    var source = require('vinyl-source-stream');
    var browserify = require('browserify');

    return browserify('./app/scripts/app.js')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('app.js'))
    .pipe(gulp.dest('./www/'))
    .pipe(browserSync.stream());
});

// Create a version to publish
gulp.task('build', ['clean', 'public', 'styles', 'scripts']);

gulp.task('serve', ['public', 'styles', 'scripts'], function(){
    var superstatic = require('superstatic').server;

    var port = 3474;

    var app = superstatic({
        config: 'divshot.json',
        port: port
    });

    var server = app.listen(function () {
    });

    browserSync.init({
        proxy: 'localhost:' + port,
        open: false
    });
    gulp.watch('app/index.html', ['public']);
    gulp.watch('app/styles/**/*', ['styles']);
    gulp.watch('app/scripts/**/*', ['scripts']);
});
