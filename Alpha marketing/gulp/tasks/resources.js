const { src, dest } = require("gulp");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify"); // уязвим 2

const paths = require("../config/path");

const resources = () => {
  return src(paths.resources.src)
    .pipe(
      plumber(
        notify.onError((error) => ({
          title: "RESOURCES",
          message: error.message,
        }))
      )
    )
    .pipe(dest(paths.resources.destBuild));
};

module.exports = resources;
