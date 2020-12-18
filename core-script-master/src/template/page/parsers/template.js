
import PropTypes from '../../common/react/propType'
import Basic from '../../common/basic'
import Recompose from '../../npm/recompose'

export default ({ basePath, page, parser, container }) => {
  return (
`
import ${container.key} from '${container.importPath}'

export default ${container.key}
`)
}





