var fs = require('fs')
var path = require('path')
var chalk = require('chalk')

import loopInput from '../app/src/loopInput'
import { PROJECT_BASE_PATH } from '../src.config'

import { SNIPPET_TYPES } from '../snippet/constant'

console.log(chalk.magenta(`-- [补全类型]:`))
SNIPPET_TYPES
  .sort((a, b) => (a.length - b.length))
  .forEach((type, index) => { console.log(chalk.white(`${index + 1}. ${type.name} —— [${type.desc}]`)) })

const choose = loopInput('创建哪类的补全？输入序号: ', (input) => {
  const choose = input && parseInt(input)
  if (choose && choose > 0 && choose <= SNIPPET_TYPES.length) return choose - 1
})

const chooseType = SNIPPET_TYPES[choose].name

if (chooseType !== 'ALL') {
  createSnippet(chooseType)
} else {
  SNIPPET_TYPES.filter(type => type.name !== 'ALL').forEach(type => { createSnippet(type.name) })
}

function createSnippet(type) {
  const doCreate = require(`../snippet/bin/${type}/create.js`).default
  doCreate(PROJECT_BASE_PATH)
}