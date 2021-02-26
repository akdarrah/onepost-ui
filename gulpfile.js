const {dest, src, task} = require('gulp');
const gulp = require('gulp');
const rollup = require('gulp-rollup');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const commonjs = require('@rollup/plugin-commonjs');
import { nodeResolve } from '@rollup/plugin-node-resolve';

// const browserify = require('browserify');
// var babelify = require("babelify");
// const source = require('vinyl-source-stream');
// const buffer = require('vinyl-buffer');
// const gulpSvelte = require('gulp-svelte');

task('default', () => {
  gulp.src('./src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(rollup({
        input: './src/OnepostUI.js',
        output: {format: 'iife'},
        plugins: [
          babel({presets: ['@babel/env']}),
          nodeResolve(),
          commonjs()
        ]
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});
