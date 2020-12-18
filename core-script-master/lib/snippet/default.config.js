'use strict';

var path = require('path');

var config = {
  // editor: null, //'vscode',
  // frontLang: null, // 'react',
  snippet: {
    usage: { // 【组件使用补全】配置
      paths: [],
      rules: [// 默认使用这三个解析器
      {
        test: /\.(js|jsx)$/, // 匹配的类型
        use: 'usage-components-loader', // :默认的组件解析器, 还可以使用自定义解析器
        exclude: [] // default: [] 在exclude中的文件夹将不会生成 
      }, {
        test: /\.(png|svg|jpe?g)(\?.*)?$/,
        use: 'usage-image-loader',
        exclude: []
      }, {
        test: /\.(mp4|wbpm)(\?.*)?$/,
        use: 'usage-video-loader',
        exclude: []
      }]
    },
    import: { // 【引入补全】配置
      paths: []
    }
  },
  index: { // 需要输出总线的成员
    paths: [],
    exclude: []
  }
};

module.exports = config;