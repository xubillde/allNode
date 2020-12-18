

# 关于补全的说明

目前vscode的js补全配置文件中是全局的，因此在开发某个项目时，可先清除历史所有补全数据，然后在调用相应的补全脚本生成

目前可添加的补全的有

-------------------------------------------------------------------------------------------------------------------
1. ***默认补全***
### [配置] 在scripts/Snippet/data/user.json 下自定义添加一些需要用的补全  （~还未做，因为这些东西已经被植入文件中了）

1. antd
2. lodash
3. recompose
4. next
-------------------------------------------------------------------------------------------------------------------



-------------------------------------------------------------------------------------------------------------------
2. ***restful-api补全***
### [配置] file://Users/kunsam/Desktop/project/react-project/core/scripts/FetchFast/config

### [更新命令]
npm run api-snippet

### [目前使用的]
1. `ipdpfd` import { fetchData } from 'actions‘
2. `dp${api.shortcut}` 调用api请求 常常配合 `第一条使用`
3. `ipsl${api.shortcut}r` 从 selectros/list/ 中引入一个selector
4. `slf${api.shortcut}` 使用一个获得api请求状态数据的selector select${CFL(api.key)}State() 常常配合 `第三条使用`
5. `slr${api.shortcut}` 使用一个获得api请求结果的selector select${CFL(api.key)}Res() 常常配合 `第三条使用`
6. `sls${api.shortcut}` 判断一个api数据是否成功抓取过 ${api.key}Success(props.store.getState()) 常常配合 `第三条使用`

-------------------------------------------------------------------------------------------------------------------


-------------------------------------------------------------------------------------------------------------------
3. ***成员补全***
### [配置] file://Users/kunsam/Desktop/project/react-project/core/.MemberMaster/config.js

### [更新命令] 每次动态读取配置路径下的成员
npm run member-snippet


### [目前配置的]

1. 使用补全
* 组件 —— components —— `usecp{key}`
* 静态资源 —— static —— `usesc{key}`

2. 引入补全
* 组件 —— components —— `ipcp{key}`
* 组件容器 —— containers —— `ipct{key}`
* 布局补全 —— layouts —— `iplo{key}`
* 数据容器 —— parsers —— `ippr{key}`
* 高阶业务 —— hoc —— `iphoc{key}`
-------------------------------------------------------------------------------------------------------------------