'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fs = require('fs-extra');
var chalk = require('chalk');

exports.default = function (_ref) {
  var outputPath = _ref.outputPath,
      snippet = _ref.snippet,
      dataPath = _ref.dataPath;

  if (!fs.existsSync(outputPath)) throw Error('\u8F93\u51FA\u8DEF\u5F84\u4E0D\u5B58\u5728 ' + outputPath);
  var origin = require(outputPath);
  fs.writeFileSync(outputPath, '' + JSON.stringify(Object.assign(origin, snippet), null, 2));

  console.log(chalk.yellow('>> \u8865\u5168\u66F4\u65B0\u5B8C\u6210: ' + outputPath + '\n'));

  var memberSnippetKeys = {};
  Object.keys(snippet).map(function (key) {
    memberSnippetKeys[key] = 1;
  });
  // 一个项目的对应的basePath对应一个memberSnippet
  fs.ensureFileSync(dataPath);
  fs.writeFileSync(dataPath, '' + JSON.stringify(memberSnippetKeys, null, 2));
};