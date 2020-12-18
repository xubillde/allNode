
// react-vscode 组件解析器
// componentObj
// {
//   name: 'index.js',
//   type: 'file',
//   importName: '',
//   importPath: '',
//   shortcut: '1',
//   description: 'index.js',
//   key: '1',
//   snippetPrefix: 'xxx',
//   root: 'components/'
// }

function loader({ componentObj, component, filePath }) {
  let snippet = null
  if (component) {
    const name = component.displayName || componentObj.importName
    snippet = {
      prefix: componentObj.snippetPrefix,
      body: [`{/* file:/${filePath} */}\n<${name}`].concat(getBody(resolvePropType(component.propTypes))).concat(['/>']),
      description: `${componentObj.root} -> ${componentObj.description}`
    }
  }
  return snippet
} 

function getBody(propTypes) {
  const getRequireText = (prop) => {
    if (prop.compose) return ''
    return prop.require ? '必填' : '选填'
  }
  const body = propTypes.map(prop => (`  ${prop.key}={} // ${getRequireText(prop)} 类型：${prop.type}`))
  if (!body.length) body.push(`\t // 组件未定义propTypes`)
  return body
}


// 解析React组件的PropType
function resolvePropType(componentProptypes) {
  if (!componentProptypes) {
    return [{
      key: '未定义',
      type: '',
      require: false
    }]
  }
  return Object.keys(componentProptypes).map(key => {
    const resolved = resolveProperty(componentProptypes[key])
    return {
      key,
      type: resolved.type,
      require: resolved.require
    }
  })
  function resolveProperty(proptype) {
    const chalk = require('chalk')
    const PropTypes = require('prop-types')
    if (!PropTypes) {
      console.log(chalk.yellow(
        '----------------------------------------------------------\n',
        `请安装react proptypes - npm i prop-types --save \n`,
        '----------------------------------------------------------\n'
      ));
      return;
    }
    const _find = Object.keys(PropTypes).find(k => (PropTypes[k] === proptype))
    const _findRequired = Object.keys(PropTypes).find(k => (PropTypes[k].isRequired === proptype))
    if (!_find && !_findRequired) {
      return {
        require: false,
        type: '复合式接口（请查看组件接口定义）',
        compose: true,
      }
    }
    return {
      require: Boolean(!_find && _findRequired),
      type: _find || _findRequired
    }
  }
}

module.exports = loader