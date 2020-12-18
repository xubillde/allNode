'use strict';

var _loopInput = require('../app/src/loopInput');

var _loopInput2 = _interopRequireDefault(_loopInput);

var _src = require('../src.config');

var _constant = require('../snippet/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

console.log(chalk.magenta('-- [\u8865\u5168\u7C7B\u578B]:'));
_constant.SNIPPET_TYPES.sort(function (a, b) {
  return a.length - b.length;
}).forEach(function (type, index) {
  console.log(chalk.white(index + 1 + '. ' + type.name + ' \u2014\u2014 [' + type.desc + ']'));
});

var choose = (0, _loopInput2.default)('创建哪类的补全？输入序号: ', function (input) {
  var choose = input && parseInt(input);
  if (choose && choose > 0 && choose <= _constant.SNIPPET_TYPES.length) return choose - 1;
});

var chooseType = _constant.SNIPPET_TYPES[choose].name;

if (chooseType !== 'ALL') {
  createSnippet(chooseType);
} else {
  _constant.SNIPPET_TYPES.filter(function (type) {
    return type.name !== 'ALL';
  }).forEach(function (type) {
    createSnippet(type.name);
  });
}

function createSnippet(type) {
  var doCreate = require('../snippet/bin/' + type + '/create.js').default;
  doCreate(_src.PROJECT_BASE_PATH);
}