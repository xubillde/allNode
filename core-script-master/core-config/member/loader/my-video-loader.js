function loader(componentObj, component) {
  return {
    prefix: componentObj.snippetPrefix,
    body: [
      `<video src='${componentObj.root}${componentObj.importPath}' autoplay />`
    ],
    description: `${componentObj.root} -> ${componentObj.description}`
  }
}

module.exports = loader