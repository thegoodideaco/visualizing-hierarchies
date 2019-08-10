# SVG & Shapes

One of `D3`'s greatest strengths is it's ability to generate `SVG` content.

## What is a SVG?

`SVG` stands for `Scalable Vector Graphics` Meaning that the image is simply made out of _instructions_ for the computer to render.

Logos, icons, and others are `vector` so that they can be rendered at any size while retaining visual quality.

### Just like DOM Elements

SVG's are made out of multiple elements of objects or groups, just like the DOM

Many CSS rules can be used, However different rules apply for certain elements.

This is awesome as it meshes with `Vue`'s template syntax perfectly, as well as being able to nest components as additional SVG elements.

Let's setup our component to have a SVG element

```html
<template>
  <svg width="100%" height="100%">
    <!-- Content -->
  </svg>
</template>
```

### The `circle` element

A circle is just what it says. There are 3 main attributes to a circle, `cx`, `cy`, and `r`

These are used for the positioning and size of the circle to render.

```html
<template>
  <svg width="100%" height="100%">
    <circle r="10" cx="200" cy="500" />
  </svg>
</template>
```

Let's begin by creating an array of points in our `data` object

```javascript
data: () => ({
  points: [
    {
      x: 200,
      y: 500
    }
  ]
})
```

To render these, we will use `v-for` to iterate through each point, using circles to display them.

```html
<!-- Circles -->
<circle
  v-for="(item, index) in points"
  :key="index"
  :cx="item.x"
  :cy="item.y"
  r="5"
/>
```

Let's add some interactivity to this component. We will create points by clicking within the svg, and then use circles to render them.

We can also add in a right click to reset the entire array

We'll add to the template

```html
<svg
  width="100%"
  height="100%"
  @click="addPoint"
  @contextmenu.prevent="points = []"
>
  <!-- Content -->
</svg>
```

Then create a method for clicking

```javascript
methods: {
  addPoint(mouseEvent) {
    const {
      layerX: x,
      layerY: y
    } = mouseEvent

    this.points.push({x,y})
  }
}
```

If done correctly, you will be able to add circles to the screen by left clicking, and clearing them by right clicking.

### The `path` element

A path element takes in a string of drawing
instructions. Any shape can be created with a path. This attribute is called `d`

This can be used to draw `links` which are simply lines connecting nodes together.

In this case, we can create a line from the point array!

To do this, we will use `d3.line`

### d3.line

An instance of a line, is a generator just like `scale`. They are methods that return values based on the dataset you provide.

```javascript
line = d3.line()
line(dataset)
```

When using `d3.line` we need to provide methods to retrieve positioning values.

We pass in methods to retrieve the x and y values based on a single item

```javascript
line = d3.line()
line.x(v => v.x)
line.y(v => v.y)

line(dataset)
```

By using `computed properties`, we can create a line generator instance to use on our template

```javascript
computed: {
  lineGen() {
    return d3.line()
    .x(v => v.x)
    .y(v => v.y)
  }
}
```

What this will do, is provide a string to be passed as an attribute to a path element, therefore rendering the shape

```html
<path stroke="white" stroke-width="5" :d="lineGen(points)" />
```

Cool, now we can draw a line! ✨ Magic!

but `d3.line` has some other useful options,such as applying a curve.

We can apply this by simply adding an extra option to our generator

```javascript
computed: {
  lineGen() {
    return d3.line()
    .x(v => v.x)
    .y(v => v.y)
    .curve(d3.curveNatural)
  }
}
```

There are many useful situations to use `d3.shape`, In our case they can display the connection between groups of nodes, and the nodes themselves.
