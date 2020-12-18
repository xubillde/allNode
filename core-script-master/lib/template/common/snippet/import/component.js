"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var key = _ref.key,
      importPath = _ref.importPath,
      absolutPath = _ref.absolutPath;


  return {
    str: "import " + key + " from '" + importPath + "' // file:/" + absolutPath,

    snippet: {}
  };
};