

import React, { Component } from 'react'

import Link from 'next/link'
import routerTable from 'constants/table/router.js'

// 柱状图条配置
export const BAR_CHART_KEYS = [
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
  [routerTable.columnKeys.index]: (text, record, index) => <span key={`index-${index}`}>{index}</span>,
  [routerTable.columnKeys.name]: (text, record) => (
    <Link prefetch key={`record-${record.id}`} href={{ pathname: '/Router/item', query: { id: record.id }}}>
      <a style={{ color: '#fff' }}>{text}</a>
    </Link>
  )
}