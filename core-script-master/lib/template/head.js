'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propType = require('./common/react/propType');

var _propType2 = _interopRequireDefault(_propType);

var _basic = require('./common/basic');

var _basic2 = _interopRequireDefault(_basic);

var _antd = require('./npm/antd');

var _antd2 = _interopRequireDefault(_antd);

var _next = require('./npm/next');

var _next2 = _interopRequireDefault(_next);

var _recompose = require('./npm/recompose');

var _recompose2 = _interopRequireDefault(_recompose);

var _snippet = require('./common/snippet');

var _snippet2 = _interopRequireDefault(_snippet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var basePath = _ref.basePath,
      key = _ref.key;

  return 'import React from \'react\'\n' + (0, _propType2.default)() + '\n' + (0, _basic2.default)() + '\n' + (0, _antd2.default)() + '\n' + (0, _next2.default)() + '\n' + (0, _recompose2.default)() + '\n' + (0, _snippet2.default)() + '\n';
};