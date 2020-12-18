'use strict';

var _recompose = require('../recompose');

var _recompose2 = _interopRequireDefault(_recompose);

var _readlineSync = require('readline-sync');

var _readlineSync2 = _interopRequireDefault(_readlineSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var shell = require('shelljs');
var ncp = require('copy-paste');

// 展开recompose列表

// 选择想使用的并拿到剪切板

// 最后一个是打开官网

console.log(chalk.cyan('【recompose】相关函数：https://github.com/acdlite/recompose/blob/master/docs/API.md\n'));
_recompose2.default.forEach(function (data, index) {
  console.log(chalk.magenta('-> ' + data.class + ' '));
  var children = data.children.sort(function (a, b) {
    return a.length - b.length;
  });
  children.forEach(function (item, iindex) {
    console.log('  ' + (index + 1) + (iindex + 1) + ' ' + item.key + (item.comment ? ' --- ' : '') + chalk.grey(item.comment));
  });
});
console.log('\n');

var choose = _readlineSync2.default.question('使用哪个函数: ');

var firstIndex = choose && choose[0] && parseInt(choose[0]) - 1;
var childIndex = choose && choose[0] && parseInt(choose[1]) - 1;

var target = _recompose2.default[firstIndex] && _recompose2.default[firstIndex].children[childIndex];
if (!target) {
  console.log(chalk.red('未输入或输入错误!'));
} else {
  var targetPath = path.join(__dirname, '../recompose/use/' + target.key + '.js');
  if (fs.existsSync(targetPath)) {
    var generate = require('../recompose/use/' + target.key).default;
    if (target.key === 'withState') {
      var stateKey = _readlineSync2.default.question('输入state的名称: ');
      var str = generate(stateKey);
      ncp.copy(str, function () {
        console.log(chalk.yellow('>>>>> 已复制到剪贴板！'));
      });
    } else {
      ncp.copy(generate, function () {
        console.log(chalk.yellow('>>>>> 已复制到剪贴板！'));
      });
    }
  } else {
    ncp.copy(target.key, function () {
      console.log(chalk.yellow('>>>>> 该方法暂无指导使用，已复制关键词'));
    });
  }
}