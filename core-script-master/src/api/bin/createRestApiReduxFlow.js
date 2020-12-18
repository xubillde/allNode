

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const fetch = require('isomorphic-unfetch')
const find = require('lodash/find')


import createApi from '../src/createApi'
import processApiList  from '../src/processApiList'
import createApiMap from '../../template/restApi/apiMap'
import createApiRedux from '../../template/restApi/apiRedux'


export default (basePath) => {

  const config = require(path.join(basePath, '.core-config/restApi/config'))

  if (config.debug) {
    console.log(chalk.yellow('>> 使用 [mockData] 导出'))
    createApiReduxFlow(config.mockData, config, basePath)
  } else {
    fetch(config.src).then(res => {
      res.json().then(data => {
        console.log(data,' sadsadasdasdasdsadasdas');
      })
  
      // if (data && data.length) {
      //   console.log(chalk.yellow('>> 请求数据正确，开始导出 \n'));
      //   console.log(data);
      //   createApiReduxFlow(data, config, basePath)
      // } else {
      //   throw Error('请求数据出错，请检查')
      // }
    })
  }
}


function createApiReduxFlow(apiData, config, basePath) {
  const apiList = processApiList(apiData, config.authField, basePath)

  generateApiMap(apiList, config.outputPath.apiMap, basePath)  // api/Map

  generateApiList(apiList, config.outputPath.api, basePath) // api/list

  generateApiRedux(apiList, config, basePath)

  console.log(chalk.yellow('>> 导出完毕\n'));
}


function generateApiList(apiList, outputPath, basePath) {
  const apiOutputDir = path.join(basePath, outputPath)
  const apiFiles = createApi(apiList)
  fs.ensureDirSync(apiOutputDir)
  // 删除不使用的文件
  const origin = fs.readdirSync(apiOutputDir)
  origin.forEach(fileName => {
    if (!find(apiFiles, api => `${api.key}.js` === fileName)) {
      // console.log(chalk.cyan(`[generateApiList] ${fileName}在api列表中不存在，将删除该文件`));
      fs.unlinkSync(path.join(apiOutputDir, fileName))
    }
  })
  apiFiles.forEach(api => {
    const filePath = path.join(apiOutputDir, `${api.key}.js`)
    if (fs.existsSync(filePath)) {
      // console.log(chalk.red(`[generateApiList] ${api.key}.js已存在，如要更新请删除该文件`));
    } else {
      ensureWrite(filePath, api.file)
    }
  })
  console.log(chalk.cyan(`已更新api调用列表: ${apiOutputDir}\n`));
}

function generateApiMap (apiList, outputPath, basePath) {
  const apiMapPath = path.join(basePath, outputPath)
  ensureWrite(apiMapPath, createApiMap(apiList))
  console.log(chalk.cyan(`已更新api-map: ${apiMapPath}\n`));
}

function generateApiRedux(apiList, config, basePath) {
  const actionListDir = path.join(basePath, config.outputPath.action)
  const sagaListDir = path.join(basePath, config.outputPath.saga)
  const selectorListDir = path.join(basePath, config.outputPath.selector)

  fs.ensureDirSync(actionListDir)
  fs.ensureDirSync(sagaListDir)
  fs.ensureDirSync(selectorListDir)

    // 删除不使用的文件
  const originActionList = fs.readdirSync(actionListDir)
  const originSagaList = fs.readdirSync(sagaListDir)
  const originSelectorList = fs.readdirSync(selectorListDir)

  originActionList.forEach(fileName => {
    if (!find(apiList, api => `${api.key}.js` === fileName)) {
      console.log(chalk.cyan(`[action/list] ${fileName}在api列表中不存在，将删除该文件`));
      fs.unlinkSync(path.join(actionListDir, fileName))
    }
  })
  originSagaList.forEach(fileName => {
    if (!find(apiList, api => `${api.key}.js` === fileName)) {
      console.log(chalk.cyan(`[saga/list] ${fileName}在api列表中不存在，将删除该文件`));
      fs.unlinkSync(path.join(sagaListDir, fileName))
    }
  })
  originSelectorList.forEach(fileName => {
    if (!find(apiList, api => `${api.key}.js` === fileName)) {
      console.log(chalk.cyan(`[selector/list] ${fileName}在api列表中不存在，将删除该文件`));
      fs.unlinkSync(path.join(selectorListDir, fileName))
    }
  })

  const apiReduxList = createApiRedux(apiList, config)
  apiReduxList.forEach(api => {
    const acion = api.action
    const saga = api.saga
    const selector = api.selector
    const actionfilePath = path.join(actionListDir, `${api.key}.js`)
    const sagafilePath = path.join(sagaListDir, `${api.key}.js`)
    const selectorfilePath = path.join(selectorListDir, `${api.key}.js`)
    if (fs.existsSync(actionfilePath)) {
      // console.log(chalk.red(`${actionfilePath}已存在，如要更新请删除该文件\n`));
    } else {
      ensureWrite(actionfilePath, acion)
    }

    if (fs.existsSync(sagafilePath)) {
      // console.log(chalk.red(`[saga] ${sagafilePath}已存在，如要更新请删除该文件\n`));
    } else {
      ensureWrite(sagafilePath, saga)
    }

    if (fs.existsSync(selectorfilePath)) {
      // console.log(chalk.red(`${selectorfilePath}已存在，如要更新请删除该文件\n`));
    } else {
      ensureWrite(selectorfilePath, selector)
    }

  })

  // 还要生成一个index.js文件
  const list = apiReduxList.map(api => api.key).sort((a, b) => (a.length - b.length))

  const indexFile = `${gs1(list)}\n` +
  `module.exports = {\n` +
  `${gs2(list)}};\n`

  const actionIndexFile = `${gs1(list, true)}\n` +
  `module.exports = {\n` +
  `${gs2(list)}};\n`


  ensureWrite(path.join(actionListDir, `index.js`), actionIndexFile)
  ensureWrite(path.join(sagaListDir, `index.js`), indexFile)
  ensureWrite(path.join(selectorListDir, `index.js`), indexFile)

  console.log(chalk.yellow(`>> 已更新api-redux相关文件\n`));

}


function gs1 (mergeArrays, isAction) {
  var arrayOutputStr = ''
  mergeArrays.forEach((d, index) => {
    arrayOutputStr += `import ${ isAction ? `{ ${d} }` :d } from './${d}'\n`
  })
  return arrayOutputStr
}

function gs2 (mergeArrays) {
  var arrayOutputStr = ''
  mergeArrays.forEach((d, index) => {
    if (index === mergeArrays.length - 1) {
      arrayOutputStr += `  ${d}\n`
      return
    }
    arrayOutputStr += `  ${d},\n`
  })
  return arrayOutputStr
}

function ensureWrite(fpath, file) {
  fs.ensureFileSync(fpath)
  fs.writeFile(fpath, file)
}