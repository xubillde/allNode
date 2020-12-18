
// 路由标题相关数据： 重要程度 入口数 出口数 组件数 bug数一个组件列表一个事件列表局部路由关联图
import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import NOSSR from 'react-no-ssr'
import FlipBook from 'components/FlipBook/index.js'

import {
  // nest,
  compose,
  setPropTypes,
  setDisplayName
} from 'recompose'

// const DynamicBook = dynamic({
//   ssr: false,
//   modules: (props) => {
//     const components = {
//       FlipBook: import('components/FlipBook/index.js')
//     }
//     return components
//   },
//   render: (props, { FlipBook }) => (
//     <FlipBook {...props} />
//   ),
//   loading: () => <p>自定义loading</p>
// })


const BookDemoContainer = (props) => {
  return (
    <div className="BookDemoContainer">
      <style dangerouslySetInnerHTML={{ __html: require('./index.scss') }} />
      <NOSSR>
        <FlipBook />
      </NOSSR>
    </div>
  )
}



export default compose(
  setDisplayName('BookDemoContainer'),
  setPropTypes({
    title: PropTypes.string,
  })
)(BookDemoContainer)
