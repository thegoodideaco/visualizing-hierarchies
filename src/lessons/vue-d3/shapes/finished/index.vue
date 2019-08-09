<template>
  <div class="component-container">
    <my-component />
  </div>
</template>

<script>
import MyComponent from './MyComponent.vue'
export default {
  components: {
    MyComponent
  }
}
</script>

<style scoped lang="scss">
/deep/ circle {
  fill: #48eca3;
  stroke: #fff;
  stroke-width: 3;
}
</style>
