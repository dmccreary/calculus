---
title: Power Rule Explorer
description: Interactive visualization of the power rule showing f(x) = x^n and its derivative f'(x) = nx^(n-1) with synchronized points and tangent lines.
image: /sims/power-rule-explorer/power-rule-explorer.png
og:image: /sims/power-rule-explorer/power-rule-explorer.png
twitter:image: /sims/power-rule-explorer/power-rule-explorer.png
quality_score: 85
social:
   cards: false
---

# Power Rule Explorer

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run Power Rule Explorer in Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/power-rule-explorer/main.html" height="482px" width="100%" scrolling="no"></iframe>
```

## Description

The Power Rule Explorer is an interactive visualization that demonstrates one of the most fundamental rules in differential calculus: the **power rule**. This rule states that for any function f(x) = x^n, the derivative is f'(x) = nx^(n-1).

### How to Use

1. **Adjust the exponent (n)**: Use the top slider to change the exponent from -3 to 5, including fractional values in 0.5 increments
2. **Move the x-position**: Use the second slider to move the point along the x-axis from -2.5 to 2.5
3. **Toggle the tangent line**: Click the Tangent ON/OFF button to show or hide the tangent line on the left graph

### What You See

- **Left panel**: Shows the original function f(x) = x^n (blue curve)
- **Right panel**: Shows the derivative f'(x) = nx^(n-1) (orange curve)
- **Blue dot**: Current point on the original function
- **Orange dot**: Corresponding point on the derivative curve
- **Green line**: Tangent line at the current point (when enabled)
- **Info box**: Displays current values for x, f(x), and f'(x)

### Key Insight

The **slope of the tangent line** on the left graph always equals the **y-value** of the point on the right graph. This demonstrates that the derivative gives us the instantaneous rate of change (slope) at any point on the original function.

!!! quote "Delta Moment"
    "See that green tangent line? Its steepness IS the derivative value! When I'm on a steep part of the curve, my derivative is big. When I'm on a flat part, my derivative is near zero. The right graph is literally showing me how tilted I am at each x-value!"

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. State the power rule: d/dx[x^n] = nx^(n-1)
2. Apply the power rule to calculate derivatives for various exponents
3. Explain the connection between the tangent line slope and the derivative value
4. Predict how the derivative graph changes for different values of n

### Target Audience

- AP Calculus students (Grades 11-12)
- College calculus students
- Anyone learning differential calculus

### Prerequisites

- Understanding of functions and their graphs
- Familiarity with the concept of slope
- Basic understanding of what a derivative represents

### Activities

**Activity 1: Pattern Discovery (5 minutes)**

1. Set n = 2 (the parabola x^2)
2. Move the x slider and observe: What happens to the tangent slope as x increases?
3. Notice that f'(x) = 2x is a straight line - why does this make sense?

**Activity 2: Exploring Different Powers (10 minutes)**

1. Try n = 3: The derivative 3x^2 is always non-negative. Why?
2. Try n = 1: The derivative is constantly 1. What does this mean geometrically?
3. Try n = 0: The derivative is constantly 0. Why?

**Activity 3: Negative and Fractional Exponents (10 minutes)**

1. Set n = -1 (the function 1/x): Notice the derivative -1/x^2 is always negative. Why?
2. Try n = 0.5 (the square root function): Notice the domain restrictions
3. Observe where the function and derivative are undefined

**Activity 4: Verification Exercise (5 minutes)**

For each value of n, calculate f'(1) by hand using the power rule, then verify with the MicroSim:

- n = 2: f'(1) = 2(1)^1 = 2
- n = 3: f'(1) = 3(1)^2 = 3
- n = -1: f'(1) = -1(1)^(-2) = -1

### Assessment Questions

1. Using the power rule, what is the derivative of x^7?
2. If f(x) = x^4, at what x-value is f'(x) = 0?
3. Why is the derivative of x (n=1) a horizontal line?
4. For f(x) = x^(-2), is the derivative always positive, always negative, or does it change sign?

## References

1. [Power Rule - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-5/a/power-rule-review) - Comprehensive review of the power rule with practice problems

2. [Derivative Rules - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/DerivativeIntro.aspx) - Detailed explanations of derivative rules including the power rule

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used to create this visualization
