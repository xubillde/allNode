'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateUsageSnippet;

var _babelCore = require('babel-core');

var _os = require('os');

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var find = require('lodash/find');
var toLower = require('lodash/toLower');
var escapeRegExp = require('lodash/escapeRegExp');
function generateUsageSnippet(joinedFiles, config, member) {
  var removeFolder = joinedFiles.filter(function (file) {
    return file.type !== 'folder';
  });
  var memberSnippets = {};
  var members = [];

  removeFolder.forEach(function (file) {
    var tmpPath = '';
    var tempCompilePath = '';
    var fullName = '' + file.importPath + (file.name === 'index.js' ? '/index.js' : '');
    var findRuleMatchFile = find(config.snippet.usage.rules, function (rule) {
      return rule.test.test(file.name);
    });
    if (findRuleMatchFile) {
      // 匹配正则表达式
      var findInExclude = find(findRuleMatchFile.exclude || [], function (ex) {
        return (ex.match(/(\d|\w){1}.+(\d|\w){1}$/).length && ex.match(/(\d|\w){1}.+(\d|\w){1}$/))[0] === fullName;
      });
      if (!findInExclude) {
        // 不在exclude里的file
        var defaultLoaderPath = path.join(__dirname, '../loader/snippet/' + config.editor + '/' + config.frontLang + '/' + findRuleMatchFile.use + '.js');
        // 先检测是否有用户自定义的该loader
        var userLoaderPath = path.join(config.projectPath, '.core-config/member/loader/' + findRuleMatchFile.use + '.js');
        var loaderPath = fs.existsSync(userLoaderPath) ? userLoaderPath : fs.existsSync(defaultLoaderPath) ? defaultLoaderPath : null;
        if (loaderPath) {
          var loader = require(loaderPath);
          if (typeof loader === 'function') {
            // 过滤掉空文件
            file.absolutePath = path.join(config.projectPath, './' + member.path + '/' + file.importPath);
            var component = { descrition: '该文件非Js文件，没有引入实体', default: null };

            if (file.name.split('.') && file.name.split('.')[1] === 'js') {
              // js文件引入文件内容
              if (file.importPath) {
                if (file.name === 'index.js') file.absolutePath = path.join(file.absolutePath, './index.js');
                var tmpFile = fs.readFileSync(file.absolutePath, 'utf-8').replace(/require\(.+\)/g, '{}');
                var compileCode = (0, _babelCore.transform)(tmpFile, {
                  presets: ["latest", "es2017", "stage-3", "react"]
                }).code;
                // 要整个文件夹~
                var resolvePathCode = compileCode.replace(/'components\//g, '\'' + path.join(config.projectPath, 'components') + '/').replace(/'layouts\//g, '\'' + path.join(config.projectPath, 'layouts') + '/').replace(/'hoc\//g, '\'' + path.join(config.projectPath, 'hoc') + '/');
                tmpPath = path.join(file.absolutePath, '../', './tmp' + Math.random().toFixed(5) + '.js');
                fs.writeFileSync(tmpPath, resolvePathCode);
                try {
                  component = require(tmpPath);
                } catch (e) {
                  // 先在暂时无法做全解析，比如一个文件中引入另外一个组件，另外一个组件也需要解析
                  console.log(chalk.red(file.absolutePath + ' \n \u6682\u65F6\u65E0\u6CD5\u89E3\u6790 error: ' + e + ' \n'));
                  // fs.writeFileSync(path.join(file.absolutePath, '../', `error.js`), resolvePathCode)
                  component = {};
                }
              }
            } else {
              // 放在static中的js文件往往没有用,所以除了js都使用
              if (!/\.js$/.test(file.name)) {
                component.default = { displayName: file.importName };
              }
            }

            if (component && component.default) {
              file.root = member.path + '/';
              // ------------------------------------
              // 补全的快捷键核心定义
              // ------------------------------------
              var componentName = component.default && component.default.displayName;
              var matchDisplayname = componentName && componentName.match(/\(((\w)*?)\)/g) || '';
              var displayName = matchDisplayname && matchDisplayname.length && matchDisplayname[0].replace(/\(|\)/g, '') || file.importName;
              var memeberShortcut = member.shortcut || toLower('' + member.path.slice(0, 1) + member.path.slice(member.path.length - 1));
              file.snippetPrefix = '' + (config.snippet.usage.modeShortcut || 'use') + memeberShortcut + file.shortcut;
              var snippet = loader({
                componentObj: file,
                component: { displayName: displayName, propTypes: component.propTypes },
                filePath: file.absolutePath
              });
              if (snippet) {
                memberSnippets['use ' + member.path + ' ' + (displayName || file.importName)] = snippet;
                members.push(file);
                console.log(chalk.cyan('\u5F97\u5230\u4E86' + member.path + ' -> ' + fullName + '\u7684\u7EC4\u4EF6\u4F7F\u7528\u8865\u5168'));
              }
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
    }
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  });
  return {
    snippet: memberSnippets,
    members: members
  };
}