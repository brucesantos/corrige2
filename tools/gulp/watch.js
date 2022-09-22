import gulp from "gulp";
import connect from "gulp-connect";
import { build } from "./build.js";
import { compileTask } from "./compile.js";
import { getDemo } from "./helpers.js";
import kit from 'gulp-kit-2';

// localhost site
const localHostTask = (cb) => {
  connect.server({
    root: "../demo1/dist/",
    livereload: true,
  });
  cb();
};

const reloadTask = (cb) => {
  connect.reload();
  cb();
};

const watchTask = () => {
  return gulp.watch(
    [build.config.path.src + "/**/*.js", build.config.path.src + "/**/*.scss"],
    gulp.series(compileTask)
  );
};

const watchSCSSTask = () => {
  return gulp.watch(
    build.config.path.src + "/**/*.scss",
    gulp.parallel(compileTask)
  );
};

const watchJSTask = () => {
  return gulp.watch(
    build.config.path.src + "/**/*.js",
    gulp.parallel(compileTask)
  );
};

const kitFiles = done => {
    src('dist/*.kit')
    .pipe(kit())
    .pipe(dest('dist/'));
    done();
};

// Exports
export {
  localHostTask,
  reloadTask, watchTask, watchSCSSTask, watchJSTask, kitFiles
};
