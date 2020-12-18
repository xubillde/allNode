'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDevelopData = getDevelopData;
exports.getWorkflowModel = getWorkflowModel;

var _resolveNodeTime = require('./resolveNodeTime');

var _resolveNodeTime2 = _interopRequireDefault(_resolveNodeTime);

var _xmindConfig = require('./xmind-config');

var _xmindConfig2 = _interopRequireDefault(_xmindConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeField = _xmindConfig2.default.timeField;


var instance = [];
function getDevelopData(root) {
  return {
    model: getDevelopModel(root),
    instance: instance
  };
}

function getDevelopModel(xmindNode) {
  if (xmindNode.title === '实例') {
    // 挂载实例
    instance = instance.concat(xmindNode.children.map(function (c) {
      return {
        title: c.title,
        labels: c.labels,
        children: c.children
      };
    }));
    return [];
  }
  if (xmindNode.title === '定制') {
    return [{ name: xmindNode.title, time: null }];
  }
  if (!xmindNode.children.length) {
    return [{ name: '', time: xmindNode.title === timeField.pend ? null : (0, _resolveNodeTime2.default)(xmindNode.title) }];
  }
  var result = [];
  xmindNode.children.forEach(function (childNode) {
    var childModels = getDevelopModel(childNode);
    childModels.forEach(function (model) {
      result.push({
        name: xmindNode.title + (model.name && '/' + model.name || ''),
        time: model.time
      });
    });
  });
  return result;
}

// 深度解析导图对象, 获得定制的工作流模型
function getWorkflowModel(root, workflowModel) {
  if (!(root.children && root.children.length)) return workflowModel;
  root.children.forEach(function (child) {
    var model = workflowModel[child.title];
    if (model) {
      var pointer = model.pointer;
      workflowModel[child.title] = pointer && workflowModel[pointer] || getDevelopData(child).model;
    }
    workflowModel = getWorkflowModel(child, workflowModel);
  });
  return workflowModel;
}