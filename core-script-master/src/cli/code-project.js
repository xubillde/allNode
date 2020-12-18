
// $open project faster 开发某个项目(项目列表需要配置)

var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')

import { PROJECT_BASE_PATH } from '../src.config'
import projects from '../project.config'
import loopInput from '../app/src/loopInput'

console.log(chalk.magenta(`-- [项目]:`))
projects
  .forEach((project, index) => { console.log(chalk.white(`${index + 1}. ${project.name}`)) })

const choose = loopInput('打开哪个项目: ', (input) => {
  const choose = input && parseInt(input)
  if (choose && choose > 0 && choose <= projects.length) return choose - 1
})

shell.exec(`code ${projects[choose].path}`)
