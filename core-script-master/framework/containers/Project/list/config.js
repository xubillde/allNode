

import React, { Component } from 'react'

import Link from 'next/link'
import projectTable from 'constants/table/project.js'

// 柱状图条配置
export const BAR_CHART_KEYS = [
  { key: 'pages', fill: '#3366CC' },
  { key: 'components', fill: '#8884d8' },
  { key: 'events', fill: '#336666' },
  { key: 'bugs', fill: '#CC0033' }
]

// 柱状图轴配置
export const BAR_CHART_XY = {
  // http://recharts.org/#/zh-CN/api/XAxis
  X: { dataKey: 'name'},
  Y: { }
}

// 表格列映射dom配置
export const TABLE_RENDER_MAP = {
  [projectTable.columnKeys.index]: (text, record, index) => <span key={`index-${index}`}>{index}</span>,
  [projectTable.columnKeys.name]: (text, record) => (
    <Link key={`record-${record.id}`} href={{ pathname: '/Project/item', query: { id: record.id }}}>
      <a style={{ color: '#fff' }}>{text}</a>
    </Link>
  )
}