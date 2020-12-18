var fs = require("ma-fs");
var { getDataType, firstUpper } = require("../util.js");

var createRouters = function(page_model) {
  const { pages,root_dir } = page_model;

  pages.map(page=>{
    let filename = `${root_dir}/router/${page.name}.js`;
    createRouter(page,filename);
  })
      
}

var createRouter = function(page,filename) {
  fs.touch(filename,getJs(page), true);
}

var getJs = function(page) {
  var temp = getComponents(page);
  temp += `

export default {
  path: '/${firstUpper(page.name)}',
  component: ${firstUpper(page.name)}View,
  ${getChildren(page)}
}
  `;
  return temp;
}
var getComponents = function(page,prev_dir = '',prev_name = '') {
  var name = firstUpper(page.name);
  var temp = `const ${name}View = () => import('@/pages/${prev_dir}${firstUpper(prev_name)}${name}');\n`;
  if(!page.pages) {
    temp = `const ${prev_name}${name} = () => import('@/pages/${prev_dir}${name}');`;
  }
  page.pages && (temp += page.pages.map(_page=>getComponents(_page,`${prev_dir}${page.name}/`,name)).join("\n"));
  return temp;
}

var getChildren = function(page, prev_name = '') {
  if(!page.pages) return '';
  var temp = 'children: [' + page.pages.map(_page=>{
    return `
    {
      path: '${_page.name}',
      component: ${_page.pages? '' : firstUpper(page.name) }${firstUpper(_page.name)}${_page.pages? 'View' : ''},
      ${getChildren(_page,page.name)}
    }`
  }).join(",") + ']';
  return temp;
}
module.exports = {
  createRouters
};