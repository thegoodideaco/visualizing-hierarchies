<template>
  <div
    class="circle"
    :style="styles" />
</template>

<script>
import { ThumbnailData } from './thumbnails'
export default {
  props: {
    item: {
      type:     Object,
      required: true
    },
    radius: {
      type:     Number,
      required: true
    }
  },
  computed: {
    styles() {
      const {
        x,
        y,
        data: {
          value: {
            driver: { url }
          }
        }
      } = this.item

      const image = ThumbnailData.vals[ThumbnailData.urls.indexOf(url)]

      return {
        transform:       `translate3d(${x - this.radius}px, ${y - this.radius}px, 0)`,
        width:           `${this.radius * 2}px`,
        height:          `${this.radius * 2}px`,
        backgroundImage: `url(${image})`
      }
    }
  }
}
</script>

<style scoped lang="scss">
.circle {
  position: absolute;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  border: 4px solid #fff;
  cursor: pointer;
}
</style>
