
import { baseURL } from './client'
import 'isomorphic-unfetch'
import omit from 'lodash/omit'
import es6promise from 'es6-promise'
es6promise.polyfill()
// https://github.com/developit/unfetch#api

// restful请求的封装方法
export default (config = {}) => fetch(`${baseURL}${createFetchUrl(config)}`, {
  headers: { 'Content-Type': 'application/json' },
  ...omit(config, config.query ? ['url', 'query'] : ['url'])
}).then(r => {
  return r.json()
})

function createFetchUrl(config) {
  let url = config.url
  let hasQuery = false
  if (config.query) {
    url += `?`
    for (let [key, value] of Object.entries(config.query)) {
      if (value) {
        url += `${key}=${value}&`
        hasQuery = true
      }
    }
  }
  return hasQuery ? url.slice(0, url.length - 1) : url
}