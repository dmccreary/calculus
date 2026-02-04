---
title: Squeeze Theorem Visualization
description: Interactive demonstration of how the Squeeze Theorem pins down limit values
image: /sims/squeeze-theorem/squeeze-theorem.png
---

# Squeeze Theorem Visualization

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The Squeeze Theorem (also called the Sandwich or Pinching Theorem) is a powerful tool for finding limits of functions that are difficult to evaluate directly but are bounded by simpler functions.

### The Theorem

If $g(x) \leq f(x) \leq h(x)$ for all x near c (except possibly at c), and:

$$\lim_{x \to c} g(x) = \lim_{x \to c} h(x) = L$$

Then:

$$\lim_{x \to c} f(x) = L$$

### Examples Included

1. **x²sin(1/x)**: Squeezed between -x² and x² → limit is 0
2. **xcos(1/x)**: Squeezed between -|x| and |x| → limit is 0
3. **sin(x)/x**: Squeezed between cos(x) and 1 → limit is 1

## How to Use

1. **Example Selector**: Choose different squeeze scenarios
2. **Distance Slider**: Control how close to the target x-value
3. **Squeeze Button**: Watch the squeeze zone narrow automatically
4. **Info Panel**: See the bounds and limit value

### Visual Elements

- **Red curve**: Upper bound h(x)
- **Green curve**: Middle function f(x) being squeezed
- **Blue curve**: Lower bound g(x)
- **Shaded region**: The "squeeze zone" where f(x) is trapped

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. State the Squeeze Theorem and its conditions
2. Identify appropriate bounding functions for oscillating limits
3. Apply the Squeeze Theorem to evaluate limits like $\lim_{x \to 0} x^2 \sin(1/x)$

### Key Insight

The Squeeze Theorem works because if a function is trapped between two bounds, and both bounds converge to the same value, there's nowhere else for the middle function to go!

### Suggested Activities

1. **Watch the Squeeze**: Click "Squeeze" and observe how the shaded region narrows
2. **Compare Examples**: Note which functions use the squeeze for bounded oscillation vs. other purposes
3. **Construct Bounds**: For the function $x \cdot \sin(x)$, what bounds would you use?

### Assessment Questions

1. Why does $\lim_{x \to 0} x^2 \sin(1/x) = 0$ even though $\sin(1/x)$ oscillates infinitely?
2. What must be true about $\lim g(x)$ and $\lim h(x)$ for the Squeeze Theorem to apply?
3. Could the Squeeze Theorem help find $\lim_{x \to 0} \frac{\sin x}{x}$?

## Embedding

```html
<iframe src="https://dmccreary.github.io/calculus/sims/squeeze-theorem/main.html"
        height="482px" width="100%" scrolling="no"></iframe>
```
