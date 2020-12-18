var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
const ncp = require('copy-paste')

import list from '../recompose'
import readlineSync from 'readline-sync'

// 展开recompose列表

// 选择想使用的并拿到剪切板

// 最后一个是打开官网

console.log(chalk.cyan('【recompose】相关函数：https://github.com/acdlite/recompose/blob/master/docs/API.md\n'))
list.forEach((data, index) => {
  console.log(chalk.magenta(`-> ${data.class} `))
  const children = data.children.sort((a, b) => (a.length - b.length))
  children.forEach((item, iindex) => {
    console.log(`  ${index + 1}${iindex + 1} ${item.key}${item.comment ? ' --- ' : ''}${chalk.grey(item.comment)}`)
  })
})
console.log('\n')

const choose = readlineSync.question('使用哪个函数: ')

const firstIndex = choose && choose[0] && parseInt(choose[0]) - 1
const childIndex = choose && choose[0] && parseInt(choose[1]) - 1

const target = list[firstIndex] && list[firstIndex].children[childIndex]
if (!target) {
  console.log(chalk.red('未输入或输入错误!'))
} else {
  const targetPath = path.join(__dirname, `../recompose/use/${target.key}.js`)
  if (fs.existsSync(targetPath)) {
    const generate = require(`../recompose/use/${target.key}`).default
    if (target.key === 'withState') {
      const stateKey = readlineSync.question('输入state的名称: ')
      const str = generate(stateKey)
      ncp.copy(str, function () {
        console.log(chalk.yellow('>>>>> 已复制到剪贴板！'))
      })
    } else {
      ncp.copy(generate, function () {
        console.log(chalk.yellow('>>>>> 已复制到剪贴板！'))
      })
    }
  } else {
    ncp.copy(target.key, function () {
      console.log(chalk.yellow('>>>>> 该方法暂无指导使用，已复制关键词'))
    })
  }
}
