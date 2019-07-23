<template>
  <div class="flex items-center justify-center">
    <my-component />
  </div>
</template>

<script>
import MyComponent from '@/lessons/vue/reactivity/finished/ReactivityComponent.vue'
export default {
  components: {
    MyComponent
  },
  data: () => ({
    input: null
  })
}
</script>

<style scoped lang="scss">
  /deep/ input {
    color: lighten(#000, 10);
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    padding: .2rem;
    display: block;
    position: relative;

  }
</style>
