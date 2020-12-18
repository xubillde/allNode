var { getDataType, firstUpper } = require("../util.js");

var getComponentUiTemp = function(name) {
  return `
<template>
  <div class="${firstUpper(name)}-ui-cmp">

  </div>
</template>

<script>
export default {
  name: '${firstUpper(name)}Ui',
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

var getComponentWrapTemp = function(name) {
  return `
<template>
  <div class="${firstUpper(name)}-wrap-cmp">
    <${firstUpper(name)}Ui></${firstUpper(name)}Ui>
  </div>
</template>

<script>
import ${firstUpper(name)}Ui from '../ui/${firstUpper(name)}Ui.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: '${firstUpper(name)}Wrap',
  components:{
    ${firstUpper(name)}Ui
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({

    }),
    ...mapGetters({

    }),
  },
  methods:{
    ...mapMutations({
      
    }),
    ...mapActions({
      
    })
  },
}
</script>

<style scoped lang='scss'>

</style>
  `
}

module.exports = {
  getComponentWrapTemp,
  getComponentUiTemp
};
