<template>
  <div class="nav-menu">
    <ul>
      <route-navigator-item v-for="(route, index) in routes"
                            :key="index"
                            :route-item="route" />
    </ul>
  </div>
</template>

<script>
import RouterNavigatorItemVue from './RouterNavigatorItem.vue'
export default {
  components: {
    RouteNavigatorItem: RouterNavigatorItemVue
  },
  computed: {
    routes() {

      /** @type {import('vue-router').RouterOptions} */
      const {routes} = this.$router.options

      return routes.filter(v => v.meta != null)
    }
  }
}
</script>

<style>

</style>
