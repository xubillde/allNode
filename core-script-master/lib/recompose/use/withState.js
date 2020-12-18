'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var upperFirst = require('lodash/upperFirst');

exports.default = function (state) {
  return 'withState(\'' + (state || 'state') + '\', \'set' + (upperFirst(state) || 'State') + '\', ({ props }) => false),';
};