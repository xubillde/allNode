


import omit from 'lodash/omit'
import findIndex from 'lodash/findIndex'
import upperFirst from 'lodash/upperFirst'
import PropTypes from 'prop-types'
import { fetchData } from 'actions'
import { connect } from 'react-redux'

import {
  withProps,
  lifecycle,
  mapProps,
  compose,
  setPropTypes,
  withState,
  withPropsOnChange
} from 'recompose'

const ReleaseUnUseProps = compose(
  mapProps((props) => omit(props, ['apiStore', 'apiDispatchMap', 'dispatch', 'setApiDispatchMap', 'setApiStore']))
)

// 运算保存store数据
const StoreReact = compose(
  lifecycle({
    componentWillReceiveProps({
      apiStore,
      apiStoreState,
      setApiStoreState,
      apiDispatchMap, // 调用过的队列
      setApiDispatchMap
    }) {
      const oldApiStore = this.props.apiStore
      Object.keys(apiDispatchMap).forEach(dpApi => {
        const nextData = apiStore[dpApi]
        const oldData = oldApiStore[dpApi]
        const successCount = nextData.count.success
        const failureCount = nextData.count.failure
        if (!nextData.state && oldData.state) { // 抓取结束
          if (successCount && successCount > oldData.count.success) {
            setApiStoreState({
              ...apiStoreState,
              [dpApi]: {
                ...apiStoreState[dpApi],
                state: false,
                lastDispatchResult: 'success'
              }
            })
          }
          if (failureCount && failureCount > oldData.count.failure) {
            setApiStoreState({
              ...apiStoreState,
              [dpApi]: {
                ...apiStoreState[dpApi],
                state: false,
                lastDispatchResult: 'failure'
              }
            })
          }
          setApiDispatchMap(omit(apiDispatchMap, [dpApi]))
        }
      })
    }
  }),
  withProps(({ apiStoreState, dispatch, setApiStoreState, apiDispatchMap, setApiDispatchMap }) => {
    let apiDispatch = {}
    Object.keys(apiStoreState).forEach(api => {
      apiDispatch[api] = (payload) => {
        if (!apiStoreState[api]) throw Error(`${key} 未找到调用方法！`)
        if (apiStoreState[api] && !apiStoreState[api].state) {
          dispatch(fetchData({
            key: api,
            payload
          }))
          setApiDispatchMap({ ...apiDispatchMap, [api]: true })
        }
      }
    })
    return {
      apiDispatch,
      confirmLastDispatch: (key) => {
        if (apiStoreState[key]) {
          setApiStoreState({
            ...apiStoreState,
            [key]: {
              ...apiStoreState[key],
              lastDispatchResult: null
            }
          })
        }
      }
    }
  })
)

// 传入apiList: [fetchX, fetchY]
// 提供 apiStore: { fetchX: { count, state, lastDispatchResult, response } }}
// 提供 apiDispatch: { fetchX: () => { ... } }
// state 操作 { confirmLastFetch: () => } 

const WithApiStore = (comp, apiList) => {
  if (!apiList || !apiList.length) {
    console.log('不存在apiList, 请传入api列表 —— WithApiStore(comp, apiList)')
    return comp
  }
  return compose(
    connect(
      (state) => {
        let apiStore = {}
        apiList.forEach(api => {
          const selector = require(`../../selectors/list/${api}.js`)
          if (!selector) throw Error(`[selector] 不存在该api：${api}，请确认!`)
          const slResponse = selector[`select${upperFirst(api)}Res`]
          const slCount = selector[`select${upperFirst(api)}Count`]
          const slState = selector[`select${upperFirst(api)}State`]
          apiStore[api] = {
            count: slCount()(state),
            state: slState()(state) || false,
            response: slResponse()(state),
            lastDispatchResult: null // 'success' 'failure'
          }
        })
        return { apiStore }
      }
    ),
    withState('apiStoreState', 'setApiStoreState', ({ apiStore, serverDispath }) => {
      // fix 在服务端调用的api无法正确的更新状态
      if (!(serverDispath && serverDispath.length)) return apiStore
      serverDispath.forEach(serverDispatch => {
        apiStore[serverDispatch].state = false
      })
      return apiStore
    }),
    withState('apiDispatchMap', 'setApiDispatchMap', {}),
    setPropTypes({
      dispatch: PropTypes.func.isRequired,
    })
  )(StoreReact(ReleaseUnUseProps(comp)))
}





export default WithApiStore