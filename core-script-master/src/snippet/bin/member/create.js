

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

import getConfig, { getSnippetOutputPath } from '../../src/getConfig'
import { getFilesTree, joinFilesName } from '../../../utils/file'
import generateImportSnippet from '../../src/generateImportSnippet'
import generateUsageSnippet from '../../src/generateUsageSnippet'
import generateSnippet from '../../src/generateSnippet'


export default (basePath) => {

  const config = getConfig(basePath)

  const OUTPUT_PATH = getSnippetOutputPath(basePath)

  console.log(chalk.yellow(`>> [member] 开始导出补全，tips: 若原有补全中有相同的补全，将会被直接覆盖`))

  let ALLSNIPPETS = {}
  config.snippet.import.paths.forEach(member => {
    const joinedFiles = joinFilesName(getFilesTree(path.join(basePath, `./${member.path}`))).filter(j => /\.(js|jsx)$/.test(j.name))
    const snippets = generateImportSnippet(joinedFiles, config, member)
    if (snippets) {
      ALLSNIPPETS = Object.assign(ALLSNIPPETS, snippets.snippet)
    }
  })
  config.snippet.usage.paths.forEach(member => {
    const joinedFiles = joinFilesName(getFilesTree(path.join(basePath, `./${member.path}`)))
    const usage = generateUsageSnippet(joinedFiles, config, member)
    if (usage) {
      ALLSNIPPETS = Object.assign(ALLSNIPPETS, usage.snippet)
    }
  })
  

  generateSnippet({
    outputPath: OUTPUT_PATH,
    snippet: ALLSNIPPETS,
    dataPath: path.join(__dirname, '../../data/member', `${basePath.split('/').join('-')}.json`)
  })

}






