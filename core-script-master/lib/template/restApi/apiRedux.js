'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createApiRedux;

var capitalize = require('lodash/capitalize');

var SAGA_FILE_HEAD = function SAGA_FILE_HEAD(_ref) {
  var apiKey = _ref.apiKey,
      apiPath = _ref.apiPath,
      actionPath = _ref.actionPath;
  return '\nimport ' + apiKey + ' from \'' + apiPath + '/' + apiKey + '.js\'\nimport * as apiAction from \'' + actionPath + '/' + apiKey + '.js\'\nimport { put } from \'redux-saga/effects\'\n';
};

var SELECTOR_FILE_HEAD = '\nimport { createSelector } from \'reselect\'\n\n';

var createApiAction = function createApiAction(_ref2) {
  var key = _ref2.key,
      desc = _ref2.desc;
  return '\n// ------------------------------------\n// ' + key + ' -- ' + desc + '\n// ------------------------------------\nexport const ' + key + ' = (payload = {}) => ({ type: \'' + key + '_REQUEST\', ...payload })\nexport const ' + key + 'Success = (payload = {}) => ({ type: \'' + key + '_REQUEST_SUCCESS\', ...payload })\nexport const ' + key + 'Failure = (payload = {}) => ({ type: \'' + key + '_REQUEST_FAILURE\', ...payload })\n';
};

var createApiSaga = function createApiSaga(_ref3) {
  var key = _ref3.key,
      desc = _ref3.desc;
  return '\n// ------------------------------------\n// ' + key + ' -- ' + desc + '\n// ------------------------------------\nexport default function * ' + key + 'Saga (action) {\n  try {\n    const res = yield ' + key + '(action.payload)\n    yield put(apiAction[\'' + key + 'Success\']({ payload: res }))\n  } catch (err) {\n    console.log(\'' + key + ' \u2014\u2014 this err need to tested\');\n    yield put(apiAction[\'' + key + 'Failure\']({ payload: err }))\n  }\n}\n';
};

var createApiSelector = function createApiSelector(_ref4) {
  var key = _ref4.key,
      desc = _ref4.desc;
  return '\n// ------------------------------------\n// ' + key + ' -- ' + desc + '\n// ------------------------------------\nexport const select' + CFL(key) + ' = () => state => state.' + key + '\nexport const select' + CFL(key) + 'Res = () => createSelector(\n  select' + CFL(key) + '(),\n  ' + key + ' => ' + key + ' && ' + key + '.response\n)\nexport const select' + CFL(key) + 'Count = () => createSelector(\n  select' + CFL(key) + '(),\n  ' + key + ' => ' + key + ' && ' + key + '.count\n)\nexport const select' + CFL(key) + 'State = () => createSelector(\n  select' + CFL(key) + '(),\n  ' + key + ' => ' + key + ' && ' + key + '.fetching\n)\nexport const ' + key + 'Success = state => (select' + CFL(key) + '()(state).count.success !== 0)\n';
};

function createApiRedux(apiList, config) {
  return apiList.map(function (api) {
    return {
      key: api.key,
      action: createApiAction({
        key: api.key,
        desc: api.description
      }),
      saga: SAGA_FILE_HEAD({
        apiKey: api.key,
        apiPath: config.outputPath.api,
        actionPath: config.outputPath.action
      }) + createApiSaga({
        key: api.key,
        desc: api.description
      }),
      selector: SELECTOR_FILE_HEAD + createApiSelector({
        key: api.key,
        desc: api.description
      })
    };
  });
}

function CFL(str) {
  return '' + capitalize(str.charAt(0)) + str.slice(1);
}