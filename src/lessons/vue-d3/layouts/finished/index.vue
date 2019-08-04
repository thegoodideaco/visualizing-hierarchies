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
.component-container {
  display: grid;
  grid: 1fr / 1fr;
  overflow: hidden;
}
</style>
