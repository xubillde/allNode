import getPages from '../../utils/getPages';

const fs = require('fs')
const path = require('path')

export default function createPageData (basePath) {

  const pages = getPages(basePath)
  const file = getPagaData(pages)
  fs.writeFileSync(path.join(basePath, 'page-data.js'), file)

}


function getPagaData(pages) {
  let fileStr = `
  const TODO = 0
  const DOING = 1
  const DONE = 2
  
  const URL = 'url_access'
  const BACK = 'back_access' // 后期运算时插入，只要存在target的均加入BACK
  const CLIENT = 'client_jump_access'
  
  // 未来加管理字段？比如插入关联组件，接入的api
  export default [`

  pages.forEach(page => {
    fileStr += JSON.stringify({
      tag: '请修改',
      name: page,
      page,
      designs: [
        ''
      ],
      state: 'TODO',
      desc: '描述',
      comment: [
        ''
      ],
      router: {
        source: [],
        target: []
      },
      components: [],
      apis: []
    }, null, 2)
    fileStr += ',\n'
  })
  
  fileStr += `]\n`
  return fileStr
}
