import React from 'react'
import WithEnv from 'hoc/WithEnv'
import { fetchData } from 'actions'
import { withReduxSaga } from '../../store'
import MainLayout from 'layouts/MainLayout'
import ProjectItemParser from 'parsers/Project/item.js'
import {
  fetchGetCommentsSuccess
} from 'selectors/list/fetchGetComments.js'

const ProjectItemPage = ({
  item,
  isServer,
  isMobile
}) => (
  <MainLayout isServer={isServer} isMobile={isMobile}>
    <ProjectItemParser item={item} />
  </MainLayout>
)

// https://github.com/zeit/next.js#fetching-data-and-component-lifecycle
// pathname - path section of URL
// query - query string section of URL parsed as an object
// asPath - String of the actual path (including the query) shows in the browser
// req - HTTP request object (server only)
// res - HTTP response object (server only)
// jsonPageRes - Fetch Response object (client only)
// err - Error object if any error is encountered during the rendering

ProjectItemPage.getInitialProps = (props) => {
  const { query, store } = props
  // 根据id请求数据信息
  const itemId = query.id

  if (!fetchGetCommentsSuccess(store.getState())) {
    store.dispatch(fetchData({
      key: 'fetchGetComments',
      payload: {
        postId: 1, //  必填参数,
      }
    }))
  }

  const item = {
    id: 'next-boilertemplate',
    name: 'next-boilertemplate',
    description: '模板项目1',
    pages: 10,
    components: 40,
    events: 9,
    bugs: 110
  }

  return {
    item,
    ...WithEnv(props)
  }
}

export default withReduxSaga(ProjectItemPage)