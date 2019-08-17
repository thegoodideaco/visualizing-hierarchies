<template>
  <div>
    <small>Time Left</small>
    <h4 v-if="!timeFinished">
      {{ timeDisplay }}
    </h4>
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
      end: Date.parse('8/18/2019 17:45:00'),

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

      let all = [
        s % 60,
        m % 60,
        h % 24
      ]

      const [fs, fm, fh] = all.map(v => {
        let o = String(Math.floor(v))

        if (o.length < 2) o = `0${o}`

        return o
      })

      return `${fh}:${fm}:${fs}`
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
