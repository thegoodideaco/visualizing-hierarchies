<template>
  <div class="component-container">
    <force-component />
  </div>
</template>

<script>
import ForceComponent from './ForceComponent.vue'
export default {
  components: {
    ForceComponent
  }
}
</script>

<style scoped lang="scss">
/deep/ svg {
  circle {
    stroke: #fff;
    // fill: transparent;
    stroke-width: 2px;
  }

  path {
    stroke: rgba(#fff, 0.5);
    stroke-width: 2px;
    fill: none;

  }
}
</style>
