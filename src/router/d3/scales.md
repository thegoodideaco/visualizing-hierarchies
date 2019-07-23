# Scales

These are fundamental to visually representing information.

As stated in the docs:

> Although most often used for position-encoding quantitative data, such as mapping a measurement in meters to a position in pixels for dots in a scatterplot, scales can represent virtually any visual encoding, such as diverging colors, stroke widths, or symbol size. Scales can also be used with virtually any type of data, such as named categorical data or discrete data that requires sensible breaks.

As stated in the `Semiology of Graphics`, scales can represent the visual variables that we order based on importance.

### Values to Visual Dimensions

Let's take for example a dataset of emails. if the span of of time is 2 years, we would have a visual display that needs to map the date values to actual pixel values / percentages on the `x` axis.

This comes in handy when you can zoom and pan the data, allowing for the user to see more detailed information of a smaller section of the dataset.

Let's work with D3's Date Scale, and find out some information
