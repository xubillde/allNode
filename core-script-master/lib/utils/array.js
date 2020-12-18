"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniqueStringArray = uniqueStringArray;
//  ['a', 'a', 'ab'] => ['a0', 'a1', 'ab']

function uniqueStringArray(sarray) {
  var repeatDic = {};
  // repeatDic = {
  //   a: 1
  // }
  return sarray.map(function (d) {
    if (repeatDic[d]) {
      // 之前让初始数字为0，导致这里判断为false
      repeatDic[d] = repeatDic[d] + 1;
    } else {
      repeatDic[d] = 1;
    }
    return "" + d + repeatDic[d];
  });
}