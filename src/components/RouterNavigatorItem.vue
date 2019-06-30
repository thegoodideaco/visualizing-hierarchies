<template>
  <li class="nav__item">
    <!-- Router Link if Leaf -->
    <router-link
      v-if="isLeaf"
      :to="routeItem"
      active-class="pointer-events-none active"
      class="nav__item__title">
      {{ routeItem.meta.title }}
    </router-link>

    <!-- Normal Title if ancestor -->
    <div
      v-else
      class="text-orange-400 font-bold mt-5">
      {{ routeItem.meta.title }}
    </div>

    <ul
      v-if="routeItem.children"
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
    font-size: 0.7em;

    .nav__item__title {
      color: rgba(247, 247, 247, 0.34);

      &.active {
        color: #fff;
      }
    }
  }
}
</style>
