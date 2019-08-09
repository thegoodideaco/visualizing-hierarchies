<template>
  <svg class="date-scanner"
       width="100%"
       height="100%">
    <!-- Brush -->
    <date-brush :height="height"
                :domain="domain"
                @input="filterDates" />

    <!-- Ticks -->
    <tick-display
      :count="22"
      transform="translate(21 0)"
      :scale="timeScale"
      position="right">
      <template v-slot="{ value }">
        <text>{{ value | asYear }}</text>
      </template>
    </tick-display>
  </svg>
</template>

<script>
import { extent, scaleTime, brushY, timeFormat } from 'd3'
import ColumnBrushVue from './ColumnBrush.vue'
import D3AxisVue from './D3Axis.vue'
export default {
  components: {
    DateBrush:   ColumnBrushVue,
    TickDisplay: D3AxisVue
  },
  filters: {
    asYear(date) {
      const d = date
      const f = timeFormat('%Y')

      return f(d)
    }
  },
  props: {
    /**
     * @type {Vue.PropOptions<any[]>}
     */
    dataset: {
      type:     Array,
      required: true
    },

    /**
     * @type {Vue.PropOptions<(datum: any) => any>}
     */
    dateMethod: {
      type:    Function,
      default: datum => Date.parse(datum.date)
    }
  },
  data: () => ({
    height:         100,
    brush:          brushY(),
    brushSelection: null
  }),
  computed: {
    domain() {
      return extent(this.dataset, this.dateMethod)
    },
    timeScale() {
      return scaleTime()
        .domain(this.domain)
        .nice(20)
        .range([0, this.height])
    }
  },
  mounted() {
    const { height } = this.$el.getBoundingClientRect()

    this.height = height
  },
  methods: {
    filterDates(range) {
      if (!range) this.$emit('filter', null)

      this.brushSelection = range

      this.$emit('filter', this.brushSelection)
    }
  }
}
</script>

<style scoped lang="scss">
svg {
  overflow: visible;
}

/deep/ .overlay {
  fill: rgba(#000, 0.5);
  stroke: rgba(#fff, 0.5);
  stroke-width: 1px;
}
</style>
