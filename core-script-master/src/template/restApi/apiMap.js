
const FILE = (keyStr, descStr) => `
// 本文件由脚本生成，用于其它流程（主要是api-redux流程）读取所有api-keys进行遍历
// 如果直接读取 api/index 文件，读取内容多，文件大小也更大
// 因为node脚本要读取本文件，不能用common export写法

const apiKeys = [
${keyStr}]
const apiDesc = {
${descStr}}
module.exports = {
  apiKeys,
  apiDesc
}
`

export default (apiList) => {
  let descStr = ''
  let keyStr = ''
  apiList.forEach(api => {
    keyStr += `\t'${api.key}',\n`
    descStr += `\t${api.key}: '${api.description}',\n`
  })

  return FILE(keyStr, descStr)
}



