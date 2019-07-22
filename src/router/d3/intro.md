# What is D3?

Elijah Meeks wrote a great article titled [D3 is not a Data Visualization Library](https://medium.com/@Elijah_Meeks/d3-is-not-a-data-visualization-library-67ba549e8520), and the way he described D3 is exactly right.

D3 is like a utility library, filled with useful tools that, when used together, allow you to create some amazing things.

You can split D3 up into 5 main parts:

1. Visualization
2. Animation
3. Analysis
4. Data Utilities
5. DOM Utilities

When using D3 by itself, things like animation and DOM transformation are handled by D3, but when you have something like Vue, you can leverage it's reactive nature to exclude this part of D3 all together.

The parts we do care about:

## Data Utilities

This is how we mold raw data into objects that can be fed into Vue

## Visualization

The bread and butter. Think of these as ways to transform your data into meaningful visuals.
