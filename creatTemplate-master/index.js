var fs = require('fs')

let basePath = `${__dirname}/src/pages/`
let cptName = process.argv.splice(2)[0] // 获取命令行的参数
let pathList = cptName.split('/') // 如果参数有“/”，则把参数以“/”为界限拆分成数组
let name = pathList[pathList.length - 1] // 要创建的文件的名字
let writes = ['index.js', 'index.html', 'index.css'];
let reads = ['template/index.js', 'template/index.html', 'template/index.css'];
let file = [];
console.log('process.argv', pathList)

// 检测是否存在文件夹
let exists = async function() {
  for(let path of pathList) {
    fs.existsSync(`${basePath}${path}`) ? (basePath = `${basePath}${path}/`) : await mkdir(path)
  }
}

// 新建文件夹
let mkdir = async function(pathName) {
  console.log('pathName', pathName)
  await fs.mkdir(`${basePath}${pathName}`, err => {
    console.log('mkdir', err)
    basePath = `${basePath}${pathName}`
  })
}

// 读取模板文件内容
let readFile = async function() {
  for (let tle of reads) {
    let text =  fs.readFileSync(tle).toString()
    file.push(text)
  }
}

// 生成文件
let writeFile = async function(file) {
  for(let fileName of writes) {
    await fs.writeFile(`${basePath}${fileName}`, '123', err => {
      console.log('writeFile err', err)
    })
  }
}

async function creatCpt() {
  try {
      await exists();
      await readFile()
      await writeFile(await readFile());
      return console.log(`Successfully created ${name} component`)
  }
  catch (err) {
      console.error('creatCpt', err);
  }
}
creatCpt();
