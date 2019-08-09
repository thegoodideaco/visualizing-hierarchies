<template>
  <div class="grid-tools">
    <header>
      <!-- Option Area -->
      <option-slider v-model="bundle"
                     :min="0"
                     :max="1" />

      <select id="sel"
              v-model="curveType"
              name="sel">
        <option v-for="curve in curves"
                :key="curve"
                :value="curve">
          {{ curve }}
        </option>
      </select>
    </header>
    <div>
      <div class="flex items-center justify-center relative">
        <my-component v-bind="$data" />
      </div>
    </div>
  </div>
</template>

<script>
import MyComponent from './ShapesComponent.vue'
import SliderVue from '@/components/inputs/Slider.vue'
export default {
  components: {
    MyComponent,
    // eslint-disable-next-line vue/no-unused-components
    OptionSlider: SliderVue
  },
  data: () => ({
    bundle:    0.5,
    curveType: 'curveLinear',
    curves:    [
      'curveBasisClosed',
      'curveBasisOpen',
      'curveBasis',
      'curveBundle',
      'curveCardinalClosed',
      'curveCardinalOpen',
      'curveCardinal',
      'curveCatmullRomClosed',
      'curveCatmullRomOpen',
      'curveCatmullRom',
      'curveLinearClosed',
      'curveLinear',
      'curveMonotoneX',
      'curveMonotoneY',
      'curveNatural',
      'curveStep',
      'curveStepAfter',
      'curveStepBefore'
    ]
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

  /deep/ circle {
    fill: green;
    stroke: #fff;
    stroke-width: 3;
  }
}

header {
  position: relative;
  display: flex;
  align-items: center;
  &:not(:empty) {
    padding: 10px;
    background-color: rgba(#3182ce, 0.5);
  }

  > * {
    min-width: 100px;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
