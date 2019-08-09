<template>
  <svg height="100%"
       width="100%">
    <!-- Put content here -->

    <!-- Links -->
    <path
      v-for="(link, index) in links(h)"
      :key="`line-${index}`"
      :d="path(link)"
      fill="none"
      opacity=".5"
      stroke="white"
      stroke-width="2" />

    <!-- Circles -->
    <circle
      v-for="(node, index) in descendants(h)"
      :key="index"
      :cx="node.x"
      :cy="node.y"
      :r="sizeScale(node.value)"
      stroke="white"
      stroke-width="2"
      @click.self="nodeClick(node)">
      <title>Expanded: {{ node.expanded }}</title>
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
      min: 8,
      max: 50
    },
    forces: {
      center: {
        x:        100,
        y:        100,
        strength: 1
      },
      bodies: {
        strength: -20
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
    lineGenerator() {
      return d3
        .line()
        .x(n => n.x)
        .y(n => n.y)
      // .curve(d3.curveBundle)
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

    links(node) {
      if (node) {
        const links = node.links()

        return links
      }
    },

    path(link) {
      return this.lineGenerator([link.source, link.target])
    },

    descendants(node) {
      if (node) {
        const nodes = node.descendants()
        // .filter(n => {
        //   const isRoot = n.parent == null

        //   return isRoot || n.parent.expanded === true
        // })
        return nodes
      }
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
        .force(
          'x',
          d3
            .forceX(n => {
              return n.parent ? n.parent.x : this.width * 0.5
            })
            .strength(0)
        )
        .force(
          'y',
          d3
            .forceY(n => {
              return n.parent ? n.parent.y : this.height * 0.5
            })
            .strength(0)
        )
        .force('center', d3.forceCenter(this.width * 0.5, this.height * 0.5))
        .force('collision', d3.forceCollide(n => this.sizeScale(n.value)))
        .force(
          'links',
          d3
            .forceLink(this.links(this.h))
            .distance(70)
            .strength(0.9)
        )
        .force(
          'bodies',
          d3.forceManyBody().strength(this.forces.bodies.strength)
        )
        .nodes(this.descendants(this.h))
        .alphaDecay(0.002)
        .alpha(0.9)
    },
    updateForce() {
      // this.force.nodes(this.descendants(this.h))

      const nodes = this.descendants(this.h)

      /**
       * @type {{center: d3.ForceCenter, collision: d3.ForceCollide, links: d3.ForceLink, bodies: d3.ForceManyBody, x: d3.ForceX, y: d3.ForceY}}
       */
      const forces = {
        center:    this.force.force('center'),
        collision: this.force.force('collision'),
        links:     this.force.force('links'),
        bodies:    this.force.force('bodies'),
        x:         this.force.force('x'),
        y:         this.force.force('y')
      }

      this.force.nodes(nodes)

      // Update all of them

      forces.center.x(this.width * 0.5).y(this.height * 0.5)

      forces.collision.radius(node => {
        if (node.expanded) {
          return this.sizeScale(node.value)
        } else {
          return 0
        }
      })

      forces.links
        // .links(this.links(this.h))
        .distance(link => {
          const {
            // source
            target
          } = link

          if (target.expanded) {
            return 70
          } else {
            return 0
          }
        })
        .strength(link => {
          const {
            // source
            target
          } = link

          if (target.expanded) {
            return 0.9
          } else {
            return 0.8
          }
        })

      forces.bodies
        .strength(this.forces.bodies.strength)
        .theta(0.9)
        .distanceMax(this.width * 0.8)

      forces.x.strength(n => {
        if (n.parent) {
          if (n.parent.expanded) {
            return 0.8
          } else {
            return 0.1
          }
        }
      })

      // Restart the force
      // this.force.nodes(nodes)
      this.force.alpha(0.9).restart()
    },
    nodeClick(node) {
      if (node.expanded !== true) {
        node.expanded = true
      } else {
        node.expanded = false
      }

      node.each(n => (n.expanded = node.expanded))

      console.log(node)

      this.updateForce()
    }
  }
}
</script>

<style></style>
