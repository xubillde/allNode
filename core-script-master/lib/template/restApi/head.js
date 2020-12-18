'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyPayload = require('./bodyPayload');

var _bodyPayload2 = _interopRequireDefault(_bodyPayload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (api) {
  return '\nimport xFetch from \'../utils\'\n' + (api.needAuth ? 'import getUserAuth from \'../user\'' : '') + '\n' + ((0, _bodyPayload2.default)(api.parameters) ? 'import omit from \'lodash/omit\'' : '') + '\n' + (api.needSignature ? 'import easySignature from \'../signature\'' : '') + '\n// \u6CE8\u610F\uFF1A\u5982\u679Cquery\u4E2Dvalue\u503C\u5305\u62EC\u6570\u5B570/false/null\uFF0C\u5747\u4F1A\u88AB\u5224\u5B9A\u4E3A\u65E0\u8BE5query\uFF0C\u8BF7\u907F\u514D\u4F7F\u7528\n// ------------------------------------\n// EXAMPLE\n// ------------------------------------\n// export default function fetchX (payload) {\n//   return xFetch({\n//     url: \'/users\',\n//     method: \'GET\', // GET, POST, PUT, PATCH, HEAD, OPTIONS or DELETE,\n//     body: payload.x,\n//     credentials: \'include\' // which will allow both CORS and same origin requests to work with cookies\n//   })\n// }\n';
};