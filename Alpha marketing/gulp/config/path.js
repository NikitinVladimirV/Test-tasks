const jsFileName = "main.js";
const srcFolder = "./src";
// const distFolder = "./dist";
// const buildFolder = "./build";
const buildFolder = "./dist";

// const scrPugFolder = `${srcFolder}/pug`;
// const srcImagesFolder = `${srcFolder}/images`;
// const srcSvgFolder = `${srcFolder}/images/svg`;
// const srcResourcesFolder = `${srcFolder}/resources`;

// const srcFontsFolder = `${srcFolder}/resources/fonts`;
// const srcScriptsFolder = `${srcFolder}/scripts`;
// const srcStylesFolder = `${srcFolder}/styles`;

// const distStyleFolder = `${distFolder}/styles`;
// const distScriptsFolder = `${distFolder}/scripts`;
// const distFontsFolder = `${distFolder}/fonts`;

// const buildStylesFolder = `${buildFolder}/styles`;
// const buildScriptsFolder = `${buildFolder}/scripts`;
// const buildFontsFolder = `${buildFolder}/fonts`;

module.exports = {
  srcFolder,
  buildFolder,

  resources: {
    src: [srcFolder + "/resources/**", "!./**/*.+(ttf2|woff)"],
    watch: srcFolder + "/resources/**",
    destBuild: buildFolder,
  },
  html: {
    src: srcFolder + "/*.html",
    watch: srcFolder + "/**/*.html",
    destBuild: buildFolder,
  },
  pug: {
    src: srcFolder + "/pug/*.pug",
    watch: srcFolder + "/pug/**/*.pug",
    destBuild: buildFolder,
  },
  scss: {
    src: srcFolder + "/styles/*.{sass,scss}",
    watch: srcFolder + "/styles/**/*.{sass,scss}",
    destBuild: buildFolder + "/styles",
  },
  js: {
    src: srcFolder + "/scripts/*.js",
    watch: srcFolder + "/scripts/**/*.js",
    destBuild: buildFolder + "/scripts",
  },
  img: {
    src: srcFolder + "/images/*.{png,jpg,jpeg,gif,svg}",
    watch: srcFolder + "/images/**/*.{png,jpg,jpeg,gif,svg}",
    destBuild: buildFolder + "/images",
  },
};
