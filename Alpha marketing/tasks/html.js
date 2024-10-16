const fileInclude = require("gulp-file-include");
const typograf = require("gulp-typograf");
const htmlMinify = require("ohiyajul-html-minifier");
const size = require("gulp-size");
// const version = require("gulp-version-number");
const webpHtml = require("gulp-webp-html"); // уязвим 2

const html = () => {
  return (
    go.gulp
      .src(go.paths.html.src)
      .pipe(
        go.plumber(
          go.notify.onError((error) => ({
            title: "HTML",
            message: error.message,
          }))
        )
      )
      .pipe(fileInclude(go.app.fileInclude))
      .pipe(webpHtml())
      .pipe(typograf(go.app.typograf))
      // .pipe(go.gulpif(isProd, version(app.version)))
      .pipe(
        go.gulpif(
          go.app.isProd,
          size({ title: "HTML volume before compression" }).on("data", function (file) {
            const buferFile = Buffer.from(
              htmlMinify.minify(file.contents.toString(), go.app.htmlMinifier)
            );
            return (file.contents = buferFile);
          })
        )
      )
      .pipe(go.gulpif(go.app.isProd, size({ title: "HTML volume" })))
      .pipe(go.gulp.dest(go.paths.buildFolder))
  );
};

module.exports = html;
