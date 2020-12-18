
const path = require('path')
const upperFirst = require('lodash/upperFirst')

import cssPresets from '../../css'

import getXmindRootDom from '../src/getXmindRootDom'

import { getIntentStr } from '../../utils/indent'


let UIs = []
export default function getUI(uiFiles, sourcePath) {
  uiFiles.forEach(file => {
    const rootDom = getXmindRootDom(path.join(sourcePath, file))
    UIs.push({
      name: file.split('.')[0],
      type: 'page',
      result: generateUi(rootDom, 0)
    })
  })
  return UIs
}

export function generateUi(xmindDom, deep) {
  const {
    children,
    title,
    labels,
    htmlTag,
    className,
    isReact,
    componentName
  } = preProcessXmind(xmindDom)

  if (isReact) {
    if (children.length && children.length > 1) {
      throw Error('react.component下只能存在一个节点')
    }
    const reactApp = generateUi(children[0], 0)
    const compName = upperFirst(componentName)
    if (reactApp) {
      UIs.push({
        type: 'component',
        name: compName,
        result: reactApp
      })
    }
    return {
      isReact,
      componentName: compName,
      html: `${getIntentStr(deep)}<${upperFirst(compName)} />\n`,
    }
  }

  const tab = getIntentStr(deep)

  if (!children.length) { // 没有儿子了，直接返回
    return {
      html: `${tab}<${htmlTag}${className ? ` className="${className}"`: ''}></${htmlTag}>\n`,
      css: `${tab}&>${!className ? `${htmlTag}` : `.${className}`}{\n${resolveLabels(labels, getIntentStr(deep + 1))}\n${tab}}\n`,
      importComponents: []
    }
  }

  const thisHtml = getHtml(deep, { htmlTag, className })
  const thisCss = getCss(deep, { labels, className, htmlTag })
  
  let rhtml = ''
  let rcss =  ''
  let rimportComponents =  []

  children.forEach(data => {
    const childResult = generateUi(data, deep + 1)
    if (childResult && !childResult.isReact) {
      const { html, css, importComponents } = childResult
      rhtml += html
      rcss += css
      rimportComponents = importComponents
    } else {
      rhtml += childResult.html
      rimportComponents.push(childResult.componentName)
    }
  })

  return {
    html: thisHtml[0] + rhtml + thisHtml[1],
    css: thisCss[0] + rcss + thisCss[1],
    importComponents: rimportComponents
  }

}


function preProcessXmind(xmindDom) {
  const find = require('lodash/find')
  let { children, title, labels } = xmindDom
  const dom = title.split('.')
  let htmlTag = dom[0] // 特殊Tag: react
  let key = dom[1] // 样式名或者组件名

  if (htmlTag === 'react') {
    return {
      ...xmindDom,
      componentName: key,
      isReact: true
    }
  }
  // some-speical-deal
  // 处理特殊的html-tag
  switch (htmlTag) {
    case 'header': {
      labels = addLabel(labels, '容器属性')
      break;
    }
    case 'ul': {
      labels = addLabel(labels, 'flexbox')
      if (!children.length) {
        children.push({
          title: `li.${key.slice(0, key.length - 1)}`,
          labels: ['宽高'],
          children: []
        })
      }
      break;
    }
    case 'h1':
    case 'h2':
    case 'p':
    case 'span': {
      const label = labels[0]
      if (!(label && label.split('-') && find(label.split('-'), label => label === '文字属性'))) {
        labels = addLabel(labels, '文字属性')
      }
      break;
    }
  }
  
  if (key) {
    let splitKeys = key.split('-')
    const lastItem = splitKeys[splitKeys.length - 1]
    switch(lastItem) {
      case '$c': {
        splitKeys.pop()
        splitKeys.push('container')
        key = splitKeys.join('-')
        labels = addLabel(labels, '容器属性')
        break;
      }
      case 'text':
      case 'title': {
        labels = addLabel(labels, '文字属性')
        break;
      }
    }
  }
  return {
    children,
    title,
    labels,
    htmlTag,
    className: key
  }
}


function addLabel(labels, add) {
  if (labels.length) {
    labels[0] = labels[0] + `-${add}`
  } else {
    labels = [add]
  }
  return labels
}

function resolveLabels(labels, tabStr) {
  if (!labels.length) return ''
  const splitLabel = labels[0].split('-')
  let str = ''
  splitLabel.forEach(sl => {
    if (cssPresets[sl]) {
      str += `${cssPresets[sl](tabStr)}\n`
    }
  })
  return str
}


function getHtml(deep, { htmlTag, className }) {
  const tab = getIntentStr(deep)
  return [
    `${tab}<${htmlTag}${className ? ` className="${className}"`: ''}>\n`,
    `${tab}</${htmlTag}>\n`
  ]
}

function getCss(deep, { labels, className, htmlTag }) {
  const tab = getIntentStr(deep)
  return [
    `${tab}${!className ? `${!deep? '' : '>'}${htmlTag}` : `${!deep? '' : '&>'}.${className}`}{\n${resolveLabels(labels, getIntentStr(deep + 1))}\n`,
    `${tab}}\n`,
  ]
}