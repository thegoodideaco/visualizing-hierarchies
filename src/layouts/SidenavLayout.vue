<template>
  <div
    :class="{
      'focus-text': $attrs.focusedOnText,
      'no-readme': !$route.meta.readme
    }"
    class="side-layout select-none">
    <!-- Side menu -->
    <side-nav class="overflow-hidden" />

    <!-- Markdown -->
    <div
      v-if="$route.meta.readme"
      class="overflow-auto grid">
      <markdown-viewer
        ref="readme"
        :value="readme()"
        class="text-container select-text"
        @hook:mounted="updateReadme" />
    </div>

    <!-- Content Entry -->
    <div class="grid content">
      <slot>
        <!-- <transition
          mode="in-out"
          name="fade"> -->
        <router-view />
        <!-- </transition> -->
      </slot>
    </div>
  </div>
</template>

<script>
import readme from './readmetest.md'
import SideNavVue from '../components/SideNav.vue'
export default {
  components: {
    MarkdownViewer: () =>
      import(/* webpackChunkName: "MarkdownViewer" */
        '../components/MarkdownDisplay.vue'),
    SideNav: SideNavVue
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
      const { innerText: text } = this.$refs.readme.$el

      this.$store.commit('setReadme', text)
    }
  }
}
</script>

<style scoped lang="scss">
.side-layout {
  display: grid;
  height: 100%;
  grid: 1fr / minmax(auto, 260px) minmax(300px, 28rem) 2fr;
  position: relative;
  overflow: hidden;

  &.no-readme {
    grid: 1fr / minmax(auto, 260px) 2fr;
  }

  > * {
    position: relative;
    height: 100%;
  }
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

.content {
  ::v-deep svg {
    circle,
    path {
      fill: transparent;
      stroke: #fff;
      stroke-width: 1px;
    }
  }
}
</style>
