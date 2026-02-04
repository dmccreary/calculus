---
title: Concavity Explorer
description: Interactive MicroSim exploring concave up and concave down regions by dragging a point along a curve and observing how the tangent line slope changes in relation to the second derivative.
quality_score: 90
image: /sims/concavity-explorer/concavity-explorer.png
og:image: /sims/concavity-explorer/concavity-explorer.png
twitter:image: /sims/concavity-explorer/concavity-explorer.png
social:
   cards: false
---
# Concavity Explorer

<iframe src="main.html" width="100%" height="502px" scrolling="no"></iframe>

[Run the Concavity Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Concavity Explorer MicroSim with the p5.js editor](https://editor.p5js.org/)

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/concavity-explorer/main.html" width="100%" height="502px" scrolling="no"></iframe>
```

## Description

The Concavity Explorer helps students understand the relationship between a function's concavity and its second derivative. This interactive visualization allows you to:

- **Drag a point** along the function curve to see the tangent line rotate
- **Observe concavity regions** color-coded on the graph (blue for concave up, orange for concave down)
- **View the second derivative graph** aligned below the function, with shaded regions showing positive and negative values
- **Track slope changes** to understand why concave up means "slope increasing" and concave down means "slope decreasing"

### How to Use

1. **Drag the red point** along the curve to explore different positions
2. **Use the dropdown** to select different functions (cubic, sine, quartic, Gaussian)
3. **Toggle "f''(x) Graph"** to show or hide the second derivative graph below
4. **Toggle "Slope Values"** to show or hide the slope readout in the annotation panel

### Key Observations

- When **f''(x) > 0** (blue regions): The function is concave up, and the tangent line slope is increasing
- When **f''(x) < 0** (orange regions): The function is concave down, and the tangent line slope is decreasing
- At **inflection points** (where f''(x) = 0): The concavity changes from up to down or vice versa

!!! quote "Delta Moment"
    "See how my tilt changes as I roll along? When I'm on a concave up part, I keep tilting more and more upward - the slope is increasing! On concave down parts, my tilt keeps decreasing. The second derivative tells me HOW FAST I'm rotating!"

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. **Explain** the meaning of concave up and concave down in terms of the tangent line's behavior
2. **Connect** the sign of the second derivative to concavity (positive = concave up, negative = concave down)
3. **Identify** inflection points as locations where concavity changes and f''(x) = 0
4. **Compare** different functions to recognize patterns in concavity behavior

### Target Audience

- AP Calculus AB/BC students
- College Calculus I students
- Prerequisites: Understanding of derivatives and tangent lines

### Suggested Activities

**Activity 1: Predict and Verify (5 minutes)**

Before using the MicroSim, have students sketch where they think the function f(x) = x^3 - 3x is concave up and concave down. Then use the MicroSim to verify their predictions.

**Activity 2: Slope Diary (10 minutes)**

Students drag the point slowly from x = -3 to x = 3, recording the slope value at x = -2, -1, 0, 1, 2. They should note:

- Is the slope increasing or decreasing between points?
- What is the sign of f''(x) at each location?
- Where does the slope behavior change?

**Activity 3: Function Comparison (8 minutes)**

Have students explore all four functions, completing a table:

| Function | Where is it concave up? | Where is it concave down? | Inflection points |
|----------|------------------------|--------------------------|-------------------|
| x^3 - 3x | | | |
| sin(x) | | | |
| x^4 - 2x^2 | | | |
| e^(-x^2) | | | |

**Activity 4: The Second Derivative Test Connection (5 minutes)**

Ask students to identify all local maxima and minima in each function. Then check: Is f''(x) positive or negative at each extremum? This connects to the Second Derivative Test.

### Assessment Questions

1. If a function is concave up at x = 2, what can you say about f''(2)?
2. At an inflection point, what is true about the second derivative?
3. If the tangent line's slope is decreasing as you move right, is the function concave up or concave down?
4. Can a function have a local maximum where it is concave up? Explain.

## References

1. [Wikipedia: Concave Function](https://en.wikipedia.org/wiki/Concave_function) - Mathematical definition and properties of concave functions
2. [Wikipedia: Second Derivative Test](https://en.wikipedia.org/wiki/Second_derivative_test) - Using the second derivative to classify critical points
3. [Wikipedia: Inflection Point](https://en.wikipedia.org/wiki/Inflection_point) - Definition and geometric interpretation of inflection points
4. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this MicroSim
