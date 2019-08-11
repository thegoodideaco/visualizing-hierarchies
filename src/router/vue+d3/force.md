# Force

A force simulation does the same thing as a hierarchical layout as far as applying positioning information to nodes, but it can do many things outside of displaying hierarchies.

Think of a force simulation as a way to push around nodes in the way a typical physics engine would.

Each frame or `step` will apply calculations based on how much time has passed since the last step, which will then update the values in the node properties (x and y)

In a way, d3.force is like a lightweight physics engine.

## Setup

We can setup our component just like we did last time, but without the layout logic.

### The Template

```html
<template>
  <div class="relative w-full h-full">
    <!-- svg container -->
    <svg width="100%" height="100%">
      <!-- Render every descendant of our hierarchy -->
      <circle
        v-for="(item, index) in h.descendants()"
        :key="index"
        r="5"
        :cx="item.x"
        :cy="item.y"
      >
        <!-- Tooltip -->
        <title>
          {{ item.data.key }}: {{ item.value }}
        </title>
      </circle>
    </svg>
  </div>
</template>
```

### The Data

We will assign properties like we did last time, but will exclude any layout stuff.

```javascript
data: () => ({
  width: 100,
  height: 100,
  h: d3.hierarchy({}),
  groupOrder: ["region", "subregion"],
  dataset: []
});
```

### Methods

Exactly the same as before

```javascript
methods: {
  updateSize() {
    const {
      width,
      height
    } = this.$el.getBoundingClientRect()
    this.width = width
    this.height = height
  }
}
```

### Mounting

```javascript
async mounted() {
  // 1. Assign Sizes
  this.updateSize()

  // 2. Load the raw data
  const data = await d3.json('/datasets/populations.json')

  // 3. Assign data to our dataset object
  this.dataset = Object.freeze(data)
}
```

### Computed

```javascript
/**
 * if the group order is changed
 * this will change, triggering the
 * hierarchy to be recreated
 * @returns {d3.Nest<population.Country>}
 */
nester() {
  const n = d3.nest()

  this.groupOrder.forEach(v => {
    n.key(node => node[v])
  })

  return n
}

/**
 * If the nester method, or dataset changes
 * will generate a root node
 */
nestedData() {
  return {
    key:    'root',
    values: this.nester.entries(this.dataset)
  }
}
```

### Watchers
