import { app } from "../config/app.js";

export const server = () => {
  app.plugins.browsersync.init(app.config.browserSync);
};
