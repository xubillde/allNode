

// $check core info [查看core信息]

var chalk = require('chalk')

import * as coreConfig from '../src.config'


console.log(chalk.yellow('>>> 【CORE INFO】\n'))
Object.entries(coreConfig).forEach(([key, value]) => {
  console.log(chalk.white(`${key} : ${value}\n`))
})

