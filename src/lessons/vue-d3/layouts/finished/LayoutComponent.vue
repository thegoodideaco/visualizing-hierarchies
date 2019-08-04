<template>
  <div class="w-full h-full relative">
    <resize-observer @notify="updateSize()" />

    <!-- SVG Version -->
    <!-- <svg width="100%"
         height="100%">
      <circle v-for="(node, index) in nodes"
              :key="index"
              :cx="node.x"
              :cy="node.y"
              :r="node.r"
              fill="rgba(255,255,255,.5)"
              @click="nodeClick(node)" />
    </svg> -->


    <!-- HTML Version -->
    <div class="html-version">
      <div v-for="(node, index) in nodes"
           :key="index"
           class="html-element"
           :style="computeStyle(node)"
           :title="`${node.data.key}: ${node.value}`"
           @click.self="nodeClick(node)">
           <!-- Some Content -->
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data: () => ({
    width:   100,
    height:  100,
    padding: 15,
    h:       null,
    colors:  {
      small: 'black',
      large: 'white'
    }
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


    /**
     * Map colors to the value of each node
     */
    colorScale() {
      if(this.h) return d3.scaleSqrt()
        .domain([0, this.h.value])
        .range([this.colors.small, this.colors.large])
    },

    /**
     * The branch nodes to be rendered
     */
    nodes() {
      if(this.h) {
        return this.h.descendants()
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

    // Calculate Totals and sort
    h.sum(v => v.value)
    h.sort((a, b) => d3.ascending(a, b))


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
    },

    /** @param {d3.HierarchyCircularNode} node */
    nodeClick(node) {
      console.log(node.data.value + ' - ' + node.value)
    },

    /** @param {d3.HierarchyCircularNode} node */
    computeStyle(node) {
      const {
        x,
        y,
        r,
        value
      } = node

      return {
        transform:       `translate3d(${x - r}px, ${y - r}px, 0)`,
        backgroundColor: this.colorScale(value),
        width:           `${r * 2}px`,
        height:          `${r * 2}px`
      }
    }
  }
}
</script>

<style scoped lang="scss">
.html-version {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}

.html-element {
  position: absolute;
  background-color: green;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: yellow !important;
  }
}
</style>
