'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propType = require('../../common/react/propType');

var _propType2 = _interopRequireDefault(_propType);

var _basic = require('../../common/basic');

var _basic2 = _interopRequireDefault(_basic);

var _recompose = require('../../npm/recompose');

var _recompose2 = _interopRequireDefault(_recompose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var basePath = _ref.basePath,
      page = _ref.page,
      parser = _ref.parser,
      container = _ref.container;

  return '\n' + (0, _propType2.default)() + '\n' + (0, _basic2.default)() + '\nimport { connect } from \'react-redux\'\nimport { createSelector } from \'reselect\'\n' + (0, _recompose2.default)() + '\n// [\u5F15\u5165action]\n// import { addCount } from \'actions\'\n\nimport ' + container.key + ' from \'' + container.importPath + '\' // file:/' + container.absolutePath + '\n\n// [\u5F15\u5165selectors\u3011 snippet: ipsl{api.shortcut}r\n// import { fetchGetPostSuccess } from \'selectors/list/fetchGetPost.js\'\n\n// [\u5F15\u5165graphQl\u4E1A\u52A1] sinppet: iphoc\n// import WithAllReviews from \'hoc/WithAllReviews\'\n\n// [page] // file:/' + page.absolutePath + '\n// [container] // file:/' + container.absolutePath + '\n\nexport default compose(\n  pure,\n  mapProps(props => {\n    // console.log(props, \'' + parser.key + '\');\n    return props\n  }),\n)(' + container.key + ')\n';
};