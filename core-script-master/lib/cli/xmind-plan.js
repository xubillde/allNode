'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getXmindRootDom = require('../xmind/src/getXmindRootDom');

var _getXmindRootDom2 = _interopRequireDefault(_getXmindRootDom);

var _statistic = require('../xmind/plan/statistic');

var _instance = require('../xmind/plan/instance');

var _workflow = require('../xmind/plan/workflow');

var _getDevelopData = require('../xmind/plan/getDevelopData');

var _createProjectMardDown = require('../xmind/plan/createProjectMardDown');

var _createWorkflowMarkDown = require('../xmind/plan/createWorkflowMarkDown');

var _src = require('../src.config');

var _xmindConfig = require('../xmind/plan/xmind-config');

var _xmindConfig2 = _interopRequireDefault(_xmindConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');
var merge = require('lodash/merge');

var userConfigPath = path.join(_src.PROJECT_BASE_PATH, '.core-config/core.config.js');
if (!fs.existsSync(userConfigPath)) throw Error('请在项目根路径下配置.core-config/core.config.js 或使用 init-core');
var userConfig = require(userConfigPath);
var xmind = userConfig.xmind;
var timeField = _xmindConfig2.default.timeField,
    seriesTime = _xmindConfig2.default.seriesTime,
    workflowModel = _xmindConfig2.default.workflowModel,
    specialSymbolMap = _xmindConfig2.default.specialSymbolMap,
    difficultyField = _xmindConfig2.default.difficultyField;


if (!xmind.plan.path) throw Error('请配置 xmind.plan.path ');

var sourcePath = path.join(_src.PROJECT_BASE_PATH, xmind.plan.path);

if (!fs.existsSync(sourcePath)) throw Error('[' + sourcePath + '] \u914D\u7F6E\u8DEF\u5F84\u4E0D\u5B58\u5728\uFF0C\u8BF7\u786E\u8BA4xmind.plan.path');

var outputConfig = xmind.plan.output || {
  data: 'data/projectModelData.json',
  projectMarkDown: 'plan-output/projectMarkDown.md',
  workflowsMarkDown: 'plan-output/workflowsMarkDown.md'
};

var getDefaultOutput = function getDefaultOutput(field) {
  return path.join(path.dirname(sourcePath), outputConfig[field]);
};
var outputPath = {};
Object.keys(outputConfig).forEach(function (key) {
  outputPath[key] = getDefaultOutput(key);
});

var xmindRootDom = (0, _getXmindRootDom2.default)(sourcePath);
// 1. 获得开发模型和开发实例数据
var develop = (0, _getDevelopData.getDevelopData)(xmindRootDom);

// console.log(develop.instance, 'developdevelop')
// 2. 获得所有需要的开发流模型
var model = (0, _getDevelopData.getWorkflowModel)(xmindRootDom, merge({ APP: develop.model }, workflowModel));

// 3. 解析所有展开的实例
var resolvedFlattenInstances = (0, _instance.resolveInstances)((0, _instance.flattenInstance)(develop.instance));

// 4. 从实例分别获得工作流
var pageWorkflow = (0, _workflow.getPageWorkflow)(resolvedFlattenInstances.page, model.APP);
var componentWorkflow = (0, _workflow.getComponentWorkflow)(resolvedFlattenInstances.component, model);

// 5. 合并工作流
var allWorkflow = [];
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = Object.entries(pageWorkflow)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
        name = _step$value[0],
        value = _step$value[1];

    allWorkflow.push((0, _extends3.default)({
      name: name,
      page: name,
      busniess: '页面业务'
    }, value));
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

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = Object.entries(componentWorkflow)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
        name = _step2$value[0],
        _step2$value$ = _step2$value[1],
        pageName = _step2$value$.pageName,
        className = _step2$value$.className,
        workflow = _step2$value$.workflow;

    if (pageName && className && workflow) {
      allWorkflow.push((0, _extends3.default)({
        name: name,
        page: pageName,
        busniess: className
      }, workflow));
    }
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = Object.entries(resolvedFlattenInstances.custom)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var _step3$value = (0, _slicedToArray3.default)(_step3.value, 2),
        name = _step3$value[0],
        value = _step3$value[1];

    allWorkflow.push({
      name: name,
      schedule: value.time,
      flows: [{ node: name, time: value.time }],
      specialFlows: [],
      difficulty: difficultyField.normal,
      busniess: '定制业务'
    });
  }
  // 统计数据
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3.return) {
      _iterator3.return();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

var statistic = (0, _statistic.analyseWorkflow)(allWorkflow);

var projectModelData = (0, _extends3.default)({
  allWorkflow: allWorkflow
}, statistic);
// console.log(allWorkflow, 'allWorkflowallWorkflow');

var projectMarkDown = (0, _createProjectMardDown.createProjectMardDown)(projectModelData);
var workflowsMarkDown = (0, _createWorkflowMarkDown.createWorkflowMarkDown)(allWorkflow);

fs.ensureFileSync(outputPath.projectMarkDown);
fs.writeFileSync(outputPath.projectMarkDown, projectMarkDown);
console.log(chalk.yellow('>>> \u6210\u529F\u5BFC\u51FA ' + outputPath.projectMarkDown));
fs.ensureFileSync(outputPath.workflowsMarkDown);
fs.writeFileSync(outputPath.workflowsMarkDown, workflowsMarkDown);
console.log(chalk.yellow('>>> \u6210\u529F\u5BFC\u51FA ' + outputPath.workflowsMarkDown));
// 输出projectModelData数据
fs.ensureFileSync(outputPath.data);
fs.writeFileSync(outputPath.data, '' + JSON.stringify(projectModelData, null, 2));
console.log(chalk.yellow('>>> \u6210\u529F\u5BFC\u51FA ' + outputPath.data));