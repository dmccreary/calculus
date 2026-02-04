---
title: Accumulation Function Explorer
description: Visualize how the accumulation function F(x) = integral from a to x of f(t) dt grows as x moves across the interval.
quality_score: 90
image: /sims/accumulation-function/accumulation-function.png
og:image: /sims/accumulation-function/accumulation-function.png
twitter:image: /sims/accumulation-function/accumulation-function.png
social:
   cards: false
---
# Accumulation Function Explorer

<iframe src="main.html" height="552px" scrolling="no" style="width: 100%;"></iframe>

[Run the Accumulation Function Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This dual-panel visualization shows the relationship between an integrand f(t) and its accumulation function F(x):

- **Top Panel**: Shows f(t) with the shaded region from a to x
- **Bottom Panel**: Traces out F(x) as x moves

The key insight: F(x) accumulates the signed area under f(t) from the starting point a to the current position x.

## Iframe Code

```html
<iframe src="https://dmccreary.github.io/calculus/sims/accumulation-function/main.html" height="552px" scrolling="no" style="width: 100%;"></iframe>
```

## Lesson Plan

### Learning Objectives

Students will be able to:

1. Interpret accumulation functions graphically
2. Explain how F(x) increases when f(x) > 0 and decreases when f(x) < 0
3. Connect the rate of accumulation to the value of the integrand

### Activities

1. **Drag and Observe (5 min)**: Move x across the interval and watch F(x) build up
2. **Rate Analysis (10 min)**: Where is F(x) increasing fastest? How does this relate to f(x)?
3. **Animation Mode (5 min)**: Watch the automatic animation and predict F(x) behavior

### Key Insights

- When f(x) > 0, F(x) is increasing (accumulating positive area)
- When f(x) < 0, F(x) is decreasing (accumulating negative area)
- The slope of F(x) at any point equals f(x) at that point - this is FTC Part 1!

## References

- [Accumulation Functions - AP Calculus](https://apcentral.collegeboard.org/courses/ap-calculus-ab/classroom-resources)
