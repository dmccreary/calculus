---
title: First vs Second Derivative Test Comparison
description: An interactive MicroSim comparing the First Derivative Test and Second Derivative Test methods for classifying critical points of functions.
image: /sims/derivative-tests-comparison/derivative-tests-comparison.png
og:image: /sims/derivative-tests-comparison/derivative-tests-comparison.png
twitter:image: /sims/derivative-tests-comparison/derivative-tests-comparison.png
quality_score: 85
social:
   cards: false
---

# First vs Second Derivative Test Comparison

<iframe src="main.html" width="100%" height="622px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/derivative-tests-comparison/main.html" width="100%" height="622px" scrolling="no"></iframe>
```

## Description

This MicroSim helps students compare the **First Derivative Test** and **Second Derivative Test** for classifying critical points of functions. Both tests determine whether a critical point is a local maximum, local minimum, or neither, but they use different approaches and have different strengths.

### How It Works

The visualization displays three stacked panels showing:

1. **f(x)** - The original function with critical points marked
2. **f'(x)** - The first derivative, showing where zeros occur (critical points)
3. **f''(x)** - The second derivative, showing concavity at critical points

### Step-Through Analysis

Use the step buttons to walk through the analysis:

1. **Find f'** - Locate critical points where f'(x) = 0
2. **Apply 1st Test** - Check sign changes of f'(x) around critical points
   - Positive to negative (+→-) indicates a **local maximum**
   - Negative to positive (-→+) indicates a **local minimum**
   - No sign change means **neither** (possibly an inflection point)
3. **Apply 2nd Test** - Evaluate f''(c) at each critical point
   - f''(c) > 0 indicates **local minimum** (concave up)
   - f''(c) < 0 indicates **local maximum** (concave down)
   - f''(c) = 0 is **inconclusive!**
4. **Compare** - See how both tests give the same results (usually)

### Special Case: f(x) = x³

The third function option demonstrates when the Second Derivative Test fails. At x = 0, f''(0) = 0, so the test is inconclusive. The First Derivative Test correctly identifies this as neither a max nor min because there is no sign change (f'(x) is positive on both sides).

### Interactive Features

- **Function Selector** - Choose from three functions with different characteristics
- **Graph Toggles** - Show or hide individual graphs to focus attention
- **Reset Button** - Start the analysis over

!!! quote "Delta Moment"
    "See how f'(x) = 0 at the critical points? That's me standing perfectly level!
    The First Test asks: 'Was I going up or down before and after?' The Second Test
    asks: 'Is the ground curving up or down right here?' Both questions help figure
    out if I'm at a peak, a valley, or just passing through!"

## Lesson Plan

### Learning Objectives

By using this MicroSim, students will be able to:

1. **Identify** critical points by setting f'(x) = 0
2. **Apply** the First Derivative Test by analyzing sign changes
3. **Apply** the Second Derivative Test by evaluating f''(c)
4. **Compare** the two methods and identify when each is most useful
5. **Recognize** when the Second Derivative Test is inconclusive

### Prerequisites

- Understanding of derivatives and how to compute them
- Knowledge of what critical points represent
- Familiarity with the concepts of local maxima and minima

### Activities

**Activity 1: Pattern Recognition (10 minutes)**

1. Select "x³ - 3x" and step through the analysis
2. Observe how sign changes in f'(x) correspond to max/min classifications
3. Note the values of f''(c) at each critical point
4. Record observations in a table

**Activity 2: When Tests Fail (10 minutes)**

1. Select "x³" and step through
2. Notice that f''(0) = 0 - the Second Derivative Test fails!
3. Use the First Derivative Test: no sign change means neither max nor min
4. Discuss: Why might the second test fail here?

**Activity 3: Efficiency Comparison (15 minutes)**

1. For the quartic function "x⁴ - 2x²", count the steps needed for each test
2. Discuss: When is each test more efficient?
   - First Test: Must check intervals on both sides of each critical point
   - Second Test: Just evaluate f''(c) - one computation per point

### Assessment Questions

1. If f'(c) = 0 and f''(c) = 5, what type of extremum is at x = c?
2. If f'(x) changes from negative to positive at x = 2, what can you conclude?
3. When should you use the First Derivative Test instead of the Second?
4. Can a function have a critical point that is neither a max nor a min? Give an example.

### Extension Activity

Have students find their own function where:

- The Second Derivative Test is inconclusive at one critical point
- The First Derivative Test successfully classifies all critical points

## References

1. [Stewart Calculus - Applications of Differentiation](https://www.stewartcalculus.com/) - The standard calculus textbook with detailed coverage of derivative tests
2. [Khan Academy - Using the First Derivative Test](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-4/a/applying-the-first-derivative-test) - Interactive lessons on applying the first derivative test
3. [Paul's Online Math Notes - Shape of a Graph](https://tutorial.math.lamar.edu/Classes/CalcI/ShapeofGraphPtI.aspx) - Comprehensive notes on using derivatives to analyze function behavior
4. [3Blue1Brown - Essence of Calculus](https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr) - Visual intuition for calculus concepts
