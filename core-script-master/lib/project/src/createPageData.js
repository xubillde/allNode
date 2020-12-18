'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPageData;

var _getPages = require('../../utils/getPages');

var _getPages2 = _interopRequireDefault(_getPages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');

function createPageData(basePath) {

  var pages = (0, _getPages2.default)(basePath);
  var file = getPagaData(pages);
  fs.writeFileSync(path.join(basePath, 'page-data.js'), file);
}

function getPagaData(pages) {
  var fileStr = '\n  const TODO = 0\n  const DOING = 1\n  const DONE = 2\n  \n  const URL = \'url_access\'\n  const BACK = \'back_access\' // \u540E\u671F\u8FD0\u7B97\u65F6\u63D2\u5165\uFF0C\u53EA\u8981\u5B58\u5728target\u7684\u5747\u52A0\u5165BACK\n  const CLIENT = \'client_jump_access\'\n  \n  // \u672A\u6765\u52A0\u7BA1\u7406\u5B57\u6BB5\uFF1F\u6BD4\u5982\u63D2\u5165\u5173\u8054\u7EC4\u4EF6\uFF0C\u63A5\u5165\u7684api\n  export default [';

  pages.forEach(function (page) {
    fileStr += JSON.stringify({
      tag: '请修改',
      name: page,
      page: page,
      designs: [''],
      state: 'TODO',
      desc: '描述',
      comment: [''],
      router: {
        source: [],
        target: []
      },
      components: [],
      apis: []
    }, null, 2);
    fileStr += ',\n';
  });

  fileStr += ']\n';
  return fileStr;
}