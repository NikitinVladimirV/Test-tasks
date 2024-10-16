const resources = () => {
  return go.gulp
    .src(go.paths.resources.src, { encoding: false })
    .pipe(
      go.plumber(
        go.notify.onError((error) => ({
          title: "RESOURCES",
          message: error.message,
        }))
      )
    )
    .pipe(go.gulp.dest(go.paths.resources.destBuild));
};

module.exports = resources;
