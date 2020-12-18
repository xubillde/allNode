'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getConfig;
exports.getSnippetOutputPath = getSnippetOutputPath;


var fs = require('fs');
var path = require('path');
var merge = require('lodash/merge');
var find = require('lodash/find');

function getConfig(basePath) {
  var defaultConfig = require('../default.config.js');
  var config = defaultConfig;
  var userConfigPath = basePath + '/.core-config/member/config.js';
  if (fs.existsSync(userConfigPath)) {
    var userConfig = require(userConfigPath);
    var userSnipperUsageRules = userConfig.snippet && userConfig.snippet.usage && userConfig.snippet.usage.rules;
    var mergedResult = [];
    if (userSnipperUsageRules.length) {
      var defaultRules = defaultConfig.snippet.usage.rules;
      // const baseRules = defaultRules.length < userSnipperUsageRules.length ? userSnipperUsageRules : defaultRules
      // 先填充userConfig.snippet.usage.rules
      var srcWithoutUser = defaultRules.filter(function (drule) {
        return !find(userSnipperUsageRules, function (urule) {
          return urule.test.toString() === drule.test.toString();
        });
      });
      mergedResult = userSnipperUsageRules.map(function (urule) {
        var findItInDefault = find(defaultRules, function (drule) {
          return drule.test.toString() === urule.test.toString();
        });
        return findItInDefault ? Object.assign(findItInDefault, urule) : urule;
      }).concat(srcWithoutUser);
    }
    config = merge(userConfig, defaultConfig);
    config.snippet.usage.rules = mergedResult;
    config.projectPath = basePath;
  } else {
    console.log('>>> \u4E0D\u5B58\u5728\u7528\u6237\u81EA\u5B9A\u4E49\u6210\u5458\u914D\u7F6E\uFF0C\u5C06\u4F7F\u7528\u9ED8\u8BA4\u914D\u7F6E ' + userConfigPath + '\uFF0C\u6216\u4F7F\u7528 core init-core \u914D\u7F6E');
  }
  return config;
}

function getSnippetOutputPath(basePath) {
  var CoreConfig = require(path.join(basePath, '.core-config/core.config'));
  return resolvePath(basePath, CoreConfig.snippet.outputPath);
}

function resolvePath(basePath, outputPath) {
  if (!outputPath) throw Error('\u4E0D\u5B58\u5728\u8865\u5168\u8F93\u51FA\u8DEF\u5F84\uFF0C\u8BF7\u5B9A\u4E49' + outputPath);
  return outputPath.charAt(0) === '/' ? outputPath : path.join(basePath, outputPath);
}