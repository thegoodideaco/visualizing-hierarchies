<template>
  <div
    id="app"
    class="h-full font-sans">
    <router-view />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade {
  &-enter {
    opacity: 0;
    &-active {
      transition: opacity 0.25s;
    }
  }

  &-leave {
    &-active {
      transition: opacity 0.25s;
    }

    &-to {
      opacity: 0;
    }
  }
}
.zoom {
  $speed: 250ms;
  &-enter {
    opacity: 0;
    transform: scale(0);
    &-active {
      transition: opacity $speed, transform $speed;
      transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }

  &-leave {
    &-active {
      transition: opacity $speed, transform $speed;
      transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    &-to {
      transform: scale(0);
    }
  }
}

#app {
  display: grid;
  grid: 1fr / 1fr;
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 0.5s;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}
</style>
