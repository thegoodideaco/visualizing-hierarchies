# Making a Component

We will be writing a very basic Vue SFC (Single File Component) and wire it to use these core features.

## Create the file

First, let's create the file.

Click open to navigate to our directory, and create file called `MyComponent.vue`

## Basic Structure

Vue components consist of 3 main section blocks:

1. Template
2. Script
3. Style

Not all blocks are needed. In this example, we'll exclude the style block.

```html
<template>
  <div>
    Hello!
  </div>
</template>

<script>
  export default {};
</script>
```

## Importing

Components are used by _composing_ them with others. We can create global references to components to use, or we can import them when we need to.

Let's import our component into the container on the right.

Click the open button so we can check out the file in our editor.

### Component Container

```javascript
<template>
  <div class="component-container">
    <my-component />
  </div>
</template>

<script>
import MyComponent from './MyComponent.vue'
export default {
  components: {
    MyComponent
  }
}
</script>
```

If done correctly, you will see the `Hello!` to the right.
