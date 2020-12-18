let fs = require('fs');
let path = require('path');
// let  join = require('path').join;
let filepath = path.resolve(__dirname, '../src/modules/homework-questionnaire')
/**
 * 
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 * 方法功能：获取文件夹下的所有.vue文件数组
 */
function findSync(startPath) {
  let regexVue = /\.vue$/;
  let result = [];
  function finder(startPath) {
    let files = fs.readdirSync(startPath);
    files.forEach((val, index) => {
      let fPath = path.join(startPath, val);
      let stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile() && regexVue.test(files)) result.push(fPath);
    });

  }
  finder(startPath);
  return result;
}
/**
 * 
 * @param {Array} fileArr 文件数组
 * 方法功能：将传入的数组中的文件重写 example 使 pr(100) 格式内容 替换 100px
 */
function reWriteFile(fileArr) {
  var regexNum = /[^\d]/g; //提取字符串中的数值
  var regexPr = /pr\([0-9]*\)/g; //匹配 pr() 字符串
  var px;
  fileArr.forEach((fileName, index) => {
    var vueFile = fs.readFileSync(fileName, 'utf-8')
    //匹配所有的pr()字符串 prArray数组
    prArray = vueFile.match(regexPr)
    // console.log(prArray)
    if (prArray) {
      prArray.forEach((val, index) => {
        //获取像素值将pr()格式转换为px
        px = val.replace(regexNum, '') + 'px';
        vueFile = vueFile.replace(regexPr, px)
      })
      fs.writeFileSync(fileName, vueFile, 'utf-8')
    } else {
      console.log(`${fileName}文件中不包含pr(number)格式字符串`)
    }
  })
}
reWriteFile(findSync(filepath))
