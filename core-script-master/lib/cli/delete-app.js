'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getAppPath = require('../app/src/getAppPath');

var _getAppPath2 = _interopRequireDefault(_getAppPath);

var _loopInput = require('../app/src/loopInput');

var _loopInput2 = _interopRequireDefault(_loopInput);

var _src = require('../src.config');

var _file = require('../utils/file');

var _path = require('../utils/path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');
var readlineSync = require('readline-sync');
var toLower = require('lodash/toLower');

var apps = (0, _file.joinFilesName)((0, _file.getFilesTree)(path.join(_src.PROJECT_BASE_PATH, 'pages')));

var deleteTargets = ['手动输入路径'].concat(apps.map(function (app) {
  return app.fullImportPath;
}));

console.log(chalk.magenta('\n-- [\u5220\u9664\u76EE\u6807\u5217\u8868]:'));
deleteTargets.forEach(function (target, index) {
  console.log(chalk.white(index + 1 + '. ' + target));
});

var choose = (0, _loopInput2.default)('请选择删除目标：', function (input) {
  var choose = input && parseInt(input);
  if (choose && choose > 0 && choose <= deleteTargets.length) return choose - 1;
});

// 删除方式
var target = deleteTargets[choose];

if (target !== '手动输入路径') {
  removeApp((0, _getAppPath2.default)(_src.PROJECT_BASE_PATH, target), target);
} else {
  var inputApp = null;
  var appPath = (0, _loopInput2.default)('\n输入页面的路径(a/b/c || a/b/c.js): ', function (input) {
    var app = (0, _getAppPath2.default)(_src.PROJECT_BASE_PATH, input);
    if (fs.existsSync(app.page.absolutePath) || fs.existsSync(path.join(_src.PROJECT_BASE_PATH, app.page.importPath))) {
      inputApp = app;
      return input;
    }
    return false;
  });
  removeApp(inputApp, appPath);
}

function moveLogger(rpath, logger) {
  fs.remove(rpath).then(function () {
    console.log(chalk.yellow('>>> \u6210\u529F\u79FB\u9664 [' + rpath + ']'));
  });
}

function removeApp(app, appPath) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(app)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      if ({ page: 1, parser: 1, container: 1 }[key]) {
        (function () {
          var removePath = path.join(_src.PROJECT_BASE_PATH, value.importPath);
          var itemSelf = removePath.split('/').pop();
          if (itemSelf.indexOf('.') < 0) removePath = path.join(_src.PROJECT_BASE_PATH, value.importPath, 'index.js');
          var silbDirs = fs.readdirSync(path.dirname(removePath)).filter(function (dir) {
            return dir !== 'index.js' && dir !== 'index.scss' && dir !== itemSelf;
          });
          if (silbDirs.length) {
            // 路径下存在其他app
            key === 'container' && moveLogger(path.join(_src.PROJECT_BASE_PATH, value.importPath, 'index.scss'));
            moveLogger(removePath);
          } else {
            moveLogger((0, _path.getRemovePath)(removePath));
          }
        })();
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}