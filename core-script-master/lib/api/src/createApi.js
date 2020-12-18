'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createApi;

var _head = require('../../template/restApi/head');

var _head2 = _interopRequireDefault(_head);

var _function = require('../../template/restApi/function');

var _function2 = _interopRequireDefault(_function);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var toUpper = require('lodash/toUpper');

function createApi(apiList) {
  return apiList.map(function (api) {
    return {
      key: api.key,
      file: (0, _head2.default)(api) + ' ' + (0, _function2.default)(api)
    };
  });
}