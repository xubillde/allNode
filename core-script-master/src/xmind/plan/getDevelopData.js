
import resolveNodeTime from './resolveNodeTime'
import xmindConfig from './xmind-config'
const { timeField } = xmindConfig

let instance = []
export function getDevelopData(root) {
  return {
    model: getDevelopModel(root),
    instance
  }
}

function getDevelopModel(xmindNode) {
  if (xmindNode.title === '实例') {
    // 挂载实例
    instance = instance.concat(xmindNode.children.map(c => ({
      title: c.title,
      labels: c.labels,
      children: c.children
    })))
    return []
  }
  if (xmindNode.title === '定制') {
    return [{ name: xmindNode.title, time: null }]
  }
  if (!xmindNode.children.length) {
    return [{ name: '', time: xmindNode.title === timeField.pend ? null : resolveNodeTime(xmindNode.title)}]
  }
  let result = []
  xmindNode.children.forEach(childNode => {
    const childModels = getDevelopModel(childNode)
    childModels.forEach(model => {
      result.push({
        name: xmindNode.title + (model.name && `/${model.name}` || ''),
        time: model.time
      })
    })
  })
  return result
}

// 深度解析导图对象, 获得定制的工作流模型
export function getWorkflowModel(root, workflowModel) {
  if (!(root.children && root.children.length)) return workflowModel
  root.children.forEach(child => {
    const model = workflowModel[child.title]
    if (model) {
      const pointer = model.pointer
      workflowModel[child.title] = pointer && workflowModel[pointer] || getDevelopData(child).model
    }
    workflowModel = getWorkflowModel(child, workflowModel)
  })
  return workflowModel
}

