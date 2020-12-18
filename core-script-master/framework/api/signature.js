

// 本文件一开始用处不大，主要是用于项目后期部分api加密调用

import toPairs from 'lodash/toPairs'
import join from 'lodash/join'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'
import sha1 from 'js-sha1'

const secret = 'FhPRw8bwAVWTcjNNTp4G'

function makeupArgs (args) {
  const ordered = orderBy(toPairs(args), 0, ['desc'])
  return join(map(ordered, (i) => join(i, '=')), '&&')
}

function signature (args) {
  const encoded = makeupArgs(args)
  return sha1(encoded)
}

export function easySignature (params = {}) {
  let args = { ...params }
  args.secret = secret
  args.timestamp = new Date().getTime()
  args.noncestr = Math.random().toString(36).slice(2)
  return {
    ...params,
    timestamp: args.timestamp,
    noncestr: args.noncestr,
    signature: signature(args)
  }
}

export default easySignature
