import { app } from "../config/app.js";

export const images = () => {
  app.gulp.src(app.path.images.svg, { encoding: false }).pipe(app.gulp.dest(app.path.images.build));

  return (
    app.gulp
      .src(app.path.images.src, { encoding: false })
      .pipe(app.plugins.plumber(app.config.plumber("IMAGES")))
      .pipe(app.plugins.newer(app.path.images.build))
      .pipe(app.plugins.gulpIf(app.isProd, app.plugins.webp()))
      .pipe(app.plugins.gulpIf(app.isProd, app.gulp.dest(app.path.images.build)))
      .pipe(app.plugins.gulpIf(app.isProd, app.gulp.src(app.path.images.src, { encoding: false })))
      .pipe(app.plugins.gulpIf(app.isProd, app.plugins.newer(app.path.images.build)))
      .pipe(app.plugins.gulpIf(app.isProd, app.plugins.imagemin(app.config.imageMin)))
      .pipe(app.gulp.dest(app.path.images.build))
      // .pipe(app.gulp.src(app.path.images.svg, { encoding: false }))
      .pipe(app.gulp.dest(app.path.images.build))
      .pipe(app.plugins.browsersync.stream())
  );
};
