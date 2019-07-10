<template>
  <div>
    <div class="inner">
      <div
        v-if="dataset.length"
        class="visual">
        <edge-bundler
          :rotation="newAngle"
          class="edge-bundler"
          v-bind="{dataset}"
          @selected="clickedItem = $event" />

        <!-- Summary -->
        <aside class="info-bar text-right">
          <div class="summary p-5">
            <h4>Summary</h4>
            <div>Total Emails: {{ dataset.length }}</div>
            <div>People: {{ people.length }}</div>
            <div>Timespan: {{ timespan | inDays }} days</div>
          </div>

          <!-- Legend -->
          <div class="legend p-5 mb-5">
            <h4>Legend</h4>
            <ul>
              <li
                v-for="(person, index) in people"
                :key="index"
                :style="{color: colorScale(person)}">
                <label>
                  <span>{{ person }}</span>
                  <input type="checkbox">
                </label>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import { csv } from 'd3-fetch'
import anime from 'animejs'
import chroma from 'chroma-js'

import EdgeBundler from '@/components/demos/enron-emails/EdgeBundler.vue'
import { extent, ascending } from 'd3'
import * as scales from 'd3-scale'

export default {
  components: {
    EdgeBundler
  },
  filters: {
    inDays(extent) {
      const totalms = extent[1] - extent[0]

      return totalms / 1000 / 60 / 60 / 24
    }
  },
  data() {
    return {
      /** @type {Enron.EnronEmail[]} */
      dataset:     [],
      clickedItem: null,
      angle:       180
    }
  },
  computed: {
    rotation: {
      get() {
        return this.newAngle
      },
      set(val) {
        // this.angle = val

        // anime.remove(this)

        anime({
          targets:    this,
          newAngle:   val,
          duration:   80,
          easing:     'easeOutCubic',
          elasticity: 200,
          autoplay:   true
        })
      }
    },
    newAngle: {
      get() {
        return this.$store.state.controls.edgeBundling.angle
      },
      set(val) {
        this.$store.commit('controls/update', {
          path:  'edgeBundling.angle',
          value: val
        })
      }
    },
    people() {
      const filtered = this.dataset.reduce((prev, email) => {
        const from = email.FROM
        if (!from) return prev

        const name = from
          .replace(/(.+)<.*/, '$1')
          .toLowerCase()
          .trim()

        if (!prev.includes(name)) prev.push(name)
        return prev
      }, [])

      return filtered.sort((a, b) => ascending(a, b))
    },
    timespan() {
      return extent(this.dataset, v => Date.parse(v.MasterDate))
    },
    colorScale() {
      const colors = chroma
        .scale([
          ...chroma.brewer.Set1,
          ...chroma.brewer.Set2,
          ...chroma.brewer.Set3
        ])
        .colors(this.people.length)
      const s = scales
        .scaleThreshold()
        .domain(this.people)
        .range(colors)

      return s
    }
  },
  async mounted() {
    const data = await csv('/datasets/enron-emails.csv')

    data.sort((a, b) =>
      ascending(Date.parse(a.MasterDate), Date.parse(b.MasterDate))
    )
    this.dataset = Object.freeze(data)
  },
  methods: {
    /** @param {Event} ev */
    updateRotation(ev) {
      // console.log(ev.currentTarget.value)
      this.rotation = parseFloat(ev.currentTarget.value)
    }
  }
}
</script>

<style scoped lang="scss">
.info-bar {
  display: grid;
  grid: auto 1fr / 1fr;
  overflow: hidden;
  position: relative;
}
.inner {
  width: 100%;
  height: 100%;
  display: grid;
  grid: 1fr / 1fr;
}

.visual {
  position: relative;
  overflow: hidden;

  display: grid;
  grid: 1fr / 1fr max-content;
  row-gap: 10px;
}

.edge-bundler {
  display: grid;
  overflow: hidden;
}

.legend {
  display: grid;
  overflow: hidden;
  grid: auto 1fr / 1fr;

  > * {
    padding: 0.5rem;
  }

  ul {
    overflow: auto;

    li {
      label {
        cursor: pointer;
        display: grid;
        grid: auto / 1fr auto;
        align-items: center;
        column-gap: 5px;
      }
    }
  }
}
</style>
