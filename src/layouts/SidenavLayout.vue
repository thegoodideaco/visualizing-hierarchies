<template>
  <div
    class="side-layout select-none"
    :class="{'focus-text': $attrs.focusedOnText}">
    <!-- Side menu -->
    <side-nav />

    <!-- Markdown -->
    <markdown-viewer
      ref="readme"
      class="text-container overflow-auto select-text"
      :value="readme()"
      @hook:mounted="updateReadme" />

    <!-- Content Entry -->
    <div class="grid">
      <slot>
        <transition name="fade"
                    mode="out-in">
          <router-view />
        </transition>
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
     * @type {Vue.PropOptions<function>}
     */
    readme: {
      type: [Function],
      default() {

        /**
         * If available, load as async
         */
        return this.$route.meta.readme || readme
      }
    }
  },
  watch: {

    /**
     * @type {Vue.WatchHandler}
     */
    readme: {
      handler() {
        // this.$store.commit('setReadme', this.readme())
      },
      immediate: true
    }
  },
  methods: {
    async updateReadme() {
      await this.$nextTick()

      // debugger

      /**
       * @type {HTMLElement}
       */
      const {
        innerText: text
      } = this.$refs.readme.$el

      this.$store.commit('setReadme', text)
    }
  }
}
</script>

<style scoped lang="scss">
.side-layout {

  display: grid;
  height: 100%;
  grid: 100%/minmax(auto, 260px) minmax(400px, 1fr) 2fr;


}

.text-container {
  transition: all 400ms ease;
  // width: 400px;
    .focus-text & {
      width: 50vw;
      font-size: 2em;
    }
  }

.grid {
  display: grid;
  overflow: auto;
  position: relative;
}
</style>
