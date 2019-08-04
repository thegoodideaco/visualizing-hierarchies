<template>
  <svg width="100%"
       height="100%">
    <circle
      v-for="(node, index) in nodes"
      :key="index"
      :cx="node.x"
      :cy="node.y"
      :r="node.r"
      fill="rgba(255,255,255,.5)" />
  </svg>
</template>

<script>
import * as d3 from 'd3'

export default {
  data: () => ({
    width:   100,
    height:  100,
    padding: 2,
    h:       null
  }),
  computed: {
    layout() {
      const layout = d3.pack()
        .size([
          this.width,
          this.height
        ])
        .padding(this.padding)
        // .radius(v => v.value)


      return layout
    },

    /**
     * The branch nodes to be rendered
     */
    nodes() {
      if(this.h) {
        return this.h.descendants().slice(1)
      }else{
        return null
      }
    }
  },
  watch: {
    layout() {
      if(!this.h) return
      this.layout(this.h)
    }
  },
  async mounted() {

    // Assign Sizes
    this.updateSize()

    // 1. Load the data
    const data = await d3.json('/datasets/populations.json')

    console.log('data loaded', data)


    // 2. Nest the data
    const nester = d3.nest()
      .key(v => v.region)
      .key(v => v.subregion)

    const nestedData = {
      key:    'root',
      values: nester.entries(data)
    }


    // 3. Add Hierarchy to nested data
    const h = d3.hierarchy(nestedData, v => v.values)

    h.count()


    // 4. Apply a layout to the hierarchy
    this.layout(h)

    this.h = h

  },
  methods: {
    updateSize() {
      const {
        width,
        height
      } = this.$el.getBoundingClientRect()
      this.width = width
      this.height = height
    }
  }
}
</script>

<style></style>
