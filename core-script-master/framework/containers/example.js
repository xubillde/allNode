
// 骨架一个带排序的项目列表一个带筛选器的柱状图
import React from 'react'
import PropTypes from 'prop-types'

// 组件容器中引入的模块非常多，可能包括
// 固定常量 e.g. import { cardStyle } from 'constants/style.js'
// next 模块 e.g. import dynamic from 'next/dynamic' 使用参考 .docs/dynamic.js
// antd-UI 模块 e.g. import Button from 'antd/lib/button'
// recompose 模块 e.g. import { pure, compose, setDisplayName } from 'recompose'
// layout 布局 e.g. import MenuControlLayout from 'layouts/MenuControlLayout'
// hoc 高阶组件 e.g. import withSort from 'hoc/withSort'
// components 组件 e.g. import GeneralTable from 'components/GeneralTable/index.js'
// 第三方组件模块 e.g.  import { Legend } from 'recharts' / import NOSSR from 'react-no-ssr'

import dynamic from 'next/dynamic'

import { cardStyle } from 'constants/style.js'

import { pure, compose, setDisplayName } from 'recompose'

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



// 柱状图组件
const DynamicBarChart = dynamic({
  ssr: false,
  modules: (props) => {
    const components = {
      BarGraph: import('components/BarGraph/index.js')
    }
    return components
  },
  render: (props, { BarGraph }) => (
    <BarGraph
      style={{ width: '80%', height: 400 }}
      data={props.data}
      axis={BAR_CHART_XY}
      barKeys={BAR_CHART_KEYS}
      extra={[
        <CartesianGrid strokeDasharray="3 3" key="CartesianGrid" />,
        <Tooltip key="Tooltip" />,
        <Legend key="Legend" />
      ]}
    />
  ),
  loading: () => <p>自定义loading</p>
})

// 排序器组件
const orders = [
  { key: 'ascending', value: '升序' },
  { key: 'default', value: '默认' },
  { key: 'descending', value: '降序' },
]
const SortControllerC = withSort(SortController, orders, 'default')



const ProjectListContainer = ({
  list,
  tableColumns
}) =>
  <div className="ProjectListContainer">
    <style dangerouslySetInnerHTML={{ __html: require('./index.scss') }} />
    <div style={cardStyle}>
      <h1 className="project-list" style={{ marginBottom: 10 }}>项目列表</h1>
      <GeneralTable
        rowKey={'id'}
        data={list}
        pagination={{ simple: true }}
        columns={addRender(tableColumns)}
      />
    </div>
    <div style={cardStyle}>
      <h1 className="project-list" style={{ marginBottom: 10 }}>项目详情</h1>
      <DynamicBarChart data={list} />
    </div>
    <SortControllerC />
  </div>

export default compose(
  setDisplayName('ProjectListContainer'),
  pure
)(ProjectListContainer)


function addRender(tableColumns) {
  return tableColumns.map(col => {
    if (TABLE_RENDER_MAP[col.key]) col.render = TABLE_RENDER_MAP[col.key]
    return col
  })
}