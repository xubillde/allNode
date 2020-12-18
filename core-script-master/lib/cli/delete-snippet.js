'use strict';

var _loopInput = require('../app/src/loopInput');

var _loopInput2 = _interopRequireDefault(_loopInput);

var _getConfig = require('../snippet/src/getConfig');

var _delete = require('../snippet/bin/delete');

var _delete2 = _interopRequireDefault(_delete);

var _src = require('../src.config');

var _constant = require('../snippet/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var readlineSync = require('readline-sync');
var merge = require('lodash/merge');

var SNIPPET_OUTPUT_PATH = (0, _getConfig.getSnippetOutputPath)(_src.PROJECT_BASE_PATH);

var chooseType = getChooseType().name;

if (chooseType !== 'ALL') {
  var historyData = getHistoryData(chooseType);
  (0, _delete2.default)(chooseType, SNIPPET_OUTPUT_PATH, historyData.json);
  fs.unlinkSync(historyData.path);
} else {
  var historySnippetJson = null;
  _constant.SNIPPET_TYPES.filter(function (type) {
    return type.name !== 'ALL';
  }).forEach(function (type) {
    var data = getHistoryData(type.name);
    if (data) {
      historySnippetJson = merge(historySnippetJson || {}, data.json);
      fs.unlinkSync(data.path);
    }
  });
  (0, _delete2.default)(chooseType, SNIPPET_OUTPUT_PATH, historySnippetJson);
}

function getChooseType() {
  console.log(chalk.magenta('-- [\u8865\u5168\u7C7B\u76EE\u5F55]:'));
  _constant.SNIPPET_TYPES.forEach(function (type, index) {
    console.log(chalk.white(index + 1 + '. ' + type.name + ' \u2014\u2014 [' + type.desc + ']'));
  });
  var choose = (0, _loopInput2.default)('删除哪类的补全？输入序号: ', function (input) {
    var choose = input && parseInt(input);
    if (choose && choose > 0 && choose <= _constant.SNIPPET_TYPES.length) return choose - 1;
  });
  return _constant.SNIPPET_TYPES[choose];
}

function getHistoryData(snippetType) {
  var historyDataPath = path.join(__dirname, '../snippet/data', snippetType);
  var historyDatas = fs.readdirSync(historyDataPath);

  if (!historyDatas.length) return null;
  console.log(chalk.magenta('\n-- [\u9879\u76EE\u76EE\u5F55]:'));
  historyDatas.sort(function (a, b) {
    return a.length - b.length;
  }).forEach(function (file, index) {
    console.log(chalk.white(index + 1 + '. ' + file));
  });
  var choose2 = (0, _loopInput2.default)('[' + snippetType + '] \u5220\u9664\u54EA\u4E2A\u9879\u76EE\u7684\uFF1F\u8F93\u5165\u5E8F\u53F7:', function (input) {
    var choose = input && parseInt(input);
    if (choose && choose > 0 && choose <= historyDatas.length) return choose - 1;
  });
  var historySnippetJson = require(historyDataPath + '/' + historyDatas[choose2]);
  return {
    path: historyDataPath + '/' + historyDatas[choose2],
    json: historySnippetJson
  };
}