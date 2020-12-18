


import { gql } from 'react-apollo'


const allReviews = gql`
query allReviews {
  allReviews(orderBy: createdAt_DESC) {
    id
    slug
    rating
    createdAt
    title
  }
}`

export default allReviews