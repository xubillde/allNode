

config = {

  // 等同 query-config 里的 options 不过有些注意点
  // http://dev.apollodata.com/react/api-mutations.html#graphql-mutation-options
  // The properties accepted in this options object may also be accepted by the props.mutate function.
  // Any options passed into the mutate function will take precedence over the options defined in the config object.
  options: (props) => { // 或者直接是 {}

    variables

    // Often when you mutate data it is fairly easy to predict what the response of the mutation will be before asking your server. 
    optimisticResponse
    // optimisticResponse: {
    //   createTodo: {
    //     id: -1, // A temporary id. The server decides the real id.
    //     text: newText,
    //     completed: false,
    //   },
    // },


    // http://dev.apollodata.com/react/api-mutations.html#graphql-mutation-options-update
    // This option allows you to update your store based on your mutation’s result
    update: (
      proxy, // writeQuery and writeFragment   readQuery and readFragment
      resp // response from your mutation ! either the optimistic response, or the actual response returned by your server
    ) => {}

    // update: (proxy, { data: { createTodo } }) => {
    //   const data = proxy.readQuery({ query });
    //   data.todos.push(createTodo);
    //   proxy.writeQuery({ query, data });
    // },

    // when you make a mutation you also want to update the data in your queries so that your users may see an up-to-date user interface
    // an array of strings or an array of objects
    refetchQueries: [
      'Comments', // you have a GraphQL query component with a query named Comments (the query may look like: query Comments { ... })
      {
        query: gql``,
        [variables]: '',
      },
      {
        query: gql`
          query ($id: ID!) {
            post(id: $id) {
              commentCount
            }
          }
        `,
        variables: {
          id: props.postID,
        },
      },
    ],

    // recommend using update

    updateQueries
  }

}

props = {

  // http://dev.apollodata.com/react/api-mutations.html#graphql-mutation-mutate
  // The mutate function will actually execute your mutation

  // The mutate function accepts the same options that config.options for mutations accepts,
  // so to make sure to read through the documentation for that to know what you can pass into the mutate function.
  mutate: (options) => {}



}