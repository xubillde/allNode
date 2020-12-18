'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _src = require('../src.config');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _package = require('../package.config');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_src.PACKAGE_VERSION);

_package2.default.forEach(function (c) {
  var sortName = c.children.sort(function (a, b) {
    return a.name.length - b.name.length;
  });
  sortName.forEach(function (data) {
    _commander2.default.command(data.name, data.comment);
    _commander2.default.command(data.abbr, 'alias for ' + data.name);
  });
});

_commander2.default.on('--help', function () {
  console.log('\n');
  _package2.default.forEach(function (c) {
    console.log(_chalk2.default.blue('--| ' + c.class + ' | --'));
    c.children.forEach(function (data, index) {
      console.log(index + 1 + '.[' + data.name + '] abbr: ', _chalk2.default.yellow('[core ' + data.abbr + ']'), data.comment);
    });
  });
});

_commander2.default.parse(process.argv);