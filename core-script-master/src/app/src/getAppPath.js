var path = require('path')
var upperFirst = require('lodash/upperFirst')

export default (basePath, pagePath) => {
  let splitPaths = pagePath.split('/')
  
  const containerDirPaths = splitPaths
    .filter(p => p !== 'index.js' && p !== 'index.scss')
    .map(a => upperFirst(a)
    .replace(/\s/g, '')
    .replace('.js', ''))

  let lastPath = splitPaths.pop()
  let dirPaths = splitPaths.map(a => a.replace(/\s/g, '') && upperFirst(a))
  if (lastPath.indexOf('.') <= 0) { // 没有 .
    dirPaths.push(upperFirst(lastPath).replace(/\s/g, ''))
    lastPath = 'index.js'
  }
  const importPath = `${dirPaths.join('/')}${lastPath === 'index.js' ? '' : `/${lastPath}`}`
  const key = importPath.split('/').map(a => upperFirst(a).replace(/\s/g, '').replace('.js', '')).join('')
  const containerKey = containerDirPaths.join('') + 'Container'

  return {
    key,
    page: {
      key: `${key}Page`,
      importPath: `pages/${importPath}`,
      absolutePath: path.join(basePath, `pages/${importPath}${lastPath !== 'index.js' ? '' : `/${lastPath}`}`)
    },
    parser: {
      key: `${key}Parser`,
      importPath: `parsers/${importPath}`,
      absolutePath: path.join(basePath, `parsers/${importPath}${lastPath !== 'index.js' ? '' : `/${lastPath}`}`)
    },
    container: {
      key: containerKey,
      importPath:  `containers/${containerDirPaths.join('/')}`,
      absolutePath: path.join(basePath, `containers/${containerDirPaths.join('/')}/index.js`)
    },
    containerCss: {
      key: `${containerKey}Css`,
      importPath:  `containers/${containerDirPaths.join('/')}/index.scss`,
      absolutePath: path.join(basePath, `containers/${containerDirPaths.join('/')}/index.scss`)
    }
  }
}