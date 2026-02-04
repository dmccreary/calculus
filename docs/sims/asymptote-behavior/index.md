---
title: Asymptote Behavior Visualization
description: Interactive visualization showing how rational functions behave near vertical asymptotes and as x approaches infinity, featuring Delta the robot traveling along curves.
quality_score: 85
image: /sims/asymptote-behavior/asymptote-behavior.png
og:image: /sims/asymptote-behavior/asymptote-behavior.png
twitter:image: /sims/asymptote-behavior/asymptote-behavior.png
social:
   cards: false
---
# Asymptote Behavior Visualization

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Asymptote Behavior MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the MicroSim with the p5.js editor](https://editor.p5js.org/)

## Iframe Embedding

Use this code to include this MicroSim on your website:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/asymptote-behavior/main.html" height="482px" width="100%" scrolling="no"></iframe>
```

## Description

This MicroSim helps students visualize and interpret how rational functions behave near their asymptotes. Delta, our triangular robot mascot, travels along the function curve as you drag the slider, showing real-time x and y coordinates.

**Key Features:**

- **Three Example Functions:**
  - **f(x) = 1/x** - The classic reciprocal function with a vertical asymptote at x=0 and horizontal asymptote at y=0
  - **f(x) = (2x^2+1)/(x^2-4)** - A more complex rational function with two vertical asymptotes (x=-2 and x=2) and one horizontal asymptote (y=2)
  - **f(x) = (x^2-1)/(x-1)** - A function with a hole (not an asymptote) at x=1, demonstrating that not all undefined points create asymptotes

- **Visual Indicators:**
  - Red dashed lines mark vertical asymptotes
  - Blue dashed line marks the horizontal asymptote
  - Orange circle marks holes in the function
  - Curve color shifts to red near vertical asymptotes and blue near horizontal asymptotes

- **Delta's Journey:**
  - Watch the y-value display as Delta approaches a vertical asymptote
  - Observe how y remains close to the horizontal asymptote value when x is far from the origin
  - Notice that Delta cannot exist at asymptotes or holes (undefined points)

!!! quote "Delta Moment"
    "See how my y-coordinate goes wild as I approach that vertical asymptote? The function is trying to reach infinity! But notice how I settle down near y=2 when I'm far out on the x-axis - that's the horizontal asymptote keeping me grounded."

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Identify vertical and horizontal asymptotes from the graph of a rational function
2. Interpret the behavior of y-values as x approaches a vertical asymptote
3. Explain why y-values approach a horizontal asymptote as x approaches infinity
4. Distinguish between holes and vertical asymptotes in rational functions

### Activity 1: Exploring the Basic Function (5 minutes)

1. Start with f(x) = 1/x selected
2. Move Delta slowly toward x=0 from the right
3. **Predict:** What will happen to the y-value?
4. **Observe:** Watch the y-value in the info panel
5. **Explain:** Why does y approach positive infinity from the right but negative infinity from the left?

### Activity 2: Multiple Asymptotes (5 minutes)

1. Select f(x) = (2x^2+1)/(x^2-4)
2. Find both vertical asymptotes by moving Delta
3. Move Delta far to the right (x > 5)
4. **Question:** What value does y approach? Why is y=2 the horizontal asymptote?

### Activity 3: Holes vs. Asymptotes (5 minutes)

1. Select f(x) = (x^2-1)/(x-1)
2. Move Delta toward x=1
3. **Notice:** This function has a hole, not an asymptote!
4. **Explain:** Factor the numerator: x^2-1 = (x+1)(x-1). What cancels?
5. **Discuss:** What's the difference between a hole and a vertical asymptote?

### Assessment Questions

1. For f(x) = 1/x, what happens to y as x approaches 0 from the positive side?
2. If a rational function has a horizontal asymptote at y=3, what does this tell you about the function's behavior for very large values of x?
3. How can you tell algebraically whether a point will be a hole or a vertical asymptote?

### Extensions

- **Challenge:** Can you find a rational function with a horizontal asymptote at y=5?
- **Investigation:** What determines the value of the horizontal asymptote? (Compare degrees of numerator and denominator)

## References

- [Khan Academy: Asymptotes](https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:rational-functions/x9e81a4f98389efdf:end-behavior-of-rational-functions/a/end-behavior-of-rational-functions)
- [AP Calculus: Limits at Infinity](https://apcentral.collegeboard.org/courses/ap-calculus-ab)
