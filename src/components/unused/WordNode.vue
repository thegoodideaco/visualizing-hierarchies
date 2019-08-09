<template>
  <div class="word-node">
    {{ node.word }} - {{ node.value }}
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

<style></style>
