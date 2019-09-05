<template>
  <svg width="100%"
       height="100%"
       @mousemove="onMove">

    <circle v-for="(point, index) in points"
            :key="index"
            r="5"
            :cx="point.x"
            :cy="point.y"
            fill="#fff" />
  </svg>
</template>

<script>
import * as d3 from 'd3'
export default {
  data: () => ({
    points: d3.range(30).map((p, i) => ({
      x:      p * 40,
      y:      100 + Math.sin((i / 10) * (Math.PI * 2)) * 30,
      forceX: p * 40
    })),
    mouse: {
      x: 0,
      y: 0
    },
    simulation: d3.forceSimulation()
      .force('x', d3.forceX(n => n.forceX).strength(0.99))
      .force('y', d3.forceY(130).strength(1.01))
      .force('bodies', d3.forceManyBody().strength(-20))
      .alphaDecay(0.00000001)
      .alpha(0.09)
      // .alphaTarget(0.003)
  }),
  computed: {
    links() {
      const pairs = d3.pairs(this.points)

      return pairs.map(pair => ({
        target: pair[0],
        source: pair[1]
      }))
    }
  },
  watch: {
    mouse: {
      handler({ x, y }) {
        this.simulation.force('mouse')
          .x(x)
          .y(y)

        this.simulation
          .alphaDecay(0.000001)
          .alpha(0.09)
          .restart()
      },
      deep: true
    }
  },
  mounted() {
    this.simulation
      .force('links', d3.forceLink()
        .links(this.links)
        .distance(50))
      .force('mouse', d3.forceRadial()
        .x(300)
        .y(100)
        .radius(200)
        .strength(0.5)
      )
      .nodes(this.points)
  },
  methods: {
    getX() {
      return this.mouse.x
    },
    onMove(ev) {
      const {
        layerX: x,
        layerY: y
      } = ev

      Object.assign(this.mouse, {
        x,
        y
      })
    }
  }
}
</script>

<style>

</style>
