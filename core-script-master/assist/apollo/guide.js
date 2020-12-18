



// react-apollo 全部组件 常用：gql, graphql, compose(项目已有recompose) 其它的均是项目配置使用

import {
  // [查询语句]
  gql, // http://dev.apollodata.com/react/api.html#gql

  // An ApolloClient instance is the core of the API for Apollo
  ApolloClient, // http://dev.apollodata.com/react/api.html#ApolloClient

  // creates a simple HTTP network interface using the provided configuration object 
  createNetworkInterface, // http://dev.apollodata.com/react/api.html#createNetworkInterface

  // works the same as the react-redux <Provider/> component 
  // <ApolloProvider client={required} [store]><App /></ApolloProvider>
  ApolloProvider, // http://dev.apollodata.com/react/api.html#ApolloProvider

  // withApollo(component) enhancer which provides direct access to your ApolloClient instance
  // 将apolloClient 提供给组件
  withApollo, // http://dev.apollodata.com/react/api.html#withApollo

  // this function can create higher-order components that can execute queries and update reactively based on the data in your Apollo store
  // [使用指导] 
  graphql, // http://dev.apollodata.com/react/api-graphql.html#graphql

  // [组合方法] 也可以直接用recompose的
  compose // http://dev.apollodata.com/react/api-graphql.html#compose
  // export default compose(
  //   withApollo,
  //   graphql(`query { ... }`),
  //   graphql(`mutation { ... }`),
  //   connect(...),
  // )(MyComponent);

} from 'react-apollo'



