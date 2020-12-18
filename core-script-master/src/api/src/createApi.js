
const path = require('path')
const toUpper = require('lodash/toUpper')

import createHead from '../../template/restApi/head'
import createApiFunction from '../../template/restApi/function'

export default function createApi(apiList) {
  return apiList.map(api => ({
    key: api.key,
    file: `${createHead(api)} ${createApiFunction(api)}`
  }))
}

