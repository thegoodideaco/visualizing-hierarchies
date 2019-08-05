<template>
  <svg width="100%"
       height="100%">
    <!-- Put content here -->

    <circle v-for="(node, index) in nodes"
            :key="index"
            r="5"
            fill="white">
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
    h:      null,
    force:  null
  }),
  computed: {
    layout() {
      const layout = d3.pack()
        .size([
          this.width,
          this.height
        ])
        // .padding(this.padding)
        // .radius(v => v.value)


      return layout
    },

    nodes() {
      if(this.h) return this.h.descendants()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    updateSize() {
      const {
        width,
        height
      } = this.$el.getBoundingClientRect()

      this.width = width
      this.height = height
    },

    async init() {
      // 1. Assign Sizes
      this.updateSize()

      // 2. Load the data
      const data = await d3.json('/datasets/populations.json')

      console.log('data loaded', data)


      // 3. Nest the data
      const nester = d3.nest()
        .key(v => v.region)
        .key(v => v.subregion)

      const nestedData = {
        key:    'root',
        values: nester.entries(data)
      }


      // 4. Add Hierarchy to nested data
      const h = d3.hierarchy(nestedData, v => v.values)

      // 5. We must assign x and y properties so they can be observed
      h.each(node => Object.assign(node, {
        x: 0,
        y: 0
      }))

      // Calculate totals, no need for sorting
      h.sum(v => v.value)

      this.h = h
    }
  }

}
</script>

<style></style>
