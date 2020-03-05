<template>
  <svg
    height="100%"
    width="100%">
    <circle
      v-for="(item, index) in dataset"
      :key="index"
      :cx="item.x"
      :cy="item.y"
      class="circle-item"
      fill="#fff"
      r="15"
      stroke="green"
      @click.native="deleteItem(index)" />
  </svg>
</template>

<script>
export default {
  data: () => ({
    dataset: [
      {
        x: 100,
        y: 90
      },
      {
        x: 125,
        y: 50
      },
      {
        x: 500,
        y: 250
      },
      {
        x: 300,
        y: 100
      },
      {
        x: 190,
        y: 270
      }
    ]
  }),
  methods: {
    deleteItem(index) {
      // this.dataset.splice(index, 1)
      this.$delete(this.dataset, index)
      // delete this.dataset[index]
    }
  }
}
</script>

<style scoped lang="scss">
circle {
  cursor: pointer;
  &:hover {
    fill: #f89841;
    stroke: #fff;
    stroke-width: 5;
  }
}
</style>
