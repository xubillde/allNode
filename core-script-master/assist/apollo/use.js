import {
  gql,
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
  withApollo,
  graphql
} from 'react-apollo'


import { gql, graphql } from 'react-apollo'


// 登录状态改变后，要重置store数据
// http://dev.apollodata.com/react/auth.html#login-logout

client.resetStore()

