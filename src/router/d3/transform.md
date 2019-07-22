# Transforming Data

When working with data, we tend to reorganize it to fit our needs depending on the use case.

This is why things like `map` or `reduce` are used so much. We simply change the data to how we want.

## D3 vs Native

Alot of these methods are built into javascript by default. We don't _need_ to use D3 for this functionality, we could even use things like `lodash` in order to create the data structures we need.

However, just like lodash, D3 offers some additional utilities to transform data. Some of these include

> Scanning (Binary Search)

> Handling null or undefined data

> Visual Data for Layouts

> Nesting

There's alot more, but the main point is that you can use D3 to transform your data, while using Vue to display that data.

Let's say we want to construct a line based on the points in our dataset
