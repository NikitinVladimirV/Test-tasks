// 36 vulnerabilities
// Common
import gulpIf from "gulp-if";
import newer from "gulp-newer";
import notify from "gulp-notify"; // 1 vulnerability
import plumber from "gulp-plumber";
import replace from "gulp-replace";
// clean
import { deleteAsync } from "del";
// fonts
import fs from "fs";
import fonter from "gulp-fonter"; // 3 vulnerabilities
import ttf2woff2 from "gulp-ttf2woff2";
// html
import fileInclude from "gulp-file-include";
import htmlmin from "gulp-htmlmin"; // 3 vulnerabilities
import typograf from "gulp-typograf"; // 3 vulnerabilities
import versionNumber from "gulp-version-number"; // 2 vulnerabilities
import webpHtmlNosvg from "gulp-webp-html-nosvg"; // 3 vulnerabilities
// pug
import pugConvert from "gulp-pug";
// styles
import autoPrefixer from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";
import groupCssMediaQueries from "gulp-group-css-media-queries";
import gulpSass from "gulp-sass";
import sassGlob from "gulp-sass-glob";
import webpCss from "gulp-webpcss"; // 3 vulnerabilities
import * as dartSass from "sass";
const sass = gulpSass(dartSass);
// scripts
import webpack from "webpack-stream";
// images
import imagemin from "gulp-imagemin"; // 7 vulnerabilities
import webp from "gulp-webp"; // 13 vulnerabilities
// sprite
import sprite from "gulp-svg-sprite";
// server
import browsersync from "browser-sync"; // 1 vulnerability
// ftp
import util from "gulp-util";
import vinylFTP from "vinyl-ftp";
// zip
import gulpZip from "gulp-zip";

export const plugins = {
  gulpIf,
  plumber,
  notify,
  newer,
  deleteAsync,
  fs,
  fonter,
  ttf2woff2,
  fileInclude,
  versionNumber,
  webpHtmlNosvg,
  htmlmin,
  typograf,
  pugConvert,
  autoPrefixer,
  cleanCss,
  groupCssMediaQueries,
  sassGlob,
  webpCss,
  sass,
  webpack,
  imagemin,
  webp,
  sprite,
  browsersync,
  util,
  vinylFTP,
  gulpZip,
  replace,
};
