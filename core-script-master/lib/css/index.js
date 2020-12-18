'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _position = require('./preset/position');

var _flexbox = require('./preset/flexbox');

var _align = require('./preset/align');

var _text = require('./preset/text');

var _container = require('./preset/container');

// 一张预设表

var presetMap = {
  basic: {
    宽高: function _(tab) {
      return tab + 'width: 100%;\n' + tab + 'height: 100%;';
    }
  },
  position: {
    绝对定位: _position.absolutePosition
  },
  align: {
    行高居中: _align.lineVerticalAlign,
    定位垂直居中: _align.verticalAlign,
    定位水平居中: _align.horizontalAlign,
    完全居中: _align.fullAlign
  },
  text: {
    溢出省略: _text.ellipsis,
    文字属性: _text.fontAttr
  },
  container: {
    容器属性: _container.containerAttr
  },
  // 需要开发列表预设
  flexbox: {
    flexbox: _flexbox.flexboxAttr
  }

};

exports.default = {
  宽高: presetMap.basic.宽高,
  绝对定位: presetMap.position.绝对定位,
  行高居中: presetMap.position.行高居中,
  垂直居中: presetMap.position.定位垂直居中,
  水平居中: presetMap.position.定位水平居中,
  完全居中: presetMap.position.完全居中,
  溢出省略: presetMap.text.溢出省略,
  文字属性: presetMap.text.文字属性,
  容器属性: presetMap.container.容器属性,
  flexbox: presetMap.flexbox.flexbox,
  详细盒子: presetMap.flexbox.详细盒子,
  盒子成员: presetMap.flexbox.盒子成员
};