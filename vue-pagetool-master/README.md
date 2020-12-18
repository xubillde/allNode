# vue-pagetool
使用node脚本快速搭建vue项目的基本结构

##安装
``` bash
$ npm install vue-pagetool
```

##使用

新建一个page.js,内容为：
```javascript

var { createPages } = require("vue-pagetool");

var page_model = {
  root_dir: './src',
  pages: [{
    name: 'home',
    pages:[{
      name: 'login',
      components: ['top','head'],
    },{
      name: 'signin'
    },{
      name: 'signup'
    }]
  }]
}

createPages(page_model);
```

之后运行
``` bash
$ node index.js
```
即可生成vue的项目模板，具体的结构如下所示。

```code
src
|
 ———— components
      |
       ——login
         |
          —— ui
             |
              —— HeadUi.vue
              —— TopUi.vue
         |
          —— wrap
             |
              —— HeadWrap.vue
              —— TopWrap.vue
 —— pages
    |
     —— Home.vue
     —— home
        |
         —— HomeLogin.vue
         —— HomeSignin.vue
         —— HomeSignup.vue
 —— router
    |
     —— home.js
 —— store
    |
     —— modules
        |
         —— home
            |
             —— actions.js
             —— getters.js
             —— index.js
             —— mutations.js
             —— state.js

static
|
 —— css
    |
     —— home
        |
         —— login.scss
         —— signin.scss
         —— signup.scss
```

- page_model 必须指定 src 的目录所在，否则生成的文件位置就跟预期不符，还得删除！
- 在 pages 数组中，每一项都必须有 name 属性，该属性的值即为页面的路径和文件名，该工具会自动生成 pages, components, router. store 等文件夹及所需的文件，并自动引入相关的代码，省去了新建文件并复制代码的麻烦。
- page: <b>在 page 对象中存在 pages 数组时会忽略 components 的设置，只生成子页面，</b>因为默认存在子页面时，该页面只需要 router-view 组件即可，不需要其他组件。
- router: 生成路由文件后，还需要在 router/index.js 中主动引入该文件。<b>默认会自动覆盖原来的路由模块文件，</b>如果需要改成不覆盖的方式，后期可能会加入。
- store: 只是生成了store的模块文件，还需要在 store/index.js 中手动引入。
- css: 页面相关的 css 可以写在 static 文件夹中，vue文件已经自动引入了该文件。


如果觉得有什么不妥之处，欢迎指正！
