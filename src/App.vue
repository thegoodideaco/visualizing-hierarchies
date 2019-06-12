<template>
  <div id="app"
       class="h-full font-sans">
    <transition mode="out-in"
                name="fade">
      <router-view />
    </transition>
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#app {
  display: grid;
  grid: 100% / 100%;
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: .5s;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}
</style>
