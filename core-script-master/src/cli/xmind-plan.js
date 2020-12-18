const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const merge = require('lodash/merge')

import getXmindRootDom from '../xmind/src/getXmindRootDom'
import { analyseWorkflow } from '../xmind/plan/statistic'
import { flattenInstance, resolveInstances } from '../xmind/plan/instance'
import { getPageWorkflow, getComponentWorkflow } from '../xmind/plan/workflow'
import { getDevelopData, getWorkflowModel } from '../xmind/plan/getDevelopData'
import { createProjectMardDown } from '../xmind/plan/createProjectMardDown'
import { createWorkflowMarkDown } from '../xmind/plan/createWorkflowMarkDown'

import { PROJECT_BASE_PATH } from '../src.config'
import xmindConfig from '../xmind/plan/xmind-config'


const userConfigPath = path.join(PROJECT_BASE_PATH, '.core-config/core.config.js')
if (!fs.existsSync(userConfigPath)) throw Error('请在项目根路径下配置.core-config/core.config.js 或使用 init-core')
const userConfig = require(userConfigPath)
const { xmind } = userConfig

const { timeField, seriesTime, workflowModel, specialSymbolMap, difficultyField } = xmindConfig

if (!xmind.plan.path) throw Error('请配置 xmind.plan.path ')

const sourcePath = path.join(PROJECT_BASE_PATH, xmind.plan.path)

if (!fs.existsSync(sourcePath)) throw Error(`[${sourcePath}] 配置路径不存在，请确认xmind.plan.path`)

const outputConfig = xmind.plan.output || {
  data: 'data/projectModelData.json',
  projectMarkDown: 'plan-output/projectMarkDown.md',
  workflowsMarkDown: 'plan-output/workflowsMarkDown.md',
}

const getDefaultOutput = (field) => {
  return path.join(path.dirname(sourcePath), outputConfig[field])
}
let outputPath = {}
Object.keys(outputConfig).forEach(key => {
  outputPath[key] = getDefaultOutput(key)
})

const xmindRootDom = getXmindRootDom(sourcePath)
// 1. 获得开发模型和开发实例数据
const develop = getDevelopData(xmindRootDom)

// console.log(develop.instance, 'developdevelop')
// 2. 获得所有需要的开发流模型
const model = getWorkflowModel(xmindRootDom, merge({ APP: develop.model }, workflowModel))

// 3. 解析所有展开的实例
const resolvedFlattenInstances = resolveInstances(flattenInstance(develop.instance))

// 4. 从实例分别获得工作流
const pageWorkflow = getPageWorkflow(resolvedFlattenInstances.page, model.APP)
const componentWorkflow = getComponentWorkflow(resolvedFlattenInstances.component, model)


// 5. 合并工作流
let allWorkflow = []
for (let [name, value] of Object.entries(pageWorkflow)) {
  allWorkflow.push({
    name,
    page: name,
    busniess: '页面业务',
    ...value
  })
}
for (let [name, { pageName, className, workflow }] of Object.entries(componentWorkflow)) {
  if (pageName && className && workflow) {
    allWorkflow.push({
      name,
      page: pageName,
      busniess: className,
      ...workflow
    })
  }
}
for (let [name, value] of Object.entries(resolvedFlattenInstances.custom)) {
  allWorkflow.push({
    name,
    schedule: value.time,
    flows: [{ node: name, time: value.time }],
    specialFlows: [],
    difficulty: difficultyField.normal,
    busniess: '定制业务'
  })
}
// 统计数据
const statistic = analyseWorkflow(allWorkflow)

const projectModelData = {
  allWorkflow,
  ...statistic
}
// console.log(allWorkflow, 'allWorkflowallWorkflow');

const projectMarkDown = createProjectMardDown(projectModelData)
const workflowsMarkDown = createWorkflowMarkDown(allWorkflow)


fs.ensureFileSync(outputPath.projectMarkDown)
fs.writeFileSync(outputPath.projectMarkDown, projectMarkDown)
console.log(chalk.yellow(`>>> 成功导出 ${outputPath.projectMarkDown}`))
fs.ensureFileSync(outputPath.workflowsMarkDown)
fs.writeFileSync(outputPath.workflowsMarkDown, workflowsMarkDown)
console.log(chalk.yellow(`>>> 成功导出 ${outputPath.workflowsMarkDown}`))
// 输出projectModelData数据
fs.ensureFileSync(outputPath.data)
fs.writeFileSync(outputPath.data, `${JSON.stringify(projectModelData, null, 2)}`)
console.log(chalk.yellow(`>>> 成功导出 ${outputPath.data}`))
