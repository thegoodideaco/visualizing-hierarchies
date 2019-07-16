<template>
  <div>
    <input v-model.number="a">
    <input v-model.number="b">
    <h2>The sum is {{ a + b }}</h2>
  </div>
</template>

<script>
export default {
  data: () => ({
    a: 2,
    b: 3
  })
}
</script>
