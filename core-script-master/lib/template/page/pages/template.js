'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _head = require('../../head');

var _head2 = _interopRequireDefault(_head);

var _container = require('../../common/react/container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var basePath = _ref.basePath,
      key = _ref.key,
      page = _ref.page,
      parser = _ref.parser,
      container = _ref.container;

  return 'import React from \'react\'\n\nimport { fetchData } from \'actions\'\n// import nodeFetch from \'utils/fetch\' // \u76F4\u63A5\u8BF7\u6C42\u6570\u636E\n// import { gql, graphql } from \'react-apollo\'\n// import errorConstant from \'constants/error\'\n\nimport WithEnv from \'hoc/WithEnv\'\nimport WithApp from \'hoc/WithApp\'\nimport WithApiStore from \'hoc/WithApiStore\'\nimport { withGraphQlReduxSaga } from \'hoc/store.js\'\n\n\nimport ' + parser.key + ' from \'' + parser.importPath + '\'\n// [parser] // file:/' + parser.absolutePath + '\n// [container] // file:/' + container.absolutePath + '\n\nconst ' + page.key + ' = WithApp(WithApiStore(\n  {\n    parser: ' + parser.key + ',\n    // [\u67E5\u770B\u53EF\u914D\u7F6E\u7684\u8BF7\u6C42] file:/' + _path2.default.join(basePath, 'api/_apiMap.js') + '\n    clientDispatch: [],\n    // \u670D\u52A1\u7AEF\u8C03\u7528\u7684api\n    serverDispatch: [],\n  }\n))\n\n// [props\u5BF9\u8C61] file:/' + _path2.default.join(basePath, 'assist/next/total.js') + '\n' + page.key + '.getInitialProps = async (props) => {\n\n  let error = {}\n  if (!props.query.xxx) {\n    // error.statusCode = 900\n  }\n\n  // [\u6570\u636E\u4E0D\u5B58\u5728\u5219\u6293\u53D6] snippet: sls{api.shortcut} + dp{api.shortcut}\n  // if (!fetchGetCommentsSuccess(props.store.getState())) {\n  //   props.store.dispatch(fetchData({\n  //     key: \'fetchGetComments\',\n  //     payload: {\n  //       postId: 1, //  \u5FC5\u586B\u53C2\u6570,\n  //     }\n  //   }))\n  // }\n\n  return {\n    // serverDispath: [\'fetchGetComments\'],\n    ...WithEnv(props)\n  }\n}\n\nexport default withGraphQlReduxSaga(' + page.key + ') // \u5728\u8FD9\u4F7F\u7528graphQl\u4E1A\u52A1\n';
};