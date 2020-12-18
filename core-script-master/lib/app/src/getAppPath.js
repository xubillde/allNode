'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var path = require('path');
var upperFirst = require('lodash/upperFirst');

exports.default = function (basePath, pagePath) {
  var splitPaths = pagePath.split('/');

  var containerDirPaths = splitPaths.filter(function (p) {
    return p !== 'index.js' && p !== 'index.scss';
  }).map(function (a) {
    return upperFirst(a).replace(/\s/g, '').replace('.js', '');
  });

  var lastPath = splitPaths.pop();
  var dirPaths = splitPaths.map(function (a) {
    return a.replace(/\s/g, '') && upperFirst(a);
  });
  if (lastPath.indexOf('.') <= 0) {
    // 没有 .
    dirPaths.push(upperFirst(lastPath).replace(/\s/g, ''));
    lastPath = 'index.js';
  }
  var importPath = '' + dirPaths.join('/') + (lastPath === 'index.js' ? '' : '/' + lastPath);
  var key = importPath.split('/').map(function (a) {
    return upperFirst(a).replace(/\s/g, '').replace('.js', '');
  }).join('');
  var containerKey = containerDirPaths.join('') + 'Container';

  return {
    key: key,
    page: {
      key: key + 'Page',
      importPath: 'pages/' + importPath,
      absolutePath: path.join(basePath, 'pages/' + importPath + (lastPath !== 'index.js' ? '' : '/' + lastPath))
    },
    parser: {
      key: key + 'Parser',
      importPath: 'parsers/' + importPath,
      absolutePath: path.join(basePath, 'parsers/' + importPath + (lastPath !== 'index.js' ? '' : '/' + lastPath))
    },
    container: {
      key: containerKey,
      importPath: 'containers/' + containerDirPaths.join('/'),
      absolutePath: path.join(basePath, 'containers/' + containerDirPaths.join('/') + '/index.js')
    },
    containerCss: {
      key: containerKey + 'Css',
      importPath: 'containers/' + containerDirPaths.join('/') + '/index.scss',
      absolutePath: path.join(basePath, 'containers/' + containerDirPaths.join('/') + '/index.scss')
    }
  };
};