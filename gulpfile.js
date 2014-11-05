var gulp = require('gulp');
var jsoncombine = require("gulp-jsoncombine");
var sass = require('gulp-sass');
var colors = require('colors');
var minifyCSS = require('gulp-minify-css');
var watch = require('gulp-watch');
var rename = require('gulp-rename');

var paths = {
  sass: ['./src/**/*.scss', './src/*.scss'],
  appSass: './src/app.scss',
  alignmentSass: './src/ui-components/alignment.scss',
  distFonts: './dist/fonts',
  distCss: './dist/css',
  fonts: ['./bower_components/font-awesome/fonts/*.*','./bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*.*']
};

gulp.task('build-alignment', function () {
  return gulp.src(paths.alignmentSass)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(minifyCSS({ keepBreaks: true }))
    .pipe(rename('alignment.min.css'))
    .pipe(gulp.dest(paths.distCss));
});

gulp.task('build', ['build-alignment'], function() {
  console.log('[SASS] recompiling'.yellow);
  gulp.src(paths.appSass)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(minifyCSS())
    .pipe(rename('rise.min.css'))
    .pipe(gulp.dest(paths.distCss))
  console.log('[CSS] minifying'.yellow);

  console.log('[COPY] copying over fonts'.yellow);
  gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.distFonts));
});

gulp.task('dev', ['build'], function() {
  // Watch Less files for changes
  gulp.watch(paths.sass, ['build']);
  console.log('[SASS] Watching for changes in SASS files'.yellow.inverse);
});


gulp.task('default', [], function() {
  console.log('***********************'.yellow);
  console.log('  gulp dev: watch for changes in SASS files'.yellow);
  console.log('  gulp build: build a distribution version'.yellow);
  console.log('***********************'.yellow);
  return true;
});
