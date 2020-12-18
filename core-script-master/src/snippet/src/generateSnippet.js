
const fs = require('fs-extra')
const chalk = require('chalk')

export default ({ outputPath, snippet, dataPath }) => {
  if (!fs.existsSync(outputPath)) throw Error(`输出路径不存在 ${outputPath}`)
  const origin = require(outputPath)
  fs.writeFileSync(outputPath, `${JSON.stringify(Object.assign(origin, snippet), null, 2)}`)
  
  console.log(chalk.yellow(`>> 补全更新完成: ${outputPath}\n`))

  let memberSnippetKeys = {}
  Object.keys(snippet).map(key => { memberSnippetKeys[key] = 1 })
  // 一个项目的对应的basePath对应一个memberSnippet
  fs.ensureFileSync(dataPath)
  fs.writeFileSync(dataPath, `${JSON.stringify(memberSnippetKeys, null, 2)}`)
}