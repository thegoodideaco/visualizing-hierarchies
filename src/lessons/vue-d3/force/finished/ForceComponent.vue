<template>
  <svg width="100%"
       height="100%">
    <!-- Put content here -->

    <circle v-for="(node, index) in nodes"
            :key="index"
            r="10"
            :cx="node.x"
            :cy="node.y"
            fill="white">
      <title>{{ node.data }}</title>
    </circle>

    <!-- Links -->
    <path v-for="(path, index) in chainedPaths"
          :key="`line-${index}`"
          :d="path"
          stroke="white"
          fill="none"
          opacity=".25"
          stroke-width="1" />

  </svg>
</template>

<script>
import * as d3 from 'd3'
export default {
  data: () => ({
    width:  100,
    height: 100,

    /** @type {d3.HierarchyPointNode} */
    h: null,

    /** @type {d3.Simulation} */
    force: null
  }),
  computed: {
    layout() {
      const layout = d3.pack()
        .size([
          this.width,
          this.height
        ])
        // .padding(this.padding)
        // .radius(v => v.value)


      return layout
    },

    nodes() {
      if(this.h) return this.h.descendants()
    },

    links() {
      if(this.h) return this.h.links()
    },

    chainedPaths() {
      if(this.h) {
        const lastBranches = this.h.descendants().filter(v => v.depth === this.h.height)

        const nodePaths = lastBranches.map(n => n.ancestors().slice(1))

        return nodePaths.map(path => {
          return d3.line()
            .x(n => n.x)
            .y(n => n.y)
            .curve(d3.curveNatural)(path)
        })
      }
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.force.stop()
  },
  methods: {
    updateSize() {
      const {
        width,
        height
      } = this.$el.getBoundingClientRect()

      this.width = width
      this.height = height
    },

    async init() {
      // 1. Assign Sizes
      this.updateSize()

      // 2. Load the data
      const data = await d3.json('/datasets/populations.json')

      // console.log('data loaded', data)


      // 3. Nest the data
      const nester = d3.nest()
        .key(v => v.region)
        .key(v => v.subregion)

      const nestedData = {
        key:    'root',
        values: nester.entries(data)
      }


      // 4. Add Hierarchy to nested data
      const h = d3.hierarchy(nestedData, v => v.values)

      // 5. We must assign x and y properties so they can be observed
      h.each(node => Object.assign(node, {
        x: this.width * .5,
        y: this.height * .5
      }))

      // Calculate totals, no need for sorting
      h.sum(v => v.value)

      this.h = h


      // Create force simulation
      this.force = d3.forceSimulation()

      // Add x and y forces to move all nodes to the center
      this.force
        .force('x', d3.forceX(this.width * .5))
        .force('y', d3.forceY(this.height * .5))
        .force('collision', d3.forceCollide(10))
        .force('links', d3.forceLink(this.links).distance(n => n.children ? 150 : 10).strength(1))
        .force('bodies', d3.forceManyBody().strength(-80))
        .nodes(this.nodes)
        .alphaDecay(.002)
        .alpha(.9)
        .tick(30)

    }
  }

}
</script>

<style></style>
