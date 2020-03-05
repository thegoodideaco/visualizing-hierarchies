<template>
  <div>
    <div class="inner">
      <div
        v-if="h.leaves().length"
        class="visual p-5">
        <svg
          ref="svg"
          height="100%"
          width="100%">
          <g :transform="size | centered | asTransform">
            <path
              v-for="(link, index) in h.links()"
              :key="index"
              :d="lineGenerator(getLinkPath(link))" />

            <circle
              v-for="(c, index) in h.descendants()"
              v-show="c.height === 1"
              :key="`_${index}`"
              r="10"
              v-bind="pointPosition(c)"
              @click="selectNode(c)">
              <title>{{ c.data.key || c.data.from }}</title>
            </circle>

            <path
              v-for="(blink, index) in emailLinks"
              :key="`b${index}`"
              :d="lineGenerator(getLinkPath(blink))"
              class="bundle" />

            <circle
              v-if="selectedPos"
              :cx="selectedPos.x"
              :cy="selectedPos.y"
              r="10" />
          </g>
        </svg>

        <!-- Summary -->
        <aside class="info-bar text-right">
          <div class="summary p-5">
            <h4>Summary</h4>
            <div>Total Emails: {{ h.leaves().length }}</div>
          </div>

          <!-- Legend -->
          <div class="legend p-5 mb-5">
            <h4>Legend</h4>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @typedef {d3.HierarchyPointNode<d3.NestedObject<Enron.EnronEmail>>} EnronNode
 * @typedef {d3.HierarchyPointLink<d3.NestedObject<Enron.EnronEmail>>} EnronLink
 */

import { csv } from 'd3-fetch'

// import EdgeBundler from '@/components/demos/enron-emails/EdgeBundler.vue'
import {
  ascending,
  hierarchy,
  nest,
  cluster,
  curveBundle,
  lineRadial
} from 'd3'
import { timeFormat } from 'd3-time-format'

const dateFormat = timeFormat('%Y %b')

export const keyGroupers = {
  /** @param {Enron.EnronEmail} v */
  from: v => {
    const n = v.FROM.replace(/(.+)<.+/, '$1')
    const trimmed = n
      .toLowerCase()
      .trim()
      .replace(/\s+/, ' ')
    return trimmed || 'n/a'
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
  filters: {
    centered(size) {
      const [w, h] = size

      return [w * 0.5, h * 0.5]
    },
    asTransform(size) {
      const [w, h] = size

      return `translate(${w},${h})`
    }
  },
  components: {},
  data() {
    return {
      /** @type {EnronNode} */
      h: hierarchy({}),

      /** @type {{[key: string]: EnronNode}} */
      personMap: {},

      /** @type {EnronLink} */
      emailLinks: [],

      /** @type {number[]} */
      size: [500, 500],

      /** @type {EnronNode} */
      selectedNode: null
    }
  },
  computed: {
    nester() {
      return nest()
        .key(v => v.domain)
        .key(v => v.from)
    },
    cluster() {
      return cluster().size([Math.PI * 2, this.size[1] * 0.4])
    },

    /** @returns {d3.Line<EnronNode>} */
    lineGenerator() {
      return lineRadial()
        .angle(node => node.x)
        .radius(node => node.y)
        .curve(curveBundle)
    },

    pointPosition() {
      return node => {
        const { x, y } = node
        const angle = x - Math.PI / 2
        const radius = y

        return {
          cx: Math.cos(angle) * radius,
          cy: Math.sin(angle) * radius
        }
      }
    },

    selectedPos() {
      if (this.selectedNode) {
        const { x } = this.selectedNode

        const r = this.size[1] * 0.5

        const rx = Math.sin((x * Math.PI) / 180) * r
        const ry = Math.cos((x * Math.PI) / 180) * r

        return {
          x: rx,
          y: ry
        }
      }
    }
  },
  async mounted() {
    const { width, height } = this.$refs.svg.getBoundingClientRect()

    this.size = [width, height]

    const data = await csv('/datasets/enron-emails.csv')

    data.sort((a, b) => ascending(a.date, b.date))

    window.dataset = data

    this.$once('hook:beforeDestroy', () => this.$delete(window, 'dataset'))

    const h = hierarchy(
      {
        key:    'root',
        values: this.nester.entries(data)
      },
      node => node.values
    )

    h.count().sort((a, b) => ascending(a.date, b.date))

    this.h = this.cluster(h)

    const leaves = this.h.leaves()

    const people = {}
    leaves.forEach(leaf => {
      const {
        data: { from }
      } = leaf

      if (!people[from]) {
        people[from] = leaf.parent
      }
    })

    this.personMap = people

    const links = []
    leaves.forEach(l => {
      const {
        data: { to }
      } = l
      /** @type {string[]} */
      const toEmails = to.split(',')
      toEmails.forEach(toEmail => {
        const matchNode = this.personMap[toEmail]

        if (matchNode) {
          links.push({
            source: l.parent,
            target: matchNode
          })
        }
      })
    })

    this.emailLinks = links

    this.h
      .descendants()
      .filter(n => n.height === 1)
      .forEach(n => delete n.children)
    this.cluster(this.h)
  },
  methods: {
    /**
     * Converts a link into an array of nodes
     * @type {(link: EnronLink) => EnronNode[]}
     */
    getLinkPath(link) {
      const { source, target } = link

      return source.path(target)
    },

    selectNode(node) {
      console.log(node)
      this.selectedNode = node
    }
  }
}
</script>

<style scoped lang="scss">
.info-bar {
  display: grid;
  grid: auto 1fr / 1fr;
  overflow: hidden;
  position: relative;
}
.inner {
  width: 100%;
  height: 100%;
  display: grid;
  grid: 1fr / 1fr;
}

.visual {
  position: relative;
  overflow: hidden;
  display: grid;
  grid: 1fr / 1fr max-content;
  row-gap: 10px;
}

path {
  fill: none;
  stroke: rgba(#fff, 0.25);

  &.bundle {
    stroke: red;
    stroke-width: 2px;
    shape-rendering: geometricPrecision;
  }
}

circle {
  fill: #fff;
}

.edge-bundler {
  display: grid;
  overflow: hidden;
}

.legend {
  display: grid;
  overflow: hidden;
  grid: auto 1fr / 1fr;

  > * {
    padding: 0.5rem;
  }

  ul {
    overflow: auto;

    li {
      label {
        cursor: pointer;
        display: grid;
        grid: auto / 1fr auto;
        align-items: center;
        column-gap: 5px;
      }
    }
  }
}
</style>
