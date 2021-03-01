const gulp = require('gulp');

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('js', function() {
  return browserify({
      basedir: '.',
      debug: true,
      entries: ['src/index.ts'],
      cache: {},
      packageCache: {}
  })
  .plugin(tsify, { noImplicitAny: true })
  .bundle().on('error', (e) => console.log(e))
  .pipe(source('OnepostUI.js'))
  .pipe(buffer())
  .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.parallel('js'), function () {
  const tsResult =
    tsProject.src()
    .pipe(tsProject())

  return merge([
    tsResult.dts.pipe(gulp.dest('dist/types')),
    tsResult.js.pipe(gulp.dest('dist'))
  ]);
});
