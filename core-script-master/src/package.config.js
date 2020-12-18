
export default [
  {
    class: '基础类',
    children: [
      { name: 'check-core', abbr: 'ccr', comment: 'check core info [查看core信息]' },
      { name: 'check-assist-center', abbr: 'cac', comment: 'check guide center [打开引导中心]' },
      { name: 'check-project-framework', abbr: 'cprfr', comment: 'check project framework [查看项目架构目录]' },
      { name: 'code-project', abbr: 'cdpr', comment: 'open project faster 开发某个项目(项目列表需要配置)' },
      { name: 'config-projects', abbr: 'cfprs', comment: 'config working projects 配置需要管理的项目' },
    ]
  },
  {
    class: '项目类',
    children: [
      { name: 'init-core', abbr: 'icr', comment: 'create core.config.js [创建配置文件]' },
      { name: 'check-project-guide', abbr: 'cprgd', comment: 'check the guide of develop project [查看项目引导] 引导中心的子类' },
      { name: 'check-project-backend', abbr: 'cprbe', comment: 'check project management backend 打开项目管理后台' },
      { name: 'xmind-plan', abbr: 'xplan', comment: 'generates project plan files from xmind tree [根据xmind创建项目评估表和工作流表]' }
    ]
  },
  {
    class: '业务类',
    children: [
      { name: 'expand-app', abbr: 'exp', comment: 'expand a app [展开一个页面的全部依赖]' },
      { name: 'create-app', abbr: 'cap', comment: 'create a app [创建一个页面级应用程式]' },
      { name: 'delete-app', abbr: 'dap', comment: 'delete a app [删除一个页面级应用程式]' },
    ]
  },
  {
    class: '补全类',
    children: [
      { name: 'create-snippet', abbr: 'crsn', comment: 'create snippet [创建项目补全]' },
      { name: 'delete-snippet', abbr: 'dlsn', comment: 'delete snippet [删除项目补全]' },
      { name: 'select-snippet', abbr: 'slsn', comment: 'select snippet range [设置项目补全范围]' },
    ]
  },
  {
    class: '数据类',
    children: [
      { name: 'create-rest-api-redux-flow', abbr: 'crarf', comment: 'create restful api redux flow [创建redux数据管理流程]' },
      { name: 'create-graphql-api', abbr: 'cgqa', comment: 'create graphql api [创建graphql api 方法]' }
    ]
  },
  {
    class: '元件类',
    children: [
      { name: 'xmind-ui', abbr: 'xui', comment: 'generates ui files from xmind tree [根据xmind生成元件ui文件]' },
      { name: 'create-component', abbr: 'ccp', comment: 'create a component [创建一个业务元件]' },
    ]
  },
  {
    class: '方法类',
    children: [
      { name: 'recompose', abbr: 'rcp', comment: 'use recompose faster [快捷使用]' }
    ]
  }
]
