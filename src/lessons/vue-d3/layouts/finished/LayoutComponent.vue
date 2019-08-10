<template>
  <div class="w-full h-full relative">
    <resize-observer @notify="updateSize()" />

    <!-- SVG Version -->
    <!-- <svg width="100%"
         height="100%">
      <circle v-for="(node, index) in nodes"
              :key="index"
              :cx="node.x"
              :cy="node.y"
              :r="node.r"
              fill="rgba(255,255,255,.5)"
              @click="nodeClick(node)" />
    </svg>-->

    <!-- HTML Version -->
    <div v-if="h"
         class="html-version">
      <div
        v-for="(node, index) in nodes"
        v-show="node.parent"
        :key="index"
        class="html-element"
        :style="computeStyle(node)"
        :title="`${node.data.key}: ${node.value}`"
        @click="nodeClick(node)">
        <!-- Some Content -->

        <div v-if="!node.children && fontScale(node.value) > 4">
          <span>{{ node.data.key }}</span>
          <small>{{ node.value | formatNumber }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

const interpolaterNames = [
  'interpolateBrBG',
  'interpolatePRGn',
  'interpolatePiYG',
  'interpolatePuOr',
  'interpolateRdBu',
  'interpolateRdGy',
  'interpolateRdYlBu',
  'interpolateRdYlGn',
  'interpolateSpectral',
  'interpolateBuGn',
  'interpolateBuPu',
  'interpolateGnBu',
  'interpolateOrRd',
  'interpolatePuBuGn',
  'interpolatePuBu',
  'interpolatePuRd',
  'interpolateRdPu',
  'interpolateYlGnBu',
  'interpolateYlGn',
  'interpolateYlOrBr',
  'interpolateYlOrRd',
  'interpolateBlues',
  'interpolateGreens',
  'interpolateGreys',
  'interpolatePurples',
  'interpolateReds',
  'interpolateOranges',
  'interpolateCubehelixDefault',
  'interpolateRainbow',
  'interpolateWarm',
  'interpolateCool',
  'interpolateSinebow',
  'interpolateViridis',
  'interpolateMagma',
  'interpolateInferno',
  'interpolatePlasma'
]

export default {
  filters: {
    formatNumber(val) {
      return d3.format(',.5~s')(val)
    }
  },
  data: () => ({
    width:    100,
    height:   100,
    padding:  4,
    $dataset: null,

    /** @type {d3.HierarchyPointNode} */
    h:      null,
    colors: {
      small: 'black',
      large: 'white'
    },
    intIndex:  28,
    nestOrder: ['region', 'subregion']
  }),
  computed: {
    layout() {
      const layout = d3
        .pack()
        .size([this.width, this.height])
        .padding(this.padding)
      // .radius(v => v.value)

      return layout
    },

    extent() {
      if (this.h) {
        return d3.extent(this.h.descendants(), n => n.value)
      }
    },

    /**
     * Map colors to the value of each node
     */
    colorScale() {
      if (this.h) {
        return d3
          .scaleSequential()
          .interpolator(d3[interpolaterNames[this.intIndex]])
          .domain(this.extent || [0, this.h.value])
        // .range([this.colors.small, this.colors.large])
      }
    },

    fontScale() {
      if (this.h) {
        return d3
          .scalePow()
          .exponent(0.65)
          .domain(this.extent)
          .range([0.1, Math.min(this.width, this.height) * 0.14])
      }
    },

    /**
     * The branch nodes to be rendered
     */
    nodes() {
      if (this.h) {
        return this.h.descendants()
      } else {
        return null
      }
    },

    nester() {
      const n = d3.nest()

      this.nestOrder.forEach(str => {
        n.key(node => node[str])
      })

      return n
    }
  },
  watch: {
    layout() {
      if (!this.h) return
      this.layout(this.h)
    },
    nester() {
      this.initHierarchy(this.$data.$dataset)
    }
  },
  async mounted() {
    // Assign Sizes
    this.updateSize()

    // 1. Load the data
    const data = await d3.json('/datasets/populations.json')
    this.$data.$dataset = Object.freeze(data)
    this.initHierarchy(this.$data.$dataset)
  },
  methods: {
    updateSize() {
      const { width, height } = this.$el.getBoundingClientRect()
      this.width = width
      this.height = height
    },

    /** @param {d3.HierarchyCircularNode} node */
    nodeClick(node) {
      const isLeaf = !node.children
      console.clear()
      if (isLeaf) {
        console.log(node.data.key, node.value)
      } else {
        console.log(
          node.data.key,
          node
            .descendants()
            .slice(1)
            .sort((a, b) => d3.descending(a.value, b.value))
            .map(n => `${n.data.key}: ${n.value}`)
        )
      }
    },

    /** @param {d3.HierarchyCircularNode} node */
    computeStyle(node) {
      const { x, y, r, value } = node

      const rx = ~~(x - r)
      const ry = ~~(y - r)
      const d = ~~(r * 2)

      return {
        transform:       `translate3d(${rx}px, ${ry}px, 0)`,
        backgroundColor: this.colorScale(value),
        width:           `${d}px`,
        height:          `${d}px`,
        fontSize:        `${this.fontScale(value)}px`
      }
    },

    initHierarchy(data) {
      const nestedData = {
        key:    'root',
        values: this.nester.entries(data || this.$data.$dataset)
      }

      // 3. Add Hierarchy to nested data
      const h = d3.hierarchy(nestedData, v => v.values)

      // Calculate Totals and sort
      h.sum(v => v.value)
      h.sort((a, b) => d3.ascending(a.value, b.value))

      // 4. Apply a layout to the hierarchy
      this.layout(h)

      this.h = h
    }
  }
}
</script>

<style scoped lang="scss">
.html-version {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.html-element {
  position: absolute;
  background-color: green;
  border: 1.5px solid white;
  border-radius: 50%;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
  // padding: 3px;

  display: grid;
  align-items: center;
  justify-content: center;
  transition: all 500ms ease;

  > div {
    align-self: center;
    display: grid;
    grid: min-content min-content / 1fr;
    line-height: 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: none;
  }

  small {
    font-size: 0.5em;
    margin: 0;
  }
}
</style>
