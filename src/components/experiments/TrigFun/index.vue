<template>
  <div>trig is fun {{ width }} x {{ height }}</div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data: () => ({
    width:  100,
    height: 100
  }),
  mounted() {
    const {
      width,
      height
    } = this.$el.getBoundingClientRect()

    Object.assign(this, {
      width,
      height
    })
  },
  methods: {

    /**
     * @returns {d3.HierarchyCircularNode}
     */
    createRandomHierarchy(amount = 300) {
      const nodes = [{
        index:       0,
        parentIndex: ''
      }]
      for(let i = 1; i<amount; i++){
        nodes.push({
          index:       i,
          parentIndex: Math.ceil(Math.sqrt(i)) - 1
        })
      }

      console.log(nodes)


      const strat = d3.stratify()
        .id(n => n.index)
        .parentId(n => n.parentIndex)

      return strat(nodes)
    }
  }
}
</script>

<style>

</style>
