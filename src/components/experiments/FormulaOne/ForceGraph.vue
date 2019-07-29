<template>
  <div>
    <force-circle v-for="item in nodes"
                  :key="item.data.key"
                  :item="item"
                  :radius="radiusScale(item.data.value.wins)" />
  </div>
</template>

<script>
import {
  forceSimulation,
  forceCenter,
  forceCollide,
  forceManyBody,
  forceX,
  forceY,
  scaleLinear,
  extent
} from 'd3'

import {ThumbnailData} from './thumbnails'
import ForceCircleVue from './ForceCircle.vue'

export default {
  components: {
    ForceCircle: ForceCircleVue
  },
  props: {
    /**
     * @type {Vue.PropOptions<any[]>}
     */
    dataset: {
      type:     Array,
      required: true
    }
  },
  data: () => ({
    sim:    forceSimulation(),
    nodes:  [],
    width:  100,
    height: 100
  }),
  computed: {
    colorScale() {
      return scaleLinear()
        .domain(extent(this.dataset, v => v.value.wins))
        .range(['red', 'blue'])
    },
    radiusScale() {
      return scaleLinear()
        .domain(extent(this.dataset, v => v.value.wins))
        .range([10, 150])
    },
    thumbnails() {
      return this.nodes.map(v => {
        const url = v.data.value.driver.url

        const i = ThumbnailData.urls.indexOf(url)

        return ThumbnailData.vals[i]
      })
    }
  },
  watch: {
    dataset() {
      this.nodes = this.dataset.map(v => {
        return {
          data: v,
          x:    this.width * 0.5,
          y:    this.height * 0.5
        }
      }).filter(v => v.data.value.wins > 0)

      window.urls = this.nodes.map(v => v.data.value.driver.url)

      // ? Apply current positions and velocities  if they exist
      const oldNodes = this.sim.nodes()

      this.nodes.forEach(n => {
        const oldNode = oldNodes.find(oldn => oldn.data.key === n.data.key)

        if (oldNode) {
          Object.assign(n, {
            x:  oldNode.x,
            y:  oldNode.y,
            vx: oldNode.vx,
            vy: oldNode.vy
          })
        }
      })

      this.sim.force('collide')
        .radius(v => this.radiusScale(v.data.value.wins) + 5)

      this.sim.stop()
      this.sim.velocityDecay(0.1)
      this.sim.alpha(0.1)
      this.sim.nodes(this.nodes)
      this.sim.restart()
    }
  },
  async mounted() {
    await this.$nextTick()

    const { width, height } = this.$el.getBoundingClientRect()
    this.width = width
    this.height = height

    // Create a node hash??

    this.nodes = this.dataset.map(v => ({
      data: v,
      x:    this.width * 0.5,
      y:    this.height * 0.5
    }))

    this.sim
    // .force('center', forceCenter())

      // ? Centers all circles
      .force('x', forceX(this.width * 0.5).strength(0.05))
      .force('y', forceY(this.height * 0.5).strength(0.05))

      // ? Check for collisions based on the size scale
      .force(
        'collide',
        forceCollide()
          .radius(18)
          .strength(0.3)
      )

      // ? Apply nodes
      .nodes(this.nodes)

    // Apply easing
    this.sim.alphaDecay(0.009)

    this.sim.restart()
  },
  beforeDestroy() {
    this.sim.stop()
  },
  methods: {
    showInfo(item) {
      console.log(item.data.value.url)
      window.open(item.data.value.driver.url, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
circle {
  stroke: black;
  stroke-width: 5px;
  cursor: pointer;
}
</style>
