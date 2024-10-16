import { app } from "../config/app.js";

export const zip = () => {
  app.plugins.deleteAsync(app.path.zip.fileName);

  return app.gulp
    .src(app.path.zip.src, { encoding: false })
    .pipe(app.plugins.plumber(app.config.plumber("ZIP")))
    .pipe(app.plugins.gulpZip(app.path.zip.fileName))
    .pipe(app.gulp.dest(app.path.zip.build));
};
