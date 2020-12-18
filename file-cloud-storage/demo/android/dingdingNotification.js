const fly = require("flyio");

function dingtalk(content){

    const url = "https://oapi.dingtalk.com/robot/send?access_token=40e67411719fbd584134a7deefc1c643f2d0916f8efcefb12e7759591fa7e637";

    if(content==null){
        content = "Android Apk 安装包构建成功,下载地址：https://www.pgyer.com/gIEm  "
    }

    console.log(content);

    const data = {
        "msgtype": "text", "text": {
            "content": content
        },
        "at": {
            "isAtAll": true
        }
    };

    fly.config.headers = {"Content-Type": "application/json"};

//    fly.post(url, data).then((response) => {
//        console.log(response)
//    });
}

module.exports = {
    talk:dingtalk
}