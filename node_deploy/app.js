/**
 * 脚本名称：一键自动化部署脚本 v1.2
 * 作者：知一
 * 邮箱：99688009@qq.com
 * 脚本功能：此脚本为前端工程上线部署时使用，支持多项目切换部署
 * 脚本描述：开源脚本，可随意传播与修改
 */

const fs = require("fs");
const shell = require("shelljs");
const CFG = require("./config");
const path = require("path");
const moment = require("moment");
const config = getConfig();


fs.readdir(config.root, (err, data) => {
    if (err) {
        throw new Error("read file folder failed");
    }

    let zipJson = {};
    let pathInfo = {
        createTarFilePath: "",
        projectRoot: ""
    };

    Array.from(data || []).forEach(file => {
        let absolutePath = path.resolve(config.root, file);

        let stat = fs.statSync(absolutePath);

        let extName = path.extname(file);

        if (extName === ".zip") {
            //缓存最近的压缩包
            zipJson[stat.ctimeMs] = absolutePath;
        }

        //如果是目录，并且目录名字与nginx指向的前端目录是一致的，则应先备份
        if (stat.isDirectory() && file == config.projectFolder) {
            pathInfo = {
                createTarFilePath: path.resolve(config.root, `${moment().format("YYYYMMDD_HHmmss")}.tar`),
                projectRoot: absolutePath
            };
        }
    });

    let maxTimestamp = Math.max.apply(null, Object.keys(zipJson));

    let zipPath = zipJson[maxTimestamp];

    if (zipPath) {
        if (pathInfo.createTarFilePath && pathInfo.projectRoot) {
            //备份
            shell.exec(`tar -zcvf ${pathInfo.createTarFilePath} ${pathInfo.projectRoot}`);
            shell.exec(`rm -rf ${pathInfo.projectRoot}`);
            shell.echo(`已于${moment().format("YYYY-MM-DD HH:mm:ss")}进行备份，备份文件为${pathInfo.createTarFilePath}`);
        }
        shell.exec(`unzip ${zipPath} -d ${config.root}`);
        shell.echo(`前端工程已于${moment().format("YYYY-MM-DD HH:mm:ss")}成功部署...`);

        if (config.justClean) {
            shell.exec(`rm -rf ${zipPath}`);
        }

        if (config.reloadNginx) {
            shell.exec(`nginx -s reload`);
        }
    }

    zipJson = {};

    pathInfo = {
        createTarFilePath: "",
        projectRoot: ""
    };
});



//根据环境变量动态获取配置参数
function getConfig() {
    if (process.env.PROJECT_ENV === undefined) {
        throw new Error("please set PROJECT_ENV env then you can todo ....");
    }

    let env = String(process.env.PROJECT_ENV);

    return CFG[env];
}