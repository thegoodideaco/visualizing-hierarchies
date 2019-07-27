# D3.Hierarchy

When working with a unidirected hierarchy, you can get other useful information.

This essentially _wraps_ a new object around each one of your nodes, allowing you to add properties to each one without modifying the original data.

A Hierarchy needs data with a recursive structure in order to find each node. Nest works well with this as it generates a hierarchy structure for us using the `entries` method.

```javascript
// Make a nest object
nester = d3.nest()

// Add some keys
nester.key(item => item['Category'])
nester.key(v => v['Content Rating'])
nester.key(item => item['Price'])
```

A Hierarchy needs a recursive object with an array in each that represents it's children. This is where the `entries` method comes in.

Another rule is that we must have a root node. We can do this by applying `entries` to a predefined root object.

```javascript
tree = {
  key: 'root',
  values: nester.entries(dataset)
}
```

We can now create a hierarchy object like magic!

```javascript
h = d3.hierarchy(tree, v => v.values)
// Node {data: {…}, height: 4, depth: 0, ...}
```

By comparing the entries array to the hierarchy, you will see a resemblance.

The Hierarchy object introduces some properties by default, `depth`, `height`,`children` and `parent`.

One important aspect is the introduction of `nodes` and `links`

### Nodes

Each descendant is considered a `node`, and there are two different types.

#### Leaves

A `Leaf` is a node that does not have any children. The data within these nodes is an item of the dataset.

```javascript
h.leaves()
```

#### Branches

The opposite of a `leaf` node

### Links

Links connect one node to another, leaf or not

```javascript
h.links()
```

## Summarizing

By default, any sort of hierarchical structure can be summarized by count, being that each `node` has no value associated with it.

```javascript
h.count()
```

Hey look, now we have a value property on each node!

However, if each node can represent other values based on your collection, you can summarize any quantitative property.

Like maybe, finding the amount of reviews for each section?

```javascript
h.sum(v => v.Reviews)
```

Summarizing hierarchical information is essential in visualizing the value of each group in a relation to one another.

## Sorting

Given that we organize things by order of importance, it makes sense to be able to sort each group of information by the value we give it.

```javascript
h.sort((a, b) => a.value - b.value)
```

## And More

D3.hierarchy also has other useful methods such as `descendants`, `ancestors`, `path`, etc..

And the cool part is that they are available on every node, on any level

```javascript
h.children[2].children[2].links()

h.children[2].children[0].descendants()

h.children[2].children[3].leaves()

h.children[4].children[3].path(h.children[1].children[1])
```
