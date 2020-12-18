"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


// 行高垂直居中 
var lineVerticalAlign = exports.lineVerticalAlign = function lineVerticalAlign(tab) {
  return tab + "height: height;\n" + tab + "line-height: height;";
};

// 定位垂直居中
var verticalAlign = exports.verticalAlign = function verticalAlign(tab) {
  return tab + "position: 'absolute';\n" + tab + "top: 50%;\n" + tab + "transform: translate(0, -50%);";
};

// 定位水平居中
var horizontalAlign = exports.horizontalAlign = function horizontalAlign(tab) {
  return tab + "osition: 'absolute';\n" + tab + "left: 50%;\n" + tab + "transform: translate(-50%, 0);";
};

// 完全居中
var fullAlign = exports.fullAlign = function fullAlign(tab) {
  return tab + "position: absolute;\n" + tab + "top: 50%;\n" + tab + "left: 50%;\n" + tab + "transform: translate(-50%, -50%);";
};