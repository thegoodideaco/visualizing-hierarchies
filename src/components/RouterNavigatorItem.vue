<template>
  <li class="nav__item">
    <!-- Router Link if Leaf -->
    <router-link
      v-if="isLeaf"
      :to="routeItem"
      active-class="active"
      class="nav__item__title block"
      draggable="false"
      @click.native.prevent="onClick">
      {{ routeItem.meta.title }}
    </router-link>

    <!-- Normal Title if ancestor -->
    <div
      v-else
      class="section-title text-orange-400 font-bold mt-5"
      :class="{ active: isActive }">
      {{ routeItem.meta.title }}
    </div>

    <ul v-if="subItems"
        class="mb-2">
      <!-- Recursive Component -->
      <router-navigator-item v-for="(item, index) in subItems"
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
    subItems() {
      if (!this.routeItem.children) return null
      return this.routeItem.children.filter(v => {
        return v.meta.title != null
      })
    },
    isLeaf() {
      return this.subItems == null
    },
    isActive() {
      /**
       * @type {boolean}
       * @param {import('vue-router').RouteConfig} value
       */
      const match = this.$route.matched.some(
        value => value.path === this.routeItem.path
      )

      return match
    }
  },
  methods: {
    /** @param {MouseEvent} ev */
    onClick(ev) {
      let url = this.routeItem.path
      if (ev.ctrlKey) url += '/finished'

      const res = this.$router.match(url)

      if (res && res.name !== 'index' && res.fullPath) {
        // eslint-disable-next-line no-unused-vars
        // eslint-disable-next-line handle-callback-err
        this.$router.push(res).catch(() => {})
        ev.currentTarget.blur()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.nav__item {
  &__title {
    color: #48eca3;
    font-size: 1rem;
    text-decoration: none;
    position: relative;
    transition: padding 100ms cubic-bezier(0, 0.48, 0.25, 1);

    &:hover {
      color: saturate(#48eca3, 10);
      padding-left: 0.5rem;
    }

    &.active {
      color: #fff;
      padding-left: 0.5rem;

      &::before {
        content: "-";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        color: #fff;
      }
    }

    &.active,
    &:hover,
    &:focus {
      outline: none;
      color: #fff;
    }
  }

  .section-title {
    opacity: 0.5;

    &.active {
      opacity: unset;
    }
  }

  /deep/ .nav__item {
    font-size: 0.7em;

    .nav__item__title {
      color: rgba(247, 247, 247, 0.5);

      &.active,
      &:hover,
      &:focus {
        outline: none;
        color: #fff;
      }
    }
  }
}
</style>
