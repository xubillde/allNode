import { apiKeys } from 'api/_apiMap'
import { combineReducers } from 'redux'
import createApiReducer, { initialState as apiState } from './api'

import count, { initialState as countState } from './count'
// 添加、删除自定义reducer后需要在这添加、修改

// exist-none-api-state
const initialState = {
  count: countState
}

// exist-none-api-reducer
const combinedReducers = {
  count
}

apiKeys.forEach(key => {
  initialState[key] = apiState
  combinedReducers[key] = createApiReducer(key)
})

export const combinedInitialState = initialState

export default combineReducers(combinedReducers)

