
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

import loggerList from '../utils/loggerList'
import getUI from '../xmind/ui/generateUi'

import { PROJECT_BASE_PATH } from '../src.config'

const userConfigPath = path.join(PROJECT_BASE_PATH, '.core-config/core.config.js')
if (!fs.existsSync(userConfigPath)) throw Error('请在项目根路径下配置.core-config/core.config.js 或使用 init-core')
const userConfig = require(userConfigPath)

const { xmind } = userConfig

console.log(chalk.yellow('>>>友情提示：执行命令的路径必须为项目的根路径，否则会存在路径错误\n'))


if (!xmind.ui.path) throw Error('请配置 xmind.ui.path ')

const sourcePath = path.join(PROJECT_BASE_PATH, xmind.ui.path)
const outputPath = path.join(PROJECT_BASE_PATH, xmind.ui.output || xmind.ui.path)

if (!fs.existsSync(sourcePath)) throw Error(`[${sourcePath}] 配置路径不存在，请确认xmind.ui.path`)

const uiFiles = fs.readdirSync(sourcePath).filter(f => /\.xmind/.test(f))

if (!uiFiles.length) console.log(chalk.red('不存在xmind文件，请确认！\n'))

// 得到app-dom树，生成一个对应dom树文件和一个对应css文件，  拆分react-component成组件，生成dom树和对应css文件
const apps = []

loggerList(uiFiles, '扫描到的xmind的文件')

const UIs = getUI(uiFiles, sourcePath)

// todo后期暴露创建元件方法，让这里直接创建出组件
const componentPath = path.join(PROJECT_BASE_PATH, 'components')

UIs.forEach(app => {
  const appPath = path.join(outputPath, app.name)
  if (fs.existsSync(appPath)) {
    console.log(chalk.yellow(`>> ${appPath}已存在，如要重新生成请删除该目录\n`))
  } else {
    fs.ensureDirSync(appPath)
    let imports = ''
    app.result.importComponents.forEach(com => {
      imports += `import ${app.name} from 'components/${app.name}'\n`
    })
    fs.writeFileSync(path.join(appPath, 'index.html'), imports + app.result.html)
    fs.writeFileSync(path.join(appPath, 'index.scss'), app.result.css)
  }
})

console.log(chalk.yellow(`>> 生成完毕\n`))
