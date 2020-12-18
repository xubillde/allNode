const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const find = require('lodash/find')
const escapeRegExp = require('lodash/escapeRegExp')

export default function generateImportSnippet(joinedFiles, config, member) {
  const removeFolder = joinedFiles.filter(file => file.type !== 'folder')
  let memberSnippets = {}
  let members = []

  removeFolder.forEach(file => {
    let tmpPath = ''
    const fullName = `${file.importPath}${file.name === 'index.js' ? '/index.js' : ''}` 
    const findInExclude = find(member.exclude || [], ex => (
      ex.match(/(\d|\w){1}.+(\d|\w){1}$/).length && ex.match(/(\d|\w){1}.+(\d|\w){1}$/))[0] === fullName
    )
    if (!findInExclude) { // 不在exclude里的file
      const defaultLoaderPath = path.join(__dirname, `../loader/import/js/general-import-loader.js`)
      // 先检测是否有用户自定义的该loader
      const userLoaderPath = path.join(config.projectPath, `.core-config/member/loader/${member.use}.js`)
      if (member.use && !fs.existsSync(userLoaderPath)) {
        console.log(chalk.magenta(`${file.name}不存在自定义loader: .core-config/member/loader/${member.use}.js，将使用默认loader\n`));
      }
      const loaderPath = fs.existsSync(userLoaderPath) ? userLoaderPath : (fs.existsSync(defaultLoaderPath) ? defaultLoaderPath : null)
      if (loaderPath) {
        const loader = require(loaderPath)
        if (typeof(loader) === 'function') { // 过滤掉空文件
          file.absolutePath = path.join(config.projectPath, `./${member.path}/${file.importPath}`)
          if (file.name.split('.') && file.name.split('.')[1] === 'js') { // js文件引入文件内容
            if (file.importPath) {
              if (file.name === 'index.js') file.absolutePath = path.join(file.absolutePath, './index.js')
            }
          }
          file.root = `${member.path}/`
          // ------------------------------------
          // 补全的快捷键核心定义
          // ------------------------------------
          const memeberShortcut  = member.shortcut || toLower(`${member.path.slice(0, 1)}${member.path.slice(member.path.length - 1)}`)
          file.snippetPrefix = `${config.snippet.import.modeShortcut || 'ip'}${memeberShortcut}${file.shortcut}`
          const snippet = loader(file, file.absolutePath)
          if (snippet) {
            console.log(chalk.cyan(`得到了${member.path} -> ${fullName}的引入补全`))
            if (memberSnippets[`import ${member.path} ${file.importName}`]) {
              console.log(chalk.red(`${`import ${member.path} ${file.importName}`}的引入补全已存在，请注意`))
            }
            memberSnippets[`import ${member.path} ${file.importName}`] = snippet
            members.push(file)
          }
        } else {
          console.log(file.name, ':');
          console.log(chalk.red(`${fullName}对应的loader定义不正确: 请检查${loaderPath}, 确认使用module.exports = loader`));
        }
      } else {
        console.log(file.name, ':');
        console.log(chalk.red(`${fullName}不存在对应的loader: 请在 .core-config/member/loader/ 目录下添加对应的loader.js文件`));
      }
    }
    if(tmpPath) fs.unlinkSync(tmpPath)
  })
  return {
    snippet: memberSnippets,
    members: members
  }
}
