<template>
  <div>
    <input v-model.number="angle"
           type="range"
           :min="0"
           :max="360"
           :step=".1">
  </div>
</template>

<script>
export default {
  computed: {
    angle: {
      get() {
        return this.$store.state.controls.edgeBundling.angle
      },
      set(val) {
        this.$store.commit('controls/update', {
          path:  'edgeBundling.angle',
          value: val
        })
      }
    }
  }
}
</script>

<style>

</style>
