# Examples

So what can we visualize that has meaning?

Let's take a look at some of the layouts D3 provides

## Denrograms

Dendrograms are node-link diagrams that place leaf nodes of the tree at the same depth.

Useful when all the leaves should be at the same level, such as for `hierarchical clustering` or `phylogenetic tree diagrams`.

## Tidy Trees

Produces _tidy_ node-link diagrams of trees using the `Reingold–Tilford “tidy” algorithm`, improved to run in linear time by `Buchheim et al`. Tidy trees are typically more compact than `dendrograms`.

## Radial Variants

In alot of cases, we can take a linear display, such as dendrograms or tidy trees, and wrap them in a circular fashion.

## Treemaps

Webpack has a nice feature to export out the [stats](https://webpack.js.org/api/stats) of your build

When compiling source code with webpack, users can generate a JSON file containing statistics about modules. These statistics can be used to analyze an application's dependency graph as well as to optimize compilation speed.

Treemaps were invented by [Ben Shneiderman](https://en.wikipedia.org/wiki/Ben_Shneiderman), and works as a great way to analyze the proportion of quantity between nodes.

When the color and size dimensions are correlated in some way with the tree structure, one can often easily see patterns that would be difficult to spot in other ways, such as if a certain color is particularly relevant. A second advantage of treemaps is that, by construction, they make efficient use of space. As a result, they can legibly display thousands of items on the screen simultaneously.

This can be incredibly useful for the developer to determine where optimization is needed, such as tree shaking, and bundle sizes.

## Partitions

The partition layout produces adjacency diagrams: a space-filling variant of a node-link tree diagram. Rather than drawing a link between parent and child in the hierarchy, nodes are drawn as solid areas (either arcs or rectangles), and their placement relative to other nodes reveals their position in the hierarchy. The size of the nodes encodes a quantitative dimension that would be difficult to show in a node-link diagram.

## Circle Packing

Enclosure diagrams use containment (nesting) to represent a hierarchy. The size of the leaf circles encodes a quantitative dimension of the data. The enclosing circles show the approximate cumulative size of each subtree, but due to wasted space there is some distortion; only the leaf nodes can be compared accurately. Although circle packing does not use space as efficiently as a treemap, the “wasted” space more prominently reveals the hierarchical structure.
