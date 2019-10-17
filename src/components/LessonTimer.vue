<template>
  <div>
    <small>Time Left</small>

    <!-- Time Display -->
    <h4 v-if="!timeFinished">
      {{ timeDisplay }}
    </h4>

    <!-- Timed out display -->
    <h4 v-else
        class="text-red-500 blink">
      00:00:00
    </h4>
  </div>
</template>

<script>
import { timeFormat } from 'd3'

export default {
  timer: 0,

  data: () => {
    return {
      end: Date.parse('10/30/2019 17:45:00 GMT-0400'),

      /** @type {number} */
      current:   0,
      formatter: null
    }
  },
  computed: {
    timeFinished() {
      return this.current < 0
    },
    timeDisplay() {
      const s = (this.current / 1000)
      const m = (s / 60)
      const h = (m / 60)
      const d = (h / 24)

      let all = [
        s % 60,
        m % 60,
        h % 24,
        d % 365
      ]

      const [fs, fm, fh, fd] = all.map(v => {
        let o = String(Math.floor(v))

        if (o.length < 2) o = `0${o}`

        return o
      })

      return `${fd}:${fh}:${fm}:${fs}`
    }
  },
  beforeMount() {
    this.formatter = timeFormat('%X')
    this.startTimer()
  },
  mounted() {
    this.$on('hook:beforeDestroy', () => clearInterval(this.$options.$timer))
  },
  methods: {
    startTimer() {
      this.updateTimer()
      const i = setInterval(this.updateTimer, 1000)

      this.$options.timer = i
    },
    updateTimer() {
      this.current = this.end - Date.now()
    }
  }
}
</script>
