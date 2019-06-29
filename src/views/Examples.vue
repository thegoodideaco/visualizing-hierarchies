<template>
  <sidenav-layout :readme="readme">
    <div class="examples h-full">
      Display Collection of examples
    </div>
  </sidenav-layout>
</template>

<script>
import SidenavLayoutVue from '../layouts/SidenavLayout.vue'
import readme from './examples.md'
export default {
  components: {
    SidenavLayout: SidenavLayoutVue
  },
  data() {
    return {
      readme: () => readme
    }
  }
}
</script>

<style lang="scss" scoped>
.examples {
  display: grid;
  align-items: center;
  justify-items: center;
}
</style>
