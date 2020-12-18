function loader(componentObj, filePath) {
  return {
    prefix: componentObj.snippetPrefix,
    body: [
      `import ${componentObj.importName || componentObj.root} from '${componentObj.root}${componentObj.importPath}' // file:/${filePath}`
    ],
    description: `${componentObj.root} -> ${componentObj.description}`
  }
}

module.exports = loader