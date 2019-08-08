# Force

A force simulation does the same thing as a hierarchical layout as far as applying positioning information to nodes, but it can do many things outside of displaying hierarchies.

Think of a force simulation as a way to push around nodes in the way a typical physics engine would.

Each frame or `step` will apply calculations based on how much time has passed since the last step, which will then update the values in the node properties (x and y)

In a way, d3.force is like a lightweight physics engine

Let's setup the basics similar to how we approached layouts

```html
<template>
  <svg height="100%" width="100%">
    <!-- Nodes -->
    <circle
      v-for="(node, index) in h.descendants()"
      :key="index"
      r="5"
      :cx="node.x"
      :cy="node.y"
    />
  </svg>
</template>
```

```javascript
<script>
import * as d3 from 'd3'
export default {
  data: () => ({
    width:  100,
    height: 100,

    /** @type {d3.HierarchyPointNode} */
    h: d3.hierarchy({})
  }),
  methods: {
    updateSize() {
      const {
        width,
         height
          } = this.$el.getBoundingClientRect()
      this.width = width
      this.height = height
    },

    async init() {
      // 1. Assign Sizes
      this.updateSize()

      // 2. Load the data
      const data =
      await d3.json('/datasets/populations.json')

      // 3. Nest the data
      const nester = d3
        .nest()
        .key(v => v.region)
        .key(v => v.subregion)

      const nestedData = {
        key:    'root',
        values: nester.entries(data)
      }

      // 4. Add Hierarchy
      const h =
      d3.hierarchy(nestedData, v => v.values)

      // Calculate totals and sort
      h.sum(v => v.value)
      h.sort((a, b) => d3.ascending(a, b))

      // Apply properties to be observed
      h.descendants().each(node => Object.assign(node, {
        x: this.width * .5,
        y: this.height * .5
      }))

      // 6. Assign the hierarchy to our data object
      this.h = h
    }
  }
}
</script>
```

The next step is to initialize a force simulation. Let's add force to our data object.

```javascript
data: () => ({
  width: 100,
  height: 100,

  /** @type {d3.HierarchyPointNode} */
  h: d3.hierarchy({}),

  force: d3.forceSimulation()
})
```

It is crucial that we assign properties to the hierarchy before we pass it to Vue

```javascript
/**
 * ! Important: We must add x and y properties
 * ! to each node in order
 * ! for vue to observe changes
 */
h.descendants().forEach(node =>
  Object.assign(node, {
    x: this.width * 0.5,
    y: this.height * 0.5
  })
)

// 6. Assign the hierarchy to our data object
```

```javascript
setupForces() {
      this.force
        .force('x', d3.forceX(this.width * 0.5))
        .force('y', d3.forceY(this.height * 0.5))
    }
```

What we should see is a circle in the center of the screen. This means ur force simulation is working! What happens if we add a collision force?

```javascript
setupForces() {
      this.force
        .force('x', d3.forceX(this.width * 0.5))
        .force('y', d3.forceY(this.height * 0.5))
        .force('collision', d3.forceCollide(8))
    }
```

Now all of our nodes will collide with each other, awesome!

These forces accept methods as well. Let's make a method that will make all branches larger

```javascript
  setupForces() {
      this.force
        .force('x', d3.forceX(this.width * 0.5))
        .force('y', d3.forceY(this.height * 0.5))
        .force('collision', d3.forceCollide(this.getSize))
    },

methods: {
  getSize(node) {
    return node.children ? 25 : 5
  }

</script>
```

We can apply this to our template as well

```html
<circle
  v-for="(node, index) in h.descendants()"
  :key="index"
  :cx="node.x"
  :cy="node.y"
  :r="getSize(node)"
/>
```

Let's add another force for our links

```javascript
.force('links', d3.forceLink(this.h.links()))
```

We need to spread the nodes out and away from each other.

Currently we have x and y forces pushing everything to the center.

Let's add another force to move bodies away from each other

```javascript
.force('bodies', d3.forceManyBody())
```

Our hierarchy is starting to form.

We need to display the links as well, let's create a line generator

```javascript
data: () => ({
  width: 100,
  height: 100,

  /** @type {d3.HierarchyPointNode} */
  h: d3.hierarchy({}),

  force: d3.forceSimulation(),

  /** @type {d3.Line<d3.HierarchyPointNode>} */
  lineGenerator: d3
    .line()
    .x(node => node.x)
    .y(node => node.y)
})
```

Apply the generator to our links within the template

```html
<template>
  <svg height="100%" width="100%">
    <!-- Links -->
    <path
      v-for="(item, index) in h.links()"
      :key="`p${index}`"
      :d="lineGenerator([item.source, item.target])"
    />

    <!-- Nodes -->
    <circle
      v-for="(node, index) in h.descendants()"
      :key="index"
      :cx="node.x"
      :cy="node.y"
      :r="getSize(node)"
    />
  </svg>
</template>
```

The more we play with the values, the more results we will get.

```javascript
setupForces() {
      this.force
        // .force('x', d3.forceX(this.width * 0.5).strength(.02))
        // .force('y', d3.forceY(this.height * 0.5).strength(.02))
        .force('center', d3.forceCenter(this.width * .5, this.height *.5))
        .force('collision', d3.forceCollide(this.getSize))
        .force('links', d3.forceLink(this.h.links()).distance(this.getLinkDistance).strength(.9))
        .force('bodies', d3.forceManyBody().strength(-110).distanceMin(10).distanceMax(220))
    },

    getSize(node) {
      return node.children != null ? 5 : 10
    },

    getLinkDistance(link) {
      return link.source.children ? 25 : 65
    }
```

We can easily apply color values based on population density by creating a color scale

```javascript

```