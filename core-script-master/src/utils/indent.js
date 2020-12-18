
export function getIntentStr(deep) {
  let str = ''
  new Array(deep).fill(null).forEach(i => { str += '\t' })
  return str
}