"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


// 溢出省略
var ellipsis = exports.ellipsis = function ellipsis(tab) {
  return tab + "width: $width;\n" + tab + "text-overflow: ellipsis;\n" + tab + "// overflow: hidden;\n" + tab + "white-space: nowrap;";
};

// 文字属性
var fontAttr = exports.fontAttr = function fontAttr(tab) {
  return tab + "color: #999;\n" + tab + "font-size: 26px;\n" + tab + "text-align: center;";
};