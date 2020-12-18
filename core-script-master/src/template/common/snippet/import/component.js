export default ({ key, importPath, absolutPath }) => {

  return {
    str: `import ${key} from '${importPath}' // file:/${absolutPath}`,

    snippet: {

    }
  }
}