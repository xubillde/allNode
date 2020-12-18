'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.difficultyMap = exports.getTimeBlock = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.getCountSymbol = getCountSymbol;
exports.getTimeProcess = getTimeProcess;
exports.createProjectMardDown = createProjectMardDown;

var _time2 = require('../src/time');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCountSymbol(length, symbol) {
  return new Array(length + 1).fill(null).join('' + symbol);
}

function getTimeProcess(time) {
  if (!time) time = { min: 0, max: 0, expect: 0 };
  var _time = time,
      min = _time.min,
      max = _time.max,
      expect = _time.expect;

  var ratio = (max - min) / 30;
  var same = min === max;
  var getStr = function getStr(value) {
    return getCountSymbol(same ? 15 : Math.round((value - min) / ratio) + 5, '─');
  };
  return {
    min: getStr(min),
    max: getStr(max),
    expect: getStr(expect)
  };
}

var getTimeBlock = exports.getTimeBlock = function getTimeBlock(_ref, schedule) {
  var min = _ref.min,
      max = _ref.max,
      expect = _ref.expect;
  return '\uFFE5\uFFE5\uFFE5\n\u6700\u5C11\u65F6\u95F4: ' + min + ' ' + (0, _time2.getTimeStr)(schedule && schedule.min || 0) + '\n\u6700\u5927\u65F6\u95F4: ' + max + ' ' + (0, _time2.getTimeStr)(schedule && schedule.max || 0) + '\n\u9884\u671F\u65F6\u95F4: ' + expect + ' ' + (0, _time2.getTimeStr)(schedule && schedule.expect || 0) + '\n\uFFE5\uFFE5\uFFE5';
};

function createProjectMardDown(projectModel) {
  var allWorkflow = projectModel.allWorkflow,
      pageMap = projectModel.pageMap,
      busniessMap = projectModel.busniessMap,
      difficultyMap = projectModel.difficultyMap,
      totalSchedule = projectModel.totalSchedule,
      blackHoleFlows = projectModel.blackHoleFlows;


  var allInstanceLength = allWorkflow.length;
  var pageLength = Object.keys(pageMap).length;
  var busniessLength = Object.keys(busniessMap).length;
  var blackHoleLength = blackHoleFlows.length;

  // 里面的 `用￥代替
  // 时间进度最长36根线 ──────────────────────────────────── 取 30最大

  var projectTimeProcess = getTimeProcess(totalSchedule);

  var text = '\n# \u9879\u76EE\u603B\u8BC4\u4F30\u8868\n> \u6CE8\u91CA\uFF1A\n>\n> 1. \uFFE5\u5F00\u53D1\u4E1A\u52A1\uFFE5\u662F\u6307\u4ECE\u524D\u7AEF\u62BD\u8C61\u51FA\u7684\u4E00\u7C7B\u5DE5\u4F5C\u6D41\uFF0C\u6BD4\u5982\u6570\u636E\u7EC4\u88C5\n> 2. \uFFE5\u9875\u9762\uFFE5\u662F\u5B9E\u9645\u4EA7\u54C1\u4E1A\u52A1\u6307\u5B9A\u7684\u8BBF\u95EE\u5165\u53E3\n> 3. \uFFE5\u5DE5\u4F5C\u5B9E\u4F8B\uFFE5\u662F\u6307\u4E00\u4E2A\u5177\u4F53\u7684\u5DE5\u4F5C\u5B9E\u4F8B\uFF0C\u6BD4\u5982\u767B\u5F55\u6846\u6A21\u5757\n> 4. \uFFE5\u9ED1\u6D1E\uFFE5\u662F\u6307\u6682\u65F6\u65E0\u6CD5\u51C6\u786E\u8BC4\u4F30\u65F6\u95F4\uFF0C\u9700\u8981\u63A2\u7A76\u7684\u6A21\u5757\n> 5. \uFFE5\u81EA\u5B9A\u4E49\u5DE5\u4F5C\u5B9E\u4F8B\uFFE5\u6307\u4E0D\u80FD\u7EE7\u627F\u5DE5\u4F5C\u6A21\u578B\u7684\u7279\u6B8A\u6A21\u5757\uFF0C\u6BD4\u5982\u57CB\u70B9\u4E1A\u52A1\uFF0C\u6CA1\u6709\u53EF\u7EE7\u627F\u7684\u5DE5\u4F5C\u6D41\uFF0C\u5B9E\u9645\u5DE5\u4F5C\u6D41\u7531\u5F00\u53D1\u8005\u81EA\u5B9A\u4E49\n>\n> \u5F00\u53D1\u8005\u9700\u5173\u6CE8\u5F00\u53D1\u4E1A\u52A1\uFF0C\u7BA1\u7406\u65B9\u9700\u5173\u6CE8\u5DE5\u4F5C\u5B9E\u4F8B\uFF0C\u5B9E\u9645\u5F00\u53D1\u65F6\u4EE5\u5DE5\u4F5C\u5B9E\u4F8B\u4F5C\u4E3A\u57FA\u672C\u5DE5\u4F5C\u5355\u5143\uFF0C\u5168\u90E8\u5DE5\u4F5C\u5B9E\u4F8B\u5F00\u53D1\u5B8C\u6BD5\u5219\u9879\u76EE\u7ED3\u675F\u3002\u5F00\u53D1\u4E1A\u52A1\u548C\u9875\u9762\u662F\u5DE5\u4F5C\u5B9E\u4F8B\u7684\u5C5E\u6027\uFF0C\u6BD4\u5982\u767B\u5F55\u6846\u6A21\u5757\u5C5E\u4E8E\u9759\u6001\u7EC4\u4EF6\u5F00\u53D1\u4E1A\u52A1\uFF0C\u767B\u5F55\u9875\u9762\u3002\n\n##\u9879\u76EE\u6982\u89C8\n\n**\u672C\u6B21\u9879\u76EE\u5171\uFFE5' + allInstanceLength + '\u4E2A\uFFE5\u5DE5\u4F5C\u5B9E\u4F8B**\n\n\uFFE5\uFFE5\uFFE5\n\u5DE5\u4F5C\u5B9E\u4F8B(' + allInstanceLength + '): ' + getCountSymbol(allInstanceLength, '☍ ') + '\n\uFFE5\uFFE5\uFFE5\n\n\u5206\u4E3A\uFFE5' + busniessLength + '\u79CD\uFFE5\u5F00\u53D1\u4E1A\u52A1\uFF0C\u5206\u5E03\u4E8E\uFFE5' + pageLength + '\u4E2A\uFFE5\u9875\u9762\u4E2D\n\n\uFFE5\uFFE5\uFFE5\n\u5F00\u53D1\u4E1A\u52A1(' + busniessLength + '): ' + getCountSymbol(busniessLength, '☏ ') + '\n\u9875\u9762(' + pageLength + '): ' + getCountSymbol(pageLength, '🀆 ') + '\n\uFFE5\uFFE5\uFFE5\n\u5B58\u5728 \uFFE5' + blackHoleLength + '\u4E2A\uFFE5\u4E0D\u786E\u5B9A\u5DE5\u4F5C\u5B9E\u4F8B\n\n\uFFE5\uFFE5\uFFE5\n\u9ED1\u6D1E(' + blackHoleLength + '): ' + getCountSymbol(blackHoleLength, '◑ ') + '\n\uFFE5\uFFE5\uFFE5\n**\u9884\u4F30\u5DE5\u4F5C\u65F6\u95F4\u4E3A\uFF1A**\n\n' + getTimeBlock({ min: projectTimeProcess.min, max: projectTimeProcess.max, expect: projectTimeProcess.expect }, totalSchedule) + '\n\n\n##\u7C7B\u522B\u8BE6\u60C5\n\n### \u5F00\u53D1\u4E1A\u52A1\uFFE5' + busniessLength + '\uFFE5\n' + getMapContent(busniessMap) + '\n---\n### \u9875\u9762\uFFE5' + pageLength + '\uFFE5\n' + getMapContent(pageMap) + '\n---\n##\u5DE5\u4F5C\u5B9E\u4F8B\u8BE6\u60C5\n\n### \u5DE5\u4F5C\u5B9E\u4F8B\uFFE5' + allInstanceLength + '\uFFE5\n' + getInstanceContent(allWorkflow) + '\n\n### \u9ED1\u6D1E\uFFE5' + blackHoleLength + '\uFFE5\n' + blackHoleFlows.map(function (b) {
    return b.node[0] === '/' ? '*' + b.node.slice(1) : '*' + b.node;
  }).join('\n\n') + '\n\n';
  return text.replace(/\￥/g, '`');
}

