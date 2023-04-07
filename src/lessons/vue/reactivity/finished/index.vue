<template>
  <div class="component-container">
    <reactivity-component />
  </div>
</template>

<script>
import ReactivityComponent from './ReactivityComponent.vue'
export default {
  components: {
    ReactivityComponent
  }
}
</script>

<style scoped lang="scss">
::v-deep input {
  padding: 0.5rem;
  color: #000;
  display: block;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  line-height: normal;
}
</style>
