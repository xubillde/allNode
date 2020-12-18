
export default function processApiList(data, authField) {
  
  const originApiList = data.map(api => {
    let formData = api.parameters.formData || []
    if (api.needAuth) {

      //   获得用户权限暂时移位到调用方法中
      // formData = formData.concat([
      //   { key: authField.userId, require: true },
      //   { key: authField.userToken, require: true }
      // ])
    }
    if (formData.length) api.parameters.formData = formData
    return api // es6 才能用 return { ...data, formData } 
  })

  // 如果有重复的，就增加名字后缀，fu fu1 fu2
  const uniqueKeys = []
  const uniqueShortcuts = []
  return originApiList.map(api => {
    const apiInfo = createApiName(api.path, api.method)
    let key = apiInfo.key
    let shortcut = apiInfo.shortcut
    const _findKey = uniqueKeys.filter(k => (k === key))
    const _findShortcut = uniqueShortcuts.filter(s => (s === shortcut))
    uniqueKeys.push(key)
    uniqueShortcuts.push(shortcut)
    if (_findKey.length) key = `${key}${_findKey.length}`
    if (_findShortcut.length) shortcut = `${key}${_findShortcut.length}`
    api.key = key
    api.shortcut = shortcut
    return api
  })
}

function createApiName(apiPath, apiMethod) {
  const capitalize = require('lodash/capitalize')
  const lowerCase = require('lodash/lowerCase')
  const upperFirst = require('lodash/upperFirst')
  const toLower = require('lodash/toLower')
  const pathGroup = apiPath.split('/')
  const pathKeys = ['fetch', upperFirst(toLower(apiMethod))]
  const shortcuts = ['f', toLower(apiMethod).slice(0, 1)]
  pathGroup.forEach(path => {
    let objectName = path
    if (path.charAt(0) === '{') {
      objectName = path.indexOf('_') > 0 ? path.split('_')[0].replace(/{/g, '') : path.replace(/{|}/g, '')
      pathKeys.pop()
    }
    pathKeys.push(capitalize(objectName))
    shortcuts.push(lowerCase(objectName.slice(0, 1)))
  })
  return {
    key: pathKeys.join(''),
    shortcut: shortcuts.join('')
  }
}