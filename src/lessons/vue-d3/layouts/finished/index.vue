<template>
  <div class="component-container">
    <layout-component />
  </div>
</template>

<script>
import LayoutComponent from './LayoutCluster.vue'
export default {
  components: {
    LayoutComponent
  }
}
</script>

<style scoped lang="scss">
.component-container {
  display: grid;
  grid: 1fr / 1fr;
  overflow: hidden;

  /deep/ circle {
    stroke: #fff;
    stroke-width: 1;
  }
}
</style>
