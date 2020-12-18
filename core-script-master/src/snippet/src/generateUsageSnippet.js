const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const find = require('lodash/find')
const toLower = require('lodash/toLower')
const escapeRegExp = require('lodash/escapeRegExp')
import { transform } from 'babel-core';
import { userInfo } from 'os';

export default function generateUsageSnippet(joinedFiles, config, member) {
  const removeFolder = joinedFiles.filter(file => file.type !== 'folder')
  let memberSnippets = {}
  let members = []

  removeFolder.forEach(file => {
    let tmpPath = ''
    let tempCompilePath = ''
    const fullName = `${file.importPath}${file.name === 'index.js' ? '/index.js' : ''}` 
    const findRuleMatchFile = find(config.snippet.usage.rules, rule => rule.test.test(file.name))
    if (findRuleMatchFile) { // 匹配正则表达式
      const findInExclude = find(findRuleMatchFile.exclude || [], ex => (
        ex.match(/(\d|\w){1}.+(\d|\w){1}$/).length && ex.match(/(\d|\w){1}.+(\d|\w){1}$/))[0] === fullName
      )
      if (!findInExclude) { // 不在exclude里的file
        const defaultLoaderPath = path.join(__dirname, `../loader/snippet/${config.editor}/${config.frontLang}/${findRuleMatchFile.use}.js`)
        // 先检测是否有用户自定义的该loader
        const userLoaderPath = path.join(config.projectPath, `.core-config/member/loader/${findRuleMatchFile.use}.js`)
        const loaderPath = fs.existsSync(userLoaderPath) ? userLoaderPath : (fs.existsSync(defaultLoaderPath) ? defaultLoaderPath : null)
        if (loaderPath) {
          const loader = require(loaderPath)
          if (typeof(loader) === 'function') { // 过滤掉空文件
            file.absolutePath = path.join(config.projectPath, `./${member.path}/${file.importPath}`)
            let component = { descrition: '该文件非Js文件，没有引入实体', default: null } 

            if (file.name.split('.') && file.name.split('.')[1] === 'js') { // js文件引入文件内容
              if (file.importPath) {
                if (file.name === 'index.js') file.absolutePath = path.join(file.absolutePath, './index.js')
                const tmpFile = fs.readFileSync(file.absolutePath, 'utf-8')
                                  .replace(/require\(.+\)/g, '{}')
                const compileCode = transform(tmpFile, {
                  presets: ["latest", "es2017", "stage-3", "react"]
                }).code
                // 要整个文件夹~
                const resolvePathCode = compileCode
                  .replace(/'components\//g, `'${path.join(config.projectPath, 'components')}/`)
                  .replace(/'layouts\//g, `'${path.join(config.projectPath, 'layouts')}/`)
                  .replace(/'hoc\//g, `'${path.join(config.projectPath, 'hoc')}/`)
                tmpPath = path.join(file.absolutePath, '../', `./tmp${Math.random().toFixed(5)}.js`)
                fs.writeFileSync(tmpPath, resolvePathCode)
                try {
                  component = require(tmpPath)
                } catch (e) {
                  // 先在暂时无法做全解析，比如一个文件中引入另外一个组件，另外一个组件也需要解析
                  console.log(chalk.red(`${file.absolutePath} \n 暂时无法解析 error: ${e} \n`))
                  // fs.writeFileSync(path.join(file.absolutePath, '../', `error.js`), resolvePathCode)
                  component = {}
                }
              }
            } else {
              // 放在static中的js文件往往没有用,所以除了js都使用
              if (!(/\.js$/.test(file.name))) {
                component.default = { displayName: file.importName }
              }
            }

            if (component && component.default) {
              file.root = `${member.path}/`
              // ------------------------------------
              // 补全的快捷键核心定义
              // ------------------------------------
              const componentName = component.default && component.default.displayName
              const matchDisplayname = componentName && componentName.match(/\(((\w)*?)\)/g) || ''
              const displayName = matchDisplayname && matchDisplayname.length && matchDisplayname[0].replace(/\(|\)/g, '')  || file.importName
              const memeberShortcut  = member.shortcut || toLower(`${member.path.slice(0, 1)}${member.path.slice(member.path.length - 1)}`)
              file.snippetPrefix = `${config.snippet.usage.modeShortcut || 'use'}${memeberShortcut}${file.shortcut}`
              const snippet = loader({
                componentObj: file,
                component: { displayName, propTypes: component.propTypes },
                filePath: file.absolutePath
              })
              if (snippet) {
                memberSnippets[`use ${member.path} ${displayName || file.importName}`] = snippet
                members.push(file)
                console.log(chalk.cyan(`得到了${member.path} -> ${fullName}的组件使用补全`))
              }
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
    }
    if(fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath)
  })
  return {
    snippet: memberSnippets,
    members: members
  }
}
