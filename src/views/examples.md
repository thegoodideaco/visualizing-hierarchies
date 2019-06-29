# Examples

So what can we visualize that has meaning?

Let's take a look at some real world scenarios.

## Webpack / Module Bundling

Webpack has a nice feature to export out the [stats](https://webpack.js.org/api/stats) of your build

When compiling source code with webpack, users can generate a JSON file containing statistics about modules. These statistics can be used to analyze an application's dependency graph as well as to optimize compilation speed.

Visualizing this information can be seen in a `treemap` using Vue-CLI's `--report` flag, or in a `starburst` using Vue's `UI` display

This can be incredibly useful for the developer to determine where optomization is needed, such as tree shaking, and bundle sizes.

## Geography

This covers a huge area of data visualization, simply because of how much it affects our everyday lives. There are plenty of ways to visualize insightful data that deals with location that isn't neccesarily hierarchical.

However, comparing quantitative information about countries and regions is.

We can utilize this in a number of ways

- Amount of money spent by each region of each country, and what it was spent on.
- Distribution the earth's population
- Comparing values of natural resources based on their origins.

## Classification

Objects can be organized in multiple levels, therefore creating a hierarchical structure of distribution.

Visualizing this type of data can be very insightful when looked at as a whole.

- Imagenet
- Tree of Life
- Movies / Books
