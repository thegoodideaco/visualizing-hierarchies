<template>
  <div>
    <resize-observer @notify="updateSize()" />
    <svg width="100%"
         height="100%"
         class="relative">

      <!-- Links -->
      <path v-for="(link, index) in h.links()"
            :key="`link${index}`"
            :d="lineGen([link.source, link.target])"
            stroke="white"
            stroke-width="1"
            fill="none" />

      <!-- Render every descendant of our hierarchy -->
      <circle
        v-for="(item, index) in h.descendants()"
        :key="index"
        r="5"
        :cx="item.x"
        :cy="item.y"
        stroke="white"
        stroke-width="2">
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
    width:      100,
    height:     100,
    padding:    2,
    h:          d3.hierarchy({}),
    groupOrder: ['region', 'subregion'],
    dataset:    []
  }),
  computed: {
    layout() {
      // Showing a tree
      return d3.tree()
        .size([
          this.width,
          this.height
        ])
    },

    /**
     * Center point of the element
     * @returns {{x: number, y: number}}
     */
    center() {
      return {
        x: this.width * 0.5,
        y: this.height * 0.5
      }
    },

    lineGen() {
      return d3.line()
        .x(v => v.x)
        .y(v => v.y)
    },

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
    layout() {
      this.layout(this.h)
    },

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
    }
  },
  async mounted() {
    this.updateSize()

    const data = await d3.json('/datasets/populations.json')

    this.dataset = Object.freeze(data)
  },
  methods: {
    updateSize() {
      const { width, height } = this.$el.getBoundingClientRect()
      this.width = width
      this.height = height
    }
  }
}
</script>
