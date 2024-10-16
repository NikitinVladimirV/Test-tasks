const pugs = require("gulp-pug");
const webpHtml = require("gulp-webp-html"); // уязвим 2

const pug = () => {
  return go.gulp
    .src(go.paths.pug.src)
    .pipe(
      go.plumber(
        go.notify.onError((error) => ({
          title: "PUG",
          message: error.message,
        }))
      )
    )
    .pipe(pugs(go.app.pug))
    .pipe(webpHtml())
    .pipe(go.gulp.dest(go.paths.pug.destBuild));
};

module.exports = pug;
