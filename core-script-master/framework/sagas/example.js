
import { delay } from 'redux-saga'
import es6promise from 'es6-promise'
import { all, call, put, take, takeLatest } from 'redux-saga/effects'

// 引入的事件
import { failure, loadDataSuccess, tickClock, addCount } from '../actions'
import * as actionTypes from 'actions/actionTypes'

// 如果需要直接调用请求需引入
import 'isomorphic-unfetch'

// all-api
import * as apiSaga from './list'
import { apiKeys } from 'api/_apiMap'

es6promise.polyfill()

// 也可以拆分成子文件

// saga示例1
function * runClockSaga () {
  yield take(actionTypes.START_CLOCK)
  while (true) {
    yield put(tickClock(false))
    yield call(delay, 800)
  }
}


// saga示例2
function * addCountSaga () {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users')
    const data = yield res.json()
    yield put(loadDataSuccess(data))
  } catch (err) {
    yield put(failure(err))
  }
}

function * rootSaga () {
  const rootSaga = [
    // 插入saga方法
    call(runClockSaga),
    takeLatest(actionTypes.ADD, addCountSaga)
  ]
  apiKeys.forEach(apiKey => {
    if (apiSaga && apiSaga[key]) {
      // actionType不要修改，要和actions/api下的三种actionType保持一致
      rootSaga.push(takeLatest(`${apiKey}_REQUEST`, apiSaga[`${apiKey}`]))
    }
  })
  yield all(rootSaga)
}

export default rootSaga