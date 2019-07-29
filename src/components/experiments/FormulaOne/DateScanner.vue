<template>
  <svg class="date-scanner"
       width="100%"
       height="100%">
    <!-- Brush -->
    <date-brush :height="height"
                :domain="domain"
                @input="filterDates" />
  </svg>
</template>

<script>
import { extent, scaleTime, brushY } from 'd3'
import ColumnBrushVue from './ColumnBrush.vue'
export default {
  components: {
    DateBrush: ColumnBrushVue
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
        .range([0, this.height])
    }
  },
  mounted() {
    const {
      height
    } = this.$el.getBoundingClientRect()

    this.height = height


  },
  methods: {
    filterDates(range) {
      if(!range) this.$emit('filter', null)

      this.brushSelection = range

      this.$emit('filter', this.brushSelection)
    }
  }
}
</script>

<style>

</style>
