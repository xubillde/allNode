'use strict';

var _src = require('../src.config');

var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');

fs.copy(path.join(_src.PACKAGE_BASE_PATH, 'core-config'), path.join(_src.PROJECT_BASE_PATH, '.core-config')).then(function () {
  return console.log(chalk.yellow('>>> \u521D\u59CB\u5316\u6210\u529F'));
}).catch(function (err) {
  return console.error(err);
});