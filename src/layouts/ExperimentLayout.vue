<template>
  <div class="xp-layout">
    <!-- Sidebar -->
    <aside class="p-5 sidenav">
      <div>
        <h2>Experiments</h2>
        <h5 class="text-green-300">
          {{ $route.meta.title }}
        </h5>
        <router-link to="/intro">
          Go back
        </router-link>
        <hr>
      </div>
      <!-- Readme -->

      <!-- Controls -->
      <div class="controls">
        <h3>Controls</h3>
        <router-view name="controls" />
      </div>
    </aside>

    <!-- Content -->
    <slot>
      <router-view class="component-view" />
    </slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.xp-layout {
  display: grid;
  grid: 1fr / min-content 1fr;
  overflow: hidden;
  position: relative;
  height: 100%;

  > * {
    overflow: hidden;
  }
}

aside {
  display: grid;
  grid: auto 1fr / 1fr;
}

.sidenav {
  border-right: 1px solid #fff;
}
</style>
