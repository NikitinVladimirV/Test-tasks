const del = require("del");

const paths = require("../config/path");

const clean = () => {
  return del(paths.buildFolder);
};

module.exports = clean;
