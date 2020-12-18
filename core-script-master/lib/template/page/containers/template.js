'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _head = require('../../head');

var _head2 = _interopRequireDefault(_head);

var _container = require('../../common/react/container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var basePath = _ref.basePath,
      container = _ref.container,
      parser = _ref.parser,
      page = _ref.page;

  return '\n' + (0, _head2.default)({ basePath: basePath, key: container.key }) + '\n// [page] // file:/' + page.absolutePath + '\n// [parser] // file:/' + parser.absolutePath + '\n' + (0, _container2.default)({ key: container.key }) + '\n';
};