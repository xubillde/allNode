

const toUpper = require('lodash/toUpper')
import createApiBody from './bodyPayload'

const Head = (api) => `
// ------------------------------------
// ${api.key} -- ${api.description}
// ------------------------------------
export default function ${api.key} (payload) {`

export default function createApiFunction(api) {
  let apiFunction = Head(api)
  const nbp = createApiNoneBodyPayload(api.parameters)
  if (nbp) apiFunction += `\n\t${nbp}`
  const bodyPayload = createApiBody(api.parameters)
  if (bodyPayload) apiFunction += `\n\tconst bodyPayload = omit(payload, ${bodyPayload})`
  const bodyName = bodyPayload ? 'bodyPayload' : 'payload'
  return (`
  ${apiFunction}
  ${createApiAuth(api.needAuth, bodyName)}
  return xFetch({
    query: ${createApiQuery(api.parameters.query || [])}
    url: ${createApiUrl(api.path)},
    body: ${api.needSignature ? `easySignature(${bodyName})` : `${bodyName}`},
    method: '${toUpper(api.method)}' // GET, POST, PUT, PATCH, HEAD, OPTIONS or DELETE
  })
}`)

}

// 这个后来加的
function createApiAuth(needAuth, bodyName) {
  if (!needAuth) return ''
  return `
  const { user_id, token } = getUserAuth()
  ${bodyName}['user_id'] = user_id
  ${bodyName}['access_token'] = token
`
}


function createApiUrl(apiPath) {
  return '`' + apiPath.replace(/{/g, "${") + '`'
}

function createApiQuery(query) {
  if (!query.length) return 'null,'
  const queryKey = query.map(q => q.key)
  return `{ ${queryKey.join(', ')} },`
}

function createApiNoneBodyPayload(apiParams) {
  // 路径参数是必须的
  const pathData = (apiParams.path || []).map(d => d.key).filter(a => !!a)
  // 如果query的值为0(number)/false/null，会被判断为无效query
  const query = (apiParams.query || []).map(d => d.key).filter(a => !!a)
  const noneBody = query.concat(pathData) // ['user_id', 'type']
  if (!noneBody.length) return ''
  return `const { ${noneBody.join(`, `)} } = payload`
}