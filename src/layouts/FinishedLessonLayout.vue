<template>
  <div class="grid-tools">
    <header>
      <!-- Option Area -->
    </header>
    <div>
      <div class="flex items-center justify-center">
        <slot>
          <!-- Component -->
          put something here
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.grid-tools {
  display: grid;
  grid: auto 1fr / 1fr;

  > *:nth-child(2) {
    display: grid;
  }
}

header {
  &:not(:empty) {
    padding: 10px;
    background-color: rgba(#000, 0.25);
  }
}
</style>
