// Gulp
const { src, dest, series, watch } = require("gulp"); // подключаем функции gulp
const gulpif = require("gulp-if"); // условие если

// Создание спрайта
const svgSprite = require("gulp-svg-sprite"); // создания SVG-спрайта
const svgmin = require("gulp-svgmin"); //
const cheerio = require("gulp-cheerio"); //
const replace = require("gulp-replace"); // поиск и замена
// Работа с HTML
// const htmlMin = require("gulp-htmlmin"); // минификация html
// const version = require("gulp-version-number"); //
// Работа с JS
const webpackStream = require("webpack-stream"); //
const uglify = require("gulp-uglify-es").default; // для обфускации кода(делает код не читаемым)
// Шрифты
const ttf2woff2 = require("gulp-ttf2woff2"); //
const ttf2woff = require("gulp-ttf2woff"); //
// Изображения
const image = require("gulp-imagemin"); // оптимизация изображений // version 6.3.1 no work need to setup 6.2.1
const webp = require("gulp-webp"); //
// Deploy
const ftp = require("vinyl-ftp"); //
const gutil = require("gulp-util"); //
const fs = require("fs"); //
// Zip
const zip = require("gulp-zip"); //
const path = require("path"); // получение пути к папке проекта
const rootFolder = path.basename(path.resolve()); // получение названия папки проекта

const fontsTtfToWoff2 = () => {
  return src(`${paths.srcFontsFolder}/**/*.*`)
    .pipe(
      plumber(
        notify.onError({
          title: "FONTS",
          // message: "Error: <%= error.message %>",
          message: error.message,
        })
      )
    )
    .pipe(ttf2woff2())
    .pipe(dest(isProd ? paths.buildFontsFolder : paths.distFontsFolder));
};
//???
const svgSprites = () => {
  return src(`${paths.srcSvgFolder}/**/*.svg`)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: {
          xmlMode: true,
        },
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../../sprite.svg",
          },
        },
      })
    )
    .pipe(dest(paths.srcSvgFolder));
};
//////////////////////////////////////////////////////////////
// const svgSprites = () => {
//   return src(`${paths.srcSvgFolder}/**/*.svg`)
//     .pipe(
//       svgSprite({
//         shape: {
//           dimension: {
//             maxWidth: 500,
//             maxHeight: 500,
//           },
//           spacing: {
//             padding: 0,
//           },
//           transform: [
//             {
//               svgo: {
//                 plugins: [
//                   { removeViewBox: false },
//                   { removeUnusedNS: false },
//                   { removeUselessStrokeAndFill: true },
//                   { cleanupIDs: false },
//                   { removeComments: true },
//                   { removeEmptyAttrs: true },
//                   { removeEmptyText: true },
//                   { collapseGroups: true },
//                   { removeAttrs: { attrs: "(fill|stroke|style)" } },
//                 ],
//               },
//             },
//           ],
//         },
//         mode: {
//           symbol: {
//             dest: ".",
//             sprite: "sprite.svg",
//           },
//         },
//       })
//     )
//     .pipe(
//       plumber(
//         notify.onError({
//           title: "SVG",
//           message: "Error: <%= error.message %>",
//         })
//       )
//     )
//     .pipe(dest(paths.srcSvgFolder));
// };
///////////////////////////////////////////////////////////
//
const imagesToWebp = () => {
  src([`${paths.srcImagesFolder}/**`, `!${paths.srcSvgFolder}/**`])
    .pipe(
      plumber(
        notify.onError({
          title: "IMAGES",
          message: "Error: <%= error.message %>",
        })
      )
    )
    // .pipe(
    //   gulpif(
    //     isProd,
    //     image({
    //       interlaced: true,
    //       progressive: true,
    //       quality: 70,
    //       optimizationLevel: 5,
    //       verbose: true,
    //     })
    //   )
    // )
    .pipe(dest(!isProd ? `${distFolder}/images` : `${buildFolder}/images`));
  return src([`${paths.srcImagesFolder}/**`, `!${paths.srcSvgFolder}/**`])
    .pipe(
      webp({
        quality: isProd ? 70 : null,
        //
        lossless: true,
      })
    )
    .pipe(dest(!isProd ? `${distFolder}/images` : `${buildFolder}/images`));
};

const scripts = () => {
  return src(`${paths.srcScriptsFolder}/main.js`)
    .pipe(
      plumber(
        notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      webpackStream({
        mode: isProd ? "production" : "development",
        output: {
          filename: jsFileName,
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        targets: "defaults",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
        //? backend - false
        devtool: !isProd ? "source-map" : false,
      })
    )
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .on("error", function (err) {
      console.error("WEBPACK ERROR", err);
      this.emit("end");
    })
    .pipe(dest(!isProd ? paths.distScriptsFolder : paths.buildScriptsFolder))
    .pipe(gulpif(!isProd, browserSync.stream()));
};

// DEPLOY //
const deploy = () => {
  let ftpData = JSON.parse(fs.readFileSync("ftp-data.json", "utf-8"));
  let connect = ftp.create({
    host: isProd ? ftpData.hostProd : ftpData.host,
    user: isProd ? ftpData.userProd : ftpData.user,
    password: isProd ? ftpData.passwordProd : ftpData.password,
    parallel: 10,
    log: gutil.log,
  });

  return src(`${buildFolder}/**`, {})
    .pipe(
      plumber(
        notify.onError({
          title: "DEPLOY",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(connect.newer(isProd ? ftpData.folderProd : ftpData.folder))
    .pipe(connect.dest(isProd ? ftpData.folderProd : ftpData.folder));
};
// ZIP // Доработать
const zipFiles = () => {
  del(`${rootFolder}.zip`);
  return src(`${buildFolder}/**`, {})
    .pipe(
      plumber(
        notify.onError({
          title: "ZIP",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(zip(`${rootFolder}.zip`))
    .pipe(dest("./"));
};

exports.default = series(
  clean,
  fontsTtfToWoff2,
  resources,
  svgSprites,
  imagesToWebp,
  styles,
  scripts,
  parallel(html, watchFiles)
);
exports.build = series(
  toProd,
  clean,
  fontsTtfToWoff2,
  resources,
  svgSprites,
  imagesToWebp,
  styles,
  scripts,
  html
);
exports.backend = series(fontsTtfToWoff2, svgSprites, imagesToWebp, styles, scripts);
exports.deploy = deploy;
exports.deployProd = series(toProd, deploy);
exports.zip = zipFiles;
