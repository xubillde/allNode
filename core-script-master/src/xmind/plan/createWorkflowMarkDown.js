import {
  getTimeBlock,
  getCountSymbol,
  getTimeProcess,
  difficultyMap
} from './createProjectMardDown'
import { getTimeStr } from '../src/time'

export function createWorkflowMarkDown(workflows) {
  let text = '#工作流报表'
  workflows.forEach(({
    name,
    page,
    busniess,
    type,
    difficulty,
    schedule,
    flows,
    specialFlows
  }) => {
    const { min, max, expect } = getTimeProcess(schedule)

    const aStr = `

## ${name} ${difficultyMap[difficulty || 'normal' ]}

###### 所属前端业务: ${busniess}

###### 所属前端页面: ${page}

### 时间表
${getTimeBlock({ min, max, expect }, schedule)}
----
### 工作流

￥￥￥
${getNodeflowsContent(flows)}
￥￥￥

----
### 不确定流
￥￥￥
${specialFlows.map(d => d.node[0] ===  '/' ? `*${d.node.slice(1)}` : `*${d.node}`).join('\n\n')}
￥￥￥
`
    text += aStr
  })
  return text.replace(/\￥/g, '`')
}

function getNodeflowsContent(nodeflows) {
  let str = ''
  nodeflows = nodeflows.filter(flow => flow.time && flow.time.min)
  nodeflows.forEach(({
    node,
    time: { min, max }
  }, i) => {
    const aStr = `
○ ${node} (${ min === max ? `${min}分钟` : `${min}-${max}分钟` })
${i === nodeflows.length - 1 ? '' : '↓' }`
    str += aStr
  })
  return str
}