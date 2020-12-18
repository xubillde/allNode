'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateImportSnippet;
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var find = require('lodash/find');
var escapeRegExp = require('lodash/escapeRegExp');

function generateImportSnippet(joinedFiles, config, member) {
  var removeFolder = joinedFiles.filter(function (file) {
    return file.type !== 'folder';
  });
  var memberSnippets = {};
  var members = [];

  removeFolder.forEach(function (file) {
    var tmpPath = '';
    var fullName = '' + file.importPath + (file.name === 'index.js' ? '/index.js' : '');
    var findInExclude = find(member.exclude || [], function (ex) {
      return (ex.match(/(\d|\w){1}.+(\d|\w){1}$/).length && ex.match(/(\d|\w){1}.+(\d|\w){1}$/))[0] === fullName;
    });
    if (!findInExclude) {
      // 不在exclude里的file
      var defaultLoaderPath = path.join(__dirname, '../loader/import/js/general-import-loader.js');
      // 先检测是否有用户自定义的该loader
      var userLoaderPath = path.join(config.projectPath, '.core-config/member/loader/' + member.use + '.js');
      if (member.use && !fs.existsSync(userLoaderPath)) {
        console.log(chalk.magenta(file.name + '\u4E0D\u5B58\u5728\u81EA\u5B9A\u4E49loader: .core-config/member/loader/' + member.use + '.js\uFF0C\u5C06\u4F7F\u7528\u9ED8\u8BA4loader\n'));
      }
      var loaderPath = fs.existsSync(userLoaderPath) ? userLoaderPath : fs.existsSync(defaultLoaderPath) ? defaultLoaderPath : null;
      if (loaderPath) {
        var loader = require(loaderPath);
        if (typeof loader === 'function') {
          // 过滤掉空文件
          file.absolutePath = path.join(config.projectPath, './' + member.path + '/' + file.importPath);
          if (file.name.split('.') && file.name.split('.')[1] === 'js') {
            // js文件引入文件内容
            if (file.importPath) {
              if (file.name === 'index.js') file.absolutePath = path.join(file.absolutePath, './index.js');
            }
          }
          file.root = member.path + '/';
          // ------------------------------------
          // 补全的快捷键核心定义
          // ------------------------------------
          var memeberShortcut = member.shortcut || toLower('' + member.path.slice(0, 1) + member.path.slice(member.path.length - 1));
          file.snippetPrefix = '' + (config.snippet.import.modeShortcut || 'ip') + memeberShortcut + file.shortcut;
          var snippet = loader(file, file.absolutePath);
          if (snippet) {
            console.log(chalk.cyan('\u5F97\u5230\u4E86' + member.path + ' -> ' + fullName + '\u7684\u5F15\u5165\u8865\u5168'));
            if (memberSnippets['import ' + member.path + ' ' + file.importName]) {
              console.log(chalk.red('import ' + member.path + ' ' + file.importName + '\u7684\u5F15\u5165\u8865\u5168\u5DF2\u5B58\u5728\uFF0C\u8BF7\u6CE8\u610F'));
            }
            memberSnippets['import ' + member.path + ' ' + file.importName] = snippet;
            members.push(file);
          }
        } else {
          console.log(file.name, ':');
          console.log(chalk.red(fullName + '\u5BF9\u5E94\u7684loader\u5B9A\u4E49\u4E0D\u6B63\u786E: \u8BF7\u68C0\u67E5' + loaderPath + ', \u786E\u8BA4\u4F7F\u7528module.exports = loader'));
        }
      } else {
        console.log(file.name, ':');
        console.log(chalk.red(fullName + '\u4E0D\u5B58\u5728\u5BF9\u5E94\u7684loader: \u8BF7\u5728 .core-config/member/loader/ \u76EE\u5F55\u4E0B\u6DFB\u52A0\u5BF9\u5E94\u7684loader.js\u6587\u4EF6'));
      }
    }
    if (tmpPath) fs.unlinkSync(tmpPath);
  });
  return {
    snippet: memberSnippets,
    members: members
  };
}