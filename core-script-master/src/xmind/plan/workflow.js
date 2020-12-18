import xmindConfig from '../plan/xmind-config'
const { timeField, seriesTime, stateField, specialSymbolMap, difficultyField } = xmindConfig
const pendTimeStr = `time:${timeField.pend}`

const chalk = require('chalk')
const omit = require('lodash/omit')
const merge = require('lodash/merge')
const findIndex = require('lodash/findIndex')
const isArray = require('lodash/isArray')

export function getPageWorkflow(instances, workflowModel) {
  const workflows = {}
  for (let [key, value] of Object.entries(instances)) {
    const flows = workflowModel.map(node => ({
      node: (key ? `${key}/` : '') + node.name,
      time: node.time,
      state: stateField.todo,
      bugs: []
    }))
    const difficulty = value.difficulty || difficultyField.normal
    // 还要插入串联计算
    if (flows.length > 1) {
      flows.push({
        node: '工作流串联与整体调试',
        time: {
          min: seriesTime.min * (flows.length - 1),
          max: seriesTime.max * (flows.length - 1),
          expect: Math.round((seriesTime.min + seriesTime.max) / 2) * (flows.length - 1)
        }
      })
    }

    const validTime = (time) => !!(time && time.min && time.max && time.expect)
    const removeSpecialFlows = flows.filter(f => validTime(f.time))
    if (!removeSpecialFlows.length) {
      return {
        flows: [],
        difficulty,
        schedule: null,
        specialFlows: flows
      }
    }
    let expect = null
    const minSchedule = removeSpecialFlows.map(f => f.time.min).reduce((p, a) => (p + a))
    const maxSchedule = removeSpecialFlows.map(f => f.time.max).reduce((p, a) => (p + a))
    switch (difficulty) {
      case difficultyField.simple: {
        expect = minSchedule
      }
      case difficultyField.difficult: {
        expect = maxSchedule
      }
      default: {
        expect = removeSpecialFlows.map(f => f.time.expect).reduce((p, a) => (p + a))
      }
    }
    workflows[key] = {
      flows: removeSpecialFlows,
      difficulty,
      schedule: {
        expect,
        min: minSchedule,
        max: maxSchedule
      },
      specialFlows: flows.filter(f => !validTime((f.time)))   // 事件待定的节点
    }
  }
  return workflows
}


// component:
// { '滑动选择/slick组件': { className: '组件开发业务', moduler: [Object], difficulty: 'simple' },
//   '滑动选择/Z组件': { className: '静态组件', moduler: {}, difficulty: 'difficult' },
//   '滑动选择/K框架': { className: '定制业务', moduler: [Object], difficulty: 'simple' } },  component:
//    { '滑动选择/slick组件': { className: '组件开发业务', moduler: [Object], difficulty: 'simple' },
//      '滑动选择/Z组件': { className: '静态组件', moduler: {}, difficulty: 'difficult' },
//      '滑动选择/K框架': { className: '定制业务', moduler: [Object], difficulty: 'simple' } },


export function getComponentWorkflow(instances, workflowModel) {
  let compWorkflows = {}
  for (let [key, instance] of Object.entries(instances)) { // key 是每个组件的名称
    const { className, moduler } = instance
    let matchWorkflowModel = workflowModel[className]// 因为要修改模型，深度复制一份
    if (!isArray(matchWorkflowModel)) { // 引用模型
      if (!matchWorkflowModel) {
        console.log(chalk.red(`[${key}] - 不存在该业务类型: [${className}] !\n`))
        return compWorkflows
      }
      if (!workflowModel[matchWorkflowModel.pointer]) {
        console.log(chalk.red(`业务指针错误, [${key}] - 不存在该业务类型: [${className}] !\n`))
        return compWorkflows
      }
      matchWorkflowModel = workflowModel[matchWorkflowModel.pointer]
    }
    if (!matchWorkflowModel) {
      console.log(chalk.red(key, '不存在工作流模型!\n'))
      return compWorkflows
    }
    const deepCopy = matchWorkflowModel.map(a => a)
    const newWorkflowModel = updateModel(deepCopy, moduler)
    compWorkflows[key] = {
      ...instance,
      workflow: getPageWorkflow({ [key]: instance }, newWorkflowModel)[key]
    }
  }
  return compWorkflows
}

function getPrevPath(path, key) {
  const split = path.split('/')
  const _findIndex = findIndex(split, s => s === key)
  return _findIndex < 0 ? path : split.slice(0, _findIndex + 1).join('/')
}

function updateModel(model, moduler) { // 实例化工作流
  const { add, remove, replace } = moduler
  if (replace) { // 使用replace更新工作流
    // 找到首个位置
    // 过滤掉所有包括replace节点的流
    // 插入replace所有新增节点的流 从address开始接，没有就相当于首位直接替换
    for (let [rkey, rvalue] of Object.entries(replace)) {
      let firstIndex = null
      let count = null
      let prevPath = ''
      let replaceFlows = []
      model.forEach((flow, findex) => {
        const happenIndex = flow.name.indexOf(rkey)
        if (happenIndex >= 0) {
          if (!prevPath) prevPath = getPrevPath(flow.name, rkey)
          if (!firstIndex) firstIndex = findex
          if (!count) count = 0
          count++
        }
      })
      for (let [nmkey, nmvalue] of Object.entries(rvalue)) {
        replaceFlows.push({
          name: prevPath + `${nmkey ? `/${nmkey}` : ''}`, //  替换模块3
          time: nmvalue
        })
      }
      model.splice(firstIndex, count, ...replaceFlows)
    }
  }
  if (remove) {
    for (let rkey of Object.keys(remove)) {
      model = model.filter(flow => (flow.name.indexOf(rkey) === -1))
    }
  }
  if (add) {
    for (let [rkey, rvalue] of Object.entries(add)) {
      model.push({ name: rvalue.address, time: rvalue.time })
    }
  }
  return model
}