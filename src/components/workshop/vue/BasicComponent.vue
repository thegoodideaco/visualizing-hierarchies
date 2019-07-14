<template>
  <div class="component-container">
    <!-- Put component element here -->
    <my-component />
  </div>
</template>

<script>
import MyComponent from '@/lessons/vue/create/MyComponent.vue'
export default {
  name:       'ComponentContainer',
  components: {
    MyComponent
  }
}
</script>