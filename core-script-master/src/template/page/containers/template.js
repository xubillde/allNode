
import Head from '../../head'
import Container from '../../common/react/container'

export default ({ basePath, container, parser, page }) => {
  return (
`
${Head({ basePath, key: container.key })}
${Container({ key: container.key })}
`)
}



