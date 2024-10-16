global.go = {
  paths: require("./config/path.js"),
  app: require("./config/app.js"),
  gulp: require("gulp"),
  plumber: require("gulp-plumber"),
  notify: require("gulp-notify"), // Уязвим 2
  gulpif: require("gulp-if"),
};

const browserSync = require("browser-sync").create();

const cleanTask = require("./tasks/clean.js");
const resourcesTask = require("./tasks/resources.js");
const htmlTask = require("./tasks/html.js");
const pugTask = require("./tasks/pug.js");
const scssTask = require("./tasks/scss.js");
const jsTask = require("./tasks/js.js");
const imagesTask = require("./tasks/images.js");
const fontsTask = require("./tasks/font.js");

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: go.paths.buildFolder,
    },
  });

  // watch(`${go.paths.srcImagesFolder}/svg/**`, svgSprites).on("all", browserSync.reload);
  go.gulp.watch(go.paths.resources.watch, resourcesTask).on("all", browserSync.reload);
  go.gulp.watch(go.paths.html.watch, htmlTask).on("all", browserSync.reload);
  go.gulp.watch(go.paths.pug.watch, pugTask).on("all", browserSync.reload);
  go.gulp.watch(go.paths.scss.watch, scssTask).on("all", browserSync.reload);
  go.gulp.watch(go.paths.js.watch, jsTask).on("all", browserSync.reload);
  go.gulp.watch(go.paths.img.watch, imagesTask).on("all", browserSync.reload);
  go.gulp.watch(go.paths.font.watch, fontsTask).on("all", browserSync.reload);
};

const build = go.gulp.series(cleanTask, resourcesTask, scssTask, jsTask, imagesTask, fontsTask);
const dev = go.gulp.series(build, htmlTask, watchFiles);
const devPug = go.gulp.series(build, pugTask, watchFiles);
const prod = go.gulp.series(build, htmlTask);
const prodPug = go.gulp.series(build, pugTask);

exports.cleanTask = cleanTask;
exports.resourcesTask = resourcesTask;
exports.htmlTask = htmlTask;
exports.pugTask = pugTask;
exports.scssTask = scssTask;
exports.jsTask = jsTask;
exports.imagesTask = imagesTask;
exports.fontsTask = fontsTask;

exports.default = go.app.isProd ? prod : dev;
exports.pug = go.gulp.series(
  cleanTask,
  resourcesTask,
  pugTask,
  scssTask,
  jsTask,
  imagesTask,
  fontsTask,
  watchFiles
);
