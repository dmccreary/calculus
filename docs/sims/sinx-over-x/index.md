---
title: Sin(x)/x Visualization
description: Understand the fundamental trigonometric limit using unit circle and graph visualizations
image: /sims/sinx-over-x/sinx-over-x.png
---

# Sin(x)/x Visualization

<iframe src="main.html" height="452px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This is arguably the most important limit in calculus:

$$\lim_{x \to 0} \frac{\sin x}{x} = 1$$

where x is measured in **radians**. This limit is fundamental to differentiating sine and cosine functions.

### Dual Visualization

- **Left side (Unit Circle)**: Shows the geometric relationship between arc length x and sin(x)
- **Right side (Graph)**: Shows the function y = sin(x)/x with a hole at x = 0

### The Key Insight

For small angles, the arc length (x) and the vertical height (sin x) become nearly equal. As x approaches 0, their ratio approaches 1.

## How to Use

1. **X Slider**: Adjust the angle in radians
2. **Show Table Checkbox**: Display numerical values showing convergence
3. **Observe**: Watch how the ratio sin(x)/x approaches 1 as x → 0

### Visual Elements

- **Blue arc**: The arc of length |x| on the unit circle
- **Red line**: The vertical height sin(x)
- **Green curve**: The function sin(x)/x
- **Magenta point**: Current x value on the graph

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. Explain geometrically why $\lim_{x \to 0} \frac{\sin x}{x} = 1$
2. Understand why this limit requires x in radians
3. Apply this limit to evaluate related trigonometric limits

### Key Concept

On the unit circle, x (in radians) represents arc length. As the angle shrinks, the arc becomes nearly vertical, making arc length ≈ sin(x).

### Suggested Activities

1. **Geometric Exploration**: On the unit circle view, compare arc and sin visually as x decreases
2. **Numerical Evidence**: Enable the table to see the ratio converging to 1
3. **Graph Analysis**: Identify the hole at x = 0 and the horizontal asymptote-like behavior

### Assessment Questions

1. What is $\lim_{x \to 0} \frac{\sin(3x)}{x}$? (Hint: Rewrite as $3 \cdot \frac{\sin(3x)}{3x}$)
2. Why doesn't this limit work if x is in degrees?
3. Use the fundamental limit to find $\lim_{x \to 0} \frac{\sin x}{2x}$

## Related Limit

A companion limit you should also know:

$$\lim_{x \to 0} \frac{1 - \cos x}{x} = 0$$

## Embedding

```html
<iframe src="https://dmccreary.github.io/calculus/sims/sinx-over-x/main.html"
        height="452px" width="100%" scrolling="no"></iframe>
```
