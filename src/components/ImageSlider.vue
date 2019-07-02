<template>
  <div class="image-slider">
    <div v-if="items">
      <transition
        appear
        mode="out-in"
        name="fade">
        <!-- If Image -->
        <div v-if="!isComponent"
             :key="activeIndex"
             class="image-slider__inner">
          <img :alt="activeItem.title"
               :src="activeItem.url"
               @load="loaded = true">

          <h4 v-show="loaded">
            {{ activeItem.title }}
          </h4>
        </div>
        <!-- If Component -->
        <component :is="activeItem"
                   v-else
                   v-once
                   :key="'_'+activeIndex"
                   class="h-full" />
      </transition>
    </div>
  </div>
</template>

<script>
/**
 * @typedef {{url: string, title: string} & (() => Vue.AsyncComponent)} Item
 */
export default {
  props: {
    /** Items can be an array of simple images, or components
     * @type {Vue.PropOptions<Item[]>}
     */
    items: {
      type: Array
    },
    /** @type {Vue.PropOptions<number>} */
    activeIndex: {
      type:    Number,
      default: 0
    }
  },
  data: () => ({
    loaded: false
  }),
  computed: {
    /**
     * @returns {Item}
     */
    activeItem() {
      if (!this.items) return
      return this.items[this.activeIndex]
    },

    isComponent() {
      return this.activeItem && typeof this.activeItem === 'function'
    }
  },
  watch: {
    activeIndex() {
      this.loaded = false
    }
  },
  async mounted() {
    document.addEventListener('keydown', this.keyPressed)
    await this.$nextTick()

    this.$on('hook:beforeDestroy', this.removeListeners)
    this.$on('hook:deactivated', this.removeListeners)
  },
  methods: {
    /** @type {(ev: KeyboardEvent) => void} */
    keyPressed(ev) {
      if (ev.key === 'ArrowLeft') {
        this.prev()
      }
      if (ev.key === 'ArrowRight') {
        this.next()
      }
      ev.stopPropagation()
    },

    prev() {
      if (this.activeIndex === 0) {
        this.$emit('update:activeIndex', this.items.length - 1)
      } else {
        this.$emit('update:activeIndex', this.activeIndex - 1)
      }
    },
    next() {
      this.$emit(
        'update:activeIndex',
        (this.activeIndex + 1) % this.items.length
      )
    },

    removeListeners() {
      console.log('removing listeners')
      document.removeEventListener('keydown', this.keyPressed)
    }
  }
}
</script>

<style scoped lang="scss">
.image-slider {
  display: grid;
  &__inner {
    display: grid;
    justify-items: center;
  }
}
</style>
