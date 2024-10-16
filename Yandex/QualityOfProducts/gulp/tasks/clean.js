import { app } from "../config/app.js";

export const clean = () => {
  return app.plugins.deleteAsync(app.path.clean);
};
