

// 基本使用
/* ┌────────────────────────────────────────────────────────────────────────────┐  */
function TodoApp({ data: { todos } }) {
  return (
    <ul>
      {todos.map(({ id, text }) => (
        <li key={id}>{text}</li>
      ))}
    </ul>
  );
}
export default graphql(gql`
  query TodoAppQuery {
    todos {
      id
      text
    }
  }
`)(TodoApp);
/*  └────────────────────────────────────────────────────────────────────────────┘ */



// 总结  基础查询（带参数），基础提交（带参数），组合查询（如feed流型）



/* ┌────────────────────────────────────────────────────────────────────────────┐  */
function PostList ({ data: { loading, error, allPosts, _allPostsMeta }, loadMorePosts }) {
  return <div>{...data}</div>
}

const allPosts = gql`
query allPosts($first: Int!, $skip: Int!) {
  allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
    id
    title
    votes
    url
    createdAt
  },
  _allPostsMeta {
    count
  }
}`

export default graphql(allPosts, {
  options: {
    variables: {
      skip: 0,
      first: 10
    }
  },
  props: ({ data }) => ({
    data,
    loadMorePosts: () => {
      return data.fetchMore({
        variables: {
          skip: data.allPosts.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            // Append the new posts results to the old one
            allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
          })
        }
      })
    }
  })
})(PostList)

/*  └────────────────────────────────────────────────────────────────────────────┘ */




function PostUpvoter ({ upvote, votes, id }) {
  return <button onClick={() => upvote(id, votes + 1)} />
}

const upvotePost = gql`
mutation updatePost($id: ID!, $votes: Int) {
  updatePost(id: $id, votes: $votes) {
    id
    __typename
    votes
  }
}
`

export default graphql(upvotePost, {
props: ({ ownProps, mutate }) => ({
  upvote: (id, votes) => mutate({
    variables: { id, votes },
    optimisticResponse: {
      __typename: 'Mutation',
      updatePost: {
        __typename: 'Post',
        id: ownProps.id,
        votes: ownProps.votes + 1
      }
    }
  })
})
})(PostUpvoter)


function Submit ({ createPost }) {
  function handleSubmit (e) {
    e.preventDefault()

    let title = e.target.elements.title.value
    let url = e.target.elements.url.value

    if (title === '' || url === '') {
      window.alert('Both fields are required.')
      return false
    }

    // prepend http if missing from url
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      url = `http://${url}`
    }

    createPost(title, url)

    // reset form
    e.target.elements.title.value = ''
    e.target.elements.url.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit</h1>
      <input placeholder='title' name='title' />
      <input placeholder='url' name='url' />
      <button type='submit'>Submit</button>
    </form>
  )
}

const createPost = gql`
  mutation createPost($title: String!, $url: String!) {
    createPost(title: $title, url: $url) {
      id
      title
      votes
      url
      createdAt
    }
  }
`

export default graphql(createPost, {
  props: ({ mutate }) => ({
    createPost: (title, url) => mutate({
      variables: { title, url },
      updateQueries: {
        allPosts: (previousResult, { mutationResult }) => {
          const newPost = mutationResult.data.createPost
          return Object.assign({}, previousResult, {
            // Append the new post
            allPosts: [newPost, ...previousResult.allPosts]
          })
        }
      }
    })
  })
})(Submit)
