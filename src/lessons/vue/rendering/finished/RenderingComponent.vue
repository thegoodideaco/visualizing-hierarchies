<template>
  <svg
    width="100%"
    height="100%">
    <circle
      v-for="(item, index) in dataset"
      :key="index"
      class="circle-item"
      :cx="item.x"
      :cy="item.y"
      r="15"
      fill="#fff"
      stroke="green" />
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
  })
}
</script>
