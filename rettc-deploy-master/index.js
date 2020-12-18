/*
 * Created on Fri Dec 08 2017 0:35:30
 * 自动部署代码，node脚本
 * Copyright (c) 2017 *** xiezhongfu
 */

const { exec, spawn } = require('child_process');
const path = require('path');

/**
 * 用户输入的参数
 */
const argvsArray = process.argv.slice(2);

/**
 * 生产模式构建项目
 * @param {*} originUrl 远程仓库地址
 */
const originUrl = argvsArray[0],
    branch = argvsArray[1] || 'master',
    [projectName] = path.basename(originUrl).split('.').splice(0, 1),
    projectPath = path.join(__dirname, projectName);

    
// 清屏
function consoleClear(){
    'use strict';
    return new Promise((resolve, reject) => {
        process.stdout.write('\u001b[2J\u001b[0;0H');
        console.log(`\x1B[101m[${new Date().toLocaleString()}]\x1B[0m`, `\x1B[92m${projectName} 开始部署\x1B[0m`);
        resolve(true);
    });
}

// 克隆
function clone() {
    console.log(`\x1B[101m[${new Date().toLocaleString()}]\x1B[0m`, '\x1B[92m克隆...\x1B[0m');
    return new Promise((resolve, reject) => {
        const gitClone = exec(`git clone -b ${branch} ${originUrl}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`[${new Date().toLocaleString()}]`, '克隆文件失败', stderr);
                reject(error);
            }
        });

        gitClone.stdout.on('data', (data) => {
            console.log(`[${new Date().toLocaleString()}]`, `stdout: ${data}`);
        });
        gitClone.stderr.on('data', (data) => {
            console.log(`[${new Date().toLocaleString()}]`, `stderr: ${data}`);
        });
        gitClone.on('close', (code) => {
            console.log(`[${new Date().toLocaleString()}]`, `克隆子进程退出码：${code}`);
            resolve(code);
        });
    });
}

// 生产模式加载依赖(cnpm install --production)
function install() {
    console.log(`\x1B[101m[${new Date().toLocaleString()}]\x1B[0m`, '\x1B[92m加载依赖...\x1B[0m');
    return new Promise((resolve, reject) => {
        const npmInstall = exec('cnpm install', { cwd: projectPath }, (error, stdout, stderr) => {
            if (error) {
                console.log(`[${new Date().toLocaleString()}]`, '加载依赖失败', stderr);
                reject(error);
            }
        });

        npmInstall.stdout.on('data', (data) => {
            console.log(`[${new Date().toLocaleString()}]`, `stdout: ${data}`);
        });
        npmInstall.stderr.on('data', (data) => {
            console.log(`[${new Date().toLocaleString()}]`, `stderr: ${data}`);
        });
        npmInstall.on('close', (code) => {
            console.log(`[${new Date().toLocaleString()}]`, `加载依赖子进程退出码：${code}`);
            resolve(code);
        });
    });
}

// 打包构建
function build() {
    console.log(`\x1B[101m[${new Date().toLocaleString()}]\x1B[0m`, '\x1B[92m生产构建...\x1B[0m');
    return new Promise((resolve, reject) => {
        const npmBuild = spawn('npm', ['run', 'build'], { cwd: projectPath, stdio: 'pipe', shell: true });        

        npmBuild.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        npmBuild.stderr.on('data', (data) => {
            console.log(`[${new Date().toLocaleString()}]`, `stderr: ${data}`);
        });
        npmBuild.on('close', (code) => {
            console.log(`[${new Date().toLocaleString()}]`, `生产构建子进程退出码：${code}`);
            resolve(code);
        });
    });
}

// 复制生产部署包
function copy() {
    console.log(`\x1B[101m[${new Date().toLocaleString()}]\x1B[0m`, '\x1B[92m复制部署文件...\x1B[0m');
    return new Promise((resolve, reject) => {
        const copy = exec(`cp -r build ${__dirname}/`, { cwd: projectPath }, (error, stdout, stderr) => {
            if (error) {
                console.log(`[${new Date().toLocaleString()}]`, '复制部署文件失败', stderr);
                reject(error);
            }
        });

        copy.stdout.on('data', (data) => {
            console.log(`[${new Date().toLocaleString()}]`, `stdout: ${data}`);
        });
        copy.stderr.on('data', (data) => {
            console.log(`[${new Date().toLocaleString()}]`, `stderr: ${data}`);
        });
        copy.on('close', (code) => {
            console.log(`[${new Date().toLocaleString()}]`, `复制部署文件子进程退出码：${code}`);
            resolve(code);
        });
    });
}

// 删除克隆的文件
function rmSource() {
    console.log(`\x1B[101m[${new Date().toLocaleString()}]\x1B[0m`, '\x1B[92m删除克隆...\x1B[0m');
    return new Promise((resolve, reject) => {
        const rm = exec(`rm -rf ${projectPath}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`[${new Date().toLocaleString()}]`, '删除克隆失败', stderr);
                reject(error);
            }
        });

        rm.stdout.on('data', (data) => {
            console.log(`[${new Date().toLocaleString()}]`, `stdout: ${data}`);
        });
        rm.stderr.on('data', (data) => {
            console.log(`[${new Date().toLocaleString()}]`, `stderr: ${data}`);
        });
        rm.on('close', (code) => {
            console.log(`[${new Date().toLocaleString()}]`, `删除克隆文件子进程退出码：${code}`);
            resolve(code);
        });
    });
}

async function deploy() {
    const beforeRmSourceState = await rmSource(),
    consoleClearState = await consoleClear(),
    cloneState = await clone(),
    installState = await install(),
    buildState = await build(),
    copyState = await copy(),
    afterRmSourceState = await rmSource();
}

deploy().then(() => {
    console.log(`\x1B[101m[${new Date().toLocaleString()}]\x1B[0m`, `\x1B[92m${projectName} 部署成功\x1B[0m`);
});