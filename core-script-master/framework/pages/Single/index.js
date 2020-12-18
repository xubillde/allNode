import React from 'react'
import WithEnv from 'hoc/WithEnv'
import { fetchData } from 'actions'
import { gql, graphql } from 'react-apollo'
import { withGraphQlReduxSaga } from 'hoc/store.js'

// [引入布局] sinppet: iplo
import AppLayout from 'layouts/AppLayout' // file://Users/kunsam/web/order-pay-system/layouts/AppLayout/index.js

// [引入解析容器] sinppet: ippr
import SingleParser from 'parsers/Single' // file://Users/kunsam/web/order-pay-system/parsers/Single/index.js

// snippet help: file://Users/kunsam/web/order-pay-system/.assist/snippet.md [成员补全部分]

// [引入selectors】 snippet: ipsl{api.shortcut}r
// import { fetchGetPostSuccess } from 'selectors/list/fetchGetPost.js'

// [引入graphQl业务] sinppet: iphoc
// import WithAllReviews from 'hoc/WithAllReviews'

const SinglePage = ({
  // 在这取出 getInitialProps 中 return 的数据
  isServer,
  isMobile
}) => (
  <AppLayout isServer={isServer} isMobile={isMobile}>
    <SingleParser />
  </AppLayout>
)

// [props对象] file://Users/kunsam/web/order-pay-system/.docs/pages/getInitialProps.js
SinglePage.getInitialProps = (props) => {

  // [数据不存在则抓取] snippet: sls{api.shortcut} + dp{api.shortcut}
  // if (!fetchGetCommentsSuccess(props.store.getState())) {
  //   props.store.dispatch(fetchData({
  //     key: 'fetchGetComments',
  //     payload: {
  //       postId: 1, //  必填参数,
  //     }
  //   }))
  // }

  // 服务端调用的api要传入Key以正确的更新状态
  return {
    // serverDispath: ['fetchGetComments'],
    ...WithEnv(props)
  }
}

export default withReduxSaga(SinglePage) // 在这使用graphQl业务
