// React基础依赖
import React from 'react'
import PropTypes from 'prop-types'

// 可能需要用的
import cx from 'classnames'

// recharts: http://recharts.org/#/zh-CN/api
import { BarChart } from 'recharts'

// antd组件 https://ant.design/docs/react/introduce
import message from 'antd/lib/message'

// next 相关
import Head from 'next/head'
import Link from 'next/link'
// .docs/dynamic.js 查看相关示例
import dynamic from 'next/dynamic'


// 使用lodash方法
import debounce from 'lodash/debounce'

// 使用recompose组合组件 https://github.com/acdlite/recompose
import {
  compose,
  withState,
  defaultProps,
  setDisplayName,
  setPropTypes,
  lifecycle,
  withStateHandlers
} from 'recompose'


const ScrollLoadingBar = ({
  // props, 包括数据和触发事件等
  color,
  percent
}) => (
  <div className="ScrollLoadingBar">
    <Head>
      <script src='/static/js/viewport.js'></script>
    </Head>
    <style dangerouslySetInnerHTML={{ __html: require('./index.scss') }} />
    {
      percent && percent > 3 && percent < 97 ?
        <div style={{ width: `${percent}%`, backgroundColor: color }} className="progress-bar" /> : null
    }
  </div>
)

export default compose(
  setDisplayName('ScrollLoadingBar'),
  defaultProps({ color: '#fff' }),
  withStateHandlers(
    ({ initial = 0 }) => ({ percent: initial }),
    {
      scrollChange: ({ percent }) => (value) => ({ percent: value })
    }
  ),
  lifecycle({
    componentDidMount() {
      function handleScroll() {
        const fullScrollHeight = document.body.clientHeight - window.innerHeight
        if (this._reactInternalInstance) {
          this.props.scrollChange(document.body.scrollTop * 100 / fullScrollHeight)
        }
      }
      window.addEventListener('scroll', debounce(handleScroll, 30).bind(this))
    }
  }),
  setPropTypes({
    // 一定要定义好组件的接口 https://facebook.github.io/react/docs/typechecking-with-proptypes.html
    // 示例：
    color: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      pages: PropTypes.number.isRequired,
      components: PropTypes.number.isRequired,
      events: PropTypes.number.isRequired,
      bugs: PropTypes.number.isRequired
    })).isRequired
  })
)(ScrollLoadingBar)