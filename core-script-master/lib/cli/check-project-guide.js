'use strict';

var _src = require('../src.config');

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var shell = require('shelljs');

// 这个脚本用于初始化项目，相当于开始的引导，打开相关的配置文件

console.log(chalk.yellow('>>> welcome to start a project'));
console.log(chalk.yellow('>>> 即将为你打开项目初始须知'));

var INIT_FILES = ['assist/project/get-start.md'];

INIT_FILES.forEach(function (file) {
  if (fs.existsSync(path.join(_src.PROJECT_BASE_PATH, file))) {
    shell.exec('code ' + path.join(_src.PROJECT_BASE_PATH, file));
  } else {
    console.log(path.join(_src.PROJECT_BASE_PATH, file) + ' \u4E0D\u5B58\u5728');
  }
});