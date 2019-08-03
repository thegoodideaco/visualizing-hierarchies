<template>
  <svg width="100%"
       height="100%"
       @click="addPoint"
       @contextmenu.prevent="points = []">

    <!-- Circles -->
    <circle v-for="(item, index) in points"
            :key="index"
            :cx="item.x"
            :cy="item.y"
            r="5"
            fill="white" />

    <!-- Path -->
    <path fill="none"
          stroke="white"
          stroke-width="5"
          :d="definition(points)" />
  </svg>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {line, curveNatural, curveStep, curveCatmullRom, curveCardinalClosed} from 'd3'
export default {
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
      return line()
        .x(v => v.x)
        .y(v => v.y)
        .curve(curveStep)
    }
  },
  methods: {
    /** @param {MouseEvent} mouseEvent */
    addPoint(mouseEvent) {
      const {
        layerX: x,
        layerY: y
      } = mouseEvent

      this.points.push({x, y})
    }
  }
}
</script>

<style></style>
