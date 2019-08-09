
<template>
  <div class="grid-tools">
    <header>
      <!-- Option Area -->
    </header>
    <div>
      <div class="flex items-center justify-center">
        <my-component />
      </div>
    </div>
  </div>
</template>

<script>
import MyComponent from './ShapesComponent.vue'
import SliderVue from '../../../components/inputs/Slider.vue'
export default {
  components: {
    MyComponent,
    // eslint-disable-next-line vue/no-unused-components
    OptionSlider: SliderVue
  },
  data: () => ({
    test: 5
  })
}
</script>

<style lang="scss" scoped>
.grid-tools {
  display: grid;
  grid: auto 1fr / 1fr;

  > *:nth-child(2) {
    display: grid;
  }
}

header {
  &:not(:empty) {
    padding: 10px;
    background-color: rgba(#000, .25);
  }
}
</style>
