'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getXmindRootDom;

var xmind = require('xmind');

function getXmindRootDom(xmindPath, sheet, rootIndex) {
  var workbookFromFile = xmind.open(xmindPath);
  var jsonData = JSON.parse(workbookFromFile.toJSON());
  var rootDom = jsonData.sheets[sheet || 0].rootTopic.children[rootIndex || 0];
  return rootDom;
}