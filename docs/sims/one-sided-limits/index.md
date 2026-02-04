---
title: One-Sided Limits Comparison
description: Compare left-hand and right-hand limits to determine whether a two-sided limit exists
image: /sims/one-sided-limits/one-sided-limits.png
---

# One-Sided Limits Comparison

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This visualization helps students understand the relationship between one-sided limits and two-sided limits. A two-sided limit exists if and only if both one-sided limits exist and are equal.

### Function Presets

- **Jump at x=1**: Left and right limits differ → two-sided limit DNE
- **Continuous at x=2**: Left and right limits equal → two-sided limit exists
- **Hole at x=2**: Left and right limits equal → two-sided limit exists (even with a hole)
- **Jump at x=0**: Left and right limits differ → two-sided limit DNE

### Key Concept

$$\lim_{x \to c} f(x) = L \text{ exists } \iff \lim_{x \to c^-} f(x) = \lim_{x \to c^+} f(x) = L$$

## How to Use

1. **Function Selector**: Choose from different piecewise functions
2. **Distance Slider**: Control how close both points approach the target
3. **Animate**: Watch both approaches simultaneously
4. **Info Panel**: See the numerical values of both limits and whether the two-sided limit exists

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. Compare left-hand and right-hand limits graphically
2. Determine whether a two-sided limit exists based on one-sided limits
3. Explain why jump discontinuities prevent limits from existing

### Suggested Activities

1. **Sort the Functions**: Categorize each preset as "limit exists" or "limit DNE"
2. **Predict Before Selecting**: For each function name, predict whether the limit will exist
3. **Create Your Own**: Describe a function where the left limit is 3 and right limit is 5

### Assessment Questions

1. If $\lim_{x \to 5^-} f(x) = 7$ and $\lim_{x \to 5^+} f(x) = 7$, what is $\lim_{x \to 5} f(x)$?
2. If $\lim_{x \to 2^-} f(x) = 4$ and $\lim_{x \to 2^+} f(x) = 6$, does $\lim_{x \to 2} f(x)$ exist?
3. Can a function have a two-sided limit at a point where it has a hole?

## Embedding

```html
<iframe src="https://dmccreary.github.io/calculus/sims/one-sided-limits/main.html"
        height="482px" width="100%" scrolling="no"></iframe>
```
