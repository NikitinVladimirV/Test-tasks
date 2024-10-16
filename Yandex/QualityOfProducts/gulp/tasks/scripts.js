import { app } from "../config/app.js";

export const scripts = () => {
  return (
    app.gulp
      .src(app.path.scripts.src, { sourcemaps: !app.isProd })
      .pipe(app.plugins.plumber(app.config.plumber("SCRIPTS")))
      .pipe(app.plugins.webpack(app.config.webpackConfig))
      // TODO STYLE-LOADER, CSS-LOADER ???
      .pipe(app.gulp.dest(app.path.scripts.build, { sourcemaps: !app.isProd }))
      .pipe(app.plugins.browsersync.stream())
  );
};
