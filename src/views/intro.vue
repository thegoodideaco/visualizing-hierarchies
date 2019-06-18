<template>
  <sidenav-layout :readme="readme">
    <div class="about h-full">
      <!-- TODO: Turn this into a layout -->


      <!-- <word-node v-for="item in words"
                 :key="item.word"
                 :node="item" /> -->

      <tree-layout v-if="hierarchy"
                   :hierarchy="hierarchy">
        <template v-slot="item">
          {{ item.data.word }}
        </template>
      </tree-layout>
    </div>
  </sidenav-layout>
</template>î

<script>
import SidenavLayoutVue from '../layouts/SidenavLayout.vue'
import readme from './intro.md'
import * as d3 from 'd3'
// import WordNodeVue from '../components/demos/WordNode.vue'
import TreeLayoutVue from '../components/TreeLayout.vue'
export default {
  components: {
    SidenavLayout: SidenavLayoutVue,
    // WordNode:      WordNodeVue,
    TreeLayout:    TreeLayoutVue
  },
  data() {
    return {

      /** @type {*[]} */
      dataset:   null,
      hierarchy: null,
      readme:    () => readme,

      /**
       * @type {{word: string, value: number}[]}
       */
      words: []
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


        if(val) {

          /**
           * @type {d3.Nest<{word: string, value: number}>}
           */
          const n = d3.nest()
          n.key(v => v.word.toLowerCase().substr(0, 1))
            .sortKeys((a, b) => b > a ? 1 : b < a ? -1 : 0)
          n.key(v => v.value)


          this.hierarchy = d3.hierarchy({
            key:    'all',
            values: n.entries(val)
          }, i => i.values)
        }
      },
      immediate: true
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
