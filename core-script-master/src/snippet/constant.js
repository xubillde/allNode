export const SNIPPET_TYPES = [
  {
    name: 'ALL', desc: '全部'
  },
  {
    name: 'member', desc: '成员使用与引入补全'
  },
  {
    name: 'restApi', desc: 'restful-api补全'
  },
  {
    name: 'graphQl', desc: 'graphQl相关'
  }
].sort((a, b) => (a.name.length - b.name.length))