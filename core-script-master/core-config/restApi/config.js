
// 下面有example
const MOCK_DATA = [
  {
    method: 'get',
    tags: 'intance',
    description: '抓取instance',
    parameters: {
      path: [ { 'key': 'flow_id', 'require': true } ]
    },
    path: '/workFlow/{flow_id}'
  }
]

module.exports = {
  // 若 debug 为 false 将抓取这个目标的作为api数据源 api数据源~
  debug: true, // 打开时就使用MockData
  src: 'https://jsonplaceholder.typicode.com/users',
  outputPath: {
    api: 'api/list',
    action: 'actions/list',
    saga: 'sagas/list',
    selector:  'selectors/list',
    apiMap: 'api/_apiMap.js'
  },
  authField: {
    userId: 'user_id',
    userToken: 'access_token'
  },
  mockData: MOCK_DATA
}

// ----- example -----
// {
//   method: 'get',
//   tags: 'testApi',
//   description: '抓取用户关注',
//   parameters: { // 可为 {}
//     path: [
//       {
//         'key': 'user_id',
//         'require': true,
//         'type': 'number', // type: 'any' 此字段也可以没有
//         'description': '用户id' // 字段描述，最好言简意赅， 此字段也可以没有
//       } 
//     ],
//     query: [
//       { 'key': 'abbr_sort', 'require': false, 'type': 'boolean', options: [true, false] }, // options: 可选的参数值，此字段也可以没有
//       { 'key': 'scope', 'require': false, 'type': 'string', options: ['1', '2'] }
//     ],
//     formData: [
//       { 'key': 'content_id', 'require': true },
//       { 'key': 'type', 'require': true }
//     ],
//   },
//   path: '/users/{user_id}/attentions', // 路径中的参数不要使用驼峰 （分词方法的原因）
//   needAuth: true, // 目前一般不需要
//   needSignature: true // 目前一般不需要
// },

// // ----- simple-example -----
// {
//   method: 'get',
//   tags: 'intance',
//   description: '抓取instance',
//   parameters: {
//     path: [
//       { 'key': 'flow_id', 'require': true }
//     ]
//   },
//   path: '/workFlow/{flow_id}'
// }
