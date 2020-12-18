import { gql } from 'react-apollo'


const deleteMyFeed = gql`deleteMyFeed{
  deleteMyFeed(teacher_id: "ffeb6808-a744-4ea3-9c22-8a2315ca6388", feed_id: "62036715-f1d5-4fe5-b41b-1114334e98e9")
    { id
      deleted_at
    }
}
`

export default deleteMyFeed
