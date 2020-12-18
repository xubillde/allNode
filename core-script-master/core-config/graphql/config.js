
const gql2 = `
query queryChildren{
  children(teacher_id: "67982f14-2951-4533-a61b-c047b5e8d2d2") {
    id
    name
    gender
    avatar
   }
}`



// 下面有example
const MOCK_DATA = {
  "1": {
      "operationType": "mutation", // 1
      "query": "mutation likeUnlike{\n  likeUnlike(teacher_id: \"67982f14-2951-4533-a61b-c047b5e8d2d2\", \n    feed_id: \"0ab6ffb8-79c6-4715-b6fa-5c4841492ff8\")\n    { feed_id\n      user_id\n      deleted_at\n    }\n}\n",
  },
  "2": {
      "operationType": "query",
      "query": gql2,
  }
}

module.exports = {
  // 若 debug 为 false 将抓取这个目标的作为api数据源 api数据源~
  debug: true, // 打开时就使用MockData
  src: 'https://jsonplaceholder.typicode.com/users',
  outputPath: 'api/graphQl',
  authField: {
    userId: 'user_id',
    userToken: 'access_token'
  },
  mockData: MOCK_DATA
}
