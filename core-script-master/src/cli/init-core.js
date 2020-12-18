
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

import { PROJECT_BASE_PATH, PACKAGE_BASE_PATH } from '../src.config'


fs.copy(path.join(PACKAGE_BASE_PATH, 'core-config'), path.join(PROJECT_BASE_PATH, '.core-config'))
  .then(() => console.log(chalk.yellow(`>>> 初始化成功`)))
  .catch(err => console.error(err))