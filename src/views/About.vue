<template>
  <sidenav-layout>
    <div class="about h-full">
      <div class="h-full overflow-auto">
        <h2>This is an about page</h2>
        <generator
          :data="dataset"
          :groups="groupKeys"
          @change="updateHierarchy" />
      </div>

      <div>
        <tree-layout
          v-if="hierarchy"
          :hierarchy="hierarchy"
          class="w-full h-full" />
      </div>
    </div>
  </sidenav-layout>
</template>

<script>
import HierarchyGeneratorVue from '../components/HierarchyGenerator.vue'
import { extent, scaleOrdinal, csvParse } from 'd3'
import TreeLayoutVue from '../components/TreeLayout.vue'
import SidenavLayoutVue from '../layouts/SidenavLayout.vue'
export default {
  components: {
    Generator:     HierarchyGeneratorVue,
    TreeLayout:    TreeLayoutVue,
    SidenavLayout: SidenavLayoutVue
  },
  data() {
    return {
      dataset:   null,
      hierarchy: null
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
            key:  item => item.year
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
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  display: grid;
  grid: 100% / minmax(260px, min-content) 1fr;

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
