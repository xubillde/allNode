"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createApiBody;
function createApiBody(apiParams) {
  var query = (apiParams.query || []).map(function (d) {
    return "'" + d.key + "'";
  }).filter(function (a) {
    return !!a;
  });
  var pathData = (apiParams.path || []).map(function (d) {
    return "'" + d.key + "'";
  }).filter(function (a) {
    return !!a;
  });
  var noneBody = query.concat(pathData); // ['user_id', 'type']
  if (!noneBody.length) return null;
  return "[" + noneBody.join(", ") + "]";
}