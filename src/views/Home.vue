<template>
  <div class="home">
    <!-- Generator Component -->
    <generator :data="dataset"
               @change="updateHierarchy" />



    <div v-if="leafGroups">
      <h3>
        Displaying <span class="text-yellow-400">
          {{ leafGroups.length }} </span> groups
      </h3>
      <div v-for="item in leafGroups"
           :key="item.path"
           class="mt-6">
        <label class="text-green-700 font-bold">{{ item.path }}</label>
        <div v-for="(app, index) in item.children"
             :key="index">
          {{ app.data.App }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { csvParse, nest } from 'd3'
import * as _ from 'lodash'
import HierarchyGeneratorVue from '../components/HierarchyGenerator.vue'

export default {
  name:       'Home',
  components: {
    Generator: HierarchyGeneratorVue
  },
  data: () => ({

    /**
       * @type {{}[]}
       */
    dataset: null,

    rootGroups: null,

    /** @type {d3.HierarchyNode[]} */
    leaves: null
  }),
  computed: {

    /**
     * @returns {{path: string, children: d3.HierarchyNode[]}[]}
     */
    leafGroups() {
      if(this.leaves && this.leaves[0]) {

        const n = nest()
          .key(l => {
            const ancestors = l.parent.ancestors().reverse()
            ancestors.shift()
            return ancestors.map(v => v.data.key).join(' / ')
          })
          .entries(this.leaves)

        return n.map(entry => ({
          path:     entry.key,
          children: entry.values
        }))
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {

      /**
       * @type {import('axios').AxiosResponse<{}[]>}
       */
      const { data } = await this.$http.get('/datasets/googleplaystore.csv')
      this.dataset = Object.freeze(_.sampleSize(csvParse(data), 1000))
    },

    /**
     * @param {d3.HierarchyNode} rootNode
     */
    updateHierarchy(rootNode) {
      if(rootNode == null) {
        Object.assign(this, {
          rootGroups: null,
          leaves:     null
        })
      }else{

        this.rootGroups = Object.freeze(rootNode.children)
        this.leaves = Object.freeze(rootNode.leaves())
      }
    }
  }
}
</script>
