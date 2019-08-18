# Radial Layouts

By applying simple trigonometry, we can visualize the layouts in a circular fashion.

## The Math

In order get the x and y values of a rotation, we need the angle, as well as the radius.

In degrees, a full circle is 360. However, we will be working with `radians` to determine the angle.

In a full circle, the amount of `radians` is exactly `2PI`, or `6.283185307179586...`

Also, when displaying our circular layouts, the positioning needs to be centered, instead of top left

Let's add a center property, as well as a radius property in our computed object.

```javascript
/**
 * The radius of our layout
 * @return {number}
 */
radius() {
  return Math.min(this.width, this.height) * 0.5
},

/**
 * The center point of our content
 * @returns {{x: number, y: number}}
 */
center() {
  return {
    x: this.width * 0.5,
    y: this.height * 0.5
  }
}
```

## Conversion

We simply need to make the `x` value the angle, and use `y` as the radius.

Let's change our layout to generate these values instead:

```javascript
/**
 * if the radius changes, adjust
 * this will change, triggering our watcher
 * to apply changes to our nodes
 * @returns {d3.ClusterLayout<population.Country>}
 */
layout() {
  return d3.cluster()
    .size([Math.PI * 2, this.radius])
},
```

To convert this to x and y values, we use `Sine` and `Cosine`

Let's write a couple functions that converts a radial point to x and y coordinates

```javascript
/**
 * The x position of a radial point
 */
toX(point) {
  return Math.cos(point.x) * point.y
},

/**
 * The y position of a radial point
 */
toY(point) {
  return Math.sin(point.x) * point.y
}
```

We can apply this to our circles in the template by calling each node with the corresponding method, as well as adding the offset to display from the center:

```html
<!-- Render every descendant of our hierarchy -->
<circle
  v-for="(item, index) in h.descendants()"
  :key="index"
  r="5"
  :cx="center.x + toX(item)"
  :cy="center.y + toY(item)"
>
  <!-- Tooltip -->
  <title>{{ item.data.key }}: {{ item.value }}</title>
</circle>
```

Now we just need to apply the same conversion to our line generator.

Currently we only retrieve the x and y values from each node. Let's rewrite it to retrieve the radial positioning as well as adding the offset

```javascript
/**
 * Creates a path string out of an array of points.
 * @returns {d3.Path}
 */
lineGen() {
  return d3.line()
    .x(node => this.center.x + (Math.cos(node.x) * node.y))
    .y(node => this.center.y + (Math.sin(node.x) * node.y))
}
```

Now we have a nice radial version of our cluster dendrogram! 🎈

### Built in functionality

`D3` does offer radial variants of it's generators, such as `lineRadial` or `pointRadial` which do the same job.

However, if you have a good understanding of how these are converted, you can take advantage with other approaches.
