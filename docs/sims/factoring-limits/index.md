---
title: Factoring Technique for Limits
description: Visualize how factoring and canceling common factors reveals limit values
image: /sims/factoring-limits/factoring-limits.png
---

# Factoring Technique for Limits

<iframe src="main.html" height="452px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This visualization demonstrates the factoring technique for evaluating limits that produce the indeterminate form 0/0. The example shows:

$$\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$$

### The Factoring Process

1. **Original**: $\frac{x^2 - 9}{x - 3}$ gives 0/0 at x = 3
2. **Factor**: $\frac{(x+3)(x-3)}{(x-3)}$
3. **Cancel**: $x + 3$ (for $x \neq 3$)
4. **Substitute**: $\lim_{x \to 3} (x + 3) = 6$

### Visual Insight

- The **blue curve with hole** shows the original function f(x)
- The **green line** shows the simplified function g(x) = x + 3
- They're identical except at x = 3!

## How to Use

1. **View Toggle**: Switch between original, simplified, or both functions
2. **X Slider**: Move a point along the curve toward x = 3
3. **Algebra Panel**: See the factoring steps

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. Explain how factoring eliminates the 0/0 indeterminate form
2. Understand that factoring doesn't change the limit value
3. Apply the factoring technique to difference-of-squares problems

### Key Concept

When both numerator and denominator equal zero at x = c, then (x - c) is a factor of both. Canceling this common factor removes the discontinuity and reveals the limit.

### Suggested Activities

1. **Compare Views**: Toggle between "Original" and "Simplified" to see how factoring affects the graph
2. **Approach from Both Sides**: Move the slider from left and right of x = 3
3. **Predict the Limit**: Before seeing the algebra, predict what the limit should be based on the graph

### Assessment Questions

1. Why can we cancel (x - 3) from numerator and denominator?
2. Find $\lim_{x \to 2} \frac{x^2 - 4}{x - 2}$ using factoring
3. What type of discontinuity does the original function have at x = 3?

## Embedding

```html
<iframe src="https://dmccreary.github.io/calculus/sims/factoring-limits/main.html"
        height="452px" width="100%" scrolling="no"></iframe>
```
