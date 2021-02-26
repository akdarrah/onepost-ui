const {dest, src, task} = require('gulp');
const browserify = require('browserify');
var babelify = require("babelify");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gulpSvelte = require('gulp-svelte');

task('default', () => {
  return browserify({
      basedir: '.',
      debug: true,
      entries: ['./src/OnepostUI.js'],
      cache: {},
      packageCache: {}
    })
    .transform(babelify.configure({
      presets: ["@babel/preset-env"]
    }))
    .bundle().on('error', (e) => console.log(e))
    .pipe(source('OnepostUI.js'))
    .pipe(buffer())
    .pipe(dest('dist'));

    // .pipe(gulpSvelte())
});
