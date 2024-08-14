const { series, parallel, watch } = require("gulp");

const browserSync = require("browser-sync").create();

const cleanTask = require("./gulp/tasks/clean.js");
const resourcesTask = require("./gulp/tasks/resources.js");
const htmlTask = require("./gulp/tasks/html.js");
const pugTask = require("./gulp/tasks/pug.js");
const scssTask = require("./gulp/tasks/scss.js");
const jsTask = require("./gulp/tasks/js.js");
const imagesTask = require("./gulp/tasks/images.js");

// const isProd = require("./gulp/config/app.js").isProd;
const paths = require("./gulp/config/path.js");

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: paths.buildFolder,
    },
  });

  // watch(`${paths.srcImagesFolder}/**`, imagesToWebp).on("all", browserSync.reload);
  // watch(`${paths.srcImagesFolder}/svg/**`, svgSprites).on("all", browserSync.reload);
  // watch(`${paths.srcResourcesFolder}/fonts/**`, fontsTtfToWoff2).on("all", browserSync.reload);
  // watch(`${paths.srcResourcesFolder}/**`, resources).on("all", browserSync.reload);
  // watch(`${paths.srcScriptsFolder}/**`, scripts).on("all", browserSync.reload);
  // watch(`${paths.srcStylesFolder}/**`, styles).on("all", browserSync.reload);
  //
  watch(paths.resources.watch, resourcesTask).on("all", browserSync.reload);
  watch(paths.html.watch, htmlTask).on("all", browserSync.reload);
  watch(paths.pug.watch, pugTask).on("all", browserSync.reload);
  watch(paths.scss.watch, scssTask).on("all", browserSync.reload);
  watch(paths.js.watch, jsTask).on("all", browserSync.reload);
  watch(paths.img.watch, imagesTask).on("all", browserSync.reload);
};

exports.cleanTask = cleanTask;
exports.resourcesTask = resourcesTask;
exports.htmlTask = htmlTask;
exports.pugTask = pugTask;
exports.scssTask = scssTask;
exports.jsTask = jsTask;
exports.imagesTask = imagesTask;

exports.default = series(
  cleanTask,
  resourcesTask,
  parallel(htmlTask, scssTask, jsTask, imagesTask),
  watchFiles
);
exports.pug = series(
  cleanTask,
  resourcesTask,
  parallel(pugTask, scssTask, jsTask, imagesTask),
  watchFiles
);
