
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

import createGraphQl from '../../template/graphql/create'

export default (basePath) => {
  const config = require(path.join(basePath, '.core-config/graphql/config'))
  if (config.debug) {
    console.log(chalk.yellow('>> 使用 [mockData] 导出'))
    generateGraphql(config.mockData, config, basePath)
  } else {
    fetch(config.src)
    .then( r => r ) // .json() )
    .then( data => {
      if (data && data.dataStore) {
        console.log(chalk.yellow('>> 请求数据正确，开始导出 \n'));
        console.log(data);
        const queries = data.dataStore.queriesById
        generateGraphql(queries, config, basePath)
      } else {
        throw Error('请求数据出错，请检查')
      }
    })
  }
}



function generateGraphql(data, config, basePath) {

  for (let value of Object.values(data)) {
  
    let type = value.operationType
  
    if (!type) type = 'query'
  
    const content = value.query.split(`${type} `)
    
    const comment = content[0] && content[0].replace(/\s/g, '') || ''
  
    const queryText = content[1]
  
    const name = value.query && value.query.match(/\s{1}(.+?)(\{|\(){1}/g)[0].replace(/(\s|\{|\()/g, '')
  
    const gql = createGraphQl({
      comment,
      query: queryText,
      name
    })
  
    const filePath = path.join(basePath, config.outputPath, `${type}/${name}.js`)
  
    if (fs.pathExistsSync(filePath)) {
      console.log(chalk.red(`${filePath}已经存在，如要更新请先删除\n`))
    } else {
      fs.ensureFileSync(filePath)
      fs.writeFileSync(filePath, gql)
    }
  
  }
  
  console.log(chalk.yellow('>>>>>生成完毕'))
}