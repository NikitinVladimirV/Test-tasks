import { app } from "../config/app.js";

export const styles = () => {
  return (
    app.gulp
      .src(app.path.styles.src, { sourcemaps: !app.isProd })
      .pipe(app.plugins.plumber(app.config.plumber("STYLES")))
      .pipe(app.plugins.sassGlob())
      // .pipe(app.plugins.replace(/@images\//g, "../images/"))
      .pipe(app.plugins.sass(app.config.sass).on("error", app.plugins.sass.logError))
      .pipe(app.plugins.autoPrefixer(app.config.autoprefixer))
      .pipe(app.plugins.gulpIf(app.isProd, app.plugins.groupCssMediaQueries()))
      // .pipe(app.plugins.gulpIf(app.isProd, app.plugins.webpCss(app.config.webpCss)))
      // .pipe(app.plugins.gulpIf(app.isProd && !app.full, app.plugins.cleanCss()))
      .pipe(app.plugins.replace(/@images\//g, "../images/"))
      .pipe(app.gulp.dest(app.path.styles.build, { sourcemaps: !app.isProd }))
      .pipe(app.plugins.browsersync.stream())
  );
};
