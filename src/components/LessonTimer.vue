<template>
  <div>
    <small>Time Left</small>
    <h4>
      {{ timeDisplay }}
    </h4>
  </div>
</template>

<script>
import { timeFormat } from 'd3'

export default {
  timer: 0,

  data() {
    return {
      end:       Date.parse('8/14/2019 20:45:00'),
      current:   0,
      formatter: null
    }
  },
  computed: {
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
    this.$on('hook:beforeDestroy', clearInterval(this.$data.$timer))
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

<style>
</style>
