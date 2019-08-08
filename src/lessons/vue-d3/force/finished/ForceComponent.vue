<template>
  <svg
    height="100%"
    width="100%">
    <!-- Put content here -->

    <!-- Links -->
    <path
      v-for="(path, index) in chainedPaths"
      :key="`line-${index}`"
      :d="path"
      fill="none"
      opacity=".25"
      stroke="white"
      stroke-width="1" />

    <!-- Circles -->
    <circle
      v-for="(node, index) in filteredNodes"
      :key="index"
      :cx="node.x"
      :cy="node.y"
      :r="sizeScale(node.value)"
      stroke="white"
      stroke-width="2">
      <title>{{ node.data }}</title>
    </circle>
  </svg>
</template>

<script>
import * as d3 from 'd3'
export default {
  data: () => ({
    width:  100,
    height: 100,
    radius: {
      min: 10,
      max: 100
    },
    forces: {
      center: {
        x:        100,
        y:        100,
        strength: 1
      },
      bodies: {
        strength: -90
      }
    },

    /** @type {d3.HierarchyPointNode} */
    h: null,

    /** @type {d3.Simulation} */
    force: null
  }),
  computed: {
    sizeScale() {
      return d3
        .scaleSqrt()
        .domain(d3.extent(this.h.descendants(), n => n.value))
        .range([this.radius.min, this.radius.max])
    },

    nodes() {
      if (this.h) return this.h.descendants()
    },

    filteredNodes() {
      if (this.nodes) return this.nodes.filter(v => v.children != null)
    },

    links() {
      if (this.h)
        return this.h.links().filter(v => {
          return v.source.children != null && v.target.children != null
        })
    },

    chainedPaths() {
      if (this.h) {
        const lastBranches = this.h
          .descendants()
          .filter(v => v.depth === this.h.height)

        const nodePaths = lastBranches.map(n => n.ancestors().slice(1))

        return nodePaths.map(path => {
          return d3
            .line()
            .x(n => n.x)
            .y(n => n.y)
            .curve(d3.curveNatural)(path)
        })
      }
    }
  },
  watch: {
    'forces.bodies': {
      handler() {
        /** @type {d3.ForceManyBody} */
        const force = this.force.force('bodies')

        if (force) {
          force.strength(this.forces.bodies.strength)
        }
      },
      deep: true
    },

    forces: {
      handler() {
        this.force.alpha(0.9).restart()
      },
      deep: true
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
      const { width, height } = this.$el.getBoundingClientRect()

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
      const nester = d3
        .nest()
        .key(v => v.region)
        .key(v => v.subregion)

      const nestedData = {
        key:    'root',
        values: nester.entries(data)
      }

      // 4. Add Hierarchy to nested data
      const h = d3.hierarchy(nestedData, v => v.values)

      // 5. We must assign x and y properties so they can be observed
      h.each(node =>
        Object.assign(node, {
          x: this.width * 0.5,
          y: this.height * 0.5
        })
      )

      // Calculate totals, no need for sorting
      h.sum(v => v.value).sort((a, b) => d3.ascending(a.value, b.value))

      this.h = h

      this.initForce()
    },
    initForce() {
      // Create force simulation
      this.force = d3.forceSimulation()

      // Add x and y forces to move all nodes to the center
      this.force
        // .force('x', d3.forceX(this.width * .5))
        // .force('y', d3.forceY(this.height * .5))
        .force('center', d3.forceCenter(this.width * 0.5, this.height * 0.5))
        .force('collision', d3.forceCollide(n => this.sizeScale(n.value)))
        .force(
          'links',
          d3
            .forceLink(this.links)
            .distance(160)
            .strength(0.5)
        )
        .force(
          'bodies',
          d3.forceManyBody().strength(this.forces.bodies.strength)
        )
        .nodes(this.filteredNodes)
        .alphaDecay(0.002)
        .alpha(0.9)
    },
    updateForce() {

      /**
       * @type {{center: d3.ForceCenter, collision: d3.ForceCollide, links: d3.ForceLink, bodies: d3.ForceManyBody}}
       */
      const forces = {
        center:    this.force('center'),
        collision: this.force('collision'),
        links:     this.force('links'),
        bodies:    this.force('bodies')
      }

      // Update all of them

      forces.center
        .x(this.width * .5)
        .y(this.height * .5)

      forces.collision
        .radius(node => this.sizeScale(node.value))

      forces.links
        .distance(160)
        .strength(.9)

      forces.bodies
        .theta(.9)

      // Restart the force
      this.force.restart()


    }
  }
}
</script>

<style></style>
