'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getConfig = require('../../src/getConfig');

var _createSnippet = require('./createSnippet');

var _createSnippet2 = _interopRequireDefault(_createSnippet);

var _processApiList = require('../../../api/src/processApiList');

var _processApiList2 = _interopRequireDefault(_processApiList);

var _generateSnippet = require('../../src/generateSnippet');

var _generateSnippet2 = _interopRequireDefault(_generateSnippet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');
var fetch = require('isomorphic-unfetch');

exports.default = function (basePath) {

  var SNIPPET_OUTPUT_PATH = (0, _getConfig.getSnippetOutputPath)(basePath);

  var config = require(path.join(basePath, '.core-config/restApi/config'));
  console.log(chalk.yellow('>> [restApi] \u5F00\u59CB\u5BFC\u51FA\u8865\u5168\uFF0Ctips: \u82E5\u539F\u6709\u8865\u5168\u4E2D\u6709\u76F8\u540C\u7684\u8865\u5168\uFF0C\u5C06\u4F1A\u88AB\u76F4\u63A5\u8986\u76D6'));

  if (config.debug) {
    console.log(chalk.grey('>>> 使用 [mockData] 生成补全'));

    (0, _generateSnippet2.default)({
      outputPath: SNIPPET_OUTPUT_PATH,
      snippet: (0, _createSnippet2.default)((0, _processApiList2.default)(config.mockData, config.authField), basePath),
      dataPath: path.join(__dirname, '../../data/restApi', basePath.split('/').join('-') + '.json')
    });
  } else {
    fetch(config.src).then(function (r) {
      return r;
    }) // .json() )
    .then(function (data) {
      if (data && data.length) {
        console.log(chalk.yellow('>>> 请求数据正确，开始导出补全\n'));
        console.log(data);
        // 这里还未完善
        (0, _generateSnippet2.default)({
          outputPath: SNIPPET_OUTPUT_PATH,
          snippet: (0, _createSnippet2.default)((0, _processApiList2.default)(data, config.authField), basePath),
          dataPath: path.join(__dirname, '../../data/restApi', basePath.split('/').join('-') + '.json')
        });
      } else {
        throw Error('请求数据出错，请检查');
      }
    });
  }
};