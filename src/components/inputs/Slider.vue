<template>
  <vue-slider
    v-bind="$props"
    class="slider cursor-pointer"
    @change="$emit('input', $event)" />
</template>

<script>
import VueSlider from 'vue-slider-component'
export default {
  components: {
    VueSlider
  },
  props: {
    value: {
      type:     Number,
      required: true
    },
    min:    Number,
    max:    Number,
    adsorb: {
      type:    Boolean,
      default: true
    },
    interval: {
      type:    Number,
      default: 0.1
    },
    tooltip: {
      type:    String,
      default: 'none'
    }
  }
}
</script>

<style src="vue-slider-component/theme/antd.css"></style>
