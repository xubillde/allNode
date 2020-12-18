module.exports = {
    vueTemplate: componentName => {
        return `<template>
  <div class="${componentName}">
    ${componentName}组件
  </div>
</template>
<script>
  export default {
      name: '${componentName}'
  }
</script>
<style lang="stylus" scoped>
.${componentName} {

}
</style>`
    },
    entryTemplate: componentName => {
        return `import ${componentName} from './main.vue'
        export default [{
            path: "/${componentName}",
            name: "${componentName}",
            component: ${componentName}
        }]`
    }
}
