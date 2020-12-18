var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
import { PROJECT_BASE_PATH } from '../src.config'
// 这个脚本用于初始化项目，相当于开始的引导，打开相关的配置文件

console.log(chalk.yellow('>>> welcome to start a project'))
console.log(chalk.yellow('>>> 即将为你打开项目初始须知'))

const INIT_FILES = [
  'assist/project/get-start.md'
]

INIT_FILES.forEach(file => {
  if (fs.existsSync(path.join(PROJECT_BASE_PATH, file))) {
    shell.exec(`code ${path.join(PROJECT_BASE_PATH, file)}`)
  } else {
    console.log(`${path.join(PROJECT_BASE_PATH, file)} 不存在`);
  }
})