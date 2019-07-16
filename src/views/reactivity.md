# Reactivity

User Interfaces for the most part, visually display data objects.

They are the visual representation of structured information.

When you work with state management, the visual representation updates for you automatically. This means you don't have to put in extra work after changing the data to re-render it visually.

## Adding Reactivity

Let's add on to the component we just created, `Mycomponent.vue`

We will make a simple calculator that adds two numbers.

```html
<template>
  <div>
    <input v-model.number="a" />
    <input v-model.number="b" />
    <h2>The sum is {{ a + b }}</h2>
  </div>
</template>

<script>
  export default {
    data: () => ({
      a: 2,
      b: 3
    })
  }
</script>
```

### Importing

Now that we have our component ready to use, let's import it into our view.
