'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPagePath = getPagePath;
exports.getRemovePath = getRemovePath;
var fs = require('fs');
var path = require('path');
var upperFirst = require('lodash/upperFirst');

function getPagePath(path) {
  if (!path) throw Error('不存在该path');
  var result = path.split('/').map(function (p) {
    return p.indexOf('.') <= 0 && upperFirst(p) || p;
  });
  if (result[result.length - 1].indexOf('.') <= 0) {
    result.push('index.js');
  }
  return result.join('/');
}

function getRemovePath(rmpath) {
  // 向上递归，直到某一层有兄弟文件，就不能被全部移除
  var splitRmPaths = rmpath && rmpath.split('/') || [];
  if (!splitRmPaths.length) return rmpath;
  var itemSelf = splitRmPaths.pop();
  var silbDirs = fs.readdirSync(path.dirname(rmpath)).filter(function (dir) {
    return dir !== 'index.js' && dir !== 'index.scss' && dir !== itemSelf;
  });
  if (silbDirs.length) {
    return rmpath;
  } else {
    return getRemovePath(splitRmPaths.join('/'));
  }
}