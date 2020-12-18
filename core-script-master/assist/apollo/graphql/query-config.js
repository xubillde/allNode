// graphql(query, [config])(component)

/* ┌────────────────────────────────────────────────────────────────────────────┐  */
config = {

  // http://dev.apollodata.com/react/api-graphql.html#graphql-config-options
  options: {
    // 下方详情
  },

  // http://dev.apollodata.com/react/api-graphql.html#graphql-config-props
  // like mapProps from Recompose
  // most useful when you want to abstract away complex functions calls into a simple prop that you can pass down to your component
  props: {
    // 下方详情
  },

  // http://dev.apollodata.com/react/api-graphql.html#graphql-config-skip [有使用列子]
  // If config.skip is true then all of the React Apollo code will be skipped entirely.
  skip, // boolean | (props) => boolean  比如可用这个决定使用某个graphQl

  // 如 graphql(gql`mutation (...) { ... }`, { name: 'createTodo' }), 在组件中 props.createTodo 取到对应返回
  name,

  withRef,

  // http://dev.apollodata.com/react/api-graphql.html#graphql-config-alias
  alias
}
/*  └────────────────────────────────────────────────────────────────────────────┘ */


/* ┌────────────────────────────────────────────────────────────────────────────┐  */
// http://dev.apollodata.com/react/api-queries.html#graphql-query-options
options = (componentProps) => { // 或者直接对象 {}
   // hese variables should correspond with the variables that your query definition accepts
   return {

    variables: {},

    // http://dev.apollodata.com/react/api-queries.html#graphql-config-options-fetchPolicy
    fetchPolicy: 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only',

    pollInterval: 'number',

    notifyOnNetworkStatusChange, // Whether or not updates to the network status or network error should trigger re-rendering of your component.
    
   }

}
/*  └────────────────────────────────────────────────────────────────────────────┘ */



/* ┌────────────────────────────────────────────────────────────────────────────┐  */
props = {
  data: {

    loading,

    error,

    // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-networkStatus
    // 并不常用，一些feed流业务的可使用，
    networkStatus: {
      1: loading, // networkStatus === 1
      2: setVariables, // a query’s variables change and a network request was fired —— query return
      3: fetchMore, // fetchMore was called
      4: refetch, // refetch was called
      5: Unused,
      6: poll, // a polling query is currently in flight
      7: ready,
      8: error
    },

    // Apollo used to fetch data from your GraphQL endpoint
    variables,

    // Forces your component to refetch the query you defined in the graphql() function
    refetch: (variables) => {},

    // allows you to do pagination with your query component
    fetchMore: (options = {

      [query]: '自定义query' | 'query from your graphql()',

      [variables]: '自定义' | 'from graphql()',

      updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
        // example
        return {
          ...previousResult,
          // Add the new feed data to the end of the old feed data.
          feed: [...previousResult.feed, ...fetchMoreResult.feed],
        };
      }

    }) => {}, // returns a promise

    // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-subscribeToMore
    // 目前业务暂时不用，后期需要再去看
    // This function will set up a subscription, triggering updates whenever the server sends a subscription publication.
    subscribeToMore: (options) => {

    },

    // This function will set up an interval and send a fetch request every time that interval ellapses
    startPolling: (interval) => {},
    // componentDidMount() {
    //   // In this specific case you may want to use `options.pollInterval` instead.
    //   this.props.data.startPolling(1000);
    // }

    stopPolling: () => {},

    // This function allows you to update the data for your query outside of the context of any mutation, subscription, or fetch
    // This method will not update anything on the server 刷新后更新没有
    updateQuery: (
      updaterFn = (
        previousResult, // The first argument will be the data for your query that currently exists in the store
        { variables }
      ) => nextResult
    ) => {}

  }
}
/*  └────────────────────────────────────────────────────────────────────────────┘ */