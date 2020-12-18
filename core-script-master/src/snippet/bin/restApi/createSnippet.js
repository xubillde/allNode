const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const capitalize = require('lodash/capitalize')
const upperFirst = require('lodash/upperFirst')

// apiList: [
//   {
//     key: '',
//     parameters: [],
//     shortcut: ''
//   }
// ]

// parameters: [
//   {
//     required: true,
//     key: xx,
//     type: xx,
//     description: 1,
//     options: [1, 2, 3]
//   }
// ]

// 补全表，可以经常来看看，或者出一个文档

export default function createSnippet(list, projectPath) {
  const apiList = apiListMap(list)
  const snippets = {
    "import dispatch fetchData": { // 这个快捷键就一条
      "prefix": "ipdpfd",
      "body": [
        `import { fetchData } from 'actions' // file://${projectPath}actions/index.js`
      ],
      "description": "import dispatch fetchData"
    }
  }
  apiList.forEach(api => {
    let snippetsBody = [].concat([
      "this.props.dispatch(fetchData({",
      `\tkey: '${api.key}',`,
      "\tpayload: {",
    ])
    snippetsBody = snippetsBody.concat(createApiParams(api.parameters, 2))
    snippetsBody = snippetsBody.concat([ "\t}", "}))" ])

    // add dispatch
    snippets[`dispatch ${api.key}`] = {
      "prefix": `dp${api.shortcut}`,
      "body": snippetsBody,
      "description": `dispatch ${api.key}`
    }

    snippets[`import selector ${api.key}`] = {
      "prefix": `ipsl${api.shortcut}`,
      "body": [
        `// file://${projectPath}selectors/list/${api.key}.js`,
        `import {`,
        `\t${api.key}Success,`,
        `\tselect${upperFirst(api.key)}Res,`, 
        `\tselect${CFL(api.key)}State`,
        `} from 'selectors/list/${api.key}.js'`
      ],
      "description": `import select ${api.key}`
    }
    // add fetch whether success
    snippets[`${api.key} whether fetch Success`] = {
      "prefix": `sls${api.shortcut}`,
      "body": [
        `${api.key}Success(props.store.getState())`
      ],
      "description": `${api.key} whether fetch Success`
    }
  })
  return snippets
}


function createApiParams(params, indent) {
  let str = []
  params.forEach(param => { str.push(`${createApiParam(param, indent)},`) })
  return str
}

function createApiParam(param, indent) {
  if (param.require) {
    return `${createIndex(indent)}${param.key}: ${param.type || 'any'}, // ${param.descrition || ''} 必填参数`
  }
  return `${createIndex(indent)}${param.key}: ${param.type || 'any'}, // ${param.descrition || ''} 选填参数: ${param.options.join('/')}`
}

function createIndex(num) { return new Array(num).fill('\t').join('') }

function CFL(str) { return `${capitalize(str.charAt(0))}${str.slice(1)}` }

function apiListMap(list) {
  function mapParameters(params) {
    let result = []
    for (let key of Object.keys(params)) {
      const value = params[key]
      if (value) {
        result = result.concat(value.map(p => ({
          require: p.require,
          key: p.key,
          type: p.type || 'any',
          description: p.description || '',
          options: p.options || []
        })))
      }
    }
    return result
  }

  return list.map(api => ({
    key: api.key,
    shortcut: api.shortcut,
    parameters: mapParameters(api.parameters || {})
  }))
}
