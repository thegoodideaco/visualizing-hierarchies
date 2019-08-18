<template>
  <div class="relative w-full h-full">
    <!-- We can use this to detect if our dimensions change -->
    <resize-observer @notify="updateSize()" />

    <!-- svg container -->
    <svg width="100%"
         height="100%">

      <!-- Render every link -->
      <path v-for="(link, index) in h.links()"
            :key="`link${index}`"
            :d="lineGen([link.source, link.target])" />

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
    width:      0,
    height:     0,
    padding:    2,
    h:          d3.hierarchy({}),
    groupOrder: [
      'region',
      'subregion'
    ],
    dataset: []
  }),
  computed: {

    /**
     * if width, height or padding changes
     * this will change, triggering our watcher
     * to apply changes to our nodes
     * @returns {d3.PackLayout<population.Country>}
     */
    layout() {
      return d3.cluster()
        .size([this.width, this.height])
    },

    /**
     * Creates a path string out of an array of points.
     * @returns {d3.Path}
     */
    lineGen() {
      return d3.line()
        .x(node => node.x)
        .y(node => node.y)
    },

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
         * We must assign properties to hierarchy
         * before we pass it on to vue, so that they are observed
         */
      this.layout(h)

      /** Finally pass it to Vue for observing */
      this.h = h
    },

    /**
     * When layout method changes,
     * apply to the hierarchy
     * @type {Vue.WatchHandler<d3.PackLayout<population.Country>}
     */
    layout() {
      this.layout(this.h)
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

<style scoped>
circle, path {
  transition: all 300ms ease;
}
</style>
