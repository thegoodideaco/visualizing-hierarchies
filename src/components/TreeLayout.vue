<template>
  <div class="tree-view">
    <div
      v-for="(item, index) in localDescendants"
      :key="index"
      :style="treeStyle(item)"
      class="p-1">
      <slot v-bind="item">
        {{ item.data.key }} - {{ item.value | formatted }}
      </slot>
    </div>
  </div>
</template>

<script>
import { treemap, treemapSquarify, format, scalePow } from 'd3'
export default {
  filters: {
    formatted: val => format(',d')(+val)
  },
  props: {
    /**
     * @type {Vue.PropOptions<d3.HierarchyNode>}
     */
    hierarchy: {
      type:     Object,
      required: true
    },

    /**
     * @type {Vue.PropOptions<boolean>}
     */
    showLeafs: {
      type:    Boolean,
      default: true
    }
  },
  data() {
    return {
      /** @type {d3.HierarchyRectangularNode} */
      localHierarchy:   null,
      /** @type {d3.HierarchyRectangularNode[]} */
      localDescendants: null,
      size:             [100, 100],
      padding:          6,
      paddingTop:       30,
      rounding:         true
    }
  },
  computed: {
    /**
     * Constructs a treemap object.
     * Because treemap mutates an object directly
     * We clone the hierarchy prop to a local one.
     *
     * Then, we provide local nodes to display,
     * allowing us to filter out unwanted nodes
     *
     * @returns {d3.TreemapLayout}
     */
    treemap() {
      if (this.hierarchy) {
        const t = treemap()
          .padding(this.padding)
          .paddingTop(this.paddingTop)
          .round(this.rounding)
          .size(this.size)
          .tile(treemapSquarify)

        this.localHierarchy = this.hierarchy.copy()
        this.localHierarchy
          .sum(v => v.value || 0)
          .count()
          .sort((a, b) => b.value - a.value)


        t(this.localHierarchy)

        const nodes = []
        this.localHierarchy.each(v => {
          if(!this.showLeafs) {
            if(v.children) {
              nodes.push(v)
            }
          }else{

            nodes.push(v)
          }
        })

        this.localDescendants = nodes

        return t
      }
    }
  },
  watch: {
    /**
     * Watches for change in hierarchy.
     * Creates a clone before applying layout
     */
    hierarchy: {
      /** @param {d3.HierarchyNode} val */
      handler(val) {
        this.localHierarchy = val ? val.copy() : null

        this.$nextTick(() => {
          if (this.localHierarchy) {
            // debugger
            this.localHierarchy.count().sort((a, b) => a.value - b.value)
            this.treemap.size(this.size)
            this.treemap(this.localHierarchy)


            const nodes = []
            this.localHierarchy.each(v => {
              if(!this.showLeafs) {
                if(v.children) {
                  nodes.push(v)
                }
              }else{

                nodes.push(v)
              }
            })
            this.localDescendants = nodes


          }
        })
      },
      immediate: true
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    /**
     * @param {import('d3').HierarchyRectangularNode} treeNode
     */
    treeStyle(treeNode) {
      const { x0, x1, y0, y1 } = treeNode
      const v = treeNode.parent
        ? treeNode.parent.value
        : this.localHierarchy.value
      const colorScale = scalePow()
        .exponent(0.5)
        .domain([0, v])
        .range(['#161a1c', '#c3673d'])

      return {
        top:             '0px',
        left:            '0px',
        width:           `${x1 - x0}px`,
        height:          `${y1 - y0}px`,
        position:        'absolute',
        transform:       `translate3d(${~~x0}px, ${~~y0}px, 0px)`,
        backgroundColor:
          treeNode.children != null
            ? colorScale(treeNode.value)
            : 'transparent',
        fontSize:        treeNode.children != null ? '16px' : '10px',
        transitionDelay: `${treeNode.depth * 30}ms`
      }
    },

    /**
     * TODO: Remove
     * Updates the size
     */
    __updateSize() {
      if (!this.$el) return
      const { width, height } = this.$el.parentElement
        ? this.$el.parentElement.getBoundingClientRect()
        : this.$el.getBoundingClientRect()
      // debugger

      this.size = [width, height]
      this.treemap.size(this.size)
      this.localDescendants = this.localHierarchy
        .descendants()
        .filter(v => v.children)
    },

    onResize() {
      const { width, height } = this.$el.parentElement.getBoundingClientRect()

      this.size = [width, height]

      this.treemap.size(this.size)
      // this.localDescendants = this.localHierarchy.descendants()
    }
  }
}
</script>

<style scoped lang="scss">
.tree-view {
  position: relative;
  overflow: hidden;

  > * {
    position: absolute;
    user-select: none;
    white-space: nowrap;
    transform: translateZ(0);
    transition: all 600ms cubic-bezier(0.39, -0.29, 0.24, 1.19);
    border: 1px solid rgba(#000, 0.25);
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    text-shadow: 0 1px 3px rgba(#000, 0.5);
  }
}
</style>
