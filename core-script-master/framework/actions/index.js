

import * as apiAction from './list'
// 引入定义的事件类型，注意在这使用的类型在actionType.js中存在
import * as actionTypes from 'actions/actionTypes'


// ------------------------------------
// 几种常见的事件方法示例：
// ------------------------------------

// 普通事件触发
export const addCount = () => ({ type: actionTypes.ADD })

// 带有参数传递的事件触发
export const setClock = (light, ts) => ({ type: actionTypes.TICK, light, ts })

// 带有参数传递的组合事件触发 —— 该事件触发其他事件
export const serverRenderClock = isServer => dispatch => dispatch(setClock(!isServer, Date.now()))

// 组合触发示例2
export const startClock = () => dispatch => setInterval(() => dispatch(setClock(true, Date.now())), 800)


// ------------------------------------
// 快速api系统必须的事件触发，[!请不要更改]
// ------------------------------------

export const loadData = () => ({ type: actionTypes.LOAD_DATA })
export const loadDataSuccess = data => ({ data, type: actionTypes.LOAD_DATA_SUCCESS })
// 抽象封装所有api请求事件
export const fetchData = ({ key, payload }) => dispatch => {
  if (!(apiAction && apiAction[key])) {
    throw Error(`没有actionList 或者 action(key:${key})不存在, 请检查actions/list`)
  }
  return dispatch(apiAction[key]({ payload }))
}