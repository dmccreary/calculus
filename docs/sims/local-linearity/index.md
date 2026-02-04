---
title: Local Linearity
description: Interactive MicroSim demonstrating how curves appear linear when zoomed in sufficiently, illustrating the foundation of tangent approximation.
quality_score: 92
image: /sims/local-linearity/local-linearity.png
og:image: /sims/local-linearity/local-linearity.png
twitter:image: /sims/local-linearity/local-linearity.png
social:
   cards: false
---
# Local Linearity

<iframe src="main.html" height="517px" scrolling="no"></iframe>

[Run the Local Linearity MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Local Linearity MicroSim with the p5.js editor](https://editor.p5js.org/)

Place the following line in your website to include this in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/local-linearity/main.html" height="517px" scrolling="no"></iframe>
```

## Description

This MicroSim demonstrates one of the most profound ideas in calculus: **local linearity**. At any point where a function is differentiable, if you zoom in far enough, the curve becomes indistinguishable from its tangent line.

!!! quote "Delta Moment"
    "Watch this! When I'm standing on this curve at a single point, and I look really, really closely at the ground beneath my wheels, it looks perfectly flat. The more I zoom in, the flatter it gets. That 'flatness' IS the tangent line!"

### Why Local Linearity Matters

Local linearity is the *reason* calculus works:

1. **Derivatives exist** because curves behave linearly at small scales
2. **Linear approximation** works because near any point, `f(x) ≈ f(a) + f'(a)(x-a)`
3. **Differentials** (dx and dy) are meaningful because tiny changes are approximately linear
4. **The fundamental theorem** connects derivatives and integrals through this local linear behavior

### How to Use This MicroSim

1. **Zoom slider**: Drag to increase magnification from 1x to 1000x
2. **Point slider**: Move the point of tangency along the curve
3. **Function buttons**: Switch between x², sin(x), x³, and eˣ
4. **Show Tangent toggle**: Hide/show the tangent line (dashed orange)

### What to Observe

- At **low zoom** (1-5x): The curve is clearly curved, distinct from the straight tangent line
- At **medium zoom** (20-50x): The curve starts looking more linear
- At **high zoom** (100-1000x): The curve and tangent line become nearly indistinguishable!

The **error measurement** in the info panel shows how the difference between the curve and tangent line shrinks as you zoom in.

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. **Explain** why differentiable functions appear linear at small scales (Bloom Level 2)
2. **Demonstrate** local linearity using different functions and zoom levels
3. **Interpret** the relationship between zoom level and approximation error
4. **Connect** local linearity to the concept of the derivative

### Guided Exploration

#### Activity 1: Discovering Local Linearity (5 minutes)

1. Start with f(x) = x² at x = 1
2. Note the visible curvature at zoom level 1x
3. Slowly increase zoom to 100x
4. **Predict-then-observe**: Before each zoom increase, have students predict if the curve will still look curved

**Discussion prompt**: "At what zoom level did you start having trouble seeing the difference between the curve and the tangent?"

#### Activity 2: Comparing Functions (5 minutes)

1. Try each function at the same point (x = 1)
2. Zoom to 50x for each function
3. **Compare**: Which function "straightens out" fastest? Which takes longer?

**Key insight**: Functions with smaller second derivatives straighten out faster!

#### Activity 3: Exploring Edge Cases (5 minutes)

1. For sin(x), try x = 0 (where slope = 1) versus x = π/2 (where slope = 0)
2. For x³, try x = 0 (inflection point)
3. **Question**: Does local linearity work at inflection points?

### Assessment Questions

1. **Conceptual**: Why does the curve eventually look like its tangent line when you zoom in enough?

2. **Applied**: If you're at zoom level 100x and the error is 0.001, what would you estimate the error to be at zoom level 1000x?

3. **Synthesis**: How does local linearity explain why `sin(x) ≈ x` for small values of x?

### Common Misconceptions to Address

- **Misconception**: "The curve actually becomes straight at small scales"
  - **Reality**: The curve is always curved; we just can't visually distinguish the curvature at high zoom

- **Misconception**: "Local linearity only works for polynomials"
  - **Reality**: It works for ALL differentiable functions (demonstrate with sin and eˣ)

### Extension Activities

1. **Numerical exploration**: At x = 1 for f(x) = x², calculate:
   - f(1.001) using the actual function
   - f(1.001) using linear approximation: f(1) + f'(1)(0.001)
   - Compare the results and discuss the tiny error

2. **Connection to limits**: Relate the zoom slider to the limit process in the derivative definition

## References

- [AP Calculus AB: Derivatives - College Board](https://apcentral.collegeboard.org/courses/ap-calculus-ab)
- [Local Linearity and Linear Approximation - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab)
- [3Blue1Brown: Essence of Calculus - Chapter 2](https://www.youtube.com/watch?v=9vKqVkMQHKk) - Visual explanation of derivatives
