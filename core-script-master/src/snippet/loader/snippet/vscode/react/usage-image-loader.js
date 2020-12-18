

function loader({ componentObj, component, filePath }) {
  return {
    prefix: componentObj.snippetPrefix,
    body: [
      `<img src='${componentObj.root}${componentObj.importPath}' />`
    ],
    description: `${componentObj.root} -> ${componentObj.description}`
  }
}

module.exports = loader