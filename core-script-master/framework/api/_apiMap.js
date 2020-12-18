
// 本文件由脚本生成，用于其它流程（主要是api-redux流程）读取所有api-keys进行遍历
// 如果直接读取 api/index 文件，读取内容多，文件大小也更大
// 因为node脚本要读取本文件，不能用common export写法

const apiKeys = [
	'fetchGetUserAttentions',
	'fetchPostPosts',
	'fetchGetPost',
	'fetchGetComments',
	'fetchGetUsers',
]

const apiDesc = {
	fetchGetUserAttentions: '抓取用户关注',
	fetchPostPosts: '抓取文章',
	fetchGetPost: '抓取某篇文章',
	fetchGetComments: '抓取某篇文章的评论',
	fetchGetUsers: '抓取用户',
}

module.exports = {
  apiKeys,
  apiDesc
}
