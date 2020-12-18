"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyseWorkflow = analyseWorkflow;
function analyseWorkflow(workflows) {
  var pageMap = {};
  var busniessMap = {};
  var difficultyMap = {};
  var totalSchedule = { min: 0, max: 0, expect: 0 };
  var blackHoleFlows = [];
  workflows.forEach(function (flow, i) {
    var name = flow.name,
        page = flow.page,
        busniess = flow.busniess,
        difficulty = flow.difficulty,
        schedule = flow.schedule,
        specialFlows = flow.specialFlows;

    if (!pageMap[page]) pageMap[page] = [];
    pageMap[page].push(flow);

    if (!busniessMap[busniess]) busniessMap[busniess] = [];
    busniessMap[busniess].push(flow);

    if (!difficultyMap[difficulty]) difficultyMap[difficulty] = [];
    difficultyMap[difficulty].push(flow);

    if (schedule && schedule.min) {
      var min = schedule.min,
          max = schedule.max,
          expect = schedule.expect;

      totalSchedule = {
        min: totalSchedule.min + min,
        max: totalSchedule.max + max,
        expect: totalSchedule.expect + expect
      };
    }
    blackHoleFlows = blackHoleFlows.concat(specialFlows);
  });
  return {
    pageMap: pageMap, // 页面统计
    busniessMap: busniessMap, // 业务统计
    difficultyMap: difficultyMap, // 难度统计
    totalSchedule: totalSchedule, // 总计划统计
    blackHoleFlows: blackHoleFlows // 特殊流统计
  };
}