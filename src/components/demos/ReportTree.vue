<template>
  <div class="h-full">
    <iframe
      :src="debug ? '/static/report.html' : '/report.html'"
      class="cover-full gpu"
      height="100%"
      width="100%"
      @load="blurFrame" />
  </div>
</template>

<script>
export default {
  data: () => ({
    debug: process.env.NODE_ENV === 'development'
  }),
  methods: {
    blurFrame() {
      if (document.activeElement) document.activeElement.blur()
    }
  }
}
</script>

<style>
</style>
