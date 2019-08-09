# Layouts

`D3` provides multiple layouts for use with displaying hierarchies.

We can use these to create a number of layouts like the ones shown in the [examples](/#/intro/examples)

They expect a hierarchy instance to be passed, and they simply assign more properties to each node for position and size.

Let's visualize a dataset of `World Population` in a `circle packing` layout.

We'll add a SVG, and make it fill the entire area

```html
<svg width="100%" height="100%">
  <!-- Content Here -->
</svg>
```

In our script, let's setup the basic structure.

We need to assign some properties to our data object

```javascript
data: () => ({
  width: 100,
  height: 100,
  h: null
})
```

Each layout needs some type of size in order to perform it's calculations for scaling and positioning.

By adding a resize method, we can assign the component's size to the `width` and `height` values

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

A typical layout instance is actually a method we will eventually pass data to. However, it also has methods attached to modify how it will be displayed.

Because of this, we can make it a computed property and update it when any values being passed changes

```javascript
computed: {
    layout() {
      const layout = d3.pack()
        .size([
          this.width,
          this.height
        ])

      return layout
    }
}
```

Now we need to load the data and construct a hierarchy. We can create another method to initiate everything.

```javascript
methods: {
  async init() {
    // 1. Assign Sizes
    this.updateSize()

    // 2. Load the data
    const data =
    await d3.json('/datasets/populations.json')

    // 3. Nest the data
    const nester = d3.nest()
      .key(v => v.region)
      .key(v => v.subregion)

    const nestedData = {
      key:    'root',
      values: nester.entries(data)
    }

    // 4. Add Hierarchy
    const h = d3.hierarchy(
      nestedData,
      v => v.values)

    // Calculate totals and sort
    h.sum(v => v.value)
    h.sort((a, b) => d3.ascending(a, b))

    // 5. Apply the layout to the hierarchy
    this.layout(h)

    // 6. Assign the hierarchy to our data object
    this.h = h
  }
}
```

Since computed properties should not change data upon being called, we will watch for when `layout` changes, and once it does, apply the layout to our hierarchy

```javascript
watch: {
    layout() {
      if(!this.h) return
      this.layout(this.h)
    }
  }
```

We can see the values being changed whenever we change the width and height of our component!

Let's render it

```html
<svg width="100%" height="100%">
  <circle
    v-for="(node, index) in nodes"
    :key="index"
    :cx="node.x"
    :cy="node.y"
    :r="node.r"
    stroke="white"
    stroke-width="2"
  />
</svg>
```

We can use scales to represent other visual variables such as color.

Since scales are also methods, we can assign a scale as a computed property. We can pass two colors as well as the extent of the world population to construct a color scale

```javascript
data: () => ({
  colors: {
    small: 'black',
    large: 'white'
  }
}),
computed: {
  colorScale() {
    return d3.scaleSqrt()
    .domain([0, this.h.value])
    .range([
      this.colors.small,
      this.colors.large
    ])
  }
}
```

By passing a value (population) to this scale, it will give us a corresponding color.

We can use this in the template itself, by binding the scale to an attribute

```html
<circle
  v-for="(node, index) in nodes"
  :key="index"
  :cx="node.x"
  :cy="node.y"
  :r="node.r"
  stroke="white"
  stroke-width="2"
  :fill="colorScale(node.value)"
/>
```
