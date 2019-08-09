<template>
  <div>
    <input v-model.number="a">
    <input v-model.number="b">
    <h2>The sum is {{ c }}</h2>
    <h4>Reduced {{ reduced }}</h4>
  </div>
</template>

<script>
export default {
  data: () => ({
    a:       2,
    b:       3,
    reduced: 0
  }),
  computed: {
    c() {
      return this.a + this.b
    }
  },
  watch: {
    /**
     * When c changes, set reduced to the same number
     * Then start subtracting
     */
    c(val) {
      this.reduced = val
      this.subtract()
    }
  },
  methods: {
    /**
     * will continuously subtract from reduced until it's 0
     */
    subtract() {
      this.reduced -= 0.1
      if (this.reduced > 0.001) {
        requestAnimationFrame(this.subtract)
      } else {
        this.reduced = 0
      }
    }
  }
}
</script>
