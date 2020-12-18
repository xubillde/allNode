'use strict';

var _src = require('../src.config');

var _project = require('../project.config');

var _project2 = _interopRequireDefault(_project);

var _loopInput = require('../app/src/loopInput');

var _loopInput2 = _interopRequireDefault(_loopInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// $open project faster 开发某个项目(项目列表需要配置)

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var shell = require('shelljs');

console.log(chalk.magenta('-- [\u9879\u76EE]:'));
_project2.default.forEach(function (project, index) {
  console.log(chalk.white(index + 1 + '. ' + project.name));
});

var choose = (0, _loopInput2.default)('打开哪个项目: ', function (input) {
  var choose = input && parseInt(input);
  if (choose && choose > 0 && choose <= _project2.default.length) return choose - 1;
});

shell.exec('code ' + _project2.default[choose].path);