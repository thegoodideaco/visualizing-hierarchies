<template>
  <div class="image-slider"
       :class="{ fullscreen }">
    <div v-if="items"
         class="image-slider__inner">
      <keep-alive>
        <!-- If Image -->
        <div
          v-if="!isComponent"
          :key="activeIndex"
          class="image-slider__image"
          :class="{ 'no-title': !activeItem.title }">
          <transition appear
                      name="zoom">
            <!-- Image / will be applied as a background for auto fitting once loaded -->
            <img
              v-if="!loaded"
              :alt="activeItem.title"
              :src="activeItem.url"
              class="image-slider__image-container hidden"
              draggable="false"
              @load="loaded = true">

            <!-- The div that _contains_ the image -->
            <div
              v-else-if="!fullscreen"
              class="image-slider__image-fill m-5"
              :style="activeItem.url | asStyle"
              @click="fullscreen = true" />

            <div v-else>
              <img
                :src="activeImagePath"
                draggable="false"
                @click="fullscreen = false">
            </div>
          </transition>

          <!-- Title -->
          <h4
            v-show="loaded"
            v-if="activeItem.title"
            class="image-slider__image-header">
            {{ activeItem.title }}
          </h4>
        </div>
        <!-- If Component -->
        <component
          :is="activeItem"
          v-else
          :key="'_' + activeIndex"
          class="image-slider__component"
          @hook:mounted="loaded = true" />
        <!-- </transition> -->
      </keep-alive>
    </div>
  </div>
</template>

<script>
/**
 * @typedef {{url: string, title: string} & (() => Vue.AsyncComponent)} Item
 */
export default {
  filters: {
    asStyle: url => ({
      backgroundImage: `url(${
        url.startsWith('http') ? url : encodeURIComponent(url)
      })`
    })
  },
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
    loaded:     false,
    fullscreen: false
  }),
  computed: {
    /**
     * @returns {Item}
     */
    activeItem() {
      if (!this.items) return
      return this.items[this.activeIndex]
    },

    activeImagePath() {
      if (this.activeItem && this.activeItem.url) {
        const url = this.activeItem.url
        return url.startsWith('http') ? url : encodeURIComponent(url)
      }
    },

    isComponent() {
      return this.activeItem && typeof this.activeItem === 'function'
    }
  },
  watch: {
    activeIndex() {
      this.loaded = false
    },
    fullscreen: {
      handler(val) {
        if (val) {
          this.$el.remove()

          document.body.append(this.$el)
        } else {
          this.$el.remove()
          this.realParentElement.append(this.$el)
        }
      }
    },
    activeItem() {
      if (this.fullscreen) {
        this.fullscreen = false
      }
    }
  },
  async mounted() {
    document.addEventListener('keydown', this.keyPressed)
    await this.$nextTick()

    this.$on('hook:beforeDestroy', this.removeListeners)
    this.$on('hook:deactivated', this.removeListeners)

    this.realParentElement = this.$el.parentElement
  },
  beforeDestroy() {
    if (this.fullscreen) {
      this.fullscreen = false
      this.$el.remove()
      this.realParentElement.append(this.$el)
    }
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
      if (ev.key === 'Escape') {
        this.fullscreen = false
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
      // console.log('removing listeners')
      document.removeEventListener('keydown', this.keyPressed)
    }
  }
}
</script>

<style scoped lang="scss">
.image-slider {
  display: grid;
  height: 100%;
  align-items: center;
  cursor: pointer;

  &.fullscreen {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    background-color: rgba(#000, 0.75);
    cursor: none;
  }

  &__inner {
    display: grid;
    height: 100%;
    text-align: center;
  }

  // Has image with underlying title
  &__image {
    display: grid;
    grid: 1fr auto / 1fr;
    overflow: hidden;
    height: 100%;
    // align-items: center;
    // align-content: center;

    &.no-title {
      grid: 1fr / 1fr;
    }

    &-container {
      height: 100%;
      margin: auto;
    }

    &-fill {
      background-size: contain;
      background-repeat: no-repeat no-repeat;
      background-position: center center;
    }

    &-header {
      padding: 2rem;
      font-size: 4rem;

      .fullscreen & {
        display: none;
      }
    }

    .fullscreen & {
      grid: 1fr / 1fr;

      img {
        width: 100%;
        height: auto;
      }
    }
  }

  // &__component {

  // }
}
</style>
