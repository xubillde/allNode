

var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')


import { PACKAGE_BASE_PATH } from '../src.config'

shell.exec(`code ${path.join(PACKAGE_BASE_PATH, 'framework')}`)

console.log(chalk.yellow('>>> 成功打开'))

// 在core-scirpt中维护，在项目中更新