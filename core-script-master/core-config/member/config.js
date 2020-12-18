
module.exports = {
  editor: 'vscode',
  frontLang: 'react',
  snippet: {

    /* ------------【使用补全】配置 ------------ */
    usage: { 

      modeShortcut: 'use', // 进入使用补全模式 默认 「use」

      // 成员路径
      paths: [
        {
          path: 'components', // 是相对于项目根路径的
          shortcut: 'cp' // default: toLower(${first letter}${last letter}) -- cs
        },
        { path: 'static' },
      ], 

      //  默认使用有三个解析器 component/image/video
      rules: [
        {
          test: /\.(js|jsx)$/, // 匹配的类型
          exclude: [
            'Ignore/index.js',
            'Clock/cignore.js',
            '/Counter/ignore.js',
            'ignore.js'
          ],
        },
        {
          test: /\.(mp4|wbpm)(\?.*)?$/,
          use: 'my-video-loader',
        }
      ]
    },

    /* ------------【引入补全】配置 ------------ */
    import: {
      modeShortcut: 'ip',
      // static文件夹经过next封装，无法使用import引入其中的资源，直接使用官网对应方法
      paths: [
        {
          shortcut: 'cp',
          path: 'components',
          exclude: ['Ignore', 'Clock/cignore.js']
        },
        {
          shortcut: 'ct',
          path: 'containers',
        },
        {
          shortcut: 'lo',
          path: 'layouts',
        },
        {
          path: 'parsers',
          shortcut: 'pr',
          use: 'my-import-parsers-loader' // 默认使用 general-import-loader
        },
        {
          shortcut: 'hoc',
          path: 'hoc',
        },
      ],
    }
  }
}


