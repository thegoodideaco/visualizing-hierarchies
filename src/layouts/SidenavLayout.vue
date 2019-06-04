<template>
  <div class="side-layout">
    <!-- Side menu -->
    <aside class="side-nav">
      Logo Here
    </aside>

    <!-- Markdown -->
    <markdown-viewer style="max-width: 28vw"
                     class="overflow-auto"
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
export default {
  components: {
    MarkdownViewer: MarkdownDisplayVue
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
  grid: 100%/minmax(300px, max-content) minmax(400px, max-content) 1fr
}

.grid {
  display: grid;
}
</style>
