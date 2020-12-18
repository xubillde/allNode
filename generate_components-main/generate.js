const fs = require('fs');
const moment = require('moment')

let basePath = 'src/components';
const cptName = process.argv.splice(2)[0] // 从命令行获取文件名参数
let path = cptName.split('/');
let fileName = path[path.length - 1];
let readsFile = ['src/tmp/index.js','src/tmp/tmp.js']
let writeFiles = [`${fileName}.js`, `${fileName}.html`, `${fileName}.css`, 'index.js' ]
let files = []

// 检测是否存在文件夹
const checkFileExists = function () {
    return new Promise(async (res, reject) => {
        if (fs.existsSync(`${basePath}/${cptName}`)) {
            reject(`已存在${fileName}文件了`);
        } else {
            for (let a of path) {
                fs.existsSync(basePath + '/' + a) ? basePath = `${basePath}/${a}/` : await mkdir(a)
            }
            res(basePath)
        }
    })
}

// 建立文件夹
let mkdir = function(dir) {
    return new Promise((res, rej) => {
        fs.mkdir(basePath + '/' + dir, (err) => {
            if (err) rej(err);
            basePath = `${basePath}/${dir}`
            res(basePath)
        })
    })
}

// 读取模版文件内容， 并填充目标组件
let readFile = function() {
    return new Promise((res, rej) => {
        for (let file of readsFile) {
            let text = fs.readFileSync(file).toString();
            text = text.replace(/time/g, moment().format('YYYY/MM/DD'))
            files.push(text)
        }
        res(files);
    })
}

// 写入文件
let writeToFile = function(file) {
    return new Promise(async (res, rej) => {
        for (let a of writeFiles) {
            await fs.writeFile(`${basePath}/${a}`,
                a === writeFiles[3] ? file[0] : a === writeFiles[0] ? file[1] : '', (err) => {
                    if (err) rej(err)
                })
        }
        res('success')
    })
}

async function generateComponent() {
    try {
        await checkFileExists();
        let files = await readFile();
        await writeToFile(files);
        console.log(`已成功创建${fileName}模板`)
    } catch (err) {
        console.error(err)
    }
}

generateComponent()
