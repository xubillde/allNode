

import React, { Component } from 'react'
import WithEnv from 'hoc/WithEnv'
import { fetchData } from 'actions'
import { withReduxSaga } from '../../store'
import MainLayout from 'layouts/MainLayout'
import ProjectListParser from 'parsers/Project/list.js'


const ProjectListPage = ({
  list,
  isServer,
  isMobile
}) => (
  <MainLayout isServer={isServer} isMobile={isMobile}>
    <ProjectListParser list={list} />
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

ProjectListPage.getInitialProps = (props) => {
  const list = [
    {
      id: 'next-boilertemplate',
      name: 'next-boilertemplate',
      description: '模板项目1',
      pages: 10,
      components: 40,
      events: 9,
      bugs: 110
    },
    {
      id: 'test2',
      name: 'test2',
      description: '模拟项目2',
      pages: 18,
      components: 30,
      events: 19,
      bugs: 150
    },
    {
      id: 'test3',
      name: 'test2',
      description: '模拟项目3',
      pages: 18,
      components: 30,
      events: 19,
      bugs: 150
    },
    {
      id: 'test4',
      name: 'test4',
      description: '模拟项目4',
      pages: 18,
      components: 30,
      events: 19,
      bugs: 150
    }
  ]
  // props.store.dispatch(fetchData({
  //   key: 'fetchGetComments',
  //   payload: {
  //     postId: 1, //  必填参数,
  //   }
  // }))
  // qingqiu liebiao 
  return {
    list,
    ...WithEnv(props)
  }
}

export default withReduxSaga(ProjectListPage)