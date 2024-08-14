const { src, dest } = require("gulp");
const gulpif = require("gulp-if");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify"); // уязвим 2
const babel = require("gulp-babel");
// const uglify = require("gulp-uglify");
const webpack = require("webpack-stream");

const paths = require("../config/path");
const app = require("../config/app");
const isProd = app.isProd;

const js = () => {
  return (
    src(paths.js.src, { sourcemaps: !isProd })
      .pipe(
        plumber(
          notify.onError((error) => ({
            title: "JS",
            message: error.message,
          }))
        )
      )
      .pipe(babel())
      .pipe(
        webpack({
          mode: isProd ? "production" : "development",
        })
      )
      // .pipe(gulpif(isProd, uglify()))
      .pipe(dest(paths.js.destBuild), { sourcemaps: !isProd })
  );
};

module.exports = js;
