import { absolutePosition } from './preset/position'
import { flexboxAttr, flexboxContainerAttr, flexboxItemAttr } from './preset/flexbox'

import {
  lineVerticalAlign,
  verticalAlign,
  horizontalAlign,
  fullAlign
 } from './preset/align'

 import {
  ellipsis,
  fontAttr
 } from './preset/text'

 import {
  containerAttr
 } from './preset/container'


// 一张预设表

const presetMap = {
  basic: {
    宽高: (tab) => `${tab}width: 100%;\n${tab}height: 100%;`
  },
  position: {
    绝对定位: absolutePosition,
  },
  align: {
    行高居中: lineVerticalAlign,
    定位垂直居中: verticalAlign,
    定位水平居中: horizontalAlign,
    完全居中: fullAlign
  },
  text: {
    溢出省略: ellipsis,
    文字属性: fontAttr
  },
  container: {
    容器属性: containerAttr,
  },
  // 需要开发列表预设
  flexbox: {
    flexbox: flexboxAttr
  }

}

export default {
  宽高: presetMap.basic.宽高,
  绝对定位: presetMap.position.绝对定位,
  行高居中: presetMap.position.行高居中,
  垂直居中: presetMap.position.定位垂直居中,
  水平居中: presetMap.position.定位水平居中,
  完全居中: presetMap.position.完全居中,
  溢出省略: presetMap.text.溢出省略,
  文字属性: presetMap.text.文字属性,
  容器属性: presetMap.container.容器属性,
  flexbox: presetMap.flexbox.flexbox,
  详细盒子: presetMap.flexbox.详细盒子,
  盒子成员: presetMap.flexbox.盒子成员,
}