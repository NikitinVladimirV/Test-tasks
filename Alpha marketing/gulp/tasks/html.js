const { src, dest } = require("gulp");
const gulpif = require("gulp-if");
const plumber = require("gulp-plumber");
const fileInclude = require("gulp-file-include");
const typograf = require("gulp-typograf");
const htmlMinify = require("ohiyajul-html-minifier");
const size = require("gulp-size");
const notify = require("gulp-notify"); // уязвим 2
// const version = require("gulp-version-number");

const paths = require("../config/path");
const app = require("../config/app");

const html = () => {
  return (
    src(paths.html.src)
      .pipe(
        plumber(
          notify.onError((error) => ({
            title: "HTML",
            message: error.message,
          }))
        )
      )
      .pipe(fileInclude(app.fileInclude))
      .pipe(typograf(app.typograf))
      // .pipe(gulpif(isProd, version(app.version)))
      .pipe(
        gulpif(
          app.isProd,
          size({ title: "HTML volume before compression" }).on("data", function (file) {
            const buferFile = Buffer.from(
              htmlMinify.minify(file.contents.toString(), app.htmlMinifier)
            );
            return (file.contents = buferFile);
          })
        )
      )
      .pipe(gulpif(app.isProd, size({ title: "HTML volume" })))
      .pipe(dest(paths.buildFolder))
  );
};

module.exports = html;
