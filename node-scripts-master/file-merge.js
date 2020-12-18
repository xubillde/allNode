const fs = require('fs')

/**
 * 获取node命令行参数
 */
function getProcessArgs() {
  return process.argv.slice(2).reduce((pre, cur) => {
    const temp = cur.split('=')
    pre[temp[0]] = temp[1]
    return pre
  }, {})
}

/**
 * 递归获取传入目录下的指定类型的全部文件的目录列表
 * @param {string} rootDir
 * @param {string} includes
 * @returns {string[]}
 */
function getFileList(rootDir, includes, exclude) {
  const resultArr = []
  const fileReg = new RegExp(`\.(${includes})$`)
  const dirReg = new RegExp(`(${exclude})`)

  /**
   * 读取一个目录下的文件
   * 为空则返回，不为空则遍历返回值
   * 为目录则继续读取，为文件则记录路径
   */
  ;(function readDir(dir) {
    const filesArr = fs.readdirSync(dir)
    if (filesArr.length === 0) return
    else {
      filesArr.forEach((elem) => {
        const curPath = `${dir}/${elem}`
        if (fs.statSync(curPath).isDirectory()) {
          !dirReg.test(curPath) && readDir(curPath)
        } else {
          fileReg.test(curPath) && resultArr.push(curPath)
        }
      })
    }
  })(rootDir)

  return resultArr
}

/* 主流程 */
const argvs = getProcessArgs()
const output = argvs['--output']
const source = argvs['--source']
const includes = argvs['--includes']
const exclude = argvs['--exclude']

getFileList(source, includes, exclude).forEach((path) => {
  const content = fs.readFileSync(path)
  fs.appendFileSync(output, `/* ${path} */\n\n${content}\n\n`)
})
