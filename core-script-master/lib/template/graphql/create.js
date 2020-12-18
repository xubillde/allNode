'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var comment = _ref.comment,
      query = _ref.query,
      name = _ref.name;
  return '\nimport { gql } from \'react-apollo\'\n\n' + (comment ? '// ' + comment : '') + '\nconst ' + name + ' = gql`' + query + '`\n\nexport default ' + name + '\n';
};