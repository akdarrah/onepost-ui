const {dest, src, task} = require('gulp');
const gulpSvelte = require('gulp-svelte');

task('default', () => {
  return src('src/OnepostUI.js')
    .pipe(gulpSvelte())
    .pipe(dest('dist'));
});
