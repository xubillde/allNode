'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _head = require('./head');

var _head2 = _interopRequireDefault(_head);

var _container = require('./common/react/container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (basePath, key) {
  return '\n' + (0, _head2.default)({ basePath: basePath, key: key }) + '\n' + (0, _container2.default)({ key: key }) + '\n';
};