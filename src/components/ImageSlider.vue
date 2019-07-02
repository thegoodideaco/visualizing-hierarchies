<template>
  <div class="image-slider">
    <div v-if="items">
      <transition appear
                  mode="out-in"
                  name="fade">
        <div
          :key="activeIndex"
          class="image-slider__inner">
          <img :src="activeItem.url"

               @load="loaded = true">

          <h4 v-show="loaded">
            {{ activeItem.title }}
          </h4>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * @type {Vue.PropOptions<{url: string, title: string}>}
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
    activeItem() {
      if (!this.items) return
      return this.items[this.activeIndex]
    }
  },
  watch: {
    activeIndex(){
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
      if(ev.key === 'ArrowLeft') {
        this.prev()
      }
      if(ev.key === 'ArrowRight') {
        this.next()
      }
      ev.stopPropagation()
    },

    prev() {
      if(this.activeIndex === 0) {
        this.$emit('update:activeIndex', this.items.length -1)
      }else{
        this.$emit('update:activeIndex', this.activeIndex -1)
      }
    },
    next() {

      this.$emit('update:activeIndex', (this.activeIndex + 1) % this.items.length)
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
  &__inner {
    display: grid;
    justify-items: center;
  }
}
</style>
