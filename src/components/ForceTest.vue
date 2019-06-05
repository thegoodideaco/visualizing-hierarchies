<template>
  <div
    v-once
    class="fill"
    @contextmenu.prevent=""
    @mousewheel="test"
    @mousedown="dragged"
    @touchstart="dragged"
    @touchend="dragended"
    @mouseup="dragended">
    <!-- Render Canvas -->
    <canvas ref="canvas" />
  </div>
</template>

<script>
import * as pixi from 'pixi.js'
import { range } from 'd3-array'
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  forceRadial,
  forceCollide
} from 'd3-force'
import { event } from 'd3-selection'
import {
  scaleSequential,
  rgb,
  // interpolateWarm,
  interpolateRgb,
  color,
  interpolateHsl,
  interpolateHcl,
  interpolateHclLong
} from 'd3'
export default {
  data() {
    return {
      dragging:   false,
      width:      null,
      height:     null,
      zoom:       10,
      colorScale: null,
      pr:         window.devicePixelRatio
      // roots:      null,
      // linkRender: null
    }
  },
  computed: {
    /**
     * @type {Vue.ComputedOptions<d3.Simulation>}
     */
    simulation: {
      get() {
        return this.$options.simulation
      },
      set(v) {
        this.$options.simulation = v
      }
    },

    /**
     * @type {Vue.ComputedOptions<PIXI.Application>}
     */
    pixiRender: {
      get() {
        return this.$options.pixi
      },
      set(v) {
        this.$options.pixi = v
      }
    }
  },
  watch: {
    colorScale() {
      this.simulation.nodes().forEach((n, i) => {
        if(!this.roots.includes(i)) {
          this.updateTint(n.spr, i)
        }
      })
    }
  },
  beforeDestroy() {
    this.simulation.stop()
    this.simulation = null

    this.pixiRender.destroy(true)

    this.$delete(window, 'app')

    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('mousemove', this.updateMouse)
  },
  mounted() {
    const { width, height } = this.$el.getBoundingClientRect()

    // const scaled = {
    //   width:  width * 0.5,
    //   height: height * 0.5
    // }

    /** @type {PIXI.RendererOptions} */
    const options = {
      antialias:             true,
      preserveDrawingBuffer: true,
      roundPixels:           true,
      powerPreference:       'high-performance',
      resolution:            window.devicePixelRatio,
      transparent:           true,
      forceFXAA:             true
    }

    // const r = devicePixelRatio

    pixi.utils.skipHello()

    this.pixiRender = new pixi.Application({
      view: this.$refs.canvas,
      width,
      height,
      ...options
    })

    // Object.assign(this.pixiRender.renderer.options, options)

    /** @type {PIXI.Sprite} */
    // const bg = new pixi.Sprite.fromImage('/bg.png')

    // bg.width = width
    // bg.height = height
    // this.pixiRender.stage.addChild(bg)

    // window.app = this.pixiRender

    Object.assign(this.$data, {
      width,
      height
    })

    const container = new pixi.particles.ParticleContainer(
      10000,
      {
        vertices: false,
        rotation: false,
        scale:    false,
        uvs:      false,
        alpha:    false,
        tint:     true,
        position: true
      },
      6000,
      true
    )

    container.interactive = false
    container.interactiveChildren = false
    // container.blendMode = pixi.BLEND_MODES.OVERLAY

    const particleAmount = pixi.utils.isMobile.phone
      ? 500
      : pixi.utils.isMobile.tablet
        ? 700
        : 1500

    this.roots = range(~~Math.sqrt(particleAmount))


    this.linkRender = new pixi.Graphics()



    this.pixiRender.stage.addChild(this.linkRender)

    this.pixiRender.stage.addChild(container)

    this.colorScale = scaleSequential(interpolateHcl(color('#41b883'), color('#f78043'))).domain([
      0,
      particleAmount
    ])

    this.nodes = range(particleAmount).map((k, i) => {

      /** @type {PIXI.Sprite} */
      const spr = new pixi.Sprite.fromImage('/test.png')


      container.addChild(spr)



      const [r, g, b] = this.colorScale(i)
        .replace(/[^\d,]/g, '')
        .split(',')
        .map(v => +v)

      spr.tint = parseInt(
        rgb(r, g, b)
          .hex()
          .substr(1),
        16
      )

      if(this.roots.includes(i)){
        spr.tint = 0xffffff
        spr.alpha = .1
      }


      return {
        index: i,
        spr,
        ...spr.position,
        color: this.colorScale(Math.sqrt(i))
      }
    })

    this.links = range(this.nodes.length - 1).map(i => {
      return {
        source: Math.floor(Math.sqrt(i)),
        target: i + 1
      }
    })

    this.simulation = forceSimulation(this.nodes)
      .force('charge', forceManyBody().strength(-300))
      .force('link', forceLink(this.links).distance(this.zoom).strength(1))
      .force(
        'radial',
        forceRadial(height / 1.5, width / 2, height / 2).strength(.7)
          .radius(n => n.index < 40 ? width / 7 : width / 1.9)
      )
      .force('mouse', forceRadial(height / 4, width / 2, height / 2).strength(0.5)
        .radius((n, i) => i < 40 ? 15 * (i+5) : height / 2.9))
      .force('center', forceCenter(width / 2, height / 2))
      .force('collide', forceCollide().radius(node => this.roots.includes(node.index) ? 0 : 5).strength(2))

      // .force('x', forceX())
      // .force('y', forceY())
      .on('tick', this.ticked)
      .alphaDecay(0)
      .alpha(0.229)
      .tick(10)

    window.addEventListener('resize', this.onResize)
    window.addEventListener('mousemove', this.updateMouse)
    window.addEventListener('touchmove', this.updateTouch)
  },

  methods: {
    /**
     * @type {(e: MouseWheelEvent) => void}
     */
    test(e) {
      this.zoom += e.deltaY * 0.5

      this.simulation
        .restart()
    },
    ticked() {
      this.simulation.force('link').distance(this.zoom)


      /** @type {PIXI.Graphics} */
      const gfx = this.linkRender
      gfx.clear()

      // const rs = this.roots
      this.links.forEach(l => {

        /** @type number */
        const n1 = l.source
        const n2 = l.target



        // return
        // this.nodes.forEach((n) => {

        /** @type {{x: number, y: number, spr: PIXI.Sprite}} */
        const { x:x1, y:y1, spr:spr1 } = n1

        /** @type {{x: number, y: number, spr: PIXI.Sprite}} */
        const { x:x2, y:y2, spr:spr2 } = n2

        spr1.position.set(x1 - spr1.width / 2, y1 - spr1.height / 2)
        spr2.position.set(x2 - spr2.width / 2, y2 - spr2.height / 2)

        // this.updateTint(spr1, n1.index)
        // this.updateTint(spr2, n2.index)

        // spr1.tint = this.colorScale(n1.index)
        // spr2.tint = this.colorScale(n2.index)


        // })

        // if(!rs.includes(n1.index) || !rs.includes(n2.index)){


        // const {r, g, b} = rgb(this.colorScale(n2.index))
        // const hexNumber = pixi.utils.rgb2hex([r, g, b])
        const isRoot = this.roots.includes(n2.index)

        gfx.lineStyle(isRoot ? 3 : 1, spr2.tint, isRoot ? .05 : .2)
        gfx.moveTo(n1.x, n1.y).lineTo(n2.x, n2.y)

        // }

      })

    },

    dragsubject() {
      const { width, height } = this
      return this.simulation.find(event.x - width / 2, event.y - height / 2)
    },
    dragstarted() {
      this.simulation.alphaTarget(0.5).restart()
      this.dragging = true
    },

    /**
     * @param {MouseEvent} e
     */
    dragged() {
      this.simulation.alphaTarget(0.5).restart()
      this.dragging = true
      if (!this.dragging) return
      /** @type {d3.ForceManyBody} */
      const { strength } = this.simulation.force('charge')

      strength(-25)

      /** @type {d3.ForceLink} */
      const f = this.simulation.force('link')
      f.strength(0.01)
    },
    dragended() {
      this.dragging = false
      // this.simulation.alphaTarget(0.1).alpha(0.5)
      /** @type {d3.ForceManyBody} */
      const { strength } = this.simulation.force('charge')

      strength(-180)

      /** @type {d3.ForceLink} */
      const f = this.simulation.force('link')
      f.strength(1)
    },

    onResize() {
      console.log('resize')
      this.width = innerWidth
      this.height = innerHeight
      this.pixiRender.renderer.resize(innerWidth, innerHeight)

      /** @type {d3.ForceCenter} */
      const centerSim = this.simulation.force('center')
      const w = innerWidth * .5
      const h = innerHeight * .5
      centerSim.x(w).y(h)

      /** @type {d3.ForceRadial} */
      const radialSim = this.simulation.force('radial')
      radialSim.x(w).y(h)
    },

    /** @param {MouseEvent} e */
    updateMouse(e) {
      const { x, y } = e

      /** @type {d3.ForceRadial} */
      const force = this.simulation.force('mouse')

      force.x(x).y(y)
    },

    /** @param {TouchEvent} e */
    updateTouch(e) {
      const { pageX: x, pageY: y } = e.touches[0]

      /** @type {d3.ForceRadial} */
      const force = this.simulation.force('mouse')

      force.x(x).y(y)
    },

    updateTint(spr, i){
      const [r, g, b] = this.colorScale(i)
        .replace(/[^\d,]/g, '')
        .split(',')
        .map(v => +v)

      spr.tint = parseInt(
        rgb(r, g, b)
          .hex()
          .substr(1),
        16
      )
    }
  }
}
</script>

<style scoped lang="scss">
canvas {
  width: 100%;
  height: 100%;
  // background-image: radial-gradient(#2b414f, #20313a);
}
</style>
