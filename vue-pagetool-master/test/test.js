var { createPages } = require("../lib/index.js");

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