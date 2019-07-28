<template>
  <div class="f1 p-5">
    <!-- Title -->
    <section class="f1__title">
      <h2>Races Against Time</h2>
      <small>Visualizing Formula One Data from 1950 to 2017</small>
    </section>

    <!-- Side -->
    <aside class="f1__sidebar">
      <!-- Date Scanner -->
      <date-scanner :dataset="test.races"
                    @filter="dateRange = $event" />
    </aside>


    <!-- Force Graph -->
    <div class="f1__content">
      <force-graph v-if="false" />
      <div v-if="dateRange"
           class="demo">
        <h4>{{ dateRange | asYear }} - {{ filtered.length }}</h4>
        <div>
          <pre>{{ filtered | capped }}</pre>
          <pre>{{ filteredDrivers | capped }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// ^ https://www.kaggle.com/cjgdev/formula-1-race-data-19502017
import * as hierarchy from 'd3-hierarchy'
import * as collection from 'd3-collection'
import * as fetch from 'd3-fetch'
import ForceGraphVue from './ForceGraph.vue'
import { ascending, timeFormat, bisector, sum } from 'd3'
import DateScannerVue from './DateScanner.vue'

const d3 = {
  ...hierarchy,
  ...collection,
  ...fetch
}
export default {
  name:       'FormulaOne',
  components: {
    ForceGraph:  ForceGraphVue,
    DateScanner: DateScannerVue
  },
  filters: {
    asYear(arr) {
      return arr.map(timeFormat('%Y'))
    },

    /** @param {any[]} arr */
    capped(arr) {
      return arr.slice(0, 2)
    }
  },
  data: () => {
    return {
      test: {
        drivers:         [],
        races:           [],
        driverStandings: []
      },
      dateRange: null,
      maps:      {
        drivers: new Map()
      }
    }
  },
  computed: {
    filtered() {
      if(!this.dateRange) return []

      /** @type {[number,number]} */
      const [
        start,
        end
      ] = this.dateRange

      const bisect = bisector(v => Date.parse(v.date))

      // debugger

      const startIndex = bisect.left(this.test.races, start)
      const endIndex = bisect.right(this.test.races, end)

      return this.test.races.slice(startIndex, endIndex)
    },

    /**
     * This will create a list of drivers for the current dates
     * Each driver will have the driver object, and values based on total wins / losses, etc...
     */
    filteredDrivers() {
      if(this.filtered) {


        const ids = this.filtered.map(v => v.drivers).flat()

        const positionNest = d3.nest().key(v => v.position).rollup(v => v.length)

        return d3.nest().key(v => v.id).sortKeys(ascending).rollup(v => ({
          wins:      sum(v, vv => vv.wins),
          positions: positionNest.object(v),
          points:    sum(v, vv => vv.points)
        })).entries(ids)
      }
    }
  },
  async beforeMount() {
    let [
      drivers,
      races,
      driverStandings
    ] = await Promise.all([
      d3.csv('/datasets/f1/drivers.csv'),
      d3.csv('/datasets/f1/races.csv'),
      d3.csv('/datasets/f1/driverStandings.csv')
    ])

    // Assign drivers to map
    drivers.forEach(d => this.maps.drivers.set(d.driverId, d))

    // Assign driver info to each race
    races = races.map(race => {

      const drivers = driverStandings
        .filter(ds => ds.raceId === race.raceId)
        .map(ds => ({
          id:       ds.driverId,
          points:   ds.points,
          wins:     ds.wins,
          position: ds.position
        }))

      drivers.sort((a, b) => ascending(+a.position, +b.position))

      return {
        ...race,
        drivers
      }
    })



    // Sort them
    races.sort((a, b) => {
      return ascending(Date.parse(a.date), Date.parse(b.date))
    })

    this.test = Object.freeze({
      drivers,
      races,
      driverStandings
    })

    if(process.env.NODE_ENV === 'development'){
      window.dataset = this.test
    }

  },
  mounted() {
    if(process.env.NODE_ENV === 'development'){
      window.d3 = require('d3')
    }

  },
  beforeDestroy() {
    this.$delete(window, 'd3')
    this.$delete(window, 'dataset')
  }
}
</script>

<style scoped lang="scss">
.f1 {
  background-image: url('/static/images/f1/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  // Grid Props
  display: grid;
  grid:
  [row1-start] 'title content' auto [row1-end]
  [row2-start] 'sidebar content' 1fr [row2-end]
  / auto 1fr;
  row-gap: 5px;
  column-gap: 5px;

  &__title {
    grid-area: title;
  }

  &__sidebar {
    grid-area: sidebar;
    position: relative;
    display: grid;
  }

  &__content {
    grid-area: content;
    position: relative;
    display: grid;
  }
}

.demo {
  display: grid;
  overflow: hidden;
  grid: auto 1fr / 1fr;

  > div {
    display: grid;
    grid: 1fr / 1fr 1fr;
  }
}
</style>
