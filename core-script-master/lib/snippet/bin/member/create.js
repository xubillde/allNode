'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getConfig = require('../../src/getConfig');

var _getConfig2 = _interopRequireDefault(_getConfig);

var _file = require('../../../utils/file');

var _generateImportSnippet = require('../../src/generateImportSnippet');

var _generateImportSnippet2 = _interopRequireDefault(_generateImportSnippet);

var _generateUsageSnippet = require('../../src/generateUsageSnippet');

var _generateUsageSnippet2 = _interopRequireDefault(_generateUsageSnippet);

var _generateSnippet = require('../../src/generateSnippet');

var _generateSnippet2 = _interopRequireDefault(_generateSnippet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

exports.default = function (basePath) {

  var config = (0, _getConfig2.default)(basePath);

  var OUTPUT_PATH = (0, _getConfig.getSnippetOutputPath)(basePath);

  console.log(chalk.yellow('>> [member] \u5F00\u59CB\u5BFC\u51FA\u8865\u5168\uFF0Ctips: \u82E5\u539F\u6709\u8865\u5168\u4E2D\u6709\u76F8\u540C\u7684\u8865\u5168\uFF0C\u5C06\u4F1A\u88AB\u76F4\u63A5\u8986\u76D6'));

  var ALLSNIPPETS = {};
  config.snippet.import.paths.forEach(function (member) {
    var joinedFiles = (0, _file.joinFilesName)((0, _file.getFilesTree)(path.join(basePath, './' + member.path))).filter(function (j) {
      return (/\.(js|jsx)$/.test(j.name)
      );
    });
    var snippets = (0, _generateImportSnippet2.default)(joinedFiles, config, member);
    if (snippets) {
      ALLSNIPPETS = Object.assign(ALLSNIPPETS, snippets.snippet);
    }
  });
  config.snippet.usage.paths.forEach(function (member) {
    var joinedFiles = (0, _file.joinFilesName)((0, _file.getFilesTree)(path.join(basePath, './' + member.path)));
    var usage = (0, _generateUsageSnippet2.default)(joinedFiles, config, member);
    if (usage) {
      ALLSNIPPETS = Object.assign(ALLSNIPPETS, usage.snippet);
    }
  });

  (0, _generateSnippet2.default)({
    outputPath: OUTPUT_PATH,
    snippet: ALLSNIPPETS,
    dataPath: path.join(__dirname, '../../data/member', basePath.split('/').join('-') + '.json')
  });
};