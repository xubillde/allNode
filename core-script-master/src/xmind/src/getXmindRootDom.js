
const xmind = require('xmind')

export default function getXmindRootDom(xmindPath, sheet, rootIndex) {
  const workbookFromFile = xmind.open(xmindPath)
  const jsonData = JSON.parse(workbookFromFile.toJSON())
  const rootDom = jsonData.sheets[sheet || 0].rootTopic.children[rootIndex || 0]
  return rootDom
}
