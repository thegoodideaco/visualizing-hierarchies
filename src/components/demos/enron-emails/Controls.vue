<template>
  <div>
    <!-- Angle -->
    <label>
      <h5>
        Angle: <span class="text-yellow-500">{{ ~~angle }}</span>
      </h5>
      <slider v-model.number="angle"
              :min="0"
              :max="360" />
    </label>

    <!-- Date Filter -->
    <label>
      <h5>
        Dates: <span class="text-yellow-500">{{ ~~angle }}</span>
      </h5>
      <slider v-model.number="angle"
              :min="0"
              :max="360" />
    </label>
  </div>
</template>

<script>
import SliderVue from '../../inputs/Slider.vue'
export default {
  components: {
    Slider: SliderVue
  },
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

<style></style>
