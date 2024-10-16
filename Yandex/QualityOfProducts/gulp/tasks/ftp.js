import { app } from "../config/app.js";

export const ftp = () => {
  app.configFTP.log = app.plugins.util.log;
  const ftpConnect = app.plugins.vinylFTP.create(app.configFTP);

  return app.gulp
    .src(app.path.ftp.build, { encoding: false })
    .pipe(app.plugins.plumber(app.config.plumber("FTP")))
    .pipe(ftpConnect.dest(app.path.ftp.url));
};
