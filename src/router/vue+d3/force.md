# Interaction

Since SVG's share the same approach as other elements, we can assign styling as well as events for user interaction.

## Styling

Let's add a style effect to the circles when the user hovers over them

```css
<style scoped lang="scss">
circle {
  cursor: pointer;
  &:hover {
    fill: #f89841;
    stroke: #fff;
    stroke-width: 5;
  }
}
</style>
```

As simple as this is to do, it has limits. when we want more complex interaction, we introduce code into the mix.

## Events

By adding events to the template syntax, we can easily see what elements are going to interact with the user.

This gives designers a nice upperhand, and makes things easier to construct.

Let's delete an item within the dataset object when a user clicks on a circle

```javascript
// The Circle
<circle
      v-for="(item, index) in dataset"
      :key="index"
      :cx="item.x"
      :cy="item.y"
      class="circle-item"
      fill="#fff"
      r="15"
      stroke="green"
      @click="deleteItem(index)" />

// The Event Handler
methods: {
  deleteItem(index) {
    this.dataset.splice(index, 1)
  }
}
```
