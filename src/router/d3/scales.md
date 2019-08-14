# Scales

These are fundamental to visually representing information.

As stated in the docs:

> Although most often used for position-encoding quantitative data, such as mapping a measurement in meters to a position in pixels for dots in a scatterplot, scales can represent virtually any visual encoding, such as diverging colors, stroke widths, or symbol size. Scales can also be used with virtually any type of data, such as named categorical data or discrete data that requires sensible breaks.

A simple `Date` scale can be created as an object, just like `nest`

```javascript
dateScale = d3.scaleTime();
```

### Domains and Ranges

In order to map the data values to visual variables such as position, we use `domains` and `ranges`.

#### Domain

```javascript
// The extent of data
dateScale.domain([new Date("9/2/1985"), Date.now()]);

dateScale(new Date("9/2/2014"));
// 0.8557775151045773
```

By default, this scale has a range of `[0,1]`

We can change this to values in pixels to represent visual values

```javascript
dateScale.range([0, window.innerWidth]);

dateScale(new Date("9/2/2014"));
// 1643.0928290007885
```

Now when we pass in a date, we will have a matching value for positioning. 🎉

Think of `D`ata for `Domain` to avoid mixing them up.

### Values to Visual Dimensions

As stated in the [Semiology of Graphics](http://localhost:8080/#/theory/variables), scales can represent the visual variables of each item in a collection.

Let's take for example a `dataset` of emails within 2 years time. We could use a linear scale to map the value of time to color.

```javascript
dateScale = d3.scaleLinear();

// Apply the domain
dateScale.domain([Date.parse("1/1/2015"), Date.parse("12/31/2017")]);

// Apply a range of colors
dateScale.range(["red", "green"]);

dateScale(Date.parse("10/12/2016"));
// "rgb(104, 76, 0)"
```

Scales also has a useful `tick` method to generate multiple values

```javascript
dateScale.ticks(10);
// (9) [1430000000000, 1440000000000, ...

dateScale.ticks(10).map(t => dateScale(t));
// (9) ["rgb(228, 13, 0)", "rgb(201, 27, 0)",
```

This is only a small section of what is available regarding scales

They each have their own strengths, and can represent certain values better than others.
