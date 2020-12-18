"use strict";

function loader(_ref) {
  var componentObj = _ref.componentObj,
      component = _ref.component,
      filePath = _ref.filePath;

  return {
    prefix: componentObj.snippetPrefix,
    body: ["<img src='" + componentObj.root + componentObj.importPath + "' />"],
    description: componentObj.root + " -> " + componentObj.description
  };
}

module.exports = loader;