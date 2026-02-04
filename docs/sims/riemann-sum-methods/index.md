---
title: Four Riemann Sum Methods Comparison
description: Compare left, right, midpoint, and trapezoidal Riemann sum methods to evaluate which provides the best approximation.
quality_score: 90
image: /sims/riemann-sum-methods/riemann-sum-methods.png
og:image: /sims/riemann-sum-methods/riemann-sum-methods.png
twitter:image: /sims/riemann-sum-methods/riemann-sum-methods.png
social:
   cards: false
---
# Four Riemann Sum Methods Comparison

<iframe src="main.html" height="602px" scrolling="no" style="width: 100%;"></iframe>

[Run the Riemann Sum Methods MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This comprehensive visualization compares all four Riemann sum approximation methods:

- **Left**: Uses left endpoint of each subinterval
- **Right**: Uses right endpoint of each subinterval
- **Midpoint**: Uses midpoint of each subinterval
- **Trapezoidal**: Averages left and right (connects with straight lines)

The comparison table highlights which method gives the best approximation.

## Iframe Code

```html
<iframe src="https://dmccreary.github.io/calculus/sims/riemann-sum-methods/main.html" height="602px" scrolling="no" style="width: 100%;"></iframe>
```

## Lesson Plan

### Learning Objectives

Students will be able to:

1. Compare the accuracy of different Riemann sum methods
2. Evaluate which method provides the best approximation for a given function
3. Explain why midpoint and trapezoidal methods are often more accurate

### Activities

1. **Method Exploration (5 min)**: Select each method and observe how rectangles/trapezoids differ
2. **Error Analysis (10 min)**: For each function, identify which method has the smallest error
3. **Pattern Discovery (5 min)**: Why do midpoint and trapezoidal methods tend to be more accurate?

### Key Insights

- Midpoint and trapezoidal methods typically have smaller errors
- The trapezoidal rule is the average of left and right sums: $T_n = \frac{L_n + R_n}{2}$
- Error decreases as n increases for all methods

## References

- [Trapezoidal Rule - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcII/ApproximatingDefIntegrals.aspx)
