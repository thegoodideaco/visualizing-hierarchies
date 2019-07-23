<template>
  <svg
    height="500"
    width="500">
    <path
      :d="lineGen"
      fill="none"
      stroke="white"
      stroke-width="2" />
  </svg>
</template>

<script>
import * as d3 from 'd3-shape'
export default {
  data: () => ({
    points: [
      [120, 250],
      [480, 300],
      [310, 20]
    ]
  }),
  computed: {
    lineGen() {
      return d3
        .line()
        .curve(d3.curveStep)
        .x(p => p[0])
        .y(p => p[1])(this.points)
    }
  }
}
</script>

<style>
</style>
