<template>
  <div>
    F1 Racing Data

    <force-graph />
  </div>
</template>

<script>
// ^ https://www.kaggle.com/cjgdev/formula-1-race-data-19502017
import * as hierarchy from 'd3-hierarchy'
import * as collection from 'd3-collection'
import * as fetch from 'd3-fetch'
import ForceGraphVue from './ForceGraph.vue'

const d3 = {
  ...hierarchy,
  ...collection,
  ...fetch
}
export default {
  components: {
    ForceGraph: ForceGraphVue
  },
  data() {
    return {
      test: null
    }
  },
  async beforeMount() {
    const result = await d3.csv('/datasets/f1/drivers.csv')

    Object.freeze(result)

    this.test = result

    console.log('yay')

  }
}
</script>

<style>

</style>
