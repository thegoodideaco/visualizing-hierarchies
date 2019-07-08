<template>
  <div class="xp-layout">
    <aside>
      <div>
        <h2>Experiments</h2>
        <router-link to="/intro">
          Go back
        </router-link>
      </div>
      <!-- Readme -->

      <!-- Controls -->
      <div class="controls">
        <router-view name="controls" />
      </div>
    </aside>
    <slot>
      <router-view class="h-full" />
    </slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.xp-layout {
  display: grid;
  grid: 1fr / min-content 1fr;
}

aside {
  display: grid;
  grid: auto 1fr / 1fr;
}
</style>
