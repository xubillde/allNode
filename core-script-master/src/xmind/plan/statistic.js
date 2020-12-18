export function analyseWorkflow(workflows) {
  let pageMap = {}
  let busniessMap = {}
  let difficultyMap = {}
  let totalSchedule= { min: 0, max: 0, expect: 0 }
  let blackHoleFlows = []
  workflows.forEach((flow, i) => {
    const {
      name,
      page,
      busniess,
      difficulty,
      schedule,
      specialFlows
    } = flow
    if (!pageMap[page]) pageMap[page] = []
    pageMap[page].push(flow)
  
    if (!busniessMap[busniess]) busniessMap[busniess] = []
    busniessMap[busniess].push(flow)

    if (!difficultyMap[difficulty]) difficultyMap[difficulty] = []
    difficultyMap[difficulty].push(flow)

    if (schedule && schedule.min) {
      const { min, max, expect } = schedule
      totalSchedule = {
        min: totalSchedule.min + min,
        max: totalSchedule.max + max,
        expect: totalSchedule.expect + expect,
      }
    }
    blackHoleFlows = blackHoleFlows.concat(specialFlows)
  })
  return {
    pageMap, // 页面统计
    busniessMap, // 业务统计
    difficultyMap, // 难度统计
    totalSchedule,  // 总计划统计
    blackHoleFlows,  // 特殊流统计
  }
}