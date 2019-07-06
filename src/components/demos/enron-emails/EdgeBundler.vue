<template>
  <div class="h-full w-full overflow-hidden">
    <svg class="w-full h-full">
      <g v-if="hierarchy">
        <g :transform="translateCenter">
          <path
            v-for="(leaf, index) in hierarchy.descendants()"
            :key="`link${index}`"
            :d="path(leaf)"
            fill="none"
            stroke="white" />
        </g>

        <!-- Circles -->
        <circle
          v-for="(item, i) in hierarchy.descendants()"
          :key="i"
          class="node-point"
          :fill="getCircleColor(item)"
          r="4"
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
import { timeFormat, scaleQuantile } from 'd3'

const dateFormat = timeFormat('%Y %b')



const keyGroupers = {

  /** @param {Enron.EnronEmail} v */
  from: v => {
    const n = v.FROM.replace(/.+<(\S+)>.+/, '$1')
    return n.toLowerCase().substr(0, 1)
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
  props: {
    /** @type {Vue.PropType<{TO: string}[]>} */
    dataset: Array,

    rotation: {
      type:    Number,
      default: 360
    }
  },
  data: () => ({
    width:  100,
    height: 100,
    // rotation: 360,
    keys:   [
      keyGroupers.byYear,
      keyGroupers.byMonth,
      keyGroupers.from,
      keyGroupers.to
    ]
  }),
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
      if (this.dataset) {
        return this.dataset.reduce((prev, cur) => {
          const name = cur.FROM.replace(/\s<.+/, '').toLowerCase()
          if (name && !prev.includes(name)) prev.push(name)
          return prev
        }, [])
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

          if(leaf) {
            return Date.parse(a.data.MasterDate) - Date.parse(b.data.MasterDate)
          }else{
            return a.data.key > b.data.key ? 1 : a.data.key < b.data.key ? -1 : 0

          }
        })

        const cluster = d3
          .cluster()
          .size([(Math.PI * 2) * (this.rotation / 360), this.radius])
          .separation(
            (a, b) => (a.parent === b.parent ? 1 : 2) * Math.sqrt(a.depth)
          )

        return cluster(h)
      }
    },

    /**
     * @returns {d3.Line}
     */
    lineStyle() {
      return d3s
        .lineRadial()
        .angle(n => n.x)
        .radius(n => n.y)
        .curve(d3s.curveLinear)
    },

    circleColor() {
      const s = scaleQuantile()
        .domain(this.hierarchy.data.values.map(v => v.key))
        .range(['#00ffe7', '#ff0057', '#008eff'])

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
     * @param {d3.HierarchyPointNode} node
     */
    path(node) {
      // const des = node.ancestors().reverse().slice(1).reverse()
      // const links = node.links().map(v => {
      //   return [v.source,
      //     v.target]
      // })

      if(node.parent)
        return this.lineStyle(node.ancestors().reverse())
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
      if(!item.parent) return
      let y = null
      if(item.children) {
        y = +item.ancestors().reverse().slice(1)[0].data.key
      }else{
        y = timeFormat('%Y')(Date.parse(item.data.MasterDate))
      }
      return this.circleColor(y)
    }
  }
}
</script>

<style scoped lang="scss">
svg {
  // background-color: rgba(96, 125, 139, 0.22);

  path {
    stroke-opacity: 0.25;
    stroke-width: 0.5px;
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
