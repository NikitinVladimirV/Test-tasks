import { app } from "../config/app.js";

export const html = () => {
  return app.gulp
    .src(app.path.html.src)
    .pipe(app.plugins.plumber(app.config.plumber("HTML")))
    .pipe(app.plugins.fileInclude(app.config.fileinclude))
    .pipe(app.plugins.typograf(app.config.typograf))
    .pipe(app.plugins.replace(/@images\//g, "images/"))
    .pipe(app.plugins.gulpIf(app.isProd, app.plugins.webpHtmlNosvg()))
    .pipe(app.plugins.gulpIf(app.isProd, app.plugins.versionNumber(app.config.versionNumber)))
    .pipe(app.plugins.gulpIf(app.isProd && !app.full, app.plugins.htmlmin(app.config.htmlmin)))
    .pipe(app.gulp.dest(app.path.html.build))
    .pipe(app.plugins.browsersync.stream());
};
