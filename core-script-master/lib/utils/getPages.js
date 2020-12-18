'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPages;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _file = require('./file');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPages(basePath) {

  return (0, _file.joinFilesName)((0, _file.getFilesTree)(_path2.default.join(basePath, 'pages'))).map(function (file) {
    return file.fullImportPath;
  }).filter(function (file) {
    return file.split('/').length > 1;
  });
}