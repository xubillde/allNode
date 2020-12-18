'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.flattenInstance = flattenInstance;
exports.resolveInstances = resolveInstances;

var _xmindConfig = require('../plan/xmind-config');

var _xmindConfig2 = _interopRequireDefault(_xmindConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeField = _xmindConfig2.default.timeField,
    specialSymbolMap = _xmindConfig2.default.specialSymbolMap,
    difficultyField = _xmindConfig2.default.difficultyField;

var pendTimeStr = '' + specialSymbolMap.timeType + timeField.pend;

var chalk = require('chalk');
var omit = require('lodash/omit');
var merge = require('lodash/merge');
var findIndex = require('lodash/findIndex');

// 将实例树展开
function flattenInstance(instances, title) {
  if (!instances.length) return [title || ''];
  var result = [];
  instances.forEach(function (i) {
    flattenInstance(i.children, i.title).forEach(function (f) {
      result.push(title ? title + '/' + f : f);
    });
  });
  return result;
}

function resolveNodePath(title) {
  if (!title) return;
  var spiltSlash = title.split('/');
  if (spiltSlash.length < 2) {
    return { name: title, time: null };
  } else {
    // console.log(spiltSlash,' spiltSlash');
    var remainTimeStr = spiltSlash[spiltSlash.length - 1].replace(/\s/g, '').replace('time:', '');
    return {
      name: spiltSlash.slice(0, spiltSlash.length - 1).join('/'),
      time: 0
    };
  }
}

function resolveInstances(flattenedInstances) {
  // 去掉所有空格
  flattenedInstances = flattenedInstances.map(function (i) {
    return i.replace(/\s/g, '');
  });
  // 期待的输出
  var instance = { page: {}, component: {}, custom: {} };
  flattenedInstances.forEach(function (fi, i) {
    var data = resolvePath(fi);
    instance[data.type][data.name] = merge(instance[data.type][data.name] || {}, omit(data, ['type', 'name']));
  });
  return instance;
}

function resolvePath(path) {
  var splitPaths = path.split('/');
  var pageIndex = getSymbolIndex(path, 'page');
  var pagePart = pageIndex < 0 ? [] : splitPaths.slice(0, pageIndex + 1);
  // 自定义实例
  if (!pagePart.length) {
    console.log(chalk.cyan('[' + path + '] \u6CA1\u6709\u68C0\u7D22\u5230\u9875\u9762\u7B26\u53F7*\uFF0C\u8FD4\u56DE\u81EA\u5B9A\u4E49\u5B9E\u4F8B'));
    return (0, _extends3.default)({
      type: 'custom'
    }, getCustomInstance(path));
  }
  // 页面实例
  var addBussniessIndex = getSymbolIndex(path, 'addClass');
  var importClassIndex = getSymbolIndex(path, 'importClass');
  if (importClassIndex < 0 && addBussniessIndex < 0) {
    return (0, _extends3.default)({
      type: 'page'
    }, getPageInstance(path));
  }

  return importClassIndex < 0 ? (0, _extends3.default)({
    type: 'component',
    pageName: pagePart.join('/').replace(specialSymbolMap.page, '')
  }, getAddClassInstance(path)) : (0, _extends3.default)({
    pageName: pagePart.join('/').replace(specialSymbolMap.page, ''),
    type: 'component'
  }, getImportClassInstance(path));
}

function getSymbolIndex(path, key) {
  var splitPaths = path.split('/');
  return findIndex(splitPaths, function (str) {
    return str.indexOf(specialSymbolMap[key]) >= 0;
  });
}

function getCustomInstance(path) {
  var splitPaths = path.split('/');
  var timeIndex = getSymbolIndex(path, 'timeType');
  return {
    name: timeIndex < 0 ? path : splitPaths.slice(0, timeIndex).join('/'),
    time: getNodeTime(timeIndex < 0 ? [] : splitPaths.slice(timeIndex))
  };
}

function getNodeTime(timePart) {
  if (!timePart.length) return null;
  var firstTime = timePart[0].replace('time:', '');
  if (firstTime === timeField.pend) {
    return null;
  } else {
    var min = parseInt(firstTime);
    var max = timePart[1] && parseInt(timePart[1]) || min;
    return {
      min: min,
      max: max,
      expect: Math.round((min + max) / 2)
    };
  }
}

function getPageInstance(path) {
  var splitPaths = path.split('/');
  var timeIndex = getSymbolIndex(path, 'timeType');
  var presetIndex = getSymbolIndex(path, 'presetType');
  var lastIndex = timeIndex < presetIndex ? presetIndex : timeIndex;
  if (timeIndex >= 0) {
    console.log(chalk.yellow('[' + path + '] \u9875\u9762\u5B9E\u4F8B\u4E0D\u80FD\u5B9A\u4E49\u65F6\u95F4\uFF0C\u9664\u975E\u4FEE\u6539\u4E86\u4E1A\u52A1\u6A21\u578B\uFF0C\u5DF2\u5C06\u8BE5\u8DEF\u5F84\u6539\u4E3Atype:simple'));
  }
  return {
    name: lastIndex < 0 ? path : splitPaths.slice(0, lastIndex).join('/').replace(specialSymbolMap.page, ''),
    difficulty: presetIndex < 0 ? difficultyField.simple : splitPaths[presetIndex].replace(specialSymbolMap.presetType, '')
  };
}

function getImportClassInstance(path) {
  var splitPaths = path.split('/');
  var pageIndex = getSymbolIndex(path, 'page');
  var pagePart = pageIndex < 0 ? [] : splitPaths.slice(0, pageIndex + 1);
  var importClassIndex = getSymbolIndex(path, 'importClass');
  var importName = splitPaths[importClassIndex].replace(specialSymbolMap.importClass, '').replace(/\>/g, '/');
  var modulePart = splitPaths.slice(importClassIndex + 1);
  // import的放入add的reference中
  return {
    name: importName,
    moduler: getModuler(modulePart)
  };
}

function getAddClassInstance(path) {
  // 测试/入口/选择页*/滑动选择/Z组件$静态组件
  var splitPaths = path.split('/');
  var pageIndex = getSymbolIndex(path, 'page');
  var presetIndex = getSymbolIndex(path, 'presetType');
  var pagePart = pageIndex < 0 ? [] : splitPaths.slice(0, pageIndex + 1);
  var classIndex = getSymbolIndex(path, 'addClass');
  var classStr = splitPaths[classIndex];
  var splitBusniess = classStr.split(specialSymbolMap.addClass);
  var prevClassPart = pageIndex + 1 === classIndex ? [] : splitPaths.slice(pageIndex + 1, classIndex);
  var namePart = prevClassPart.concat([splitBusniess[0]]);
  var name = namePart.join('/');
  var modulePart = splitPaths.slice(classIndex + 1);
  // import的放入add的reference中
  return {
    name: name,
    className: splitBusniess[1],
    moduler: getModuler(modulePart),
    difficulty: presetIndex < 0 ? difficultyField.simple : splitPaths[presetIndex].replace(specialSymbolMap.presetType, '')
  };
}

function getModuler(modulePart) {
  var _fieldMap;

  // [模块1, +X的引入, time:4, 30]
  // +T的收入
  var moduleIndex = findIndex(modulePart, function (path) {
    return path[0] === specialSymbolMap.addModule || path[0] === specialSymbolMap.removeModule || path[0] === specialSymbolMap.replaceModule;
  });
  if (moduleIndex < 0) return {}; // 测试/出口/中间页*/@滑动选择>slick组件
  var moduler = modulePart[moduleIndex];

  var timeIndex = findIndex(modulePart, function (p) {
    return p.indexOf(specialSymbolMap.timeType) >= 0;
  });
  var timePart = timeIndex < 0 ? [] : modulePart.slice(timeIndex);
  var prevPath = moduleIndex === 0 ? '' : modulePart.slice(0, moduleIndex).join('/');

  var modulerName = moduler.slice(1);
  var address = '' + prevPath + (prevPath ? '/' : '') + moduler.slice(1);
  var time = getNodeTime(timePart);
  var fieldMap = (_fieldMap = {}, (0, _defineProperty3.default)(_fieldMap, specialSymbolMap.addModule, 'add'), (0, _defineProperty3.default)(_fieldMap, specialSymbolMap.removeModule, 'remove'), (0, _defineProperty3.default)(_fieldMap, specialSymbolMap.replaceModule, 'replace'), _fieldMap);

  if (moduler[0] === specialSymbolMap.replaceModule) {
    var betweenModulerAndTime = [];
    if (timeIndex < 0) betweenModulerAndTime = modulePart.slice(moduleIndex + 1);
    if (moduleIndex + 1 < timeIndex) betweenModulerAndTime = modulePart.slice(moduleIndex + 1, timeIndex);
    return (0, _defineProperty3.default)({}, fieldMap[moduler[0]], (0, _defineProperty3.default)({}, modulerName, (0, _defineProperty3.default)({}, betweenModulerAndTime.join('/'), time)));
  }
  return (0, _defineProperty3.default)({}, fieldMap[moduler[0]], (0, _defineProperty3.default)({}, modulerName, { time: time, address: address }));
}