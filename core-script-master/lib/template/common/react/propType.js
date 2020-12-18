'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _src = require('../../../src.config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return '\n// [\u63A5\u53E3\u5B9A\u4E49] // file:/' + _path2.default.join(_src.PACKAGE_BASE_PATH, _config2.default.propType) + '\nimport PropTypes from \'prop-types\'\n';
};