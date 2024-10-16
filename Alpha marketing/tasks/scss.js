const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const size = require("gulp-size");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
// const webpCss = require("gulp-webp-css-fixed"); // уязвим 1 // !Добавляет пустые @supports

const scss = () => {
  return (
    go.gulp
      .src(go.paths.scss.src, { sourcemaps: !go.app.isProd })
      .pipe(
        go.plumber(
          go.notify.onError((error) => ({
            title: "STYLES",
            message: error.message,
          }))
        )
      )
      .pipe(sassGlob())
      .pipe(sass())
      // .pipe(webpCss())
      .pipe(
        autoprefixer({
          grid: true,
        })
      )
      .pipe(groupCssMediaQueries())
      .pipe(go.gulpif(go.app.isProd, size({ title: "Before compression" })))
      .pipe(go.gulpif(go.app.isProd, cleanCSS(go.app.cleanCSS)))
      .pipe(go.gulpif(go.app.isProd, size({ title: "After compression" })))
      .pipe(go.gulp.dest(go.paths.scss.destBuild, { sourcemaps: !go.app.isProd }))
  );
};

module.exports = scss;
