<template>
  <div class="side-layout select-none"
       :class="{'focus-text': $attrs.focusedOnText}">
    <!-- Side menu -->
    <side-nav />

    <!-- Markdown -->
    <markdown-viewer
      class="text-container overflow-auto select-text"
      :value="readme()" />

    <!-- Content Entry -->
    <div class="grid">
      <slot class="h-full">
        <router-view/>
      </slot>
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
  props: {

    /**
     * @type {function}
     */
    readme: {
      type:    [Function],
      default: () => readme
    }
  }
}
</script>

<style scoped lang="scss">
.side-layout {

  display: grid;
  height: 100%;
  grid: 100%/max-content auto 1fr;


}

.text-container {
  transition: all 400ms ease;
  width: 400px;
    .focus-text & {
      width: 50vw;
      font-size: 2em;
    }
  }

.grid {
  display: grid;
}
</style>
