'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createApiFunction;

var _bodyPayload = require('./bodyPayload');

var _bodyPayload2 = _interopRequireDefault(_bodyPayload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toUpper = require('lodash/toUpper');


var Head = function Head(api) {
  return '\n// ------------------------------------\n// ' + api.key + ' -- ' + api.description + '\n// ------------------------------------\nexport default function ' + api.key + ' (payload) {';
};

function createApiFunction(api) {
  var apiFunction = Head(api);
  var nbp = createApiNoneBodyPayload(api.parameters);
  if (nbp) apiFunction += '\n\t' + nbp;
  var bodyPayload = (0, _bodyPayload2.default)(api.parameters);
  if (bodyPayload) apiFunction += '\n\tconst bodyPayload = omit(payload, ' + bodyPayload + ')';
  var bodyName = bodyPayload ? 'bodyPayload' : 'payload';
  return '\n  ' + apiFunction + '\n  ' + createApiAuth(api.needAuth, bodyName) + '\n  return xFetch({\n    query: ' + createApiQuery(api.parameters.query || []) + '\n    url: ' + createApiUrl(api.path) + ',\n    body: ' + (api.needSignature ? 'easySignature(' + bodyName + ')' : '' + bodyName) + ',\n    method: \'' + toUpper(api.method) + '\' // GET, POST, PUT, PATCH, HEAD, OPTIONS or DELETE\n  })\n}';
}

// 这个后来加的
function createApiAuth(needAuth, bodyName) {
  if (!needAuth) return '';
  return '\n  const { user_id, token } = getUserAuth()\n  ' + bodyName + '[\'user_id\'] = user_id\n  ' + bodyName + '[\'access_token\'] = token\n';
}

function createApiUrl(apiPath) {
  return '`' + apiPath.replace(/{/g, "${") + '`';
}

function createApiQuery(query) {
  if (!query.length) return 'null,';
  var queryKey = query.map(function (q) {
    return q.key;
  });
  return '{ ' + queryKey.join(', ') + ' },';
}

function createApiNoneBodyPayload(apiParams) {
  // 路径参数是必须的
  var pathData = (apiParams.path || []).map(function (d) {
    return d.key;
  }).filter(function (a) {
    return !!a;
  });
  // 如果query的值为0(number)/false/null，会被判断为无效query
  var query = (apiParams.query || []).map(function (d) {
    return d.key;
  }).filter(function (a) {
    return !!a;
  });
  var noneBody = query.concat(pathData); // ['user_id', 'type']
  if (!noneBody.length) return '';
  return 'const { ' + noneBody.join(', ') + ' } = payload';
}