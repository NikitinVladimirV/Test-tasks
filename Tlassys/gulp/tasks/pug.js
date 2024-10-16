import { app } from "../config/app.js";

export const pug = () => {
  return app.gulp
    .src(app.path.pug.src)
    .pipe(app.plugins.plumber(app.config.plumber("PUG")))
    .pipe(app.plugins.pugConvert(app.config.pugConvert))
    .pipe(app.plugins.typograf(app.config.typograf))
    .pipe(app.plugins.replace(/@images\//g, "images/"))
    .pipe(app.plugins.gulpIf(app.isProd, app.plugins.webpHtmlNosvg()))
    .pipe(app.plugins.gulpIf(app.isProd, app.plugins.versionNumber(app.config.versionNumber)))
    .pipe(app.gulp.dest(app.path.pug.build))
    .pipe(app.plugins.browsersync.stream());
};
