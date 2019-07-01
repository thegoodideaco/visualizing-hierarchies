<template>
  <div>
    <input v-model="input">

    <d3-pie />
  </div>
</template>

<script>
import D3PieVue from '../../components/demos/D3Pie.vue'
export default {
  components: {
    D3Pie: D3PieVue
  },
  data: () => ({
    input: null
  })
}
</script>

<style scoped lang="scss">
  input {
    color: lighten(#000, 10);
  }
</style>
