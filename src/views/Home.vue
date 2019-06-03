<template>
  <div class="home">
    <!-- Generator Component -->
    <generator
      :data="dataset"
      :groups="groupKeys"
      @change="updateHierarchy" />

    <div v-if="leafGroups">
      <h3>
        Displaying
        <span class="text-yellow-400">{{ leafGroups.length }}</span> groups
      </h3>
      <div
        v-for="item in leafGroups"
        :key="item.path"
        class="mt-6">
        <label class="text-green-700 font-bold">{{ item.path }}</label>
        <div
          v-for="(app, index) in item.children"
          :key="index">
          {{ app.data.artists }} - {{ app.data['name'] }} - {{ app.data['duration_ms'] | inMinutes }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  csvParse,
  nest,
  scaleQuantile,
  extent,
  timeFormat,
  descending,
  ascending
} from 'd3'
// import * as _ from 'lodash'
import HierarchyGeneratorVue from '../components/HierarchyGenerator.vue'

export default {
  name:       'Home',
  components: {
    Generator: HierarchyGeneratorVue
  },
  filters: {
    inMinutes(msStr) {
      return timeFormat('%M Min %S Sec')(new Date(+msStr))
    }
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
     * Group of leaves
     * @returns {{path: string, children: d3.HierarchyNode[]}[]}
     */
    leafGroups() {
      if (this.leaves && this.leaves[0]) {
        const n = nest()
          .key(l => {
            const ancestors = l.parent.ancestors().reverse()
            ancestors.shift()
            return ancestors.map(v => v.data.key).join(' / ')
          })
          .sortValues(ascending)
          .entries(this.leaves)

        return n.map(entry => ({
          path:     entry.key,
          children: entry.values
        }))
      }
    },

    danceScale() {
      return scaleQuantile()
        .domain(extent(this.dataset, i => +i.danceability))
        .range([
          'no dancing',
          'barely any dancing',
          'a little dancing',
          'alot of dancing',
          'so much fucking dancing'
        ])
    },

    tempoScale() {
      return scaleQuantile()
        .domain(extent(this.dataset, i => +i.tempo))
        .range(['low tempo', 'med tempo', 'hi tempo', 'super hi tempo'])
    },
    durationScale() {
      return scaleQuantile()
        .domain(extent(this.dataset, i => +i.duration_ms))
        .range([
          'really short',
          'short',
          'average',
          'average',
          'average',
          'average',
          'long',
          'super long'
        ])
    },

    /** @returns {{name: string, key: (item) => any}[]} */
    groupKeys() {
      return [
        {
          name:     'Artist',
          key:      item => item.artists,
          sortKeys: (a, b) =>
            a.artists > b.artists ? 1 : a.artists < b.artists ? -1 : 0
        },
        {
          name: 'Dancing',
          key:  item => {
            return this.danceScale(+item.danceability)
          },
          sortKeys: descending
        },
        {
          name: 'Tempo',
          key:  item => {
            return this.tempoScale(+item.tempo)
          }
        },
        {
          name: 'Duration',
          key:  item => {
            return this.durationScale(+item.duration_ms)
          }
        }
      ]
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
      const { data } = await this.$http.get('/datasets/spotify-2018.csv')
      this.dataset = Object.freeze(csvParse(data))
    },

    /**
     * @param {d3.HierarchyNode} rootNode
     */
    updateHierarchy(rootNode) {
      if (rootNode == null) {
        Object.assign(this, {
          rootGroups: null,
          leaves:     null
        })
      } else {
        this.rootGroups = Object.freeze(rootNode.children)
        this.leaves = Object.freeze(rootNode.leaves())
      }
    }
  }
}
</script>
