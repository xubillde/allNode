# deploy介绍

## 目的：实现前端打包后自动上传到服务器，减少不必要的重复性工作。


##  安装：```  git@github.com:crazy-husky/deploy.git ``` 拉取git，将deploy放在项目根目录。
##  利用npm 或者yarn 安装依赖。
##  ``` moment util events ssh2 progress inquirer ```

## 食用步骤：
  ### 1.配置基本信息，比如服务器账号密码，上传目录等：
   ```
   /******************************请手动配置以下内容*********************************/  
   /** 远程服务器配置
   * @type {{password: string, port: number, host: string, username: string}}
   */
    #```
  const server = {
    host: 'xx.xx.xx.xx',  //主机ip
    port: 22,                //SSH 连接端口，默认22
    username: 'name',        //用户名
    password: 'pwd',     //用户登录密码
  }
  const basePath = '/web'     //服务器网站根目录
  let baseDir = ''            //项目目录名称
  let  back_up_dir='' //备份目录名称,需手动创建，可选,注意目录名后有斜杠 比如    back_up/
  const bakDirName = baseDir + '.bak' + moment(new Date()).format('YYYY-M-D-HH:mm:ss')//备份文件名
  const buildPath = path.resolve('./dist')//本地项目编译后的文件目录

  /**********************************配置结束***************************************/
   ```
   ### 2.搭配脚手架，比如vue-cli或者create-react-app 使用，利用npm 声明周期post让deploy在build之后执行：
   打开 package.json文件，在 scripts中添加：
      "scripts": {
          "postbuild": "node deploy.js"
       }
     
   ### 3.执行npm run build 或者单独执行delopy: node deploy
   
   ## 建议：避免个人信息泄露，账号密码建议从其他目录导入，登陆用户最好也不要是超级用户。
      脚本文章链接： http://gohusky.cn/#/public/detail/auto-deploy
