
// $config working projects 配置需要管理的项目
const path = require('path')
const shell = require('shelljs')

import { PACKAGE_BASE_PATH } from '../src.config'

shell.exec(`code ${path.join(PACKAGE_BASE_PATH, 'src/project.config.js')}`)