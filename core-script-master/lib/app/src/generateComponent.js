'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateComponent;
var path = require('path');
var fs = require('fs-extra');
var chalk = require('chalk');
var upperFirst = require('lodash/upperFirst');

var TEMPLATE_PATH = '../../template';

function generateComponent(basePath, compPath, _ref) {
  var type = _ref.type,
      _ref$name = _ref.name,
      name = _ref$name === undefined ? 'template' : _ref$name;

  var splitPaths = compPath.split('/').map(function (a) {
    return a.replace(/\s/g, '') && upperFirst(a);
  });
  compPath = splitPaths.join('/');
  var key = upperFirst(splitPaths.join(''));
  var importPath = type + '/' + compPath;
  var dirPath = path.join(basePath, importPath);
  var absolutPath = path.join(dirPath, 'index.js');
  if (fs.pathExistsSync(absolutPath)) {
    console.log(chalk.red('>>> [' + dirPath + '] \u7EC4\u4EF6\u5DF2\u5B58\u5728\uFF0C\u65E0\u6CD5\u521B\u5EFA\n'));
  } else {
    var getTemplate = require(TEMPLATE_PATH + '/component/' + type + '/' + name + '.js').default;
    fs.ensureDirSync(dirPath);
    if (type !== 'components') key += upperFirst(type);
    fs.writeFileSync(absolutPath, getTemplate(basePath, key));
    if (type === 'components') {
      var cssTemplate = require(TEMPLATE_PATH + '/common/css/template.js').default;
      fs.writeFileSync(path.join(dirPath, 'index.scss'), cssTemplate({ basePath: basePath, containerCss: { key: key } }));
    }
    console.log(chalk.yellow('>>> [' + dirPath + '] \u751F\u6210\u6210\u529F!\n'));
  }
  return {
    key: key,
    importPath: importPath,
    absolutPath: absolutPath
  };
}