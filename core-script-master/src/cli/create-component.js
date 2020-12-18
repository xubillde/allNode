
var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var readlineSync = require('readline-sync')
var shell = require('shelljs')
var ncp = require('copy-paste')

import getComponentSnippet from '../template/common/snippet/import/component'
import generateComponent from '../app/src/generateComponent'

import { PROJECT_BASE_PATH } from '../src.config'

const dirs = fs.readdirSync(path.join(__dirname, '../template/component'))

console.log(chalk.cyan('请选择要生成的元件类型：\n'));
dirs.forEach((dir, index) => { console.log(`${index + 1}.${dir}`) })

const input = readlineSync.question('\n输入序号(回车默认为[components]): ')

const chooseIndex = (input && parseInt(input) - 1) || 0 // 注意这个序号
const compType = dirs[chooseIndex] 

const compPath = readlineSync.question('\n输入组件的路径(a/b/c): ')

if (!compPath) {
  console.log(chalk.red('未输入或输入错误!'))
} else {
  const component = generateComponent(PROJECT_BASE_PATH, compPath, { type: compType })
  ncp.copy(getComponentSnippet(component).str, function () {
    console.log(chalk.yellow('>>> 已复制引用补全到剪切板\n'))
  })
  const NO = { no: 1, No: 1, NO: 1 }
  const isOpen = readlineSync.question('\n是否打开进行编辑(yes[默认]/no): ')
  if (!NO[isOpen]) {
    shell.exec(`code ${component.absolutPath}`)
  }
}




