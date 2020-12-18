'use strict';

// react-vscode 组件解析器
// componentObj
// {
//   name: 'index.js',
//   type: 'file',
//   importName: '',
//   importPath: '',
//   shortcut: '1',
//   description: 'index.js',
//   key: '1',
//   snippetPrefix: 'xxx',
//   root: 'components/'
// }

function loader(_ref) {
  var componentObj = _ref.componentObj,
      component = _ref.component,
      filePath = _ref.filePath;

  var snippet = null;
  if (component) {
    var name = component.displayName || componentObj.importName;
    snippet = {
      prefix: componentObj.snippetPrefix,
      body: ['{/* file:/' + filePath + ' */}\n<' + name].concat(getBody(resolvePropType(component.propTypes))).concat(['/>']),
      description: componentObj.root + ' -> ' + componentObj.description
    };
  }
  return snippet;
}

function getBody(propTypes) {
  var getRequireText = function getRequireText(prop) {
    if (prop.compose) return '';
    return prop.require ? '必填' : '选填';
  };
  var body = propTypes.map(function (prop) {
    return '  ' + prop.key + '={} // ' + getRequireText(prop) + ' \u7C7B\u578B\uFF1A' + prop.type;
  });
  if (!body.length) body.push('\t // \u7EC4\u4EF6\u672A\u5B9A\u4E49propTypes');
  return body;
}

// 解析React组件的PropType
function resolvePropType(componentProptypes) {
  if (!componentProptypes) {
    return [{
      key: '未定义',
      type: '',
      require: false
    }];
  }
  return Object.keys(componentProptypes).map(function (key) {
    var resolved = resolveProperty(componentProptypes[key]);
    return {
      key: key,
      type: resolved.type,
      require: resolved.require
    };
  });
  function resolveProperty(proptype) {
    var chalk = require('chalk');
    var PropTypes = require('prop-types');
    if (!PropTypes) {
      console.log(chalk.yellow('----------------------------------------------------------\n', '\u8BF7\u5B89\u88C5react proptypes - npm i prop-types --save \n', '----------------------------------------------------------\n'));
      return;
    }
    var _find = Object.keys(PropTypes).find(function (k) {
      return PropTypes[k] === proptype;
    });
    var _findRequired = Object.keys(PropTypes).find(function (k) {
      return PropTypes[k].isRequired === proptype;
    });
    if (!_find && !_findRequired) {
      return {
        require: false,
        type: '复合式接口（请查看组件接口定义）',
        compose: true
      };
    }
    return {
      require: Boolean(!_find && _findRequired),
      type: _find || _findRequired
    };
  }
}

module.exports = loader;