<template>
  <sidenav-layout :readme="readme">
    <div class="about h-full">
      Defining content
    </div>
  </sidenav-layout>
</template>

<script>
//@ts-check

// import { extent, scaleOrdinal } from 'd3'
import SidenavLayoutVue from '../layouts/SidenavLayout.vue'
import readme from './about.md'
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

}
</style>
