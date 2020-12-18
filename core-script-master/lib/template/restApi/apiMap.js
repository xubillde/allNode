'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FILE = function FILE(keyStr, descStr) {
  return '\n// \u672C\u6587\u4EF6\u7531\u811A\u672C\u751F\u6210\uFF0C\u7528\u4E8E\u5176\u5B83\u6D41\u7A0B\uFF08\u4E3B\u8981\u662Fapi-redux\u6D41\u7A0B\uFF09\u8BFB\u53D6\u6240\u6709api-keys\u8FDB\u884C\u904D\u5386\n// \u5982\u679C\u76F4\u63A5\u8BFB\u53D6 api/index \u6587\u4EF6\uFF0C\u8BFB\u53D6\u5185\u5BB9\u591A\uFF0C\u6587\u4EF6\u5927\u5C0F\u4E5F\u66F4\u5927\n// \u56E0\u4E3Anode\u811A\u672C\u8981\u8BFB\u53D6\u672C\u6587\u4EF6\uFF0C\u4E0D\u80FD\u7528common export\u5199\u6CD5\n\nconst apiKeys = [\n' + keyStr + ']\nconst apiDesc = {\n' + descStr + '}\nmodule.exports = {\n  apiKeys,\n  apiDesc\n}\n';
};

exports.default = function (apiList) {
  var descStr = '';
  var keyStr = '';
  apiList.forEach(function (api) {
    keyStr += '\t\'' + api.key + '\',\n';
    descStr += '\t' + api.key + ': \'' + api.description + '\',\n';
  });

  return FILE(keyStr, descStr);
};