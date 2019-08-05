# Force

A force simulation does the same thing as a hierarchical layout as far as applying positioning information to nodes, but it can do many things outside of displaying hierarchies.

Think of a force simulation as a way to push around nodes in the way a typical physics engine would.

Each frame or `step` will apply calculations based on how much time has passed since the last step, which will then update the values in the node properties (x and y)

In a way, d3.force is like a lightweight physics engine

Let's setup the basics similar to how we approached layouts

```html
<svg width="100%" height="100%">
  <!-- Put content here -->
</svg>
```
