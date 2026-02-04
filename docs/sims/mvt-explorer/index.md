---
title: Mean Value Theorem Explorer
description: Interactive visualization of the Mean Value Theorem showing secant lines, tangent lines, and the values of c where the theorem is satisfied.
image: /sims/mvt-explorer/mvt-explorer.png
og:image: /sims/mvt-explorer/mvt-explorer.png
twitter:image: /sims/mvt-explorer/mvt-explorer.png
quality_score: 85
social:
   cards: false
---

# Mean Value Theorem Explorer

<iframe src="main.html" height="572px" width="100%" scrolling="no"></iframe>

[Run the Mean Value Theorem Explorer Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive visualization helps students understand the **Mean Value Theorem (MVT)**, one of the most important theorems in calculus. The MVT states that for a function f(x) that is continuous on [a, b] and differentiable on (a, b), there exists at least one value c in (a, b) where:

$$f'(c) = \frac{f(b) - f(a)}{b - a}$$

In other words, there's at least one point where the instantaneous rate of change (tangent slope) equals the average rate of change (secant slope) over the interval.

## How to Use

1. **Drag point c** along the curve to find where the orange tangent line becomes parallel to the blue secant line
2. **Adjust endpoints a and b** using the sliders to change the interval
3. **Select different functions** (Quadratic, Cubic, Sine, Square Root) to explore how MVT applies to various curves
4. **Click "Auto-find c"** to automatically animate to a c value that satisfies MVT
5. **Toggle secant visibility** to focus on the tangent line alone

## Visual Elements

- **Blue dashed line**: The secant line connecting points A and B
- **Orange solid line**: The tangent line at the current position c
- **Green indicator**: Lights up when the tangent is parallel to the secant (MVT satisfied)
- **Info panel**: Shows real-time slope calculations and their difference

## Embedding This MicroSim

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/mvt-explorer/main.html"
        height="572px"
        width="100%"
        scrolling="no">
</iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Apply** the Mean Value Theorem to find values of c where f'(c) equals the average rate of change
2. **Calculate** secant and tangent slopes for various functions
3. **Demonstrate** understanding of when MVT conditions are satisfied

### Bloom's Taxonomy Level

**Apply (Level 3)** - Students apply the MVT concept by manipulating the visualization to find c values that satisfy the theorem.

### Prerequisites

- Understanding of derivatives and their geometric meaning
- Knowledge of secant and tangent lines
- Familiarity with slope calculations

### Suggested Activities

#### Activity 1: Exploration (10 minutes)
Have students explore the quadratic function (x^2) and find where MVT is satisfied for different intervals [a, b]. Ask them to record the c value and compare it to the midpoint of the interval. What pattern do they notice?

#### Activity 2: Multiple Solutions (10 minutes)
Switch to the cubic function and set a = -2, b = 2. Students should discover that there are two values of c that satisfy MVT. Discuss why this happens geometrically.

#### Activity 3: Prediction Challenge (15 minutes)
Before using "Auto-find c," have students predict where c should be based on the secant slope. Then verify their predictions using the simulation.

### Assessment Questions

1. For f(x) = x^2 on [0, 4], at what value of c is f'(c) equal to the average rate of change?
2. Why does the sine function have multiple c values satisfying MVT on larger intervals?
3. What happens to the c value as you move the interval [a, b] along the curve?

### Common Misconceptions

- **Misconception**: The c value is always at the midpoint of [a, b]
  - **Clarification**: This is only true for linear and quadratic functions. Show students the cubic example where c is not at the midpoint.

- **Misconception**: There's always exactly one c value
  - **Clarification**: MVT guarantees at least one c, but there can be multiple. The sine function demonstrates this clearly.

## References

- [Mean Value Theorem - Wikipedia](https://en.wikipedia.org/wiki/Mean_value_theorem)
- [Visual Calculus - MVT](http://archives.math.utk.edu/visual.calculus/)
- Stewart, James. *Calculus: Early Transcendentals*, Chapter 4.2
