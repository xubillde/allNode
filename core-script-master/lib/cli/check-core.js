'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _src = require('../src.config');

var coreConfig = _interopRequireWildcard(_src);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// $check core info [查看core信息]

var chalk = require('chalk');

console.log(chalk.yellow('>>> 【CORE INFO】\n'));
Object.entries(coreConfig).forEach(function (_ref) {
  var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];

  console.log(chalk.white(key + ' : ' + value + '\n'));
});