const fs = require('fs')
const webUrl = require('../../web.config')
console.log(webUrl)
let path = require('path');
let PUBLIC_PATH = path.resolve(__dirname, './commit.js');

const NODE_ENV = process.argv.splice(2).join()
console.log(NODE_ENV)
let fileContent = ''
if (NODE_ENV == 'dev') {
	for (let item in webUrl.src.development) {
		fileContent += `const ${item} = '${webUrl.src.development[item]}' \n`
	}
}
if (NODE_ENV == 'test') {
	for (let item in webUrl.src.test) {
		fileContent += `const ${item} = '${webUrl.src.test[item]}' \n`
	}
}
if (NODE_ENV == 'prod') {
	for (let item in webUrl.src.production) {
		fileContent += `const ${item} = '${webUrl.src.production[item]}' \n`
	}
}
fs.unlink(PUBLIC_PATH, function (err) {
	if (err) {
        console.log(err)
		return false
	}
	console.log('删除文件成功')
	fs.writeFile(PUBLIC_PATH, fileContent, function (err) {
		if (err) {
			return console.log(err)
		}
		console.log('文件重新生成成功')
	})
})
