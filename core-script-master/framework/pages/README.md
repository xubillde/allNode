

# pages 下存放所有项目的路由页面，next业务文件夹，一个路由对应一个页面

可以查看示例:

* 一个列表/项目的组合页面
* 中间页


## 页面必须引入的模块
1. React import React from 'react'
2. withGraphQlReduxSaga 方法 import { withGraphQlReduxSaga } from 'hoc/store'
3. parser 数据容器 import ProjectListParser from 'parsers/Project/list.js'

## 页面可能引入的模块
1. layout e.g. import MainLayout from 'layouts/MainLayout' 一般引入顶层布局
2. fetchData 全局通用api调用方法 import { fetchData } from 'actions'
3. hoc 高阶函数 e.g. import WithEnv from 'hoc/WithEnv'
4. 固定常量 e.g. import projectTable from 'constants/table/project.js'

##页面应该完成的工作
1. 正确的初始化页面数据 getInitialProps
2. 正确初始化页面dom结构
3. 正确输出页面
4. 正确判断初始数据跳转其他页面
