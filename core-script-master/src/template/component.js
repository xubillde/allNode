
import Head from './head'
import Container from './common/react/container'

export default (basePath, key) => {
  return (
`
${Head({ basePath, key })}
${Container({ key })}
`)
}



