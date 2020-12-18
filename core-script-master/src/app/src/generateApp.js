
var fs = require('fs-extra')
var path = require('path')
var chalk = require('chalk')
var upperFirst = require('lodash/upperFirst')
import getAppPath from './getAppPath'

const TEMPLATE_PATH = path.join(__dirname, '../../template')

export default (basePath, pagePath) => {
  const app = getAppPath(basePath, pagePath)

  const templateField = {
    page: 'page/pages/template.js',
    parser: 'page/parsers/template.js',
    container: 'page/containers/template.js',
    containerCss: 'common/css/template.js',
  }
  for (let [key, value] of Object.entries(app)) {
    if (templateField[key]) {
      const getFile = require(`${TEMPLATE_PATH}/${templateField[key]}`).default
      const file = getFile({ basePath, ...app })
      if (fs.existsSync(value.absolutePath)) {
        console.log(chalk.red(`>>> [${value.absolutePath}] 已存在，如要更新请删除`));
      } else {
        fs.ensureFileSync(value.absolutePath)
        fs.writeFile(value.absolutePath, file, () => {
          console.log(chalk.yellow(`>>> [${value.absolutePath}] 成功生成`));
        })
      }
    }
  }
}