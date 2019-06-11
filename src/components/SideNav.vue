<template>
  <aside class="side-nav p-4">
    <div class="text-center cursor-pointer"
         @click.once="$router.push('/')">
      <h3>Visualizing Hierarchies</h3>
      <h5>With Vue.js and D3.js</h5>

      <div class="logos">
        <img src="@/assets/vue-logo.svg">
        <img src="@/assets/d3-logo.svg">
      </div>
    </div>

    <router-navigator class="px-8 uppercase text-2xl" />
  </aside>
</template>

<script>
import RouterNavigatorVue from './RouterNavigator.vue'
export default {
  components: {
    RouterNavigator: RouterNavigatorVue
  }
}
</script>

<style scoped lang="scss">
.side-nav {
  background-color: #171a1d;
  display: grid;
  grid: max-content 1fr / 100%;
  row-gap: 30px;
}

.logos {
    display: grid;
    width: 100%;
    padding: 2em;
  grid: 70px / auto auto;
  justify-content: center;
  column-gap: 10px;

  img {
    height: 100%;
    width: auto;
  }
}
</style>
