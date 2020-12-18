'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 特殊标识与业务识别配置
exports.default = {
  timeField: { pend: '待定' },
  stateField: { todo: 'todo', doing: 'working', done: 'finished' },
  seriesTime: { min: 1, max: 3 }, // 流程串联时间
  specialSymbolMap: {
    page: '*',
    addClass: '$',
    importClass: '@',
    addModule: '+',
    removeModule: '-',
    replaceModule: '#',
    presetType: 'type:',
    timeType: 'time:'
  },
  workflowModel: { // 默认有app根节点业务 注意这里的字段要严格对应Xmind模型，Xmind改动后要确认
    数据组装: {},
    组件开发业务: {},
    静态组件: {},
    容器业务: {},
    // 指向组件开发业务
    布局开发: { pointer: '组件开发业务' },
    单元测试: {},
    定制业务: {},
    调试提交文档更新: {}
  },
  difficultyField: { // 难度字段
    simple: 'simple',
    normal: 'normal',
    difficult: 'difficult'
  }
};