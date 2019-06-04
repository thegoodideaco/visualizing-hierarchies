<template>
  <sidenav-layout :readme="readme">
    <div class="about h-full">
      <div class="h-full overflow-auto">
        <h2>This is an about page</h2>
        <generator v-if="dataset"
                   :data="dataset"
                   :groups="groupKeys"
                   @change="updateHierarchy" />
      </div>

      <div>
        <tree-layout
          v-if="hierarchy"
          :show-leafs="false"
          :hierarchy="hierarchy"
          class="w-full h-full">
          <template v-slot="item">
            <!-- Hello {{ Object.keys(item) }} -->

            <label>
              {{ item.data.key }} {{ item.value }}
            </label>

            <button @click="copyLeafs(item)">
              copy
            </button>
          </template>
        </tree-layout>
      </div>
    </div>
  </sidenav-layout>
</template>

<script>
import HierarchyGeneratorVue from '../components/HierarchyGenerator.vue'
import { extent, scaleOrdinal, csvParse } from 'd3'
import TreeLayoutVue from '../components/TreeLayout.vue'
import SidenavLayoutVue from '../layouts/SidenavLayout.vue'
import readme from './about.md'
import { copyToClipboard } from '@/utils/System'
export default {
  components: {
    Generator:     HierarchyGeneratorVue,
    TreeLayout:    TreeLayoutVue,
    SidenavLayout: SidenavLayoutVue
  },
  data() {
    return {

      /** @type {*[]} */
      dataset:   null,
      hierarchy: null,
      readme:    () => readme
    }
  },
  computed: {
    populationScale() {
      if (this.dataset)
        return scaleOrdinal()
          .range(['small', 'medium', 'large'])
          .domain(extent(this.dataset, item => +item.value))
    },
    groupKeys() {
      if (this.dataset) {
        return [
          {
            name: 'Make',
            key:  item => item.name.split(' ')[0]
          },

          {
            name: 'Model',
            key:  item => item.name.split(' ')[1]
          },

          {
            name: 'Cylinders',
            key:  item => item.cylinders
          },

          {
            name: 'Year',
            key:  item => +item.year
          },
          {
            name: 'Before 1980',
            key:  item => {
              const y = +item.year

              if(y < 80) {
                return 'Before'
              }else{
                return 'After'
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    updateHierarchy(h) {
      this.hierarchy = h
    },

    async init() {
      const { data } = await this.$http.get('/datasets/cars.csv')

      this.dataset = csvParse(data)

      return data
    },

    /**
     * Copies the data items from a node
     * @param {d3.HierarchyRectangularNode} node
     */
    copyLeafs(node) {
      const rawData = node.leaves().map(leafNode => leafNode.data)



      this.dataset = this.dataset.filter(d => !rawData.includes(d))



      // debugger

      copyToClipboard(
        // csvFormat(rawData)
        JSON.stringify(rawData, null, ' ')
      )
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
