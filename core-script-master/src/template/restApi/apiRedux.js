
const capitalize = require('lodash/capitalize')


const SAGA_FILE_HEAD = ({ apiKey, apiPath, actionPath }) => `
import ${apiKey} from '${apiPath}/${apiKey}.js'
import * as apiAction from '${actionPath}/${apiKey}.js'
import { put } from 'redux-saga/effects'
`

const SELECTOR_FILE_HEAD = `
import { createSelector } from 'reselect'

`


const createApiAction = ({ key, desc }) =>
`
// ------------------------------------
// ${key} -- ${desc}
// ------------------------------------
export const ${key} = (payload = {}) => ({ type: '${key}_REQUEST', ...payload })
export const ${key}Success = (payload = {}) => ({ type: '${key}_REQUEST_SUCCESS', ...payload })
export const ${key}Failure = (payload = {}) => ({ type: '${key}_REQUEST_FAILURE', ...payload })
`


const createApiSaga = ({ key, desc }) =>
`
// ------------------------------------
// ${key} -- ${desc}
// ------------------------------------
export default function * ${key}Saga (action) {
  try {
    const res = yield ${key}(action.payload)
    yield put(apiAction['${key}Success']({ payload: res }))
  } catch (err) {
    console.log('${key} —— this err need to tested');
    yield put(apiAction['${key}Failure']({ payload: err }))
  }
}
`

const createApiSelector = ({ key, desc }) =>
`
// ------------------------------------
// ${key} -- ${desc}
// ------------------------------------
export const select${CFL(key)} = () => state => state.${key}
export const select${CFL(key)}Res = () => createSelector(
  select${CFL(key)}(),
  ${key} => ${key} && ${key}.response
)
export const select${CFL(key)}Count = () => createSelector(
  select${CFL(key)}(),
  ${key} => ${key} && ${key}.count
)
export const select${CFL(key)}State = () => createSelector(
  select${CFL(key)}(),
  ${key} => ${key} && ${key}.fetching
)
export const ${key}Success = state => (select${CFL(key)}()(state).count.success !== 0)
`

export default function createApiRedux(apiList, config) {
  return apiList.map(api => ({
    key: api.key,
    action: createApiAction({
      key: api.key,
      desc: api.description
    }),
    saga: SAGA_FILE_HEAD({
      apiKey: api.key,
      apiPath: config.outputPath.api,
      actionPath: config.outputPath.action
    }) + createApiSaga({
      key: api.key,
      desc: api.description
    }),
    selector: SELECTOR_FILE_HEAD + createApiSelector({
      key: api.key,
      desc: api.description
    })
  }))
}


function CFL(str) {
  return `${capitalize(str.charAt(0))}${str.slice(1)}`
}



