import * as nodePath from "path";

const isProd = process.env.NODE_ENV === "prod";
const rootFolder = nodePath.basename(nodePath.resolve());
const srcFolder = "./src";
const buildFolder = isProd ? "./build" : "./dist";

export const path = {
  rootFolder,
  srcFolder,
  buildFolder,
  clean: buildFolder,
  resources: {
    src: `${srcFolder}/resources/**/*.*`,
    watch: `${srcFolder}/resources/**/*.*`,
    build: buildFolder,
  },
  fonts: {
    src: `${srcFolder}/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}`,
    fontsStylesFile: `${srcFolder}/styles/_fonts.scss`,
    watch: `${srcFolder}/fonts/**/*.*`,
    build: `${buildFolder}/fonts`,
  },
  html: {
    src: `${isProd ? `./dist` : srcFolder}/*.html`,
    watch: [`${srcFolder}/**/*.html`, `${srcFolder}/data/html.json`],
    build: buildFolder,
  },
  pug: {
    src: `${srcFolder}/pug/*.pug`,
    watch: [`${srcFolder}/**/*.pug`, `${srcFolder}/data/pug.json`],
    build: buildFolder,
  },
  styles: {
    src: `${srcFolder}/styles/*.{sass,scss}`,
    watch: `${srcFolder}/styles/**/*.{sass,scss}`,
    build: `${buildFolder}/styles`,
  },
  scripts: {
    src: `${srcFolder}/scripts/main.js`,
    watch: `${srcFolder}/scripts/**/*.js`,
    build: `${buildFolder}/scripts`,
  },
  images: {
    src: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    watch: `${srcFolder}/images/**/*.*`,
    build: `${buildFolder}/images`,
  },
  svgSprite: {
    src: `${srcFolder}/svgSprite/*.svg`,
    watch: `${srcFolder}/svgSprite/**/*.*`,
    build: `${buildFolder}/images`,
  },
  zip: {
    src: "./build/**/*.*",
    fileName: `${rootFolder}.zip`,
    build: "./",
  },
  ftp: {
    url: "./test-dev/public_html",
    build: `${buildFolder}/**/*.*`,
  },
};
