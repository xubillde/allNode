var { getDataType, firstUpper } = require("../util.js");

var getPageTemp = function(name) {
  return `
<template>
  <div class="${name}-page">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: '${name}',
  data () {
    return {

    }
  },
  methods:{

  },
}
</script>

<style scoped lang='scss'>

</style>
  `
}

var getPageComponentTemp = function(page,root_dir,prev_name) {
  var { name, components } = page;
  if(!name) throw new Error("name不存在");
  if(!components) components = [];

  var names = components.map(v=>firstUpper(v));
  return `
<template>
  <div class="${firstUpper(name)}-page">
    ${getComponentElement(names)}
  </div>
</template>

<script>
${getComponentImport(names,page,root_dir)}

export default {
  name: '${firstUpper(name)}',
  data () {
    return {

    }
  },
  ${getComponentDeclare(names,page,root_dir)}
  methods:{

  },
}
</script>

<style scoped lang='scss'>
@import '@/assets/css/${prev_name}/${name}.scss';
</style>
  `
}

var getComponentElement = function(names) {
  return names.map(name=>`<${name}Wrap></${name}Wrap>`).join("\n");
}
var getComponentImport = function(names,page,root_dir) {
  return names.map(name=>`import ${name}Wrap from '@/components/${page.name}/wrap/${name}Wrap.vue'`).join("\n");
}
var getComponentDeclare = function(names,page,root_dir) {
  return `components: {
    ${names.join(",\n")}
  },`;
}


module.exports = {
  getPageTemp,
  getPageComponentTemp
};
