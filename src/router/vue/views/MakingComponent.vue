<template>
  <div class="flex items-center justify-center">
    <my-component />
  </div>
</template>

<script>
import MyComponentVue from '@/lessons/vue/create/index.vue'
export default {
  components: {
    MyComponent: MyComponentVue
  }
}
</script>

<style></style>
