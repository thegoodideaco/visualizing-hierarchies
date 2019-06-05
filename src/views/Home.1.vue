<template>
  <div class="home h-full">
    <div>
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
      </div>
    </div>

    <div>
      <div
        v-if="treeNodes"
        ref="container"
        class="tree-view">
        <div
          v-for="(item, index) in treeNodes"
          :key="index"
          class="p-2"
          :style="treeStyle(item)"
          @click="$emit('click', item)">
          {{ item.data.key }} - {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as d3 from 'd3'
// import * as _ from 'lodash'
import HierarchyGeneratorVue from '../components/HierarchyGenerator.vue'

export default {
  name:       'Home',
  components: {
    Generator: HierarchyGeneratorVue
  },
  filters: {
    inMinutes(msStr) {
      return d3.timeFormat('%M Min %S Sec')(new Date(+msStr))
    }
  },
  data: () => ({
    /**
     * @type {{}[]}
     */
    dataset: null,

    /** @type {d3.HierarchyNode<any>?} */
    rootNode: null,

    rootGroups: null,

    /** @type {d3.HierarchyNode<any>[]?} */
    leaves: null
  }),
  computed: {
    /**
     * Group of leaves
     * @returns {{path: string, children: d3.HierarchyNode<any>[]}[] | undefined}
     */
    leafGroups() {
      if (this.leaves && this.leaves[0]) {
        const n = d3
          .nest()
          .key(l => {
            const ancestors = l.parent.ancestors().reverse()
            ancestors.shift()
            return ancestors.map(v => v.data.key).join(' / ')
          })
          .sortValues(d3.ascending)
          .entries(this.leaves)

        return n.map(entry => ({
          path:     entry.key,
          children: entry.values
        }))
      }
    },

    /** @returns {d3.ScaleQuantile<string>} */
    danceScale() {
      /** @type {d3.ScaleQuantile<string>} */
      const scale = d3
        .scaleQuantize()
        // @ts-ignore
        .domain(d3.extent(this.dataset, i => +i.danceability))
        .range([
          'no dancing',
          'barely any dancing',
          'a little dancing',
          'alot of dancing',
          'so much fucking dancing'
        ])

      return scale
    },

    tempoScale() {
      /** @type {d3.ScaleQuantile<string>} */
      const s = d3
        .scaleQuantile()
        .domain(d3.extent(this.dataset, i => +i['tempo']))
      s.range(['low tempo', 'med tempo', 'hi tempo', 'super hi tempo'])
      return s
    },
    speechScale() {
      return d3
        .scaleQuantile()
        .domain(d3.extent(this.dataset, i => +i.speechiness))
        .range(['not speachy', 'kinda speechy', 'chatterbox'])
    },
    durationScale() {
      return d3
        .scaleQuantile()
        .domain(d3.extent(this.dataset, i => +i.duration_ms))
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
          sortKeys: d3.descending
        },
        {
          name: 'Tempo',
          key:  item => {
            return this.tempoScale(+item.tempo)
          }
        },
        {
          name: 'Speech',
          key:  item => {
            return this.speechScale(+item.speechiness)
          }
        },
        {
          name: 'Duration',
          key:  item => {
            return this.durationScale(+item.duration_ms)
          }
        },
        {
          name: 'Same beginning letter',
          key:  item => {
            const firstLetter = item.artists.substr(0, 1).toUpperCase()
            return firstLetter
          }
        },
        {
          name: 'Amount of words in title',
          key:  item => _.words(item.name).length
        },
        {
          name: 'Amount of words in artists name',
          key:  item => _.words(item.artists).length
        }
      ]
    },

    /** @returns {d3.HierarchyRectangularNode[]} */
    treeNodes() {
      if(!this.rootNode) return []
      const nodes = []
      this.rootNode.eachBefore(n => {
        if(n.children) nodes.push(n)
      })

      return nodes
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
      this.dataset = Object.freeze(d3.csvParse(data))
    },

    /**
     * @param {d3.HierarchyNode} rootNode
     */
    updateHierarchy(rootNode) {
      if (rootNode == null) {
        Object.assign(this, {
          rootGroups: null,
          leaves:     null,
          rootNode:   null
        })
      } else {
        rootNode.count().sort((a, b) => b.value - a.value)

        const {
          width,
          height
        } = this.$refs.container.getBoundingClientRect()

        const tree = d3
          .treemap()
          .size([width, height])
          .padding(10)
          .paddingTop(40)
          .tile(d3.treemapResquarify)(rootNode)

        this.rootGroups = tree.children
        this.leaves = Object.freeze(tree.leaves())

        this.rootNode = rootNode
      }
    },

    /**
     * @param {import('d3').HierarchyRectangularNode} treeNode
     */
    treeStyle(treeNode) {
      const { x0, x1, y0, y1 } = treeNode
      const v = treeNode.parent ? d3.max(treeNode.parent.children, v => v.value) * 2 : this.rootNode.value
      const colorScale = d3.scaleQuantile()
        .domain([0, v])
        .range(d3.ticks(0, 1, 20).map(n => d3.interpolateRgb('#161a1c', '#5d6e76')(n)))

      return {
        top:             `${y0}px`,
        left:            `${x0}px`,
        width:           `${x1 - x0}px`,
        height:          `${y1 - y0}px`,
        position:        'absolute',
        backgroundColor: colorScale(treeNode.value),
        zIndex:          treeNode.depth
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid: 100% / minmax(300px, max-content) 1fr;

  > * {
    display: grid;
    position: relative;
    padding: 10px;
  }
}

.tree-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  > * {
    transform: translateZ(0);
    background-color: rgba(green, .1);
    border: 1px solid black;
    transition: all 500ms ease;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }
}
</style>
