"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var key = _ref.key;
  return "\nconst " + key + " = ({\n  \n}) => (\n  <div className=\"" + key + "\">\n    <style dangerouslySetInnerHTML={{ __html: require('./index.scss') }} />\n  </div>\n)\n\nexport default compose(\n  pure,\n  mapProps(props => {\n    // console.log(props, '" + key + "');\n    return props\n  }),\n  setDisplayName('" + key + "')\n)(" + key + ")\n";
};