'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIntentStr = getIntentStr;
function getIntentStr(deep) {
  var str = '';
  new Array(deep).fill(null).forEach(function (i) {
    str += '\t';
  });
  return str;
}