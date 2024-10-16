import { app } from "../config/app.js";

export const svgSprite = () => {
  return app.gulp
    .src(app.path.svgSprite.src, { encoding: false })
    .pipe(app.plugins.plumber(app.config.plumber("SPRITE")))
    .pipe(app.plugins.sprite(app.config.sprite))
    .pipe(app.gulp.dest(app.path.svgSprite.build))
    .pipe(app.plugins.browsersync.stream());
};
