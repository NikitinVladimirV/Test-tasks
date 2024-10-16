const imagemin = require("gulp-imagemin"); // уязвим 23
const newer = require("gulp-newer");
const webp = require("gulp-webp"); // уязвим 3

const images = () => {
  return go.gulp
    .src(go.paths.img.src, { encoding: false })
    .pipe(
      go.plumber(
        go.notify.onError((error) => ({
          title: "IMAGES",
          message: error.message,
        }))
      )
    )
    .pipe(newer(go.paths.img.destBuild))
    .pipe(webp(go.app.webp))
    .pipe(go.gulp.dest(go.paths.img.destBuild))
    .pipe(go.gulp.src(go.paths.img.src, { encoding: false }))
    .pipe(newer(go.paths.img.destBuild))
    .pipe(go.gulpif(go.app.isProd, imagemin(go.app.imagemin)))
    .pipe(go.gulp.dest(go.paths.img.destBuild));
};

module.exports = images;
