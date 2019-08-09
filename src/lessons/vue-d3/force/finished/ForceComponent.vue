<template>
  <svg
    height="100%"
    width="100%">
    <!-- Links -->
    <path v-for="(item, index) in h.links()"
          :key="`p${index}`"
          :d="lineGenerator([item.source, item.target])" />

    <!-- Nodes -->
    <circle v-for="(node, index) in h.descendants()"
            :key="index"
            :cx="node.x"
            :cy="node.y"
            :fill="colorScale(node.value)"
            :r="getSize(node)"
            @click.self="onClick(node)" />
  </svg>
</template>

<script>
import * as d3 from 'd3'
export default {
  data: () => ({
    width:  100,
    height: 100,

    /** @type {d3.HierarchyPointNode} */
    h: d3.hierarchy({}),

    force: d3.forceSimulation(),

    /** @type {d3.Line<d3.HierarchyPointNode>} */
    lineGenerator: d3.line()
      .x(node => node.x)
      .y(node => node.y)
  }),
  computed: {
    colorScale() {
      return d3.scalePow().exponent(.2)
        .domain(d3.extent(this.h.descendants(), n => n.value))
        .range(['green', 'red'])
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    updateSize() {
      const { width, height } = this.$el.getBoundingClientRect()
      this.width = width
      this.height = height
    },

    async init() {
      // 1. Assign Sizes
      this.updateSize()

      // 2. Load the data
      const data = await d3.json('/datasets/populations.json')

      // 3. Nest the data
      const nester = d3
        .nest()
        .key(v => v.region)
        .key(v => v.subregion)

      const nestedData = {
        key:    'root',
        values: nester.entries(data)
      }

      // 4. Add Hierarchy
      const h = d3.hierarchy(nestedData, v => v.values)

      // Calculate totals and sort
      h.sum(v => v.value)
      h.sort((a, b) => d3.ascending(a, b))

      /**
       * ! Important: We must add x and y properties
       * ! to each node in order for vue to observe changes
       */
      const descendants = h.descendants()
      descendants.forEach(node =>
        Object.assign(node, {
          x: this.width * 0.5,
          y: this.height * 0.5
        })
      )

      // 6. Assign the hierarchy to our data object
      this.h = h

      this.setupForces()
      this.force.nodes(descendants).alpha(.9).alphaDecay(.02)
    },

    setupForces() {
      this.force
        // .force('x', d3.forceX(this.width * 0.5).strength(.02))
        // .force('y', d3.forceY(this.height * 0.5).strength(.02))
        .force('center', d3.forceCenter(this.width * .5, this.height *.5))
        .force('collision', d3.forceCollide(this.getSize))
        .force('links', d3.forceLink(this.h.links()).distance(this.getLinkDistance).strength(.9))
        .force('bodies', d3.forceManyBody().strength(-110).distanceMin(10).distanceMax(220))
    },

    getSize(node) {
      return node.children != null ? 5 : 10
    },

    getLinkDistance(link) {
      return link.source.children ? 25 : 65
    },

    onClick(node) {
      console.log(node)
    }
  }
}
</script>
