var express = require('express');
var router = express.Router();
const formidable = require('formidable');
var path = require('path');
var fs = require('fs');
const { isString } = require('util');

var fileRootPath = path.resolve(__dirname,'../public')
console.log(fileRootPath);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send(`
    <h2>Julive <code>"File Storage"</code> For You</h2>
    <form action="/upload" enctype="multipart/form-data" method="post">
      <h3>请选择文件</h3>
      <div>文件: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
      <h3>点击提交</h3>
      <input type="submit" value="开始上传" />
    </form>
  `);
});

router.post('/upload', async (req, res) => {
  try {
    const form = formidable({ multiples: true,uploadDir: fileRootPath});
    var path = "/"

    form.once('error', console.error);

    form.on('field', (name, value) => {
        if(name=="path"){
            if(!isNull(value)){
                path = "/"+value+"/"
            }
        }
    });
    form.on('file', (name, file) => {                
        fs.rename(file.path, form.uploadDir + path + file.name,(error)=>{
            if(error){
                next(err);
                return;
            }
        });
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      console.log("fields.path:"+fields.path)
      console.log("fields.version:"+fields.version)
      console.log("fields.version_code:"+fields.version_code)
      files.url = 'http://file.ibaozi.cn/ftp/'
      res.json({ fields, files });
    });
  } catch (err) {
      res.status(500).send(err);
  }
});

function isNull(str){
    if ( str == ""|| str == null) return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}


module.exports = router;
