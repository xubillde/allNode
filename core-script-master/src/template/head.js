
import PropTypes from './common/react/propType'
import Basic from './common/basic'
import Antd from './npm/antd'
import Next from './npm/next'
import Recompose from './npm/recompose'
import Sinppet from './common/snippet'

// ${PropTypes()}
// ${Sinppet()}
export default ({ basePath, key }) => {
  return (
`${Basic()}
${Antd()}
${Next()}
${Recompose()}
`)
}



