'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveNodeTime;
function resolveNodeTime(timeStr) {
  var timeCombine = timeStr.split('/');
  var min = parseInt(timeCombine[0]);
  var max = timeCombine[1] && parseInt(timeCombine[1]) || min;
  return {
    min: min,
    max: max,
    expect: (max + min) / 2
  };
}