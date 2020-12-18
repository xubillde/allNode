'use strict';

var _src = require('../src.config');

// $config working projects 配置需要管理的项目
var path = require('path');
var shell = require('shelljs');

shell.exec('code ' + path.join(_src.PACKAGE_BASE_PATH, 'src/project.config.js'));