---
title: Derivative Information Flow
description: Interactive diagram showing how information about function behavior flows from the second derivative to the first derivative to the original function, helping students understand the chain of logical implications.
quality_score: 90
image: /sims/derivative-info-flow/derivative-info-flow.png
og:image: /sims/derivative-info-flow/derivative-info-flow.png
twitter:image: /sims/derivative-info-flow/derivative-info-flow.png
social:
   cards: false
---
# Derivative Information Flow

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Derivative Information Flow MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Derivative Information Flow MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This interactive diagram helps you understand how information flows between the three levels of a function and its derivatives:

- **f''** (second derivative) - tells us about the rate of change of the slope
- **f'** (first derivative) - tells us about the slope/rate of change of f
- **f** (original function) - the function we're analyzing

### How to Use

1. **Click on any property** in the boxes to highlight its implications on other graphs
2. **Hover over the arrows** between boxes to see verbal explanations of the relationships
3. **Click "Trace Example"** to walk through three different scenarios:
   - **Positive Chain**: f'' > 0 leads to f' increasing leads to f concave up
   - **Negative Chain**: f'' < 0 leads to f' decreasing leads to f concave down
   - **Zero Crossing Chain**: f'' = 0 (sign change) leads to f' extremum leads to f inflection point
4. **Click "Reset"** to clear all highlights and start fresh

### Color Coding

- **Green**: Positive values and their implications
- **Red**: Negative values and their implications
- **Blue**: Zero crossings and critical points

## Iframe Embedding

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/derivative-info-flow/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will explain how information about function behavior flows from f'' to f' to f, understanding the chain of logical implications.

### Bloom's Taxonomy Level

**Understand (Level 2)** - Students explain relationships between concepts and interpret information.

### Warm-Up (5 minutes)

Ask students: "If you know the second derivative of a function is positive everywhere, what can you tell me about the first derivative? What about the original function?"

### Exploration Activity (15 minutes)

1. Have students click on "f'' > 0" and observe what properties light up in the f' and f boxes
2. Repeat with "f'' < 0" and "f'' = 0 (sign change)"
3. Use the "Trace Example" button to walk through all three scenarios as a class
4. Ask students to explain each step in their own words

### Discussion Questions

1. Why does the sign of f'' tell us whether f' is increasing or decreasing?
2. What's the difference between "f' increasing" (a property of f') and "f increasing" (a property of f)?
3. Why does a sign change in f'' indicate that f' has an extremum?
4. How does this diagram help you understand inflection points?

### Practice Problems

Have students analyze these functions using the information flow:

1. f(x) = x^3 at x = 0 (f'' = 0, sign change)
2. f(x) = e^x (f'' > 0 everywhere)
3. f(x) = -x^2 at x = 0 (f' = 0 with sign change, f'' < 0)

### Assessment

Students complete a worksheet where they:

1. Given information about f'', trace the implications to f' and f
2. Given information about f, work backwards to determine constraints on f' and f''
3. Identify which "trace" scenario matches a given graph

### Delta Moment

!!! quote "Delta Moment"
    "When I feel my tilt changing faster and faster (f'' > 0), I know my tilt itself (f') is increasing. And when my tilt is increasing, the hill under me (f) is curving upward. It's like a game of telephone, but for calculus!"

## References

- [Derivatives and the Shape of a Graph](https://openstax.org/books/calculus-volume-1/pages/4-5-derivatives-and-the-shape-of-a-graph)
- [Concavity and Points of Inflection](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-6a/v/concavity-concave-upwards-and-downwards)
