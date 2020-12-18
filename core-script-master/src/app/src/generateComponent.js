var path = require('path')
var fs = require('fs-extra')
var chalk = require('chalk')
var upperFirst = require('lodash/upperFirst');

const TEMPLATE_PATH = '../../template'

export default function generateComponent(basePath, compPath, { type, name = 'template' }) {
  const splitPaths = compPath.split('/').map(a => a.replace(/\s/g, '') && upperFirst(a))
  compPath = splitPaths.join('/')
  let key = upperFirst(splitPaths.join(''))
  const importPath = `${type}/${compPath}`
  const dirPath = path.join(basePath, importPath)
  const absolutPath = path.join(dirPath, 'index.js')
  if (fs.pathExistsSync(absolutPath)) {
    console.log(chalk.red(`>>> [${dirPath}] 组件已存在，无法创建\n`))
  } else {
    const getTemplate = require(`${TEMPLATE_PATH}/component/${type}/${name}.js`).default
    fs.ensureDirSync(dirPath)
    if (type !== 'components') key += upperFirst(type)
    fs.writeFileSync(absolutPath, getTemplate(basePath, key))
    if (type === 'components') {
      const cssTemplate = require(`${TEMPLATE_PATH}/common/css/template.js`).default
      fs.writeFileSync(path.join(dirPath, 'index.scss'), cssTemplate({ basePath, containerCss: { key } }))
    }
    console.log(chalk.yellow(`>>> [${dirPath}] 生成成功!\n`))
  }
  return {
    key,
    importPath,
    absolutPath
  }
}