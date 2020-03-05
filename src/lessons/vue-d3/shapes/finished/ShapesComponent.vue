<template>
  <svg
    width="100%"
    height="100%"
    @click="addPoint"
    @contextmenu.prevent="points = []">
    <!-- Path -->
    <path
      fill="none"
      stroke="white"
      stroke-width="5"
      :d="definition(points)" />

    <!-- Circles -->
    <circle
      v-for="(item, index) in points"
      :key="index"
      :cx="item.x"
      :cy="item.y"
      r="10" />
  </svg>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import * as d3 from 'd3'
export default {
  props: {
    bundle: {
      type:    Number,
      default: 0.5
    },
    curveType: {
      type:    String,
      default: 'curveLinear'
    }
  },
  data: () => ({
    points: [
      {
        x: 200,
        y: 500
      }
    ]
  }),
  computed: {
    /**
     * @returns {d3.Line<{x: number, y: number}>}
     */
    definition() {
      let curve = d3[this.curveType]

      if (curve.tension) curve = curve.tension(this.bundle)
      if (curve.beta) curve = curve.beta(this.bundle)
      if (curve.alpha) curve = curve.alpha(this.bundle)
      return d3
        .line()
        .x(v => v.x)
        .y(v => v.y)
        .curve(curve)
    }
  },
  methods: {
    /** @param {MouseEvent} mouseEvent */
    addPoint(mouseEvent) {
      const { layerX: x, layerY: y } = mouseEvent

      this.points.push({ x, y })
    }
  }
}
</script>

<style scoped lang="scss">
path {
  transition: all 500ms ease;
}
</style>
