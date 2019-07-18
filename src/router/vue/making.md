# Making a Component

We will be writing a very basic Vue SFC (Single File Component) and wire it to use these core features.

## Create the file

First, let's create the file.

Navigate to `src/lessons/vue/create` and create file called `MyComponent.vue`

## Basic Structure

Vue components consist of 3 main section blocks:

1. Template
2. Script
3. Style

```html
<template>
  <div>
    Hello!
  </div>
</template>

<script>
export default {
}
</script>
```

## Importing

Components are used by _composing_ them with others. We can create global references to components to use globally, or we can import them when we need to.

Let's import your component into the container on the right. We can inspect the dev tools and find the `ComponentContainer` component. Once we have it open, we can write the following:

### Component Container

```javascript
<template>
  <div>
    <!-- Put component element here -->
  </div>
</template>

<script>
// Import component synchronously
export default {
  name:       'ComponentContainer',
  components: {
    // Add component here
  }
}
</script>
```

If done correctly, you will see the `Hello!` to the right.
