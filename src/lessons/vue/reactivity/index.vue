<template>
  <div class="component-container">
    <reactivity-component />
  </div>
</template>

<script>
import ReactivityComponentVue from './ReactivityComponent.vue'
export default {
  components: {
    ReactivityComponent: ReactivityComponentVue
  }
}
</script>

<style scoped lang="scss">
/deep/ input {
  padding: 0.5rem;
  color: #000;
  display: block;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  line-height: normal;
}
</style>
