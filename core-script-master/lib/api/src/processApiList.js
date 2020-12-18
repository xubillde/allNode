'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processApiList;
function processApiList(data, authField) {

  var originApiList = data.map(function (api) {
    var formData = api.parameters.formData || [];
    if (api.needAuth) {

      //   获得用户权限暂时移位到调用方法中
      // formData = formData.concat([
      //   { key: authField.userId, require: true },
      //   { key: authField.userToken, require: true }
      // ])
    }
    if (formData.length) api.parameters.formData = formData;
    return api; // es6 才能用 return { ...data, formData } 
  });

  // 如果有重复的，就增加名字后缀，fu fu1 fu2
  var uniqueKeys = [];
  var uniqueShortcuts = [];
  return originApiList.map(function (api) {
    var apiInfo = createApiName(api.path, api.method);
    var key = apiInfo.key;
    var shortcut = apiInfo.shortcut;
    var _findKey = uniqueKeys.filter(function (k) {
      return k === key;
    });
    var _findShortcut = uniqueShortcuts.filter(function (s) {
      return s === shortcut;
    });
    uniqueKeys.push(key);
    uniqueShortcuts.push(shortcut);
    if (_findKey.length) key = '' + key + _findKey.length;
    if (_findShortcut.length) shortcut = '' + key + _findShortcut.length;
    api.key = key;
    api.shortcut = shortcut;
    return api;
  });
}

function createApiName(apiPath, apiMethod) {
  var capitalize = require('lodash/capitalize');
  var lowerCase = require('lodash/lowerCase');
  var upperFirst = require('lodash/upperFirst');
  var toLower = require('lodash/toLower');
  var pathGroup = apiPath.split('/');
  var pathKeys = ['fetch', upperFirst(toLower(apiMethod))];
  var shortcuts = ['f', toLower(apiMethod).slice(0, 1)];
  pathGroup.forEach(function (path) {
    var objectName = path;
    if (path.charAt(0) === '{') {
      objectName = path.indexOf('_') > 0 ? path.split('_')[0].replace(/{/g, '') : path.replace(/{|}/g, '');
      pathKeys.pop();
    }
    pathKeys.push(capitalize(objectName));
    shortcuts.push(lowerCase(objectName.slice(0, 1)));
  });
  return {
    key: pathKeys.join(''),
    shortcut: shortcuts.join('')
  };
}