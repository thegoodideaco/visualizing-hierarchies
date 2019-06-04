<template>
  <div id="app"
       class="h-full font-sans">
    <router-view />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opactiy: 1;
  }
}

#app {
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: .5s;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}
</style>
