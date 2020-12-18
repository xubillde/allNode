var fs = require('ma-fs');

var { getDataType, firstUpper } = require("./util.js");

var { getPageTemp, getPageComponentTemp } = require("./template/page.js");
var { getComponentWrapTemp,getComponentUiTemp } = require("./template/component.js");
var { createRouters } = require('./router/index.js');
var { createStores } = require("./store/index.js");

var createPages = function(page_model) {
  var pages = page_model.pages;
  createRouters(page_model);
  createStores(page_model);

  pages.map(page=>createPage(page,page_model.root_dir,page_model.root_dir + '/pages'));
}

var createPage = function(page,root_dir,prev_dir, prev_name = '') {

  if(!page.name) throw new Error('页面的name不存在，无法创建');

  if(!page.pages) {
    //新建最底层的vue
    fs.touch(`${prev_dir}/${firstUpper(page.name)}.vue`,getPageComponentTemp(page,root_dir,prev_name));
    //新建各页面的组件
    page.components && createComponent(page,root_dir,prev_name);
    //新建scss文件
    fs.touch(`${root_dir}/assets/css/${prev_name}/${page.name}.scss`,'');
  } else {
    var _prev_dir = `${prev_dir}/${page.name}`;
    fs.mkdir(_prev_dir);
    //新建上一层的vue
    fs.touch(`${prev_dir}/${firstUpper(prev_name)}${firstUpper(page.name)}.vue`,getPageTemp(firstUpper(page.name)));
    //根据pages新建下一层
    page.pages.map(_page=>createPage(_page,root_dir, _prev_dir,page.name));
  }
}

var createComponent = function(page,root_dir) {
  var { name, components } = page;
  components.map(component=> {
    let prev_dir = `${root_dir}/components/${name}`;
    fs.touch(`${prev_dir}/wrap/${firstUpper(component)}Wrap.vue`,getComponentWrapTemp(name));
    fs.touch(`${prev_dir}/ui/${firstUpper(component)}Ui.vue`,getComponentUiTemp(name));
  });
}

module.exports = {
  createPages
};