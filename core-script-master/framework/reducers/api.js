
// 本文件不需要修改

// 所有api通用的初始状态
export const initialState = {
  response: {
    error: null // 如果response中error存在则说明抓取失败
  },
  count: {
    success: 0,
    failure: 0
  },
  fetching: false
}

// createApiReducer
export default (key) => {
  return (state = initialState, action) => {
    const { type, payload } = action
    // node脚本生成
    switch (type) {
      // actionType不要修改，要和actions/api下的三种actionType保持一致
      case `${key}_REQUEST`: {
        // 这里state已经经过select，不需要在用key去取了
        return Object.assign({}, state, {
          ...state,
          fetching: true
        })
      }
      case `${key}_REQUEST_SUCCESS`: {
        return Object.assign({}, state, {
          response: payload,
          count: {
            ...state.count,
            success: state.count.success + 1
          },
          fetching: false
        })
      }
      case `${key}_REQUEST_FAILURE`: {
        return Object.assign({}, state, {
          response: { error: payload },
          count: {
            ...state.count,
            failure: state.count.failure + 1
          },
          fetching: false
        })
      }
      default: {
        return state
      }
    }
  }
}

