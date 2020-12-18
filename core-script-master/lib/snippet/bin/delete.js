'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

exports.default = function (type, outputPath, historySnippetJson) {
  if (!historySnippetJson) {
    console.log(chalk.grey('>> ' + type + ' \u4E0D\u5B58\u5728\u5386\u53F2\u6570\u636E, \u6CA1\u6709\u4EFB\u4F55\u66F4\u65B0'));
    return;
  }
  var origin = require(outputPath);
  var ALLSNIPPETS = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(origin)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (!historySnippetJson[key]) ALLSNIPPETS[key] = origin[key];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  fs.writeFileSync(outputPath, '' + JSON.stringify(ALLSNIPPETS, null, 2));
  console.log(chalk.yellow('\n>> [' + type + '] \u8865\u5168\u66F4\u65B0\u5B8C\u6210: ' + outputPath + '\n'));
};