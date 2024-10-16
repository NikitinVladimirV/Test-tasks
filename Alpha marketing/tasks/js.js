const babel = require("gulp-babel");
const webpack = require("webpack-stream");

const js = () => {
  return go.gulp
    .src(go.paths.js.src, { sourcemaps: !go.app.isProd })
    .pipe(
      go.plumber(
        go.notify.onError((error) => ({
          title: "JS",
          message: error.message,
        }))
      )
    )
    .pipe(babel())
    .pipe(webpack(go.app.webpack))
    .pipe(go.gulp.dest(go.paths.js.destBuild), { sourcemaps: !go.app.isProd });
};

module.exports = js;
