'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilesTree = getFilesTree;
exports.joinFilesName = joinFilesName;
exports.uniqueShorcutNames = uniqueShorcutNames;

var _array = require('./array');

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var upperFirst = require('lodash/upperFirst');
var lowerFirst = require('lodash/lowerFirst');
var toLower = require('lodash/toLower');


var ignoreFile = {
  name: {
    '__tests__': true,
    '.DS_Store': true
  },
  path: {
    'x/xxx': true
  }
};

function getFilesTree(dirPath) {
  var merge = [];
  if (!fs.existsSync(dirPath)) {
    console.log(chalk.grey('\u4E0D\u5B58\u5728\u8BE5\u8DEF\u5F84\uFF1A' + dirPath + ' \u5DF2\u5C06\u5176\u5FFD\u7565'));
  } else {
    var files = fs.readdirSync(dirPath) || [];
    files.forEach(function (child) {
      var childPath = path.join(dirPath, child);
      if (!(ignoreFile.name[child] || ignoreFile.path[childPath])) {
        var children = fs.statSync(childPath).isDirectory() ? getFilesTree(childPath) : [];
        merge.push({
          name: child,
          type: fs.statSync(childPath).isDirectory() ? 'folder' : 'file',
          path: dirPath,
          children: children
        });
      }
    });
  }
  return merge;
}

function joinFilesName(filestree) {
  if (!filestree.length) return [];
  // 过滤掉不存在子元素的文件夹
  var filterdTree = filestree.filter(function (file) {
    return !(file.type === 'folder' && !file.children.length);
  });
  var output = [];
  filterdTree.forEach(function (f) {
    var chilrenJoined = joinFilesName(f.children);
    if (!chilrenJoined.length) {
      return output.push({
        name: f.name,
        type: f.type,
        importName: f.name === 'index.js' ? '' : upperFirst(f.name.split('.')[0]),
        importPath: f.name === 'index.js' ? '' : f.name,
        fullImportPath: f.name,
        shortcut: f.name === 'index.js' ? '' : toLower(f.name.slice(0, 1)),
        description: f.name
      });
    }
    chilrenJoined.forEach(function (child) {
      output.push({
        name: child.name,
        importName: upperFirst(f.name) + child.importName || '',
        importPath: f.name + (child.importPath ? '/' + child.importPath : ''),
        fullImportPath: f.name + '/' + child.fullImportPath,
        shortcut: toLower(f.name.slice(0, 1)) + child.shortcut,
        description: f.name + ' -> ' + child.description
      });
    });
  });
  return output;
}

function uniqueShorcutNames(filestree) {
  var filesNames = joinFilesName(filestree);
  var uniqueShortcut = (0, _array.uniqueStringArray)(filesNames.map(function (j) {
    return j.shortcut;
  }));
  var uniqueKey = (0, _array.uniqueStringArray)(filesNames.map(function (j) {
    return j.importName;
  }));
  return filesNames.map(function (f, i) {
    f.shortcut = uniqueShortcut[i];
    f.key = uniqueKey[i];
    return f;
  });
}