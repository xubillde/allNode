"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "withPropsOnChange(\n  ['a', 'b'], // shouldMapOrKeys: Array<string> | (props: Object, nextProps: Object) => boolean\n  ({ a, b, ...props }) => {\n    return {\n      ...props,\n      foobar: a + b,\n    }\n  }\n),";