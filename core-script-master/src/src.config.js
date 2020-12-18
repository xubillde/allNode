




import path from 'path'
import shell from 'shelljs'

const packJson = require('../package.json')

  // 命令行执行路径
export const PACKAGE_VERSION = packJson.version


// file://Users/kunsam/Desktop/project/npm/core-script/src/project.config.js
export const PROJECT_BASE_PATH = '/Users/kunsam/web/order-pay-system' // test
// export const PROJECT_BASE_PATH = '/Users/kunsam/web/teacher-web-admin' // test

// export const PROJECT_BASE_PATH = shell.pwd().stdout

export const PACKAGE_BASE_PATH =  path.join(__dirname, '../')
