var fs = require("ma-fs");
var { getDataType, firstUpper } = require("../util.js");

var names = ['actions','getters','mutations','state'];

var createStores = function(page_model) {
  const { pages,root_dir } = page_model;

  pages.map(page=>{
    let filename = `${root_dir}/store/modules/${page.name}/`;
    var names = ['actions','getters','mutations','state'];
    //新建其余4个js
    names.map(name=> fs.touch(`${filename}${name}.js`,`
var ${name} = {

}
export default ${name}
    `));
    //新建index.js
    fs.touch(`${filename}index.js`,`
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

var store = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
export default store
    `)
  });   
}

module.exports = {
  createStores
};