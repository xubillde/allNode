export default ({ comment, query, name }) =>
`
import { gql } from 'react-apollo'

${comment ? '// ' + comment : ''}
const ${name} = gql\`${query}\`

export default ${name}
`