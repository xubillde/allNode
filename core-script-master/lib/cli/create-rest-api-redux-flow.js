'use strict';

var _src = require('../src.config');

var _createRestApiReduxFlow = require('../api/bin/createRestApiReduxFlow');

var _createRestApiReduxFlow2 = _interopRequireDefault(_createRestApiReduxFlow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

(0, _createRestApiReduxFlow2.default)(_src.PROJECT_BASE_PATH);