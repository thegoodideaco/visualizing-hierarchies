<template>
  <div class="console__container">
    <img src="@/assets/images/terminal.svg">
    <h2>Please use the console for this lesson :)</h2>
  </div>
</template>

<script>
import { csv } from 'd3-fetch'
export default {
  data: () => ({
    dataset: null
  }),
  async mounted() {
    window.d3 = window.dev.d3
    const data = await csv('/datasets/googleplaystore.csv')
    this.dataset = Object.freeze(data)
    window.dataset = this.dataset

    console.clear()
    console.log(
      '%c Use window.dataset and window.d3',
      ['font-size: 30px'].join(';')
    )
  },
  beforeDestroy() {
    this.$delete(window, 'd3')
    this.$delete(window, 'dataset')
  }
}
</script>

<style scoped lang="scss">
.console__container {
  display: grid;
  grid: auto 1fr / 1fr;
  align-self: center;
  justify-items: center;
  row-gap: 2rem;

  img {
    max-width: 200px;
  }
}
</style>
