
// 以下路径配置是相对与项目根路径的配置

module.exports = {

  snippet: {
    outputPath: '/Users/kunsam/Library/Application\ Support/Code/User/snippets/javascript.json'
  },

  xmind: {
    ui: {
      path: 'xmind/ui',
      // output: 'xmind/ui' // 不配置的话默认同xmind读取路径
    },
    plan: {
      path: 'xmind/develop_model2.xmind',

      // output: { 
        // 用于工作流管理后台
        // data: 'xmind/data/projectModel.json', // 默认为读取路径/data/
        // projectMarkDown: 'xmind/data/projectMarkDown.md', // 默认为读取路径/plan-output
        // workflowsMarkDown: 'xmind/data/workflowsMarkDown.md', // 默认为读取路径/plan-output
      // }

    }
  }
}
