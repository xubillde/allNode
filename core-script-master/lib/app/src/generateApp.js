'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getAppPath = require('./getAppPath');

var _getAppPath2 = _interopRequireDefault(_getAppPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');
var upperFirst = require('lodash/upperFirst');


var TEMPLATE_PATH = path.join(__dirname, '../../template');

exports.default = function (basePath, pagePath) {
  var app = (0, _getAppPath2.default)(basePath, pagePath);

  var templateField = {
    page: 'page/pages/template.js',
    parser: 'page/parsers/template.js',
    container: 'page/containers/template.js',
    containerCss: 'common/css/template.js'
  };
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      if (templateField[key]) {
        var getFile = require(TEMPLATE_PATH + '/' + templateField[key]).default;
        var file = getFile((0, _extends3.default)({ basePath: basePath }, app));
        if (fs.existsSync(value.absolutePath)) {
          console.log(chalk.red('>>> [' + value.absolutePath + '] \u5DF2\u5B58\u5728\uFF0C\u5982\u8981\u66F4\u65B0\u8BF7\u5220\u9664'));
        } else {
          fs.ensureFileSync(value.absolutePath);
          fs.writeFile(value.absolutePath, file, function () {
            console.log(chalk.yellow('>>> [' + value.absolutePath + '] \u6210\u529F\u751F\u6210'));
          });
        }
      }
    };

    for (var _iterator = Object.entries(app)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
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
};