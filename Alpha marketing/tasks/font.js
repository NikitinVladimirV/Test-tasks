const newer = require("gulp-newer");
const fonter = require("gulp-fonter"); // уязвим 3
const ttf2Woff2 = require("gulp-ttf2woff2"); // уязвим 3

const fonts = () => {
  return go.gulp
    .src(go.paths.font.src, { encoding: false })
    .pipe(
      go.plumber(
        go.notify.onError((error) => ({
          title: "FONTS",
          message: error.message,
        }))
      )
    )
    .pipe(newer(go.paths.font.destBuild))
    .pipe(fonter(go.app.fonter))
    .pipe(go.gulp.dest(go.paths.font.destBuild))
    .pipe(ttf2Woff2())
    .pipe(go.gulp.dest(go.paths.font.destBuild));
};

module.exports = fonts;
