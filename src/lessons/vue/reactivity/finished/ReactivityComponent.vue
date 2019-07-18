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
    c(val) {
      this.reduced = val
      this.divide()
    }
  },
  methods: {
    divide() {
      this.reduced = ~~(this.reduced * .99)

      if(this.reduced > .001){
        requestAnimationFrame(this.divide)
      }else{
        this.reduced = 0
      }
    }
  }
}
</script>
