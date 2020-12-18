/*********************

使用说明:

1. 修改 config.json 中的新旧版本号，更新文件路径等

2. 执行脚本： node update-version.js


**********************/

var fs = require('fs');

var file = fs.readFileSync("./config.json"); 

var config = JSON.parse(file);

for (var i = 0; i < config.files.length; i++) {
    var path = config.files[i];
    var content = fs.readFileSync(path);

    content += "";
    content = content.replace(config.oldVersion, config.newVersion);

    fs.writeFileSync(path, content);

    console.log(path + ", 更新成功!");
}

