'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.getPageWorkflow = getPageWorkflow;
exports.getComponentWorkflow = getComponentWorkflow;

var _xmindConfig = require('../plan/xmind-config');

var _xmindConfig2 = _interopRequireDefault(_xmindConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeField = _xmindConfig2.default.timeField,
    seriesTime = _xmindConfig2.default.seriesTime,
    stateField = _xmindConfig2.default.stateField,
    specialSymbolMap = _xmindConfig2.default.specialSymbolMap,
    difficultyField = _xmindConfig2.default.difficultyField;

var pendTimeStr = 'time:' + timeField.pend;

var chalk = require('chalk');
var omit = require('lodash/omit');
var merge = require('lodash/merge');
var findIndex = require('lodash/findIndex');
var isArray = require('lodash/isArray');

function getPageWorkflow(instances, workflowModel) {
  var workflows = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      var flows = workflowModel.map(function (node) {
        return {
          node: (key ? key + '/' : '') + node.name,
          time: node.time,
          state: stateField.todo,
          bugs: []
        };
      });
      var difficulty = value.difficulty || difficultyField.normal;
      // 还要插入串联计算
      if (flows.length > 1) {
        flows.push({
          node: '工作流串联与整体调试',
          time: {
            min: seriesTime.min * (flows.length - 1),
            max: seriesTime.max * (flows.length - 1),
            expect: Math.round((seriesTime.min + seriesTime.max) / 2) * (flows.length - 1)
          }
        });
      }

      var validTime = function validTime(time) {
        return !!(time && time.min && time.max && time.expect);
      };
      var removeSpecialFlows = flows.filter(function (f) {
        return validTime(f.time);
      });
      if (!removeSpecialFlows.length) {
        return {
          v: {
            flows: [],
            difficulty: difficulty,
            schedule: null,
            specialFlows: flows
          }
        };
      }
      var expect = null;
      var minSchedule = removeSpecialFlows.map(function (f) {
        return f.time.min;
      }).reduce(function (p, a) {
        return p + a;
      });
      var maxSchedule = removeSpecialFlows.map(function (f) {
        return f.time.max;
      }).reduce(function (p, a) {
        return p + a;
      });
      switch (difficulty) {
        case difficultyField.simple:
          {
            expect = minSchedule;
          }
        case difficultyField.difficult:
          {
            expect = maxSchedule;
          }
        default:
          {
            expect = removeSpecialFlows.map(function (f) {
              return f.time.expect;
            }).reduce(function (p, a) {
              return p + a;
            });
          }
      }
      workflows[key] = {
        flows: removeSpecialFlows,
        difficulty: difficulty,
        schedule: {
          expect: expect,
          min: minSchedule,
          max: maxSchedule
        },
        specialFlows: flows.filter(function (f) {
          return !validTime(f.time);
        }) // 事件待定的节点
      };
    };

    for (var _iterator = Object.entries(instances)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ret = _loop();

      if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
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

  return workflows;
}

// component:
// { '滑动选择/slick组件': { className: '组件开发业务', moduler: [Object], difficulty: 'simple' },
//   '滑动选择/Z组件': { className: '静态组件', moduler: {}, difficulty: 'difficult' },
//   '滑动选择/K框架': { className: '定制业务', moduler: [Object], difficulty: 'simple' } },  component:
//    { '滑动选择/slick组件': { className: '组件开发业务', moduler: [Object], difficulty: 'simple' },
//      '滑动选择/Z组件': { className: '静态组件', moduler: {}, difficulty: 'difficult' },
//      '滑动选择/K框架': { className: '定制业务', moduler: [Object], difficulty: 'simple' } },


function getComponentWorkflow(instances, workflowModel) {
  var compWorkflows = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.entries(instances)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
          _key = _step2$value[0],
          instance = _step2$value[1];

      // key 是每个组件的名称
      var className = instance.className,
          moduler = instance.moduler;

      var matchWorkflowModel = workflowModel[className]; // 因为要修改模型，深度复制一份
      if (!isArray(matchWorkflowModel)) {
        // 引用模型
        if (!matchWorkflowModel) {
          console.log(chalk.red('[' + _key + '] - \u4E0D\u5B58\u5728\u8BE5\u4E1A\u52A1\u7C7B\u578B: [' + className + '] !\n'));
          return compWorkflows;
        }
        if (!workflowModel[matchWorkflowModel.pointer]) {
          console.log(chalk.red('\u4E1A\u52A1\u6307\u9488\u9519\u8BEF, [' + _key + '] - \u4E0D\u5B58\u5728\u8BE5\u4E1A\u52A1\u7C7B\u578B: [' + className + '] !\n'));
          return compWorkflows;
        }
        matchWorkflowModel = workflowModel[matchWorkflowModel.pointer];
      }
      if (!matchWorkflowModel) {
        console.log(chalk.red(_key, '不存在工作流模型!\n'));
        return compWorkflows;
      }
      var deepCopy = matchWorkflowModel.map(function (a) {
        return a;
      });
      var newWorkflowModel = updateModel(deepCopy, moduler);
      compWorkflows[_key] = (0, _extends3.default)({}, instance, {
        workflow: getPageWorkflow((0, _defineProperty3.default)({}, _key, instance), newWorkflowModel)[_key]
      });
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

  return compWorkflows;
}

function getPrevPath(path, key) {
  var split = path.split('/');
  var _findIndex = findIndex(split, function (s) {
    return s === key;
  });
  return _findIndex < 0 ? path : split.slice(0, _findIndex + 1).join('/');
}

function updateModel(model, moduler) {
  // 实例化工作流
  var add = moduler.add,
      remove = moduler.remove,
      replace = moduler.replace;

  if (replace) {
    // 使用replace更新工作流
    // 找到首个位置
    // 过滤掉所有包括replace节点的流
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      var _loop2 = function _loop2() {
        var _model;

        var _step3$value = (0, _slicedToArray3.default)(_step3.value, 2),
            rkey = _step3$value[0],
            rvalue = _step3$value[1];

        var firstIndex = null;
        var count = null;
        var prevPath = '';
        var replaceFlows = [];
        model.forEach(function (flow, findex) {
          var happenIndex = flow.name.indexOf(rkey);
          if (happenIndex >= 0) {
            if (!prevPath) prevPath = getPrevPath(flow.name, rkey);
            if (!firstIndex) firstIndex = findex;
            if (!count) count = 0;
            count++;
          }
        });
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = Object.entries(rvalue)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _step4$value = (0, _slicedToArray3.default)(_step4.value, 2),
                nmkey = _step4$value[0],
                nmvalue = _step4$value[1];

            replaceFlows.push({
              name: prevPath + ('' + (nmkey ? '/' + nmkey : '')), //  替换模块3
              time: nmvalue
            });
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        (_model = model).splice.apply(_model, [firstIndex, count].concat(replaceFlows));
      };

      for (var _iterator3 = Object.entries(replace)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        _loop2();
      }
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
  }
  if (remove) {
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      var _loop3 = function _loop3() {
        var rkey = _step5.value;

        model = model.filter(function (flow) {
          return flow.name.indexOf(rkey) === -1;
        });
      };

      for (var _iterator5 = Object.keys(remove)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        _loop3();
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
  }
  if (add) {
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = Object.entries(add)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var _step6$value = (0, _slicedToArray3.default)(_step6.value, 2),
            _rkey = _step6$value[0],
            _rvalue = _step6$value[1];

        model.push({ name: _rvalue.address, time: _rvalue.time });
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }
  }
  return model;
}