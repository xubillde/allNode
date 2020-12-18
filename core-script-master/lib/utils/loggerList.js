'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loggerList;
function loggerList(list, title) {
  var chalk = require('chalk');
  console.log(title + '\u6709\uFF1A\n');
  list.forEach(function (item, i) {
    console.log(chalk.magenta(i + 1 + '.' + item + '\n'));
  });
}