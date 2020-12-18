import { gql } from 'react-apollo'


const likeUnlike = gql`likeUnlike{
  likeUnlike(teacher_id: "67982f14-2951-4533-a61b-c047b5e8d2d2", 
    feed_id: "0ab6ffb8-79c6-4715-b6fa-5c4841492ff8")
    { feed_id
      user_id
      deleted_at
    }
}
`

export default likeUnlike
