'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getConfig = require('../snippet/src/getConfig');

var _src = require('../src.config');

var _constant = require('../snippet/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var merge = require('lodash/merge');

var SNIPPET_OUTPUT_PATH = (0, _getConfig.getSnippetOutputPath)(_src.PROJECT_BASE_PATH);

var ALLSNIPPETS = {};
var allSnippetJson = null;
var thisSnippetJson = null;
var nowProjectJson = _src.PROJECT_BASE_PATH.split('/').join('-') + '.json';

_constant.SNIPPET_TYPES.filter(function (type) {
  return type.name !== 'ALL';
}).forEach(function (type) {
  var historyDataPath = path.join(__dirname, '../snippet/data', type.name);
  var historyDatas = fs.readdirSync(historyDataPath).filter(function (file) {
    return (/\.json/.test(file)
    );
  });
  historyDatas.forEach(function (project) {
    var data = require(historyDataPath + '/' + project);
    if (project === nowProjectJson) {
      thisSnippetJson = merge(thisSnippetJson || {}, data);
    }
    if (data) {
      allSnippetJson = merge(allSnippetJson || {}, data);
    }
  });
});

var origin = require(SNIPPET_OUTPUT_PATH);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = Object.keys(origin)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var key = _step.value;

    if (!allSnippetJson[key]) ALLSNIPPETS[key] = origin[key];
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

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = Object.entries(thisSnippetJson)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
        _key = _step2$value[0],
        value = _step2$value[1];

    ALLSNIPPETS[_key] = value;
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

fs.writeFileSync(SNIPPET_OUTPUT_PATH, '' + JSON.stringify(ALLSNIPPETS, null, 2));

console.log(chalk.yellow('>> \u9879\u76EE\u8865\u5168\u9009\u62E9\u5B8C\u6210: [' + _src.PROJECT_BASE_PATH + '] \n'));