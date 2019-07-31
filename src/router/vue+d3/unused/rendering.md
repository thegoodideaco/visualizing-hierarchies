# Template Rendering

Vue provides a template syntax that is identical to typical HTML markup.

Because of this, we can take advantage of SVG markup!

Let's try an example:

```html
<template>
  <svg width="100%" height="100%">
    <circle r="15" fill="#fff" stroke="green" />
  </svg>
</template>
```

If done correctly, you should see a white circle at the top left.

Notice it is cut off, this is because the origin point of a circle is at it's center. We would need to offset by it's radius in order to align it tot he top left of the screen.

## Rendering Collections

In many cases, you will need to display a collection of items. You can do this by using the `v-for` directive.

Let's add some data to this component, and get it to render

```javascript
<script>
export default {
  data: () => ({
    dataset: [
      {
        x: 100,
        y: 90
      },
      {
        x: 125,
        y: 50
      },
      {
        x: 500,
        y: 250
      },
      {
        x: 300,
        y: 100
      },
      {
        x: 190,
        y: 270
      }
    ]
  })
}
</script>
```

Now that we have a dataset to work with, we can use `v-for` to display it on the screen

```html
<template>
  <svg width="100%" height="100%">
    <circle
      v-for="(item, index) in dataset"
      :key="index"
      :cx="item.x"
      :cy="item.y"
      r="15"
      fill="#fff"
      stroke="green"
    />
  </svg>
</template>
```
