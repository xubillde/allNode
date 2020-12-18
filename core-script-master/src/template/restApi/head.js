import createApiBody from './bodyPayload'

export default (api) =>
`
import xFetch from '../utils'
${api.needAuth ? `import getUserAuth from '../user'` : ''}
${createApiBody(api.parameters) ? `import omit from 'lodash/omit'` : ''}
${api.needSignature ? `import easySignature from '../signature'` : ''}
// 注意：如果query中value值包括数字0/false/null，均会被判定为无该query，请避免使用
// ------------------------------------
// EXAMPLE
// ------------------------------------
// export default function fetchX (payload) {
//   return xFetch({
//     url: '/users',
//     method: 'GET', // GET, POST, PUT, PATCH, HEAD, OPTIONS or DELETE,
//     body: payload.x,
//     credentials: 'include' // which will allow both CORS and same origin requests to work with cookies
//   })
// }
`