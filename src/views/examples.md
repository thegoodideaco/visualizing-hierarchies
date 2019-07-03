# Examples

So what can we visualize that has meaning?

Let's take a look at some of the layouts D3 provides

## Treemaps

Webpack has a nice feature to export out the [stats](https://webpack.js.org/api/stats) of your build

When compiling source code with webpack, users can generate a JSON file containing statistics about modules. These statistics can be used to analyze an application's dependency graph as well as to optimize compilation speed.

Treemaps were invented by [Ben Shneiderman](https://en.wikipedia.org/wiki/Ben_Shneiderman), and works as a great way to analyze the proportion of quantity between nodes.

When the color and size dimensions are correlated in some way with the tree structure, one can often easily see patterns that would be difficult to spot in other ways, such as if a certain color is particularly relevant. A second advantage of treemaps is that, by construction, they make efficient use of space. As a result, they can legibly display thousands of items on the screen simultaneously.

This can be incredibly useful for the developer to determine where optomization is needed, such as tree shaking, and bundle sizes.

## Edge Bundling

Although nodes within a heierchy have a single relationship to their parent, it is still possible to visualize connections to other possible nodes.

Edge bundling creates edges between nodes that aren't connected, and creates additional links by traversing up the tree until it can connect to the target node.

This can be extremly useful to cross reference both structures, such as visualizing the dependencies of hierarchical source files.

## Radial Clusters

Objects can be organized in multiple levels, therefore creating a hierarchical structure of distribution.

Visualizing this type of data can be very insightful when looked at as a whole.

- Imagenet
- Tree of Life
- Movies / Books
