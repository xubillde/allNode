import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import { pure, compose, setDisplayName } from 'recompose'

import { cardStyle } from 'constants/style.js'
import { MENU_KEYS } from 'constants/menu.js'
import MenuControlLayout from 'layouts/MenuControlLayout'

import { BAR_CHART_KEYS, BAR_CHART_XY, TABLE_RENDER_MAP } from './config.js'

import withSort from 'hoc/withSort'
import Button from 'antd/lib/button'
import BarGraph from 'components/BarGraph/index.js'
import GeneralTable from 'components/GeneralTable/index.js'
import SortController from 'components/SortController'


import {
  Legend,
  Tooltip,
  CartesianGrid
} from 'recharts'


const DynamicFlowAnalysis = dynamic({
  ssr: false,
  modules: (props) => {
    const components = {
      FlowAnalysis: import('components/FlowAnalysis/index.js')
    }
    return components
  },
  render: (props, { FlowAnalysis }) => (
    <FlowAnalysis {...props} />
  ),
  loading: () => <p>自定义loading</p>
})

const RouterListContainer = ({
  list,
  linkList,
  routerNodes,
  tableColumns
}) =>
<MenuControlLayout defaultSelectedKeys={[MENU_KEYS.router]}>
  <div className="RouterListContainer">
    <Head>
      <style dangerouslySetInnerHTML={{ __html: require('./index.scss') }} />
      <script src="https://gw.alipayobjects.com/as/g/datavis/g6/1.1.6/index.js"></script>
    </Head>
    <div style={cardStyle} >
      <GeneralTable
        rowKey={'id'}
        data={list}
        pagination={{ simple: true }}
        columns={addRender(tableColumns)}
      />
      <DynamicFlowAnalysis
        nodes={routerNodes}
        edges={linkList}
      />
    </div>
  </div>
</MenuControlLayout>

export default compose(
  setDisplayName('RouterListContainer'),
  pure
)(RouterListContainer)


function addRender(tableColumns) {
  return tableColumns.map(col => {
    if (TABLE_RENDER_MAP[col.key]) col.render = TABLE_RENDER_MAP[col.key]
    return col
  })
}