


const fs = require('fs')
const path = require('path')
const merge = require('lodash/merge')
const find = require('lodash/find')


export default function getConfig(basePath) {
  const defaultConfig = require('../default.config.js')
  let config = defaultConfig
  const userConfigPath = `${basePath}/.core-config/member/config.js`
  if (fs.existsSync(userConfigPath)) {
    const userConfig = require(userConfigPath)
    const userSnipperUsageRules =
      userConfig.snippet &&
      userConfig.snippet.usage && 
      userConfig.snippet.usage.rules 
    let mergedResult = []
    if (userSnipperUsageRules.length)   {
      const defaultRules = defaultConfig.snippet.usage.rules
      // const baseRules = defaultRules.length < userSnipperUsageRules.length ? userSnipperUsageRules : defaultRules
      // 先填充userConfig.snippet.usage.rules
      const srcWithoutUser = defaultRules.filter(drule => !find(userSnipperUsageRules, urule => urule.test.toString() === drule.test.toString()))
      mergedResult = userSnipperUsageRules.map(urule => {
        const findItInDefault = find(defaultRules, drule => drule.test.toString() === urule.test.toString())
        return findItInDefault ? Object.assign(findItInDefault, urule) : urule
      }).concat(srcWithoutUser)
    }
    config = merge(userConfig,  defaultConfig)
    config.snippet.usage.rules = mergedResult
    config.projectPath = basePath
  } else {
    console.log(`>>> 不存在用户自定义成员配置，将使用默认配置 ${userConfigPath}，或使用 core init-core 配置`);
  }
  return config
}

export function getSnippetOutputPath (basePath) {
  const CoreConfig = require(path.join(basePath, `.core-config/core.config`))
  return resolvePath(basePath, CoreConfig.snippet.outputPath)
}

function resolvePath(basePath, outputPath) {
  if (!outputPath) throw Error(`不存在补全输出路径，请定义${outputPath}`)
  return outputPath.charAt(0) === '/' ? outputPath : path.join(basePath, outputPath)
}