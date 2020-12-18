var fs = require('fs-extra')
var path = require('path')
var chalk = require('chalk')
var readlineSync = require('readline-sync')
const toLower = require('lodash/toLower')

import getAppPath from '../app/src/getAppPath'
import loopInput from '../app/src/loopInput'
import { PROJECT_BASE_PATH } from '../src.config'

import { getFilesTree, joinFilesName } from '../utils/file'
import { getRemovePath } from '../utils/path';

const apps = joinFilesName(getFilesTree(path.join(PROJECT_BASE_PATH, 'pages')))

const deleteTargets = ['手动输入路径'].concat(apps.map(app => app.fullImportPath))

console.log(chalk.magenta(`\n-- [删除目标列表]:`))
deleteTargets.forEach((target, index) => {
  console.log(chalk.white(`${index + 1}. ${target}`))
})

const choose = loopInput('请选择删除目标：', (input) => {
  const choose = input && parseInt(input)
  if (choose && choose > 0 && choose <= deleteTargets.length) return choose - 1
})

// 删除方式
const target = deleteTargets[choose]

if (target !== '手动输入路径') {
  removeApp(getAppPath(PROJECT_BASE_PATH, target), target)
} else {
  let inputApp = null
  const appPath = loopInput('\n输入页面的路径(a/b/c || a/b/c.js): ', (input) => {
    const app = getAppPath(PROJECT_BASE_PATH, input)
    if (fs.existsSync(app.page.absolutePath) || fs.existsSync(path.join(PROJECT_BASE_PATH, app.page.importPath))) {
      inputApp = app
      return input
    }
    return false
  })
  removeApp(inputApp, appPath)
}

function moveLogger(rpath, logger) {
  fs.remove(rpath).then(() => {
    console.log(chalk.yellow(`>>> 成功移除 [${rpath}]`))
  })
}

function removeApp(app, appPath) {
  for (let [key, value] of Object.entries(app)) {
    if ({ page: 1, parser: 1, container: 1 }[key]) {
      let removePath = path.join(PROJECT_BASE_PATH, value.importPath)
      const itemSelf = removePath.split('/').pop()
      if (itemSelf.indexOf('.') < 0) removePath = path.join(PROJECT_BASE_PATH, value.importPath, 'index.js')
      const silbDirs = fs
        .readdirSync(path.dirname(removePath))
        .filter(dir => dir !== 'index.js' && dir !== 'index.scss' && dir !== itemSelf)
      if (silbDirs.length) { // 路径下存在其他app
        key === 'container' && moveLogger(path.join(PROJECT_BASE_PATH, value.importPath, 'index.scss'))
        moveLogger(removePath)
      } else {
        moveLogger(getRemovePath(removePath))
      }
    }
  }
}