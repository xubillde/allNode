'use strict';

var _src = require('../src.config');

var _createGraphqlApi = require('../api/bin/createGraphqlApi');

var _createGraphqlApi2 = _interopRequireDefault(_createGraphqlApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

(0, _createGraphqlApi2.default)(_src.PROJECT_BASE_PATH);