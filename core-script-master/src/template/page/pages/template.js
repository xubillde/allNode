
import path from 'path'
import Head from '../../head'
import Container from '../../common/react/container'


export default ({ basePath, key, page, parser, container }) => `
import WithMainApp from 'hoc/WithMainApp'
import WithGraphQlData from 'hoc/WithGraphQl'
import ${parser.key} from 'parsers/${key}'

const ${page.key} = WithMainApp(${parser.key})

// ${page.key}.getInitialProps = async (props) => {
//   return {}
// }

export default WithGraphQlData(${page.key})
`