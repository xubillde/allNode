import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Head from 'next/head'
import { MENU_KEYS } from 'constants/menu.js'
import { compose, setDisplayName, pure, setPropTypes } from 'recompose'
// 或者其它layout
import MenuControlLayout from 'layouts/MenuControlLayout'


import Button from 'antd/lib/button'
import NumberAdd from 'components/NumberAdd'


const RouterContainer = ({
  item
}) =>
<MenuControlLayout defaultSelectedKeys={[MENU_KEYS.router]}>
  <div className="RouterItemContainer">
    <style dangerouslySetInnerHTML={{ __html: require('./index.scss') }} />
    {item.id}
    <Button type="primary">Primary</Button>
  </div>
</MenuControlLayout>


export default compose(
  setDisplayName('RouterContainer'),
  setPropTypes({
    title: PropTypes.string,
  }),
  pure
)(RouterContainer)