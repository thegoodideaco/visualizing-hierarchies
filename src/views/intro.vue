<template>
  <sidenav-layout :readme="readme">
    <div class="about h-full">
      <!-- Content Here -->
    </div>
  </sidenav-layout>
</template>

<script>
import SidenavLayoutVue from '../layouts/SidenavLayout.vue'
import readme from './intro.md'
// import { scaleLinear, extent, nest, hierarchy } from 'd3'
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
.about {
  display: grid;
  grid: 1fr / 100%;

  > * {
    position: relative;

    &:first-child {
      padding: 10px;

      display: grid;
      grid: auto 1fr / 100%;
    }
  }
}
</style>
