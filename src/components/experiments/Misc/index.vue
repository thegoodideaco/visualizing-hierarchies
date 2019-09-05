<template>
  <div class="relative p-32 h-full w-full">
    <div
      class="main-container relative h-full">
      <!-- Misc fill chart -->
      <div ref="container">
        <svg width="100%"
             height="100%">
          <!-- content -->

          <!-- bottom ticks -->
          <g :transform="`translate(55 ${height})`"
             class="ticks">
            <tick-display :count="12"
                          :scale="invertedDateScale"
                          position="bottom">
              <template v-slot="item">
                <text @click="selectItem(item)">{{ item | asMonth }}</text>
              </template>
            </tick-display>
          </g>

          <!-- left ticks -->
          <g transform="translate(55 0)"
             class="ticks">
            <tick-display :count="5"
                          :scale="invertedMoneyScale"
                          position="left">
              <template v-slot="item">
                <text @click="selectItem(item)">{{ item.value | asMoney }}</text>
              </template>
            </tick-display>
          </g>

          <!-- Fill -->
          <g transform="translate(55 0)">

            <path
              :d="fillGen(dataset)"
              fill="green"
              stroke="#fff" />

            <!-- Points -->
            <g v-for="(item, index) in dataset.slice(1)"
               :key="`c${index}`"
               :transform="`translate(${dateScale(item.date)} ${moneyScale(item.value)})`">

              <circle
                r="5" />

              <text transform="translate(0 -45)"
                    class="centered">
                {{ item.value | asMoney }}
              </text>
            </g>
          </g>
        </svg>
      </div>

      <!-- Wavy Water -->
      <div class="wavy">
        <wavy-water />
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import D3AxisVue from '../FormulaOne/D3Axis.vue'
import WavyWaterVue from './WavyWater.vue'

export default {
  filters: {
    asMonth(node) {
      const monthFormat = d3.timeFormat('%b')
      return monthFormat(Date.parse(node.value))
    },
    asMoney(value) {
      const f = d3.format('$,.2s')
      return f(value)
    }
  },
  components: {
    TickDisplay: D3AxisVue,
    WavyWater:   WavyWaterVue
  },
  data: () => ({
    width:  100,
    height: 100
    // dateScale: null
  }),
  computed: {

    dataset() {
      return this.createRandomData()
    },

    /** @returns {d3.ScaleTime} */
    dateScale() {
      return d3.scaleTime()
        .domain([
          Date.parse('jan 1, 2019'),
          Date.parse('Dec 29, 2019')
        ]).range([0, this.width])
    },
    invertedDateScale() {
      const c = d3.scaleTime()
        .nice()
        .domain([
          Date.parse('jan 1, 2019'),
          Date.parse('Dec 29, 2019')
        ]).range([this.width, 0])

      return c
    },
    moneyScale() {
      const e  = d3.extent(this.dataset, d => d.value)
      e[1] += Math.abs(e[1] - e[0]) * 0.25

      // e.reverse()

      return d3.scaleLinear()
        .domain(e)
        .nice()
        .range([this.height, 0])
    },
    invertedMoneyScale() {
      const e  = d3.extent(this.dataset, d => d.value)
      e[1] += Math.abs(e[1] - e[0]) * 0.25

      // e.reverse()

      return d3.scaleLinear()
        .domain(e)
        .nice()
        .range([0, this.height])
    },
    fillGen() {
      return d3.area()
        .x(v => this.dateScale(v.date))
        .y1(v => this.moneyScale(v.value))
        .y0(this.height)
        .curve(d3.curveMonotoneX)
    }
  },
  // beforeMount() {
  //   this.dateScale = d3.scaleTime()
  //     .domain([
  //       Date.parse('jan 1, 2019'),
  //       Date.parse('Dec 29, 2019')
  //     ])
  // },
  mounted() {
    this.updateSize()

    // this.dateScale
    //   .range([0, this.width])
  },
  methods: {
    updateSize() {
      const { width, height } = (this.$refs.container || this.$el).getBoundingClientRect()

      Object.assign(this, {
        width,
        height
      })
    },
    createRandomData() {
      const dates = this.dateScale.ticks(12)

      const amounts = dates.map(() => Math.random() * 20000)

      return dates.map((v, i) => ({
        date:  v,
        value: amounts[i]
      }))
    },
    selectItem(node) {
      console.log(node)
    }
  }
}
</script>

<style lang="scss" scoped>
.ticks {
  text {
    text-transform: uppercase;
    font-size: 10px;
  }
}

svg {
  overflow: visible;
  position: relative;
}

circle {
  fill: #fff;
  stroke: #fff;
  stroke-width: 2px;
}

text.centered {
  text-anchor: middle;
  fill: #fff;
  font-size: 11px;
  font-weight: bold;
  stroke: rgba(#000, .5);
  stroke-width: 1px;
  paint-order: stroke fill;
}

.main-container {
  display: grid;
  grid: 1fr 1fr / 1fr;
  row-gap: 3rem;

  > * {
    position: relative;
    border: 2px solid #fff;
    // padding: 10px;
  }
}
</style>
