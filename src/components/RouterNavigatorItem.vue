<template>
  <li class="nav__item">
    <!-- Router Link if Leaf -->
    <router-link v-if="isLeaf"
                 class="nav__item__title"
                 active-class="pointer-events-none active"
                 :to="routeItem">
      {{ routeItem.meta.title }}
    </router-link>

    <!-- Normal Title if ancestor -->
    <span v-else
          class="text-orange-400 font-bold">
      {{ routeItem.meta.title }}
    </span>

    <ul v-if="routeItem.children"
        class="mb-2">
      <!-- Recursive Component -->
      <router-navigator-item
        v-for="(item, index) in routeItem.children"
        :key="index"
        :route-item="item" />
    </ul>
  </li>
</template>

<script>
export default {
  name:  'RouterNavigatorItem',
  props: {

    /**
     * @type {Vue.PropOptions<import('vue-router').RouteConfig>}
     */
    routeItem: {
      type:     Object,
      required: true
    }
  },
  computed: {
    isLeaf() {
      return this.routeItem.children == null
    }
  }
}
</script>

<style scoped lang="scss">
.nav__item {
  &__title {
    color: #48eca3;
    font-size: 1rem;

    &.active {
      color: #fff;

    }
  }

  /deep/ .nav__item {
    font-size: .7em;

    .nav__item__title {
      color: darken(#fff, 3);
    }
  }
}
</style>
