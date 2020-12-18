'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = getUI;
exports.generateUi = generateUi;

var _css = require('../../css');

var _css2 = _interopRequireDefault(_css);

var _getXmindRootDom = require('../src/getXmindRootDom');

var _getXmindRootDom2 = _interopRequireDefault(_getXmindRootDom);

var _indent = require('../../utils/indent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var upperFirst = require('lodash/upperFirst');

var UIs = [];
function getUI(uiFiles, sourcePath) {
  uiFiles.forEach(function (file) {
    var rootDom = (0, _getXmindRootDom2.default)(path.join(sourcePath, file));
    UIs.push({
      name: file.split('.')[0],
      type: 'page',
      result: generateUi(rootDom, 0)
    });
  });
  return UIs;
}

function generateUi(xmindDom, deep) {
  var _preProcessXmind = preProcessXmind(xmindDom),
      children = _preProcessXmind.children,
      title = _preProcessXmind.title,
      labels = _preProcessXmind.labels,
      htmlTag = _preProcessXmind.htmlTag,
      className = _preProcessXmind.className,
      isReact = _preProcessXmind.isReact,
      componentName = _preProcessXmind.componentName;

  if (isReact) {
    if (children.length && children.length > 1) {
      throw Error('react.component下只能存在一个节点');
    }
    var reactApp = generateUi(children[0], 0);
    var compName = upperFirst(componentName);
    if (reactApp) {
      UIs.push({
        type: 'component',
        name: compName,
        result: reactApp
      });
    }
    return {
      isReact: isReact,
      componentName: compName,
      html: (0, _indent.getIntentStr)(deep) + '<' + upperFirst(compName) + ' />\n'
    };
  }

  var tab = (0, _indent.getIntentStr)(deep);

  if (!children.length) {
    // 没有儿子了，直接返回
    return {
      html: tab + '<' + htmlTag + (className ? ' className="' + className + '"' : '') + '></' + htmlTag + '>\n',
      css: tab + '&>' + (!className ? '' + htmlTag : '.' + className) + '{\n' + resolveLabels(labels, (0, _indent.getIntentStr)(deep + 1)) + '\n' + tab + '}\n',
      importComponents: []
    };
  }

  var thisHtml = getHtml(deep, { htmlTag: htmlTag, className: className });
  var thisCss = getCss(deep, { labels: labels, className: className, htmlTag: htmlTag });

  var rhtml = '';
  var rcss = '';
  var rimportComponents = [];

  children.forEach(function (data) {
    var childResult = generateUi(data, deep + 1);
    if (childResult && !childResult.isReact) {
      var html = childResult.html,
          css = childResult.css,
          importComponents = childResult.importComponents;

      rhtml += html;
      rcss += css;
      rimportComponents = importComponents;
    } else {
      rhtml += childResult.html;
      rimportComponents.push(childResult.componentName);
    }
  });

  return {
    html: thisHtml[0] + rhtml + thisHtml[1],
    css: thisCss[0] + rcss + thisCss[1],
    importComponents: rimportComponents
  };
}

function preProcessXmind(xmindDom) {
  var find = require('lodash/find');
  var children = xmindDom.children,
      title = xmindDom.title,
      labels = xmindDom.labels;

  var dom = title.split('.');
  var htmlTag = dom[0]; // 特殊Tag: react
  var key = dom[1]; // 样式名或者组件名

  if (htmlTag === 'react') {
    return (0, _extends3.default)({}, xmindDom, {
      componentName: key,
      isReact: true
    });
  }
  // some-speical-deal
  // 处理特殊的html-tag
  switch (htmlTag) {
    case 'header':
      {
        labels = addLabel(labels, '容器属性');
        break;
      }
    case 'ul':
      {
        labels = addLabel(labels, 'flexbox');
        if (!children.length) {
          children.push({
            title: 'li.' + key.slice(0, key.length - 1),
            labels: ['宽高'],
            children: []
          });
        }
        break;
      }
    case 'h1':
    case 'h2':
    case 'p':
    case 'span':
      {
        var label = labels[0];
        if (!(label && label.split('-') && find(label.split('-'), function (label) {
          return label === '文字属性';
        }))) {
          labels = addLabel(labels, '文字属性');
        }
        break;
      }
  }

  if (key) {
    var splitKeys = key.split('-');
    var lastItem = splitKeys[splitKeys.length - 1];
    switch (lastItem) {
      case '$c':
        {
          splitKeys.pop();
          splitKeys.push('container');
          key = splitKeys.join('-');
          labels = addLabel(labels, '容器属性');
          break;
        }
      case 'text':
      case 'title':
        {
          labels = addLabel(labels, '文字属性');
          break;
        }
    }
  }
  return {
    children: children,
    title: title,
    labels: labels,
    htmlTag: htmlTag,
    className: key
  };
}

function addLabel(labels, add) {
  if (labels.length) {
    labels[0] = labels[0] + ('-' + add);
  } else {
    labels = [add];
  }
  return labels;
}

function resolveLabels(labels, tabStr) {
  if (!labels.length) return '';
  var splitLabel = labels[0].split('-');
  var str = '';
  splitLabel.forEach(function (sl) {
    if (_css2.default[sl]) {
      str += _css2.default[sl](tabStr) + '\n';
    }
  });
  return str;
}

function getHtml(deep, _ref) {
  var htmlTag = _ref.htmlTag,
      className = _ref.className;

  var tab = (0, _indent.getIntentStr)(deep);
  return [tab + '<' + htmlTag + (className ? ' className="' + className + '"' : '') + '>\n', tab + '</' + htmlTag + '>\n'];
}

function getCss(deep, _ref2) {
  var labels = _ref2.labels,
      className = _ref2.className,
      htmlTag = _ref2.htmlTag;

  var tab = (0, _indent.getIntentStr)(deep);
  return ['' + tab + (!className ? '' + (!deep ? '' : '>') + htmlTag : (!deep ? '' : '&>') + '.' + className) + '{\n' + resolveLabels(labels, (0, _indent.getIntentStr)(deep + 1)) + '\n', tab + '}\n'];
}