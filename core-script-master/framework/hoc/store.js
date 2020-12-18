
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import withRedux from 'next-redux-wrapper'
import nextReduxSaga from 'next-redux-saga'

import rootSaga from 'sagas'
import reducer, { combinedInitialState as initialState } from 'reducers'
import { openReduxActionLog } from '../config.js'

import WithGraphQl from './WithGraphQl'
import { ApolloProvider } from 'react-apollo';
import initClient from './WithGraphQl/initClient'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore (state = initialState) {
  // https://egghead.io/lessons/javascript-redux-applying-redux-middleware
  // 运用中间件处理state变化中间的额外工作，包括

  const ApolloClient = initClient()
  const middlewares = [
    thunkMiddleware, // https://github.com/gaearon/redux-thunk 主要使用其事件组合触发功能 
    sagaMiddleware, // https://github.com/redux-saga/redux-saga 主要使用其处理副作用功能，如触发事件后调用api
    ApolloClient.middleware() // http://dev.apollodata.com/react/redux.html apollo middware
  ]
  if (openReduxActionLog) middlewares.push(createLogger()) // 事件处理logger
  const store = createStore(
    reducer,
    state,
    compose(
      applyMiddleware(...middlewares),
      // If you are using the devToolsExtension, you can add it here also
      (process.broswer && typeof  window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
  )
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}

// with-redux-redux-saga 的封装
export function withReduxSaga (BaseComponent) {
  return withRedux(configureStore)(nextReduxSaga(BaseComponent))
}

// width-graphql
export function withGraphQlReduxSaga (BaseComponent) {
  return WithGraphQl(withReduxSaga(BaseComponent))
}