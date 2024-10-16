import { app } from "../config/app.js";

const convertFonts = () => {
  return app.gulp
    .src(app.path.fonts.src, { encoding: false })
    .pipe(app.plugins.plumber(app.config.plumber("FONTS")))
    .pipe(app.plugins.fonter(app.config.fonter))
    .pipe(app.gulp.dest(app.path.fonts.build))
    .pipe(app.plugins.browsersync.stream());
};

const ttfTowoff2 = () => {
  return app.gulp
    .src(`${app.path.fonts.build}/*.ttf`, { encoding: false })
    .pipe(app.plugins.plumber(app.config.plumber("FONTS")))
    .pipe(app.plugins.ttf2woff2())
    .pipe(app.gulp.dest(app.path.fonts.build))
    .pipe(app.plugins.browsersync.stream());
};

const fontStyle = () => {
  // Файл стилей для где подключаются шрифты
  const fontsStylesFile = app.path.fonts.fontsStylesFile;
  // Проверяем есть ли файлы шрифтов
  app.plugins.fs.readdir(app.path.fonts.build, function (err, fontFiles) {
    if (fontFiles) {
      // Проверяем есть ли файл стилей где подключаются шрифты
      // if (!app.plugins.fs.existsSync(fontsStylesFile)) {
      // Если нет, создаем
      app.plugins.fs.writeFileSync(fontsStylesFile, "");
      let newFileOnly;
      for (let i = 0; i < fontFiles.length; i++) {
        // Записываем подключение шрифтов в файл
        const fontFileName = fontFiles[i].split(".")[0];
        if (newFileOnly !== fontFileName) {
          const fontName = fontFileName.split("-")[0] ? fontFileName.split("-")[0] : fontFileName;
          let fontWeight = fontFileName.split("-")[1] ? fontFileName.split("-")[1] : fontFileName;

          if (fontWeight.toLowerCase() === "thin" || fontWeight.toLowerCase() === "hairline") {
            fontWeight = 100;
          } else if (fontWeight.toLowerCase() === "extralight" || fontWeight.toLowerCase() === "ultralight") {
            fontWeight = 200;
          } else if (fontWeight.toLowerCase() === "light") {
            fontWeight = 300;
          } else if (fontWeight.toLowerCase() === "medium") {
            fontWeight = 500;
          } else if (fontWeight.toLowerCase() === "semibold" || fontWeight.toLowerCase() === "demibold") {
            fontWeight = 600;
          } else if (fontWeight.toLowerCase() === "bold") {
            fontWeight = 700;
          } else if (fontWeight.toLowerCase() === "extrabold" || fontWeight.toLowerCase() === "ultrabold") {
            fontWeight = 800;
          } else if (fontWeight.toLowerCase() === "black" || fontWeight.toLowerCase() === "heavy") {
            fontWeight = 900;
          } else {
            if (
              fontWeight.toLowerCase() !== "normal" &&
              fontWeight.toLowerCase() !== "regular" &&
              fontWeight.toLowerCase() !== "book"
            )
              console.log(`!NOT NORMAL FONTS! - ${fontFileName}`);
            fontWeight = 400;
          }

          app.plugins.fs.appendFile(
            fontsStylesFile,
            `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"),\n\turl("../fonts/${fontFileName}.woff") format("woff");\n\tfont-style: normal;\n\tfont-weight: ${fontWeight};\n}\r\n`,
            cb,
          );
          newFileOnly = fontFileName;
        }
      }
      // } else {
      //   // Если файл есть, выводим сообщение
      //   console.log(`${fontsStylesFile} уже есть. Удалите его, чтобы перезаписать стили!`);
      // }
    }
  });

  return app.gulp.src(app.path.fonts.src);
  function cb() {}
};

export const fonts = app.gulp.series(convertFonts, ttfTowoff2, fontStyle);
