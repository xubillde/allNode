import xmindConfig from '../plan/xmind-config'
const { timeField, specialSymbolMap, difficultyField } = xmindConfig
const pendTimeStr = `${specialSymbolMap.timeType}${timeField.pend}`

const chalk = require('chalk')
const omit = require('lodash/omit')
const merge = require('lodash/merge')
const findIndex = require('lodash/findIndex')

// 将实例树展开
export function flattenInstance(instances, title) {
  if (!instances.length) return [title || '']
  let result = []
  instances.forEach(i => {
    flattenInstance(i.children, i.title).forEach(f => {
      result.push(title ? `${title}/${f}` : f)
    })
  })
  return result
}


function resolveNodePath(title) {
  if (!title) return
  const spiltSlash = title.split('/')
  if (spiltSlash.length < 2) {
    return { name: title, time: null }
  } else {
    // console.log(spiltSlash,' spiltSlash');
    const remainTimeStr = spiltSlash[spiltSlash.length - 1].replace(/\s/g, '').replace('time:', '')
    return {
      name: spiltSlash.slice(0, spiltSlash.length - 1).join('/'),
      time: 0
    }
  }
}

export function resolveInstances(flattenedInstances) {
  // 去掉所有空格
  flattenedInstances = flattenedInstances.map(i => i.replace(/\s/g, ''))
  // 期待的输出
  const instance = { page: {}, component: {}, custom: {} }
  flattenedInstances.forEach((fi, i) => {
    const data = resolvePath(fi)
    instance[data.type][data.name] = merge(instance[data.type][data.name] || {}, omit(data, ['type', 'name']))
  })
  return instance
}

function resolvePath(path) {
  const splitPaths = path.split('/')
  const pageIndex = getSymbolIndex(path, 'page')
  const pagePart = pageIndex < 0 ? [] : splitPaths.slice(0, pageIndex + 1)
  // 自定义实例
  if (!pagePart.length)  {
    console.log(chalk.cyan(`[${path}] 没有检索到页面符号*，返回自定义实例`));
    return {
      type: 'custom',
      ...getCustomInstance(path)
    }
  }
  // 页面实例
  const addBussniessIndex = getSymbolIndex(path, 'addClass')
  const importClassIndex = getSymbolIndex(path, 'importClass')
  if (importClassIndex < 0 && addBussniessIndex < 0) {
    return {
      type: 'page',
      ...getPageInstance(path)
    }
  }

  return importClassIndex < 0 ? {
    type: 'component',
    pageName: pagePart.join('/').replace(specialSymbolMap.page, ''),
    ...getAddClassInstance(path)
  } : {
    pageName: pagePart.join('/').replace(specialSymbolMap.page, ''),
    type: 'component',
    ...getImportClassInstance(path)
  }
}

function getSymbolIndex(path, key) {
  const splitPaths = path.split('/')
  return findIndex(splitPaths, str => str.indexOf(specialSymbolMap[key]) >= 0)
}

function getCustomInstance(path) {
  const splitPaths = path.split('/')
  const timeIndex = getSymbolIndex(path, 'timeType')
  return {
    name: timeIndex < 0 ? path : splitPaths.slice(0, timeIndex).join('/'),
    time: getNodeTime( timeIndex < 0 ? [] : splitPaths.slice(timeIndex))
  }
}

function getNodeTime(timePart) {
  if (!timePart.length) return null
  const firstTime = timePart[0].replace('time:', '')
  if (firstTime === timeField.pend) {
    return null
  } else {
    const min = parseInt(firstTime)
    const max = timePart[1] && parseInt(timePart[1]) || min
    return {
      min,
      max,
      expect: Math.round((min + max) / 2)
    }
  }
}

