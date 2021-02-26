const {dest, src, task} = require('gulp');
const gulpSvelte = require('gulp-svelte');

task('default', () => {
  return src('src/index.svelte')
    .pipe(gulpSvelte())
    .pipe(dest('dist'));
});
