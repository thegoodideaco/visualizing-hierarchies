# Transforming Data

When working with data, we tend to reorganize it to fit our needs depending on the use case.

This is why things like `map` or `reduce` are used so much. We simply change the data to how we want.

## D3 vs Native

Alot of these methods are built into javascript by default.

We don't _need_ to use D3 for this functionality, we could even use things like `lodash` in order to create the data structures we need.

However, just like lodash, D3 offers some additional utilities to transform data. Some of these include

- Scanning (Binary Search)
- Handling null or undefined data
- CSV Loading / Formatting
- Visual Data for Layouts
- Nesting

There's alot more, but the main point is that you can use `D3` to transform your data, while using `Vue` to _display_ that data.

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

Since we have a habit of grouping and ordering things based on a level of importance, we can split this huge list up into groups to find out information using `d3.nest`

### Nest

The nest method returns an object containing various grouping methods that can organize and rearrange your dataset.

Let's create a nest object in the console

```javascript
myNest = d3.nest()
// {object: ƒ, map: ƒ, entries: ƒ, key: ƒ, sortKeys: ƒ, …}
```

Let's think about how we might want to order and group these apps...

We could split up the collection by the `Category`. In this case we use the `key` method that `myNest` provides. We pass a function that will return the _key_ value these groups will be placed in

```javascript
myNest.key(item => item.Category)
// {object: ƒ, map: ƒ, entries: ƒ, key: ƒ, sortKeys: ƒ, …}
```

`myNest` doesn't look any different, however the methods have changed.

What happens if we apply this dataset to one of these methods?

```javascript
myNest.object(dataset)
```

You should see a collection of items, containing each app that matches the criteria.

What if you want to nest even further?

Let's group these apps again, this time by the amount of installs

```javascript
myNest.key(v => v.Installs)
// {object: ƒ, map: ƒ, entries: ƒ, key: ƒ, sortKeys: ƒ, …}
```

Keep in mind we have already applied a key, so we should get a collection of apps grouped by category, then by the install amount

```javascript
myNest.object(dataset)
```

We can keep applying more `key` methods, and actually create a `hierarchy` of importance.

Let's see how many installs there are for free items compared to paid, shall we?

```javascript
myNest.key(v => v.Type).object(dataset)
```

Two rules of thumb when doing this

1. Order matters
2. You can't revert

If you have nested these keys and want to reorganize the data, you must start over.

What's nice about how D3 returns these values, is that it returns objects and methods. The dataset is out of the picture.

This means we don't have to calculate anything expensive by reordering over and over. This only happens when we call a method that nest provides.

#### Customizing keys

In the above examples, we pass in a function that returns the value of an item property. Instead, we could modify the return value to group other similar items together.

Let's group our collection based on their rating

```javascript
myNest = d3
  .nest()
  .key(v => v.Rating)
  .object(dataset)
```

We can see that the ratings include a decimal point. Well, what if we wanted to group them by the whole number?

```javascript
myNest = d3
  .nest()
  .key(v => Math.floor(parseFloat(v.Rating)))
  .object(dataset)
```

Much better :)

Moving on!
