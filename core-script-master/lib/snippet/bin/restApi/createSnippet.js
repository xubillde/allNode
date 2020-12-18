'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSnippet;
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var capitalize = require('lodash/capitalize');
var upperFirst = require('lodash/upperFirst');

// apiList: [
//   {
//     key: '',
//     parameters: [],
//     shortcut: ''
//   }
// ]

// parameters: [
//   {
//     required: true,
//     key: xx,
//     type: xx,
//     description: 1,
//     options: [1, 2, 3]
//   }
// ]

// 补全表，可以经常来看看，或者出一个文档

function createSnippet(list, projectPath) {
  var apiList = apiListMap(list);
  var snippets = {
    "import dispatch fetchData": { // 这个快捷键就一条
      "prefix": "ipdpfd",
      "body": ['import { fetchData } from \'actions\' // file://' + projectPath + 'actions/index.js'],
      "description": "import dispatch fetchData"
    }
  };
  apiList.forEach(function (api) {
    var snippetsBody = [].concat(["this.props.dispatch(fetchData({", '\tkey: \'' + api.key + '\',', "\tpayload: {"]);
    snippetsBody = snippetsBody.concat(createApiParams(api.parameters, 2));
    snippetsBody = snippetsBody.concat(["\t}", "}))"]);

    // add dispatch
    snippets['dispatch ' + api.key] = {
      "prefix": 'dp' + api.shortcut,
      "body": snippetsBody,
      "description": 'dispatch ' + api.key
    };

    snippets['import selector ' + api.key] = {
      "prefix": 'ipsl' + api.shortcut,
      "body": ['// file://' + projectPath + 'selectors/list/' + api.key + '.js', 'import {', '\t' + api.key + 'Success,', '\tselect' + upperFirst(api.key) + 'Res,', '\tselect' + CFL(api.key) + 'State', '} from \'selectors/list/' + api.key + '.js\''],
      "description": 'import select ' + api.key
      // add fetch whether success
    };snippets[api.key + ' whether fetch Success'] = {
      "prefix": 'sls' + api.shortcut,
      "body": [api.key + 'Success(props.store.getState())'],
      "description": api.key + ' whether fetch Success'
    };
  });
  return snippets;
}

function createApiParams(params, indent) {
  var str = [];
  params.forEach(function (param) {
    str.push(createApiParam(param, indent) + ',');
  });
  return str;
}

function createApiParam(param, indent) {
  if (param.require) {
    return '' + createIndex(indent) + param.key + ': ' + (param.type || 'any') + ', // ' + (param.descrition || '') + ' \u5FC5\u586B\u53C2\u6570';
  }
  return '' + createIndex(indent) + param.key + ': ' + (param.type || 'any') + ', // ' + (param.descrition || '') + ' \u9009\u586B\u53C2\u6570: ' + param.options.join('/');
}

function createIndex(num) {
  return new Array(num).fill('\t').join('');
}

function CFL(str) {
  return '' + capitalize(str.charAt(0)) + str.slice(1);
}

function apiListMap(list) {
  function mapParameters(params) {
    var result = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(params)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var value = params[key];
        if (value) {
          result = result.concat(value.map(function (p) {
            return {
              require: p.require,
              key: p.key,
              type: p.type || 'any',
              description: p.description || '',
              options: p.options || []
            };
          }));
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return result;
  }

  return list.map(function (api) {
    return {
      key: api.key,
      shortcut: api.shortcut,
      parameters: mapParameters(api.parameters || {})
    };
  });
}