var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var readlineSync = require('readline-sync')
const merge = require('lodash/merge')

import loopInput from '../app/src/loopInput'
import { getSnippetOutputPath } from '../snippet/src/getConfig'
import deleteSnippet from '../snippet/bin/delete'

import { PROJECT_BASE_PATH } from '../src.config'
import { SNIPPET_TYPES } from '../snippet/constant'
const SNIPPET_OUTPUT_PATH = getSnippetOutputPath(PROJECT_BASE_PATH)

const chooseType = getChooseType().name


if (chooseType !== 'ALL') {
  const historyData = getHistoryData(chooseType)
  deleteSnippet(chooseType, SNIPPET_OUTPUT_PATH, historyData.json)
  fs.unlinkSync(historyData.path)
} else {
  let historySnippetJson = null
  SNIPPET_TYPES.filter(type => type.name !== 'ALL').forEach(type => {
    const data = getHistoryData(type.name)
    if (data) {
      historySnippetJson = merge(historySnippetJson || {}, data.json)
      fs.unlinkSync(data.path)
    }
  })
  deleteSnippet(chooseType, SNIPPET_OUTPUT_PATH, historySnippetJson)
}




function getChooseType () {
  console.log(chalk.magenta(`-- [补全类目录]:`))
  SNIPPET_TYPES
    .forEach((type, index) => { console.log(chalk.white(`${index + 1}. ${type.name} —— [${type.desc}]`)) })
  const choose = loopInput('删除哪类的补全？输入序号: ', (input) => {
    const choose = input && parseInt(input)
    if (choose && choose > 0 && choose <= SNIPPET_TYPES.length) return choose - 1
  })
  return SNIPPET_TYPES[choose]
}


function getHistoryData (snippetType) {
  const historyDataPath = path.join(__dirname, '../snippet/data', snippetType)
  const historyDatas = fs.readdirSync(historyDataPath)

  if (!historyDatas.length) return null
  console.log(chalk.magenta(`\n-- [项目目录]:`))
  historyDatas
    .sort((a, b) => (a.length - b.length))
    .forEach((file, index) => { console.log(chalk.white(`${index + 1}. ${file}`)) })
  const choose2 = loopInput(`[${snippetType}] 删除哪个项目的？输入序号:`, (input) => {
    const choose = input && parseInt(input)
    if (choose && choose > 0 && choose <= historyDatas.length) return choose - 1
  })
  const historySnippetJson = require(`${historyDataPath}/${historyDatas[choose2]}`)
  return {
    path: `${historyDataPath}/${historyDatas[choose2]}`,
    json: historySnippetJson
  }
  
}








