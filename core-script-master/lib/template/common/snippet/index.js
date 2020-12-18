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

// todo 后期快捷键配置绑定在这

exports.default = function () {
  return '\n// [\u521B\u5EFA\u5143\u4EF6\u8BF7\u914D\u7F6E] <core ccp>\n// [\u8865\u5168] file:/' + _path2.default.join(_src.PACKAGE_BASE_PATH, _config2.default.snippet.help) + '\n// [\u5F15\u5165\u7EC4\u4EF6] ipcp [\u5F15\u5165\u9AD8\u9636\u7EC4\u4EF6] iphoc [\u5F15\u5165\u5E03\u5C40] iplo\n';
};