<template>
  <div>
    <div class="inner">
      <div>
        <h1 class="text-center">
          Edge Bundling
        </h1>

        <input type="range"
               min="0"
               max="360"
               @input.self="updateRotation">
      </div>

      <div v-if="dataset.length"
           class="visual">
        <!-- Not showing in prod... -->
        <edge-bundler v-bind="{dataset}"
                      :rotation="angle"
                      @selected="clickedItem = $event" />
      </div>
    </div>
  </div>
</template>

<script>
import { csv } from 'd3-fetch'
import anime from 'animejs'

import EdgeBundler from '@/components/demos/enron-emails/EdgeBundler.vue'

export default {
  components: {
    EdgeBundler
  },
  data() {
    return {
      dataset:     [],
      clickedItem: null,
      angle:       180
    }
  },
  computed: {
    rotation: {
      get() {
        return this.angle
      },
      set(val) {
        // this.angle = val

        // anime.remove(this)

        anime({
          targets:    this,
          angle:      val,
          duration:   80,
          easing:     'easeOutCubic',
          elasticity: 200,
          autoplay:   true


        })
      }
    }
  },
  async mounted() {
    const data = await csv('/datasets/enron-emails.csv')
    this.dataset = Object.freeze(data)
  },
  methods: {
    /** @param {Event} ev */
    updateRotation(ev) {
      // console.log(ev.currentTarget.value)
      this.rotation = parseFloat(ev.currentTarget.value)
    }
  }
}
</script>

<style scoped lang="scss">
.inner {
  width: 100%;
  height: 100%;
  display: grid;
  grid: auto 1fr / 1fr;
}

.visual {
  position: relative;
  overflow: hidden;

  display: grid;
  grid: 1fr / 1fr;
  row-gap: 10px;
}
</style>
