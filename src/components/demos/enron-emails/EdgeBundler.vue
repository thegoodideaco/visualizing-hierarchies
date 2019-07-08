<template>
  <div class="h-full w-full overflow-hidden">
    <svg class="w-full h-full">
      <g v-if="hierarchy">
        <!-- Paths -->
        <g :transform="translateCenter">
          <path
            v-for="(link, index) in filteredLinks"
            :key="`link${index}`"
            :d="path(link)"
            fill="none"
            stroke="white" />
        </g>

        <!-- Circles -->
        <circle
          v-for="(item, i) in filteredNodes"
          :key="i"
          :fill="getCircleColor(item)"
          :r="4"
          class="node-point"
          v-bind="nodeProps(item)"
          @click.left="onClick(item)" />
      </g>
    </svg>
  </div>
</template>

<script>
import { nest } from 'd3-collection'
import * as d3h from 'd3-hierarchy'
import * as d3s from 'd3-shape'
import * as scales from 'd3-scale'
import { ascending } from 'd3-array'
import { timeFormat } from 'd3-time-format'

import chroma from 'chroma-js'

const dateFormat = timeFormat('%Y %b')

const keyGroupers = {
  /** @param {Enron.EnronEmail} v */
  from: v => {
    const n = v.FROM.replace(/(.+)<.+/, '$1')
    const trimmed = n
      .toLowerCase()
      .trim()
      .replace(/\s+/, ' ')
    return trimmed ? trimmed : 'n/a'
  },

  /** @param {Enron.EnronEmail} v */
  to: v => {
    const n = v.TO.replace(/.+<(\S+)>.+/, '$1')
    return n.toLowerCase().substr(0, 1)
  },

  /** @param {Enron.EnronEmail} v */
  byYear: v => {
    const year = Date.parse(v.MasterDate)
    return dateFormat(year).split(' ')[0]
  },

  /** @param {Enron.EnronEmail} v */
  byMonth: v => {
    const year = Date.parse(v.MasterDate)
    return dateFormat(year).split(' ')[1]
  }
}

