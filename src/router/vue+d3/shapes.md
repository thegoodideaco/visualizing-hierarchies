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
  <svg width="500" height="500">
    <!-- Content -->
  </svg>
</template>
```

### The `circle` element

A circle is just what it says. There are 3 main attributes to a circle, `cx`, `cy`, and `r`

These are used for the positioning and size of the circle to render.

```html
<template>
  <svg width="500" height="500">
    <!-- Content -->
  </svg>
</template>
```

### The `path` element

A path element takes in a string of drawing instructions. Any shape can be created with a path. This attribute is called `d`
