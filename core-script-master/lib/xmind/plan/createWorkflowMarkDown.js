'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWorkflowMarkDown = createWorkflowMarkDown;

var _createProjectMardDown = require('./createProjectMardDown');

var _time = require('../src/time');

function createWorkflowMarkDown(workflows) {
  var text = '#工作流报表';
  workflows.forEach(function (_ref) {
    var name = _ref.name,
        page = _ref.page,
        busniess = _ref.busniess,
        type = _ref.type,
        difficulty = _ref.difficulty,
        schedule = _ref.schedule,
        flows = _ref.flows,
        specialFlows = _ref.specialFlows;

    var _getTimeProcess = (0, _createProjectMardDown.getTimeProcess)(schedule),
        min = _getTimeProcess.min,
        max = _getTimeProcess.max,
        expect = _getTimeProcess.expect;

    var aStr = '\n\n## ' + name + ' ' + _createProjectMardDown.difficultyMap[difficulty || 'normal'] + '\n\n###### \u6240\u5C5E\u524D\u7AEF\u4E1A\u52A1: ' + busniess + '\n\n###### \u6240\u5C5E\u524D\u7AEF\u9875\u9762: ' + page + '\n\n### \u65F6\u95F4\u8868\n' + (0, _createProjectMardDown.getTimeBlock)({ min: min, max: max, expect: expect }, schedule) + '\n----\n### \u5DE5\u4F5C\u6D41\n\n\uFFE5\uFFE5\uFFE5\n' + getNodeflowsContent(flows) + '\n\uFFE5\uFFE5\uFFE5\n\n----\n### \u4E0D\u786E\u5B9A\u6D41\n\uFFE5\uFFE5\uFFE5\n' + specialFlows.map(function (d) {
      return d.node[0] === '/' ? '*' + d.node.slice(1) : '*' + d.node;
    }).join('\n\n') + '\n\uFFE5\uFFE5\uFFE5\n';
    text += aStr;
  });
  return text.replace(/\￥/g, '`');
}

function getNodeflowsContent(nodeflows) {
  var str = '';
  nodeflows = nodeflows.filter(function (flow) {
    return flow.time && flow.time.min;
  });
  nodeflows.forEach(function (_ref2, i) {
    var node = _ref2.node,
        _ref2$time = _ref2.time,
        min = _ref2$time.min,
        max = _ref2$time.max;

    var aStr = '\n\u25CB ' + node + ' (' + (min === max ? min + '\u5206\u949F' : min + '-' + max + '\u5206\u949F') + ')\n' + (i === nodeflows.length - 1 ? '' : '↓');
    str += aStr;
  });
  return str;
}