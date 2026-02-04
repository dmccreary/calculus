---
title: Derivative Test Comparison
description: An interactive comparison tool showing the First and Second Derivative Tests side-by-side, helping students understand when to use each method for classifying critical points.
quality_score: 92
image: /sims/derivative-test-comparison/derivative-test-comparison.png
og:image: /sims/derivative-test-comparison/derivative-test-comparison.png
twitter:image: /sims/derivative-test-comparison/derivative-test-comparison.png
social:
   cards: false
---
# Derivative Test Comparison

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the Derivative Test Comparison MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Derivative Test Comparison MicroSim with the p5.js editor](https://editor.p5js.org/)

## Embed This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/derivative-test-comparison/main.html" height="562px" width="100%" scrolling="no"></iframe>
```

## Description

This MicroSim provides a side-by-side comparison of the **First Derivative Test** and **Second Derivative Test** for classifying critical points of functions. The visualization helps students understand:

1. **When each test is appropriate**: The Second Derivative Test is faster (1 evaluation vs 3) but fails when f''(c) = 0
2. **How each test works**: Sign charts for the First Derivative Test, concavity analysis for the Second Derivative Test
3. **Why the First Derivative Test is more reliable**: It always gives a conclusive answer, while the Second Derivative Test can be inconclusive

### Features

- **Three-panel layout**: Left panel shows First Derivative Test with sign chart, center shows function graph with marked critical points, right panel shows Second Derivative Test with concavity indicator
- **Five test functions**: Including examples where the Second Derivative Test fails (x^5 at x=0) and where it works well
- **Color-coded results**: Red for local maximum, blue for local minimum, yellow for inconclusive
- **Step-by-step breakdown**: Each panel shows the computational steps required
- **Summary comparison**: Bottom bar shows both test results and recommends which test to use

### Controls

| Control | Description |
|---------|-------------|
| Function buttons | Select from 5 different test functions |
| Critical Point slider | Navigate between critical points of the selected function |
| Show Both toggle | Show or hide both test panels |

## Lesson Plan

### Learning Objective

Students will be able to compare the First and Second Derivative Tests and choose the appropriate method for classifying critical points.

### Bloom's Taxonomy Level

**Analyze (L4)** - Compare, contrast, differentiate

### Prerequisites

- Understanding of critical points (where f'(x) = 0)
- Ability to compute first and second derivatives
- Knowledge of concavity and its relationship to the second derivative

### Guided Exploration (15 minutes)

1. **Start with f(x) = x^3 - 3x**: This function has two critical points where both tests work well
   - At x = -1, observe both tests identify a local maximum
   - At x = 1, observe both tests identify a local minimum
   - Note the Second Derivative Test requires fewer evaluations

2. **Try f(x) = x^5**: This is the crucial example
   - At x = 0, the Second Derivative Test is INCONCLUSIVE (f''(0) = 0)
   - The First Derivative Test correctly identifies this as neither max nor min
   - Discuss: Why does the Second Derivative Test fail here?

3. **Examine f(x) = x^4**: Another important case
   - At x = 0, the Second Derivative Test ALSO fails (f''(0) = 0)
   - But this IS a local minimum (the First Derivative Test shows - to + sign change)
   - Key insight: f''(c) = 0 does NOT mean "neither max nor min"

4. **Compare f(x) = x^4 - 2x^2**: Multiple critical points
   - Navigate through all three critical points
   - Notice the Second Derivative Test works at x = -1 and x = 1
   - Compare computation time for each method

### Discussion Questions

1. If the Second Derivative Test is faster, why don't we always use it?
2. What types of functions tend to cause the Second Derivative Test to fail?
3. Can you think of a real-world scenario where computational efficiency matters (favoring the Second Derivative Test)?

### Assessment

Ask students to complete this table for a new function without using the MicroSim:

| Function | Critical Point | First Test Result | Second Test Result |
|----------|----------------|-------------------|-------------------|
| f(x) = x^3 + 3x^2 | x = ? | ? | ? |
| f(x) = x^6 | x = ? | ? | ? |

## References

- [First Derivative Test - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-4/v/first-derivative-test)
- [Second Derivative Test - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-7/v/second-derivative-test)
- [Comparing the Derivative Tests - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/ShapeofGraphPtII.aspx)
