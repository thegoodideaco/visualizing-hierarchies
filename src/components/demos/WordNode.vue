<template>
  <div class="word-node">
    {{ node.word }}
  </div>
</template>

<script>
export default {
  props: {
    node: {
      type:     Object,
      required: true
    }
  }
}
</script>

<style>

</style>
