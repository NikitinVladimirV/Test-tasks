const { src, dest } = require("gulp");
const gulpif = require("gulp-if");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify"); // уязвим 2
const sass = require("gulp-sass")(require("sass"));
// const sassGlob = require("gulp-sass-glob"); // Проверить!!!
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const size = require("gulp-size");
// gulp-rename
// gulp-shorthand // Сокращает свойства стилей если есть сокращение
// gulp-sass-glob

const paths = require("../config/path");
const app = require("../config/app");
const isProd = app.isProd;

const scss = () => {
  return (
    src(paths.scss.src, { sourcemaps: !isProd })
      .pipe(
        plumber(
          notify.onError((error) => ({
            title: "STYLES",
            message: error.message,
          }))
        )
      )
      // .pipe(sassGlob())
      .pipe(sass())
      // .pipe(
      //   sass({
      //     outputStyle: isProd ? "compressed" : "expanded",
      //   }).on("error", sass.logError)
      // )
      .pipe(
        autoprefixer({
          grid: true,
          // flexbox: false,
        })
      )
      .pipe(gulpif(isProd, size({ title: "Before compression" })))
      .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
      .pipe(gulpif(isProd, size({ title: "After compression" })))
      .pipe(dest(paths.scss.destBuild, { sourcemaps: !isProd }))
  );
};

module.exports = scss;
