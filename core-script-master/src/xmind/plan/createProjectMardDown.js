
import { getTimeStr } from '../src/time'

export function getCountSymbol(length, symbol) {
  return new Array(length + 1).fill(null).join(`${symbol}`)
}

export function getTimeProcess(time) {
  if (!time) time = { min: 0, max: 0, expect: 0 }
  const { min, max, expect } = time
  const ratio = ( max - min ) / 30
  const same = min === max
  const getStr = (value) => getCountSymbol(same ? 15 : Math.round((value - min) / ratio) + 5, '─')
  return {
    min: getStr(min),
    max: getStr(max),
    expect: getStr(expect),
  }
}


export const getTimeBlock = ({ min, max, expect }, schedule) => `￥￥￥
最少时间: ${min} ${getTimeStr(schedule && schedule.min || 0)}
最大时间: ${max} ${getTimeStr(schedule && schedule.max || 0)}
预期时间: ${expect} ${getTimeStr(schedule && schedule.expect || 0)}
￥￥￥` 

export function createProjectMardDown(projectModel) {
  const {
    allWorkflow,
    pageMap, // 页面统计
    busniessMap, // 业务统计
    difficultyMap, // 难度统计
    totalSchedule,  // 总计划统计
    blackHoleFlows,  // 特殊流统计
  } = projectModel

const allInstanceLength = allWorkflow.length
const pageLength = Object.keys(pageMap).length
const busniessLength = Object.keys(busniessMap).length
const blackHoleLength = blackHoleFlows.length

// 里面的 `用￥代替
// 时间进度最长36根线 ──────────────────────────────────── 取 30最大

const projectTimeProcess = getTimeProcess(totalSchedule)

const text =`
# 项目总评估表
> 注释：
>
> 1. ￥开发业务￥是指从前端抽象出的一类工作流，比如数据组装
> 2. ￥页面￥是实际产品业务指定的访问入口
> 3. ￥工作实例￥是指一个具体的工作实例，比如登录框模块
> 4. ￥黑洞￥是指暂时无法准确评估时间，需要探究的模块
> 5. ￥自定义工作实例￥指不能继承工作模型的特殊模块，比如埋点业务，没有可继承的工作流，实际工作流由开发者自定义
>
> 开发者需关注开发业务，管理方需关注工作实例，实际开发时以工作实例作为基本工作单元，全部工作实例开发完毕则项目结束。开发业务和页面是工作实例的属性，比如登录框模块属于静态组件开发业务，登录页面。

##项目概览

**本次项目共￥${allInstanceLength}个￥工作实例**

￥￥￥
工作实例(${allInstanceLength}): ${getCountSymbol(allInstanceLength, '☍ ')}
￥￥￥

分为￥${busniessLength}种￥开发业务，分布于￥${pageLength}个￥页面中

￥￥￥
开发业务(${busniessLength}): ${getCountSymbol(busniessLength, '☏ ')}
页面(${pageLength}): ${getCountSymbol(pageLength, '🀆 ')}
￥￥￥
存在 ￥${blackHoleLength}个￥不确定工作实例

￥￥￥
黑洞(${blackHoleLength}): ${getCountSymbol(blackHoleLength, '◑ ')}
￥￥￥
**预估工作时间为：**

${getTimeBlock({ min: projectTimeProcess.min, max: projectTimeProcess.max, expect: projectTimeProcess.expect }, totalSchedule)}


##类别详情

### 开发业务￥${busniessLength}￥
${getMapContent(busniessMap)}
---
### 页面￥${pageLength}￥
${getMapContent(pageMap)}
---
##工作实例详情

### 工作实例￥${allInstanceLength}￥
${getInstanceContent(allWorkflow)}

### 黑洞￥${blackHoleLength}￥
${blackHoleFlows.map(b => b.node[0] ===  '/' ? `*${b.node.slice(1)}` : `*${b.node}`).join('\n\n')}

`
return text.replace(/\￥/g, '`')
}

export const difficultyMap = {
  'simple': '★☆☆',
  'normal': '★★☆',
  'difficult': '★★★'
}

function getInstanceContent(intances) {
  let str = ''
  intances.forEach(({
    name,
    difficulty,
    schedule
  }) => {
    const { min, max, expect } = getTimeProcess(schedule)
    const aStr = `
* ${name} ${difficultyMap[difficulty || 'normal' ]}

>${getTimeBlock({ min, max, expect }, schedule)}

`
    str += aStr
  })
  return str
}


function getMapContent(aMap) {
  let str = ''
  for (let [key, instances] of Object.entries(aMap)) {

    const filterInstances = instances.filter(ins => ins.schedule && ins.schedule.expect)

    const schedule = filterInstances
      .reduce((a, { schedule: { min, max, expect }}) => (
        { min: a.min + min, max: a.max + max, expect: a.expect + expect }
      ), { min: 0, max: 0, expect: 0 })
    const timeProcess = getTimeProcess(schedule)

    const aStr = `
* **${key}**
￥￥￥
${instances.length}个工作实例
￥￥￥

${getTimeBlock({ min: timeProcess.min, max: timeProcess.max, expect: timeProcess.expect }, schedule)}

`
    str += aStr
  }
return str
}