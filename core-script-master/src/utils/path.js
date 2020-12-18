var fs = require('fs')
var path = require('path')
var upperFirst = require('lodash/upperFirst')

export function getPagePath (path) {
  if (!path) throw Error('不存在该path')
  let result = path.split('/').map(p => (p.indexOf('.') <= 0 && upperFirst(p)) || p)
  if (result[result.length - 1].indexOf('.') <= 0) {
    result.push('index.js')
  }
  return result.join('/')
}

export function getRemovePath(rmpath) { // 向上递归，直到某一层有兄弟文件，就不能被全部移除
  const splitRmPaths = rmpath && rmpath.split('/') || []
  if (!splitRmPaths.length) return rmpath
  const itemSelf = splitRmPaths.pop()
  const silbDirs = fs
    .readdirSync(path.dirname(rmpath))
    .filter(dir => dir !== 'index.js' && dir !== 'index.scss' && dir !== itemSelf)
  if (silbDirs.length) {
    return rmpath
  } else {
    return getRemovePath(splitRmPaths.join('/'))
  }
}