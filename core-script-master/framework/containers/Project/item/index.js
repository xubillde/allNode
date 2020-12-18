
// 骨架3个增加显示的数字（显示3个值）
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Head from 'next/head'
import { compose, setDisplayName, pure, setPropTypes } from 'recompose'

import { MENU_KEYS } from 'constants/menu.js'
import MenuControlLayout from 'layouts/MenuControlLayout'
import BreadCrumbLayout from 'layouts/BreadCrumbLayout'

import { Button } from 'antd'
import NumberAdd from 'components/NumberAdd'


const breadCrumbPaths = [
  {
    key: 1,
    name: '项目列表',
    
  },
  {
    key: 2,
    name: '项目列表选择',
    children: [
      { key: 1, name: '', id: 'xx' } // project-item 从store里拉
    ]
  },
  {
    key: 3,
    name: '查看项目选择',
    children: [
      { key: 1, name: '概览', render: () => {}},
      { key: 2, name: '路由', render: () => {}}
    ]
  },
  {
    key: 4,
    name: '路由列表选择',
    children: [
      { key: 1, name: '路由1', render: () => {}}
    ]
  }
]


const ProjectContainer = ({
  item
}) =>
  <MenuControlLayout defaultSelectedKeys={[MENU_KEYS.info]}>
    <BreadCrumbLayout path={1}>
      {item.id}
      <Button type="primary">Primary</Button>
    </BreadCrumbLayout>
  </MenuControlLayout>


export default compose(
  setDisplayName('ProjectContainer'),
  setPropTypes({
    title: PropTypes.string,
  }),
  pure
)(ProjectContainer)
