const { src, dest } = require("gulp");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify"); // уязвим 2
const pugs = require("gulp-pug");

const paths = require("../config/path");
const app = require("../config/app");

const pug = () => {
  return src(paths.pug.src)
    .pipe(
      plumber(
        notify.onError((error) => ({
          title: "PUG",
          message: error.message,
        }))
      )
    )
    .pipe(pugs(app.pug))
    .pipe(dest(paths.pug.destBuild));
};

module.exports = pug;
