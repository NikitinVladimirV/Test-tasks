import { app } from "./gulp/config/app.js";

import { clean } from "./gulp/tasks/clean.js";
import { fonts } from "./gulp/tasks/fonts.js";
import { ftp } from "./gulp/tasks/ftp.js";
import { html } from "./gulp/tasks/html.js";
import { images } from "./gulp/tasks/images.js";
import { pug } from "./gulp/tasks/pug.js";
import { resources } from "./gulp/tasks/resources.js";
import { scripts } from "./gulp/tasks/scripts.js";
import { server } from "./gulp/tasks/server.js";
import { styles } from "./gulp/tasks/styles.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";
import { zip } from "./gulp/tasks/zip.js";

function watcher() {
  app.gulp.watch(app.path.resources.watch, resources);
  app.gulp.watch(app.path.fonts.watch, fonts);
  app.gulp.watch(app.path.html.watch, html);
  app.gulp.watch(app.path.pug.watch, pug);
  app.gulp.watch(app.path.styles.watch, styles);
  app.gulp.watch(app.path.scripts.watch, scripts);
  app.gulp.watch(app.path.images.watch, images);
  app.gulp.watch(app.path.svgSprite.watch, svgSprite); // gulp.watch(path.watch.svgSprite, gulp.series(svgSprite, ftp)); // Слать изменения сразу на сервер
}

const commonTasks = app.gulp.parallel(resources, fonts, app.makePug ? pug : html, styles, scripts, images, svgSprite);
const dev = app.gulp.series(clean, commonTasks, app.gulp.parallel(watcher, server));
const build = app.gulp.series(clean, commonTasks);

app.gulp.task("clean", clean);
app.gulp.task("resources", resources);
app.gulp.task("fonts", fonts);
app.gulp.task("html", html);
app.gulp.task("pug", pug);
app.gulp.task("styles", styles);
app.gulp.task("scripts", scripts);
app.gulp.task("images", images);
app.gulp.task("svgSprite", svgSprite);

app.gulp.task("zip", zip);
app.gulp.task("deploy", ftp);

app.gulp.task("build", build);
app.gulp.task("default", dev);
