# Reactivity

When things are reactive, they will automatically update their values, and always reference the most up to date information.

## Computed Properties

Computed objects update if anything it depends on changes.

```javascript
computed: {
    markdown() {
      return () => marked(this.value)
    }
}

```

## Watch

Objects can be observed by using watch.

```javascript
watch: {
    /**
     * Watches for change in hierarchy.
     * Creates a clone before applying layout
     */
    hierarchy: {
      /** @param {d3.HierarchyNode} val */
      handler(val) {
        this.localHierarchy = val ? val.copy() : null

        this.$nextTick(() => {
          if (this.localHierarchy) {
            // debugger
            this.localHierarchy.count()
            .sort((a, b) => a.value - b.value)
            this.treemap.size(this.size)
            .(this.localHierarchy)

            const nodes = []
            this.localHierarchy.each(v => {
              if (!this.showLeafs) {
                if (v.children) {
                  nodes.push(v)
                }
              } else {
                nodes.push(v)
              }
            })
            this.localDescendants = nodes
          }
        })
      },
      immediate: true
    }
  }
```
