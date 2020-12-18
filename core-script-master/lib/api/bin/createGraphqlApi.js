'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require('../../template/graphql/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');

exports.default = function (basePath) {
  var config = require(path.join(basePath, '.core-config/graphql/config'));
  if (config.debug) {
    console.log(chalk.yellow('>> 使用 [mockData] 导出'));
    generateGraphql(config.mockData, config, basePath);
  } else {
    fetch(config.src).then(function (r) {
      return r;
    }) // .json() )
    .then(function (data) {
      if (data && data.dataStore) {
        console.log(chalk.yellow('>> 请求数据正确，开始导出 \n'));
        console.log(data);
        var queries = data.dataStore.queriesById;
        generateGraphql(queries, config, basePath);
      } else {
        throw Error('请求数据出错，请检查');
      }
    });
  }
};

function generateGraphql(data, config, basePath) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {

    for (var _iterator = Object.values(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;


      var type = value.operationType;

      if (!type) type = 'query';

      var content = value.query.split(type + ' ');

      var comment = content[0] && content[0].replace(/\s/g, '') || '';

      var queryText = content[1];

      var name = value.query && value.query.match(/\s{1}(.+?)(\{|\(){1}/g)[0].replace(/(\s|\{|\()/g, '');

      var gql = (0, _create2.default)({
        comment: comment,
        query: queryText,
        name: name
      });

      var filePath = path.join(basePath, config.outputPath, type + '/' + name + '.js');

      if (fs.pathExistsSync(filePath)) {
        console.log(chalk.red(filePath + '\u5DF2\u7ECF\u5B58\u5728\uFF0C\u5982\u8981\u66F4\u65B0\u8BF7\u5148\u5220\u9664\n'));
      } else {
        fs.ensureFileSync(filePath);
        fs.writeFileSync(filePath, gql);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  console.log(chalk.yellow('>>>>>生成完毕'));
}