import gulp from "gulp";
import pug from "../../src/data/pug.json" with { type: "json" };
import { webpackConfig } from "../../webpack.config.js";
import { configFTP } from "../config/ftp.js";
import { path } from "./path.js";
import { plugins } from "./plugins.js";

const isProd = process.env.NODE_ENV === "prod";
const makePug = process.argv.includes("--pug");
const full = process.argv.includes("--full");

export const app = {
  isProd,
  makePug,
  full,
  path,
  gulp,
  plugins,
  configFTP,
  config: {
    plumber: (title) => {
      return app.plugins.notify.onError({
        title: title,
        message: "Error: <%= error.message %>",
        sound: false,
      });
    },
    fonter: {
      formats: ["woff", "ttf"],
    },
    versionNumber: {
      value: "%DT%",
      append: {
        key: "_v",
        cover: 0,
        to: ["css", "js"],
      },
      output: {
        file: "gulp/version.json",
      },
    },
    fileinclude: {
      prefix: "@",
      basepath: "@file",
    },
    typograf: {
      locale: ["ru", "en-US"],
      // disableRule: ["ru/other/*"],
    },
    htmlmin: {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: true,
    },
    imageMin: {
      verbose: true,
      progressive: true,
      interlaced: true,
      svgoPlugins: [{ removeVieBox: false }],
      optimizationLevel: 3,
    },
    pugConvert: {
      pretty: true,
      data: {
        head: pug.head,
        list: pug.list,
      },
    },
    webpackConfig,
    webpack: {
      mode: !isProd ? "development" : full ? "development" : "production",
      module: {
        rules: [
          {
            test: /\.m?js/,
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
    },
    browserSync: {
      server: {
        baseDir: path.buildFolder,
      },
      notify: true,
      port: 3000,
    },
    webpCss: {
      webpClass: ".webp",
      noWebpClass: ".no-webp",
    },
    autoprefixer: {
      grid: true,
      cascade: true,
    },
    sprite: {
      mode: {
        stack: {
          sprite: "../sprite.svg",
          // example: true,
        },
      },
    },
    sass: {
      // outputStyle: "expanded", // !!!
      // outputStyle: "compressed", // !!!
      outputStyle: isProd ? "compressed" : "expanded", // !!!
    },
  },
};
