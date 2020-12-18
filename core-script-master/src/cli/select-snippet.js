var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
const merge = require('lodash/merge')

import { getSnippetOutputPath } from '../snippet/src/getConfig'
import { PROJECT_BASE_PATH } from '../src.config'
import { SNIPPET_TYPES } from '../snippet/constant'
const SNIPPET_OUTPUT_PATH = getSnippetOutputPath(PROJECT_BASE_PATH)


let ALLSNIPPETS = {}
let allSnippetJson = null
let thisSnippetJson = null
const nowProjectJson = `${PROJECT_BASE_PATH.split('/').join('-')}.json`

SNIPPET_TYPES.filter(type => type.name !== 'ALL').forEach(type => {
  const historyDataPath = path.join(__dirname, '../snippet/data', type.name)
  const historyDatas = fs
    .readdirSync(historyDataPath)
    .filter(file => /\.json/.test(file))
  historyDatas.forEach(project => {
    const data = require(`${historyDataPath}/${project}`)
    if (project === nowProjectJson) {
      thisSnippetJson = merge(thisSnippetJson || {}, data)
    }
    if (data) {
      allSnippetJson = merge(allSnippetJson || {}, data)
    }
  })
})

const origin = require(SNIPPET_OUTPUT_PATH)

for (let key of Object.keys(origin)) {
  if (!allSnippetJson[key]) ALLSNIPPETS[key] = origin[key]
}

for (let [key, value] of Object.entries(thisSnippetJson)) {
  ALLSNIPPETS[key] = value
}

fs.writeFileSync(SNIPPET_OUTPUT_PATH, `${JSON.stringify(ALLSNIPPETS, null, 2)}`)

console.log(chalk.yellow(`>> 项目补全选择完成: [${PROJECT_BASE_PATH}] \n`))