function getPageInstance(path) {
  const splitPaths = path.split('/')
  const timeIndex = getSymbolIndex(path, 'timeType')
  const presetIndex = getSymbolIndex(path, 'presetType')
  const lastIndex = timeIndex < presetIndex ? presetIndex : timeIndex
  if (timeIndex >= 0) {
    console.log(chalk.yellow(`[${path}] 页面实例不能定义时间，除非修改了业务模型，已将该路径改为type:simple`))
  }
  return {
    name: lastIndex < 0 ? path : splitPaths.slice(0, lastIndex).join('/').replace(specialSymbolMap.page, ''),
    difficulty: presetIndex < 0 ? difficultyField.simple : splitPaths[presetIndex].replace(specialSymbolMap.presetType, '')
  }
}

function getImportClassInstance(path) {
  const splitPaths = path.split('/')
  const pageIndex = getSymbolIndex(path, 'page')
  const pagePart = pageIndex < 0 ? [] : splitPaths.slice(0, pageIndex + 1)
  const importClassIndex = getSymbolIndex(path, 'importClass')
  const importName = splitPaths[importClassIndex]
    .replace(specialSymbolMap.importClass, '')
    .replace(/\>/g, '/')
  const modulePart = splitPaths.slice(importClassIndex + 1)
  // import的放入add的reference中
  return {
    name: importName,
    moduler: getModuler(modulePart)
  }
}

function getAddClassInstance(path) {
  // 测试/入口/选择页*/滑动选择/Z组件$静态组件
  const splitPaths = path.split('/')
  const pageIndex = getSymbolIndex(path, 'page')
  const presetIndex = getSymbolIndex(path, 'presetType')
  const pagePart = pageIndex < 0 ? [] : splitPaths.slice(0, pageIndex + 1)
  const classIndex = getSymbolIndex(path, 'addClass')
  const classStr = splitPaths[classIndex]
  const splitBusniess = classStr.split(specialSymbolMap.addClass)
  const prevClassPart = pageIndex + 1 === classIndex ? [] : splitPaths.slice(pageIndex + 1, classIndex)
  const namePart = prevClassPart.concat([splitBusniess[0]])
  const name = namePart.join('/')
  const modulePart = splitPaths.slice(classIndex + 1)
  // import的放入add的reference中
  return {
    name,
    className: splitBusniess[1],
    moduler: getModuler(modulePart),
    difficulty: presetIndex < 0 ? difficultyField.simple : splitPaths[presetIndex].replace(specialSymbolMap.presetType, '')
  }
}


function getModuler(modulePart) {
  // [模块1, +X的引入, time:4, 30]
  // +T的收入
  const moduleIndex = findIndex(modulePart, path => (
    path[0] === specialSymbolMap.addModule ||
    path[0] === specialSymbolMap.removeModule ||
    path[0] === specialSymbolMap.replaceModule
  ))
  if (moduleIndex < 0) return {} // 测试/出口/中间页*/@滑动选择>slick组件
  const moduler = modulePart[moduleIndex]

  const timeIndex = findIndex(modulePart, p => p.indexOf(specialSymbolMap.timeType) >= 0)
  const timePart = timeIndex < 0 ? [] : modulePart.slice(timeIndex)
  const prevPath = moduleIndex === 0 ? '' : modulePart.slice(0, moduleIndex).join('/')

  const modulerName = moduler.slice(1)
  const address = `${prevPath}${prevPath ? '/' : ''}${moduler.slice(1)}`
  const time = getNodeTime(timePart)
  const fieldMap = {
    [specialSymbolMap.addModule]: 'add',
    [specialSymbolMap.removeModule]: 'remove',
    [specialSymbolMap.replaceModule]: 'replace'
  }

  if (moduler[0] === specialSymbolMap.replaceModule) {
    let betweenModulerAndTime = []
    if (timeIndex < 0) betweenModulerAndTime = modulePart.slice(moduleIndex + 1)
    if (moduleIndex + 1 < timeIndex) betweenModulerAndTime = modulePart.slice(moduleIndex + 1, timeIndex)
    return {[fieldMap[moduler[0]]]: {
      [modulerName]: { [betweenModulerAndTime.join('/')]: time }
    }}
  }
  return { [fieldMap[moduler[0]]]: { [modulerName]: { time, address } }}
}