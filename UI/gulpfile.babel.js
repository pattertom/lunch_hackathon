'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint'
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import gutil from 'gulp-util';
import watchify from 'watchify';
import notify from 'gulp-notify';
import _ from 'lodash';

const dirs = {
  src: 'src',
  dest: 'build'
};

const jsFiles = [
  `${dirs.src}/scripts/**/*.js`,
  '*.js'
];

const sassPaths = {
  src: `${dirs.src}/styles/app.scss`,
  dest: `${dirs.dest}/styles/`
};

const styleTask = function() {
  gulp.src(sassPaths.src)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassPaths.dest));
};
gulp.task('styles', styleTask);

const lintTask = function() {
  gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};
gulp.task('lint', lintTask);

function buildScript(watch) {
  styleTask();

  const browserifyProps = _.assign({}, watchify.args,
    {
      entries: 'src/scripts/index.jsx',
      extensions: ['.jsx'],
      debug: true
    }
  );

  const bundler = watch ? watchify(browserify(browserifyProps)) : browserify(browserifyProps);
  bundler.transform('babelify');

  const rebundle = function() {
    const stream = bundler.bundle();
    return stream.on('error', notify.onError({
      title: 'Compile Error',
      message: "<%= error.message %>"
    }))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build/scripts'));
  }

  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  return rebundle();
};

gulp.task('serve', () => { return buildScript(true); });
gulp.task('build', () => { return buildScript(false); });
gulp.task('default', ['build']);
