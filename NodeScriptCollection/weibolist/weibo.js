const request = require("request");
const fs = require("fs");
const path = require("path");

//挨个请求
var items = [
    // {
    //     name: "热门美女帅哥",
    //     reqUrl:
    //         "https://rank.h5.weibo.cn/home?rank_uid=5581262785&id=1585813750844",
    // },
    // {
    //     name: "热门搞笑幽默博主",
    //     reqUrl:
    //         "https://rank.h5.weibo.cn/home?rank_uid=6593871464&id=1585815484757",
    // },
    // {
    //     name: "热门人文艺术博主",
    //     reqUrl:
    //         "https://rank.h5.weibo.cn/home?rank_uid=2146892831&id=1585812234886",
    // },
    // {
    //     name: "热门体育博主",
    //     reqUrl:
    //         "https://rank.h5.weibo.cn/home?rank_uid=1883881851&id=1585811208950",
    // },
    {
        name: "热门星座博主",
        reqUrl:
            "https://rank.h5.weibo.cn/home?rank_uid=3641513235&id=1585814928633",
    },
    {
        name: "热门娱乐博主",
        reqUrl:
            "https://rank.h5.weibo.cn/home?rank_uid=1155913594&id=1585810986027",
    },
    {
        name: "热门综艺博主",
        reqUrl:
            "https://rank.h5.weibo.cn/home?rank_uid=1915749764&id=1585813596366",
    },
    {
        name: "热门旅游达人",
        reqUrl:
            "https://rank.h5.weibo.cn/home?rank_uid=2838117237&id=1585814821042",
    },
];

var cookieZombieTree =
    "XSRF-TOKEN=de9529; MLOGIN=1; M_WEIBOCN_PARAMS=from%3D10A7093010; SCF=AsBbpfgM9NZN4SKtoFTKbXzw2yk56JiJTmO1BaURK8boAVwJNjx3AjuLD2rwOXvxtg..; SUB=_2A25yMIxlDeRhGeNG7lAZ9C7KyzyIHXVRLT4trDV6PUJbitAfLRegkWtNS1wtLG_1YvIkLbns5EZfqiDRUihQc1qY; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9W5iXuimkhZq.qUsCT8Bx.wx5NHD95Qf1h-E1hB7So57Ws4DqcjTgJv_qJLLTHxE9g-t; SUHB=0u5RBSA_HazLoF; WEIBOCN_FROM=10A7093010; _T_WM=57734336179";
var cookieCeShiJi =
    "XSRF-TOKEN=a8cf51; MLOGIN=1; M_WEIBOCN_PARAMS=from%3D10A8193010; SCF=AgrPHzblv42_gjKiT2Ncu8QnK3g4xRx6hriYHLIeNuxmkDFsA0gl-UTDZFtveCDMEA..; SUB=_2A25yMXsNDeRhGeFK4lIX9yvPzDiIHXVRLS9FrDV6PUJbitCOLXfYkWtNQt5vEobzy3oCQrUrAgMBDhPOw5m7svnB; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9Whlz4I2B4GY5OxUuZnr52Fq5NHD95QNSh.7SoMfe0MXWs4DqcjMi--NiK.Xi-2Ri--ciKnRi-zNS0B4ehqNSKeNS5tt; SUHB=02MftAUrKQYvsK; WEIBOCN_FROM=10A8193010; _T_WM=70822111943";
//请求头
var headers = {
    Cookie: cookieCeShiJi,
    "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Weibo (iPhone12,1__weibo__10.7.0__iphone__os13.6)",
    // "Referer": "https://rank.h5.weibo.cn/funny/1585815411416/1498522714?ua=iPhone12,1__weibo__10.7.0__iphone__os13.6&from=10A7093010&showmenu=0",
    // "Accept-Encoding": "gzip, deflate, br"
};

//输出目录
const outputFolder = path.resolve(
    __dirname,
    "output"
);

//item计数器
var itemCounter = 0;
//页码计数器
var pageCounter = 20;
//分页延迟
var secondsPerPage = 3;
//item延迟
var secondsPerItem = 10;
//418延迟
var secondsPerRetry = 60 * 60;

//整数格式化
function PrefixInteger(num, length) {
    return (
        "0000000000000000" + num
    ).substr(-length);
}

function sendRequest() {
    //根据item计数器取出要请求的item
    let cItem = items[itemCounter];
    //每个分类单独输出子目录
    let cFolder = path.resolve(
        outputFolder,
        cItem.name
    );
    //创建子目录
    if (!fs.existsSync(cFolder)) {
        console.log(
            "创建目录",
            cFolder
        );
        fs.mkdirSync(cFolder);
    }
    //拼接请求的url
    var cUrl =
        cItem.reqUrl +
        "&page=" +
        pageCounter;
    console.log(
        "开始请求 " +
            cItem.name +
            " 页码 ",
        pageCounter
    );
    //开始请求
    request.get(
        cUrl,
        {
            headers: headers,
            json: true,
        },
        (err, resp, body) => {
            if (err != null) {
                console.log(
                    "请求失败 ",
                    cItem.name,
                    err
                );
            } else if (
                body == undefined
            ) {
                if (
                    resp.statusCode ==
                    418
                ) {
                    console.log(
                        "418错误，延迟" +
                            secondsPerRetry +
                            "s后重试"
                    );
                    setTimeout(() => {
                        sendRequest();
                    }, secondsPerRetry * 1000);
                } else {
                    console.log(
                        "无效body ",
                        resp.statusCode
                    );
                }
            } else if (
                body["ok"] == undefined
            ) {
                console.log(
                    "请求结果异常 ",
                    cItem.name
                );
            } else {
                console.log(
                    "请求成功 ",
                    cItem.name
                );
                //每一页一个文件
                let cFileName =
                    cFolder +
                    "/" +
                    cItem.name +
                    PrefixInteger(
                        pageCounter,
                        2
                    ) +
                    ".txt";
                //json写入文件
                fs.writeFile(
                    cFileName,
                    JSON.stringify(
                        body,
                        null,
                        2
                    ),
                    (err) => {
                        if (
                            err != null
                        ) {
                            console.log(
                                "输出文件失败 ",
                                cFileName,
                                err
                            );
                        } else {
                            console.log(
                                "输出成功 ",
                                cFileName
                            );
                        }
                    }
                );

                //请求空的时候，开始下一个item
                if (body["ok"] == 0) {
                    console.log(
                        "无数据了 ",
                        body["msg"]
                    );
                    //item遍历完
                    if (
                        itemCounter +
                            1 ==
                        itemCounter.length -
                            1
                    ) {
                        console.log(
                            "请求全部完成"
                        );
                    } else {
                        console.log(
                            "开始下一个"
                        );
                        itemCounter += 1;
                        pageCounter = 1;
                        //延时，免得太早被封
                        setTimeout(
                            () => {
                                sendRequest();
                            },
                            secondsPerItem *
                                1000
                        );
                    }
                } else {
                    //请求成功的话，就继续下一页
                    console.log(
                        "开始下一页"
                    );
                    pageCounter += 1;
                    setTimeout(() => {
                        sendRequest();
                    }, secondsPerPage * 1000);
                }
            }
        }
    );
}

//开始
sendRequest();
