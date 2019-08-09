<template>
  <div>
    {{ dataset.length }}
  </div>
</template>

<script>
import { nest, hierarchy, cluster } from 'd3'
import { keyGroupers } from './index.vue'
export default {
  props: {

    /** @type {Vue.PropOptions<Enron.EnronEmail[]>} */
    dataset: {
      type:    Array,
      default: () => []
    }
  },
  data: () => ({

    /** @type {d3.HierarchyPointNode<Enron.EnronEmail>} */
    h: hierarchy({})
  }),
  computed: {

    /**
     * Nester Object
     * @type {Vue.ComputedOptions<d3.Nest>}
     * @returns {d3.Nest<Enron.EnronEmail>}
     */
    nester() {
      return nest()
        .key(keyGroupers.from)
    },


    /**
     * @returns {d3.ClusterLayout<Enron.EnronEmail>}
     */
    clusterLayout() {
      return cluster()
        .size([Math.PI * 2, 500])

    }
  },
  watch: {
    clusterLayout: {
      handler() {
        this.clusterLayout(this.h)
      }
    }
  },
  mounted() {
    console.log(this.nester.entries(this.dataset))
    const h = hierarchy({
      key:    'root',
      values: this.nester.entries(this.dataset)
    }, n => n.values)

    this.clusterLayout(h)

    this.h = h

  }
}
</script>

<style>

</style>
