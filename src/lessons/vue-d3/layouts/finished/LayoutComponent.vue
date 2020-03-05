<template>
  <div class="w-full h-full relative overflow-hidden">
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
    <div
      v-if="h"
      class="html-version">
      <div
        v-for="node in nodes"
        :key="node.data.key"
        class="html-element"
        :style="computeStyle(node)"
        :title="`${node.data.key}: ${node.value}`"
        @click.self.left="nodeClick(node)"
        @click.self.right.prevent="nodeClick(node.parent)">
        <!-- Some Content -->

        <div v-if="!node.children && fontScale(node.value) > 7">
          <span>{{ node.data.key }}</span>
          <small>{{ node.value | formatNumber }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

import chroma from 'chroma-js'

export default {
  filters: {
    formatNumber(val) {
      return d3.format('.3~s')(val).replace(/G/gi, 'B')
    },
    noSpaces(val) {
      return val.replace(/\s/gi, '')
    }
  },
  data: () => ({
    width:    100,
    height:   100,
    padding:  4,
    $dataset: null,

    /** @type {d3.HierarchyPointNode} */
    h:         null,
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
        const values = this.h.descendants().map(n => n.value)
        const [min, max] = d3.extent(values)
        const count = values.length
        const colors = d3.schemePaired
        d3.shuffle(colors)
        // colors.push('red')
        return d3
          .scaleThreshold()
          .domain(d3.ticks(min, max * 1.5, count))
          .range(colors)
      }
    },

    fontScale() {
      if (this.h) {
        return d3
          .scalePow()
          // .exponent(0.85)
          .domain(this.extent)
          .range([5, 100])
          .clamp(true)
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

    window.myComponent = this

    this.$once('hook:beforeDestroy', () => {
      delete window.myComponent
    })
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

        this.h = this.layout(node)
      }
    },

    /** @param {d3.HierarchyCircularNode} node */
    computeStyle(node) {
      const { x, y, r, value } = node

      const rx = (x - r)
      const ry = (y - r)
      const d = (r * 2)

      let color = node.depth < 1 ? 'black' : this.colorScale(value)

      if (chroma.contrast(color, 'white') < 4.5) {
        color = chroma(color).darken(2)
        console.log(node.data.key)
      }

      return {
        transform:       `translate3d(${rx}px, ${ry}px, 0)`,
        backgroundColor: color,
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
  border: .5px solid white;
  // border-width: 0;
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
