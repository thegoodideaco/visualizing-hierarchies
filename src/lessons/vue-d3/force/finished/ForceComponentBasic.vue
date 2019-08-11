<template>
  <div class="relative w-full h-full">
    <!-- We can use this to detect if our dimensions change -->
    <resize-observer @notify="updateSize()" />

    <!-- svg container -->
    <svg width="100%"
         height="100%">
      <!-- Render every descendant of our hierarchy -->
      <circle
        v-for="(item, index) in h.descendants()"
        :key="index"
        r="5"
        :cx="item.x"
        :cy="item.y">
        <!-- Tooltip -->
        <title>{{ item.data.key }}: {{ item.value }}</title>
      </circle>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data: () => ({
    width:             0,
    height:            0,
    h:                 d3.hierarchy({}),
    groupOrder:        ['region', 'subregion'],
    dataset:           [],
    simulation:        d3.forceSimulation(),
    simulationOptions: {
      alpha:      0.9,
      alphaDecay: 0.02
    }
  }),
  computed: {
    /**
     * if the group order is changed
     * this will change, triggering the
     * hierarchy to be recreated
     * @returns {d3.Nest<population.Country>}
     */
    nester() {
      const n = d3.nest()

      this.groupOrder.forEach(v => {
        n.key(node => node[v])
      })

      return n
    },

    /**
     * If the nester method, or dataset changes
     * will generate a root node
     */
    nestedData() {
      return {
        key:    'root',
        values: this.nester.entries(this.dataset)
      }
    },

    /** @returns {d3.ForceCenter} */
    centerForce() {
      return (this.simulation.force('center') || d3.forceCenter())
        .x(this.width / 2)
        .y(this.height / 2)
    },
    /**
     * @type {Vue.ComputedOptions<d3.ForceCollide>}
     * @returns {d3.ForceCollide}
     * */
    collisionForce() {
      return this.simulation.force('collide')
        .radius(this.radius)
    }
  },
  watch: {
    /**
     * When our nestedData changes,
     * updates h, and applys a new layout
     */
    nestedData(val) {
      // * Add Hierarchy to nested data
      const h = d3.hierarchy(val, v => v.values)

      // ! Calculate Totals and sort
      h.sum(v => v.value)
      h.sort((a, b) => d3.ascending(a.value, b.value))

      /**
       * TODO: Remove this
       * We must assign properties to hierarchy
       * before we pass it on to vue, so that they are observed
       */
      h.each(n =>
        Object.assign(n, {
          x: NaN,
          y: NaN
        })
      )
      // this.layout(h)

      /** Finally pass it to Vue for observing */
      this.h = h
    },

    h(val) {
      this.simulation.nodes(val.descendants())
    },

    simulationOptions: {
      handler() {
        this.simulation.alpha(this.simulationOptions.alpha)
          .alphaDecay(this.simulationOptions.alphaDecay)
          .restart()
      },
      deep:      true,
      immediate: true
    }
  },
  async mounted() {
    // 1. Assign Sizes
    this.updateSize()

    // 2. Load the raw data
    const data = await d3.json('/datasets/populations.json')

    // 3. Assign our data to our $dataset object
    this.dataset = Object.freeze(data)
  },
  beforeMount() {
    this.simulation.force('center', d3.forceCenter())
  },
  methods: {
    /**
     * Sets width and height
     * to the element's dimensions
     */
    updateSize() {
      const { width, height } = this.$el.getBoundingClientRect()
      this.width = width
      this.height = height
    }
  }
}
</script>
