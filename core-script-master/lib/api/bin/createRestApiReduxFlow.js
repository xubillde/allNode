'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createApi = require('../src/createApi');

var _createApi2 = _interopRequireDefault(_createApi);

var _processApiList = require('../src/processApiList');

var _processApiList2 = _interopRequireDefault(_processApiList);

var _apiMap = require('../../template/restApi/apiMap');

var _apiMap2 = _interopRequireDefault(_apiMap);

var _apiRedux = require('../../template/restApi/apiRedux');

var _apiRedux2 = _interopRequireDefault(_apiRedux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');
var fetch = require('isomorphic-unfetch');
var find = require('lodash/find');

exports.default = function (basePath) {

  var config = require(path.join(basePath, '.core-config/restApi/config'));

  if (config.debug) {
    console.log(chalk.yellow('>> 使用 [mockData] 导出'));
    createApiReduxFlow(config.mockData, config, basePath);
  } else {
    fetch(config.src).then(function (res) {
      res.json().then(function (data) {
        console.log(data, ' sadsadasdasdasdsadasdas');
      });

      // if (data && data.length) {
      //   console.log(chalk.yellow('>> 请求数据正确，开始导出 \n'));
      //   console.log(data);
      //   createApiReduxFlow(data, config, basePath)
      // } else {
      //   throw Error('请求数据出错，请检查')
      // }
    });
  }
};

function createApiReduxFlow(apiData, config, basePath) {
  var apiList = (0, _processApiList2.default)(apiData, config.authField, basePath);

  generateApiMap(apiList, config.outputPath.apiMap, basePath); // api/Map

  generateApiList(apiList, config.outputPath.api, basePath); // api/list

  generateApiRedux(apiList, config, basePath);

  console.log(chalk.yellow('>> 导出完毕\n'));
}

function generateApiList(apiList, outputPath, basePath) {
  var apiOutputDir = path.join(basePath, outputPath);
  var apiFiles = (0, _createApi2.default)(apiList);
  fs.ensureDirSync(apiOutputDir);
  // 删除不使用的文件
  var origin = fs.readdirSync(apiOutputDir);
  origin.forEach(function (fileName) {
    if (!find(apiFiles, function (api) {
      return api.key + '.js' === fileName;
    })) {
      // console.log(chalk.cyan(`[generateApiList] ${fileName}在api列表中不存在，将删除该文件`));
      fs.unlinkSync(path.join(apiOutputDir, fileName));
    }
  });
  apiFiles.forEach(function (api) {
    var filePath = path.join(apiOutputDir, api.key + '.js');
    if (fs.existsSync(filePath)) {
      // console.log(chalk.red(`[generateApiList] ${api.key}.js已存在，如要更新请删除该文件`));
    } else {
      ensureWrite(filePath, api.file);
    }
  });
  console.log(chalk.cyan('\u5DF2\u66F4\u65B0api\u8C03\u7528\u5217\u8868: ' + apiOutputDir + '\n'));
}

function generateApiMap(apiList, outputPath, basePath) {
  var apiMapPath = path.join(basePath, outputPath);
  ensureWrite(apiMapPath, (0, _apiMap2.default)(apiList));
  console.log(chalk.cyan('\u5DF2\u66F4\u65B0api-map: ' + apiMapPath + '\n'));
}

function generateApiRedux(apiList, config, basePath) {
  var actionListDir = path.join(basePath, config.outputPath.action);
  var sagaListDir = path.join(basePath, config.outputPath.saga);
  var selectorListDir = path.join(basePath, config.outputPath.selector);

  fs.ensureDirSync(actionListDir);
  fs.ensureDirSync(sagaListDir);
  fs.ensureDirSync(selectorListDir);

  // 删除不使用的文件
  var originActionList = fs.readdirSync(actionListDir);
  var originSagaList = fs.readdirSync(sagaListDir);
  var originSelectorList = fs.readdirSync(selectorListDir);

  originActionList.forEach(function (fileName) {
    if (!find(apiList, function (api) {
      return api.key + '.js' === fileName;
    })) {
      console.log(chalk.cyan('[action/list] ' + fileName + '\u5728api\u5217\u8868\u4E2D\u4E0D\u5B58\u5728\uFF0C\u5C06\u5220\u9664\u8BE5\u6587\u4EF6'));
      fs.unlinkSync(path.join(actionListDir, fileName));
    }
  });
  originSagaList.forEach(function (fileName) {
    if (!find(apiList, function (api) {
      return api.key + '.js' === fileName;
    })) {
      console.log(chalk.cyan('[saga/list] ' + fileName + '\u5728api\u5217\u8868\u4E2D\u4E0D\u5B58\u5728\uFF0C\u5C06\u5220\u9664\u8BE5\u6587\u4EF6'));
      fs.unlinkSync(path.join(sagaListDir, fileName));
    }
  });
  originSelectorList.forEach(function (fileName) {
    if (!find(apiList, function (api) {
      return api.key + '.js' === fileName;
    })) {
      console.log(chalk.cyan('[selector/list] ' + fileName + '\u5728api\u5217\u8868\u4E2D\u4E0D\u5B58\u5728\uFF0C\u5C06\u5220\u9664\u8BE5\u6587\u4EF6'));
      fs.unlinkSync(path.join(selectorListDir, fileName));
    }
  });

  var apiReduxList = (0, _apiRedux2.default)(apiList, config);
  apiReduxList.forEach(function (api) {
    var acion = api.action;
    var saga = api.saga;
    var selector = api.selector;
    var actionfilePath = path.join(actionListDir, api.key + '.js');
    var sagafilePath = path.join(sagaListDir, api.key + '.js');
    var selectorfilePath = path.join(selectorListDir, api.key + '.js');
    if (fs.existsSync(actionfilePath)) {
      // console.log(chalk.red(`${actionfilePath}已存在，如要更新请删除该文件\n`));
    } else {
      ensureWrite(actionfilePath, acion);
    }

    if (fs.existsSync(sagafilePath)) {
      // console.log(chalk.red(`[saga] ${sagafilePath}已存在，如要更新请删除该文件\n`));
    } else {
      ensureWrite(sagafilePath, saga);
    }

    if (fs.existsSync(selectorfilePath)) {
      // console.log(chalk.red(`${selectorfilePath}已存在，如要更新请删除该文件\n`));
    } else {
      ensureWrite(selectorfilePath, selector);
    }
  });

  // 还要生成一个index.js文件
  var list = apiReduxList.map(function (api) {
    return api.key;
  }).sort(function (a, b) {
    return a.length - b.length;
  });

  var indexFile = gs1(list) + '\n' + 'module.exports = {\n' + (gs2(list) + '};\n');

  var actionIndexFile = gs1(list, true) + '\n' + 'module.exports = {\n' + (gs2(list) + '};\n');

  ensureWrite(path.join(actionListDir, 'index.js'), actionIndexFile);
  ensureWrite(path.join(sagaListDir, 'index.js'), indexFile);
  ensureWrite(path.join(selectorListDir, 'index.js'), indexFile);

  console.log(chalk.yellow('>> \u5DF2\u66F4\u65B0api-redux\u76F8\u5173\u6587\u4EF6\n'));
}

function gs1(mergeArrays, isAction) {
  var arrayOutputStr = '';
  mergeArrays.forEach(function (d, index) {
    arrayOutputStr += 'import ' + (isAction ? '{ ' + d + ' }' : d) + ' from \'./' + d + '\'\n';
  });
  return arrayOutputStr;
}

function gs2(mergeArrays) {
  var arrayOutputStr = '';
  mergeArrays.forEach(function (d, index) {
    if (index === mergeArrays.length - 1) {
      arrayOutputStr += '  ' + d + '\n';
      return;
    }
    arrayOutputStr += '  ' + d + ',\n';
  });
  return arrayOutputStr;
}

function ensureWrite(fpath, file) {
  fs.ensureFileSync(fpath);
  fs.writeFile(fpath, file);
}