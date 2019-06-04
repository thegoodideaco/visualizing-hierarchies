<template>
  <div class="side-layout select-none">
    <!-- Side menu -->
    <side-nav />

    <!-- Markdown -->
    <markdown-viewer style="max-width: 28vw"
                     class="overflow-auto select-text"
                     :value="readme" />

    <!-- Content Entry -->
    <div class="grid">
      <slot class="h-full" />
    </div>
  </div>
</template>

<script>
import readme from './readmetest.md'
import MarkdownDisplayVue from '../components/MarkdownDisplay.vue'
import SideNavVue from '../components/SideNav.vue'
export default {
  components: {
    MarkdownViewer: MarkdownDisplayVue,
    SideNav:        SideNavVue
  },
  data() {
    return {
      readme
    }
  }
}
</script>

<style scoped lang="scss">
.side-layout {

  display: grid;
  height: 100%;
  grid: 100%/minmax(350px, max-content) minmax(400px, max-content) 1fr
}

.grid {
  display: grid;
}
</style>
