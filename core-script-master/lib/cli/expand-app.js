'use strict';

var _file = require('../utils/file');

var _path = require('../utils/path');

var _expand = require('../app/expand');

var _expand2 = _interopRequireDefault(_expand);

var _src = require('../src.config');

var _getIp = require('../utils/getIp');

var _getIp2 = _interopRequireDefault(_getIp);

var _createPageData = require('../project/src/createPageData');

var _createPageData2 = _interopRequireDefault(_createPageData);

var _getPages = require('../utils/getPages');

var _getPages2 = _interopRequireDefault(_getPages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var find = require('lodash/find');
var upperFirst = require('lodash/upperFirst');
var readlineSync = require('readline-sync');


var pageData = [];
var port = null;
try {
  port = require(path.join(_src.PROJECT_BASE_PATH, 'config.js')).port;
} catch (e) {
  throw Error(chalk.red('项目不存在 config.js'));
}

try {
  // 没有page-data.js帮项目生成一个
  if (!fs.existsSync(path.join(_src.PROJECT_BASE_PATH, './page-data.js'))) {
    console.log(chalk.yellow('>>> \u4E0D\u5B58\u5728pata-data.js \u5DF2\u4E3A\u60A8\u751F\u6210'));
    (0, _createPageData2.default)(_src.PROJECT_BASE_PATH);
  } else {
    pageData = require(path.join(_src.PROJECT_BASE_PATH, './page-data.js')).pages;
  }
} catch (e) {
  console.log(e);
}
var pages = (0, _getPages2.default)(_src.PROJECT_BASE_PATH);

console.log(chalk.magenta('\n-- 可展开的app有:'));
pages.forEach(function (file, index) {
  console.log(chalk.white(index + 1 + '.' + file));
});

var appIndex = getAppIndex();
var ipaddress = (0, _getIp2.default)();

var choosePage = pages[appIndex - 1];

var _pageData = find(pageData, function (page) {
  return (0, _path.getPagePath)(page.page) === (0, _path.getPagePath)(choosePage);
});

var app = {
  path: choosePage,
  router: ipaddress + ':' + port + '/' + choosePage,
  designs: _pageData && _pageData.designs || []
};

(0, _expand2.default)(_src.PROJECT_BASE_PATH, app, function () {
  console.log(chalk.yellow('Hi ' + choosePage + '!'));
});

function getAppIndex() {
  var result = null;
  loop();
  function loop() {
    var input = readlineSync.question('\n你需要展开哪个app? 输入序号: \n');
    var appIndex = input && parseInt(input);
    if (!appIndex || appIndex <= 0) {
      console.log('输入错误，请重新输入');
      loop();
    } else {
      result = appIndex;
    }
  }
  return result;
}