# Transforming Data

When working with data, we tend to reorganize it to fit our needs depending on the use case.

This is why things like `map` or `reduce` are used so much. We simply change the data to how we want.

## D3 vs Native

Alot of these methods are built into javascript by default. We don't _need_ to use D3 for this functionality, we could even use things like `lodash` in order to create the data structures we need.

However, just like lodash, D3 offers some additional utilities to transform data. Some of these include

> Scanning (Binary Search)

> Handling null or undefined data

> CSV Loading / Formatting

> Visual Data for Layouts

> Nesting

There's alot more, but the main point is that you can use D3 to transform your data, while using Vue to display that data.

## Playing with Data

So what could we find out from the google play store?

Included is a sample dataset of 10,840 apps from the play store. Each item has the following properties

```typescript
interface PlaystoreItem {
  'Android Ver': string
  'Content Rating': string
  'Current Ver': string
  'Last Updated': string
  App: string
  Category: string
  Genres: string
  Installs: string
  Price: string
  Rating: string
  Reviews: string
  Size: string
  Type: string
}
```

Since we have a habit of grouping and ordering things based on a level of importance, we can split this huge list up into groups to find out information using `d3-nest`

### Nest
