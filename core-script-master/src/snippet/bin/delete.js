

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')


export default (type, outputPath, historySnippetJson) => {
  if (!historySnippetJson) {
    console.log(chalk.grey(`>> ${type} 不存在历史数据, 没有任何更新`))
    return;
  }
  const origin = require(outputPath)
  let ALLSNIPPETS = {}
  for (let key of Object.keys(origin)) {
    if (!historySnippetJson[key]) ALLSNIPPETS[key] = origin[key]
  }
  fs.writeFileSync(outputPath, `${JSON.stringify(ALLSNIPPETS, null, 2)}`)
  console.log(chalk.yellow(`\n>> [${type}] 补全更新完成: ${outputPath}\n`))
}
