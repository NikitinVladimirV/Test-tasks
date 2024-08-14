const { src, dest } = require("gulp");
const gulpif = require("gulp-if");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify"); // уязвим 2
// gulp-imagemin
// gulp-newer
// gulp-webp
// gulp-webp-html

const paths = require("../config/path");
const app = require("../config/app");
const isProd = app.isProd;

const images = () => {
  return src(paths.img.src)
    .pipe(
      plumber(
        notify.onError((error) => ({
          title: "IMAGES",
          message: error.message,
        }))
      )
    )

    .pipe(dest(paths.img.destBuild));
};

module.exports = images;
