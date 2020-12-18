'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PACKAGE_BASE_PATH = exports.PROJECT_BASE_PATH = exports.PACKAGE_VERSION = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var packJson = require('../package.json');

// 命令行执行路径
var PACKAGE_VERSION = exports.PACKAGE_VERSION = packJson.version;

// file://Users/kunsam/Desktop/project/npm/core-script/src/project.config.js
// export const PROJECT_BASE_PATH = '/Users/kunsam/web/order-pay-system' // test

var PROJECT_BASE_PATH = exports.PROJECT_BASE_PATH = _shelljs2.default.pwd().stdout;

var PACKAGE_BASE_PATH = exports.PACKAGE_BASE_PATH = _path2.default.join(__dirname, '../');