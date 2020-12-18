const shell = require('shelljs');
const dingding = require('./dingdingNotification')
const file = require('./upload')

var program = require('commander');

program
  .version('0.0.1')
  .option('-d, --debug', 'gradlew assembleDebug')
  .option('-s, --sandbox', 'gradlew assembleSandbox')
  .option('-r, --release', 'gradlew assembleRelease')
  .parse(process.argv);

console.log('正在执行:');
if (program.debug) {
    console.log('  - debug');
    builds('gradle assembleDebug',(code)=>{
        if(code==1){
            console.log('执行完毕');
            file.postFile({ file: './flutter.png', content_type: 'png' },function(response){
                console.log('response:'+response);
                dingding.talk("Android Debug 安装包构建完成，请点击下方链接下载：Http://apk.ibaozi.cn/tmp/")
            })
        }else{
            console.log('执行失败');
         }
    })
}
if (program.sandbox) {
    console.log('  - sandbox');
}
if (program.release) {
    console.log('  - release');
}

function builds(task, call) {
    if (shell.exec(task).code == 0) {
        call(1)
    } else
        call('gradle app:assemble构建失败')
}