export default {
  name:  'EdgeBundler',
  props: {
    /** @type {Vue.PropType<{TO: string}[]>} */
    dataset: Array,

    rotation: {
      type:    Number,
      default: 360
    }
  },
  data() {
    return {
      width:  100,
      height: 100,
      keys:   [
        keyGroupers.from,
        keyGroupers.byYear
      ]
    }
  },
  computed: {
    /** Method to pass dataset into
     * @returns {d3.Nest<{TO: string}, any>}
     */
    nest() {
      const nester = nest()

      /**
       * Loop and nest down the levels
       */
      this.keys.forEach(k => {
        if (typeof k === 'function') {
          nester.key(k)
        } else {
          nester.key(d => d[k])
        }

        nester.sortKeys(ascending)
      })

      return nester
    },

    /**
     * Split the dataset into emails, and attachments
     * @returns {{attachments: Enron.EnronEmail[], emails: Enron.EnronEmail[]}}
     */
    collections() {
      const coll = {
        attachments: [],
        emails:      []
      }

      if (!this.dataset) return coll
      return this.dataset.reduce((prev, cur) => {
        const attachment = cur.Filename

        if (attachment) {
          prev.attachments.push(cur)
        } else {
          prev.emails.push(cur)
        }

        return prev
      }, coll)
    },

    /**
     * Find all unique people within each email
     * Only uses the first name
     */
    people() {
      if (this.hierarchy) {
        return this.hierarchy.data.values.map(v => v.key)
      }
    },

    /**
     * @returns {d3.HierarchyPointNode<Enron.EnronEmail>}
     */
    hierarchy() {
      if (this.nest) {
        /**
         * @type {d3.HierarchyNode<{key: string, values: Enron.EnronEmail[]} & Enron.EnronEmail>}
         */
        const h = d3h.hierarchy(
          {
            key:    'root',
            values: this.nest.entries(this.collections.emails)
          },
          d => d.values
        )

        h.count().sort((a, b) => {
          const leaf = a.children == null

          if (leaf) {
            return Date.parse(a.data.MasterDate) - Date.parse(b.data.MasterDate)
          } else {
            return a.data.key > b.data.key
              ? 1
              : a.data.key < b.data.key
                ? -1
                : 0
          }
        })

        const cluster = d3h
          .cluster()
          .size([Math.PI * 2 * (this.rotation / 360), this.radius])
          .separation((a, b) =>
            !a.children && a.data.MasterDate === b.data.MasterDate ? 0 : 90
          )

        return cluster(h)
      }
    },

    filteredLinks() {
      if (this.hierarchy) {
        /** @type {d3.HierarchyPointLink<Enron.EnronEmail>[]} */
        const l = this.hierarchy.links()

        return l.filter(() => {
          // return v.source.parent != null && v.target.parent != null
          return true
        })
      }

      return []
    },

    filteredNodes() {
      if(this.hierarchy) {
        return this.hierarchy.leaves()
      }
    },

    /**
     * Colorized by the person who sent the email (1st grouping level)
     */
    circleColor() {
      if (!this.people) return
      // Let's generate an array of colors to match the amount of people
      const colors = chroma
        .scale(chroma.brewer.Spectral)
        .colors(this.people.length)
      const s = scales
        .scaleThreshold()
        .domain(this.people)
        .range(colors)

      return s
    },

    radius() {
      const r = Math.min(this.width, this.height) * 0.5

      // Give it some padding
      return r - r * 0.1
    },

    translateCenter() {
      const center = {
        x: this.width * 0.5,
        y: this.height * 0.5
      }

      return `translate(${center.x} ${center.y})`
    }
  },

  /**
   * Get size when first rendered
   */
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },

  methods: {
    /**
     * Update the size
     */
    resize() {
      if (!this.$el) return
      const { width, height } = this.$el.getBoundingClientRect()

      Object.assign(this, {
        width,
        height
      })
    },

    /**
     * @param {d3.HierarchyPointLink<Enron.EnronEmail>} link
     */
    path(link) {
      // const des = node.ancestors().reverse().slice(1).reverse()
      // const links = node.links().map(v => {
      //   return [v.source,
      //     v.target]
      // })

      // debugger

      return d3s
        .linkRadial()
        .angle(d => d.x)
        .radius(d => d.y)(link)
    },

    /**
     * Generate the radial coords and return
     * @param {d3.HierarchyPointNode} node
     */
    nodeProps(node) {
      const {
        // The radian
        x: xval,

        // The depth
        y: yval
      } = node

      // if(!x || !y) return

      const center = {
        x: this.width * 0.5,
        y: this.height * 0.5
      }

      const angleOff = 1.5707963267948966 // ? 90deg in radians

      const x = xval || 0
      const y = yval || 0

      const newx = Math.cos(x - angleOff) * y
      const newy = Math.sin(x - angleOff) * y

      return {
        cx: center.x + newx,
        cy: center.y + newy
      }
    },

    onClick(item) {
      this.$emit('selected', item)
    },

    /**
     * @param {d3.HierarchyPointNode<Enron.EnronEmail | {key: string}>} item
     */
    getCircleColor(item) {
      if (!item.parent || !this.people) return
      const key = item.ancestors().reverse()[1].data.key
      return this.circleColor(key)
    }
  }
}
</script>

<style scoped lang="scss">
svg {
  // background-color: rgba(96, 125, 139, 0.22);

  shape-rendering: optimizeSpeed;

  path {
    stroke-opacity: 0.25;
    stroke-width: 0.75px;
  }
}

.circle-test {
  fill: yellow;
  stroke: #fff;
}

.center-offset {
  transform: translate3d(50%, 50%, 0);
}
</style>
