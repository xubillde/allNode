'use strict';

var _component = require('../template/common/snippet/import/component');

var _component2 = _interopRequireDefault(_component);

var _generateComponent = require('../app/src/generateComponent');

var _generateComponent2 = _interopRequireDefault(_generateComponent);

var _src = require('../src.config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var readlineSync = require('readline-sync');
var shell = require('shelljs');
var ncp = require('copy-paste');

var dirs = fs.readdirSync(path.join(__dirname, '../template/component'));

console.log(chalk.cyan('请选择要生成的元件类型：\n'));
dirs.forEach(function (dir, index) {
  console.log(index + 1 + '.' + dir);
});

var input = readlineSync.question('\n输入序号(回车默认为[components]): ');

var chooseIndex = input && parseInt(input) - 1 || 0; // 注意这个序号
var compType = dirs[chooseIndex];

var compPath = readlineSync.question('\n输入组件的路径(a/b/c): ');

if (!compPath) {
  console.log(chalk.red('未输入或输入错误!'));
} else {
  var component = (0, _generateComponent2.default)(_src.PROJECT_BASE_PATH, compPath, { type: compType });
  ncp.copy((0, _component2.default)(component).str, function () {
    console.log(chalk.yellow('>>> 已复制引用补全到剪切板\n'));
  });
  var NO = { no: 1, No: 1, NO: 1 };
  var isOpen = readlineSync.question('\n是否打开进行编辑(yes[默认]/no): ');
  if (!NO[isOpen]) {
    shell.exec('code ' + component.absolutPath);
  }
}