'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findImports = require('find-imports');

var _findImports2 = _interopRequireDefault(_findImports);

var _file = require('../utils/file');

var _path = require('../utils/path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var nodepath = require('path');
var chalk = require('chalk');
var shell = require('shelljs');

var upperFirst = require('lodash/upperFirst');
var readlineSync = require('readline-sync');

exports.default = function (basePath, _ref, callback) {
  var path = _ref.path,
      router = _ref.router,
      designs = _ref.designs;


  var containerDir = path.split('/').map(function (p) {
    if (p !== 'index.js') return upperFirst(p.split('.')[0]);
    return null;
  }).filter(function (a) {
    return !!a;
  }).join('/');
  var memebers = ['pages/' + (0, _path.getPagePath)(path), 'parsers/' + (0, _path.getPagePath)(path), 'containers/' + containerDir + '/index.js', 'containers/' + containerDir + '/index.scss'];
  var componentExpand = readlineSync.question('是否展开依赖元件?(y/n[回车默认])');
  var isChrome = readlineSync.question('是否打开浏览器（include router and design）?(y[回车默认]/n)');

  if (componentExpand && componentExpand === 'y') {
    var imports = (0, _findImports2.default)(nodepath.join(basePath, 'containers/' + containerDir + '/index.js'), {
      flatten: true,
      absoluteImports: true,
      relativeImports: true,
      packageImports: false
    }).map(function (imp) {
      var impSplits = imp.split('/').filter(function (s) {
        return s !== '..';
      });
      if (impSplits.length > 1 && impSplits[impSplits.length - 1].indexOf('.js') <= 0) {
        impSplits.push('index.js');
      }
      console.log(chalk.cyan('>>> \u626B\u63CF\u5230\u7EC4\u4EF6, ' + impSplits.join('/')));
      return impSplits.join('/');
    });
    memebers = memebers.concat(imports);
  }
  memebers.forEach(function (data) {
    var mPath = nodepath.join(basePath, data);
    if (fs.existsSync(mPath)) {
      shell.exec('code ' + mPath);
    } else {
      console.log(chalk.red('>>> 不存在对应的文件!', mPath, '\n'));
    }
  });

  var NO = { no: 1, No: 1, NO: 1 };

  if (!NO[isChrome]) {
    var routeSplit = router.split('/');
    var lastKey = routeSplit[routeSplit.length - 1];
    if (lastKey === 'index.js') {
      routeSplit.pop();
    } else {
      routeSplit[routeSplit.length - 1] = lastKey.split('.')[0];
    }
    var chromeShell = 'chrome ' + routeSplit.join('/') + ' ';
    designs.forEach(function (design) {
      chromeShell += '&& chrome ' + design + ' ';
    });
    shell.exec(chromeShell);
  }
  callback && callback();
};