var difficultyMap = exports.difficultyMap = {
  'simple': '★☆☆',
  'normal': '★★☆',
  'difficult': '★★★'
};

function getInstanceContent(intances) {
  var str = '';
  intances.forEach(function (_ref2) {
    var name = _ref2.name,
        difficulty = _ref2.difficulty,
        schedule = _ref2.schedule;

    var _getTimeProcess = getTimeProcess(schedule),
        min = _getTimeProcess.min,
        max = _getTimeProcess.max,
        expect = _getTimeProcess.expect;

    var aStr = '\n* ' + name + ' ' + difficultyMap[difficulty || 'normal'] + '\n\n>' + getTimeBlock({ min: min, max: max, expect: expect }, schedule) + '\n\n';
    str += aStr;
  });
  return str;
}

function getMapContent(aMap) {
  var str = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(aMap)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
          key = _step$value[0],
          instances = _step$value[1];

      var filterInstances = instances.filter(function (ins) {
        return ins.schedule && ins.schedule.expect;
      });

      var schedule = filterInstances.reduce(function (a, _ref3) {
        var _ref3$schedule = _ref3.schedule,
            min = _ref3$schedule.min,
            max = _ref3$schedule.max,
            expect = _ref3$schedule.expect;
        return { min: a.min + min, max: a.max + max, expect: a.expect + expect };
      }, { min: 0, max: 0, expect: 0 });
      var timeProcess = getTimeProcess(schedule);

      var aStr = '\n* **' + key + '**\n\uFFE5\uFFE5\uFFE5\n' + instances.length + '\u4E2A\u5DE5\u4F5C\u5B9E\u4F8B\n\uFFE5\uFFE5\uFFE5\n\n' + getTimeBlock({ min: timeProcess.min, max: timeProcess.max, expect: timeProcess.expect }, schedule) + '\n\n';
      str += aStr;
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

  return str;
}