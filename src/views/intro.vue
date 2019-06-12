<template>
  <sidenav-layout :readme="readme">
    <div class="about h-full">
      <!-- TODO: Turn this into a layout -->


      <word-node v-for="item in words"
                 :key="item.word"
                 :node="item" />
    </div>
  </sidenav-layout>
</template>î

<script>
import { extent, scaleOrdinal, csvParse } from 'd3'
import SidenavLayoutVue from '../layouts/SidenavLayout.vue'
import readme from './intro.md'
import { copyToClipboard } from '@/utils/System'
import * as d3 from 'd3'
import WordNodeVue from '../components/demos/WordNode.vue'
export default {
  components: {
    SidenavLayout: SidenavLayoutVue,
    WordNode:      WordNodeVue
  },
  data() {
    return {

      /** @type {*[]} */
      dataset:   null,
      hierarchy: null,
      readme:    () => readme,
      words:     []
    }
  },
  watch: {
    '$store.getters.wordScores': {

      handler(val) {
        this.words = JSON.parse(JSON.stringify(val)).map(w => ({
          ...w,

          // Coord plots
          x: 0,
          y: 0,
          w: 0,
          h: 0
        }))
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  display: grid;
  grid: 1fr / minmax(260px, min-content) 1fr;

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
