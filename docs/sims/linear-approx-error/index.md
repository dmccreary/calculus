---
title: Linear Approximation Error
description: Assess the accuracy of linear approximations by comparing the approximation to the actual function value and understanding how error varies with distance from the base point.
quality_score: 90
image: /sims/linear-approx-error/linear-approx-error.png
og:image: /sims/linear-approx-error/linear-approx-error.png
twitter:image: /sims/linear-approx-error/linear-approx-error.png
social:
   cards: false
---
# Linear Approximation Error

<iframe src="main.html" height="512px" scrolling="no"></iframe>

[Run the Linear Approximation Error MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Linear Approximation Error MicroSim with the p5.js editor](https://editor.p5js.org/)

Place the following line in your website to include this in your course.

```html
<iframe src="https://dmccreary.github.io/calculus/sims/linear-approx-error/main.html" height="512px" scrolling="no"></iframe>
```

## Description

This MicroSim helps students evaluate when linear approximations are accurate and when they fall short. By comparing the actual function value f(x) with the linear approximation L(x) = f(a) + f'(a)(x - a), students develop intuition for error bounds and the relationship between distance from the base point and approximation quality.

**Key Features:**

- **Dual Graph Display**: The left graph shows the function and its tangent line at point a, while the right graph shows how the absolute error grows with distance from a
- **Error Visualization**: A shaded region between the curve and tangent line makes the error visually apparent
- **Error Analysis Panel**: Real-time display of actual value, approximation, absolute error, and relative error percentage
- **Color-Coded Accuracy**: Relative error is color-coded green (<1%), yellow (1-5%), or red (>5%) to quickly assess approximation quality
- **Animation Mode**: Sweep the approximation point across the domain to see how error varies dynamically
- **Function Variety**: Compare error behavior across different function types (sqrt, sin, exp, ln, polynomial)

!!! quote "Delta Moment"
    "See that gap between me and the tangent line? That's the error! The further I roll away from point a, the more the tangent line lies to me about where I really am. Close to a, the approximation is spot-on. Far away? Not so much!"

## Lesson Plan

### Learning Objective

Students will assess the accuracy of linear approximations by comparing the approximation to the actual function value and understanding how error varies with distance from the base point (Bloom Level 5: Evaluate).

### Grade Level

High School (AP Calculus AB/BC)

### Duration

20-25 minutes

### Prerequisites

- Understanding of derivatives and their geometric meaning as slope
- Knowledge of tangent line equations: y - f(a) = f'(a)(x - a)
- Basic linear approximation concept: L(x) = f(a) + f'(a)(x - a)

### Warm-Up Activity (3 minutes)

1. Ask students: "If you know the slope of a curve at one point, can you predict where the curve is at nearby points? What about faraway points?"
2. Introduce the key question: "How close is close enough for a linear approximation?"

### Exploration Activity (15 minutes)

#### Part 1: Quadratic Error Growth (5 min)

1. **Start with sqrt(x)**: Set a = 1, then slowly move x away from 1
   - At x = 1.1, what is the relative error? (very small!)
   - At x = 2, how much has the error grown?
   - Notice the error graph: it curves upward (quadratic growth)

2. **Observation**: Ask students why the error grows faster as distance increases
   - The tangent line is straight; the curve is not!
   - The second derivative determines how fast the curve bends away

#### Part 2: Comparing Functions (5 min)

1. **Try f(x) = sin(x)** with a = 0
   - What is L(x) near x = 0? (just x, since sin'(0) = 1 and sin(0) = 0)
   - Move x toward pi/2; how bad does the approximation get?

2. **Try f(x) = e^x** with a = 0
   - Notice how the error grows rapidly for x > 1
   - Why? (e^x curves upward increasingly steeply)

3. **Compare with x^2** at a = 1
   - This is a parabola; the error should grow quadratically
   - Verify using the error vs distance graph

#### Part 3: Critical Thinking (5 min)

1. **Click "Animate"** to sweep x across the domain
   - Watch both graphs simultaneously
   - Where is the approximation best? Worst?

2. **Toggle "Region: OFF"** to focus on just the error line
   - The vertical red segment shows the error at each x

3. **Find the "sweet spot"**: For sqrt(x) at a = 1, how far can x go before relative error exceeds 5%?

### Discussion Questions

1. Why does the error always seem smallest at the base point a?
2. How does the shape of the function (concave up vs concave down) affect how the error grows?
3. If you needed to approximate sqrt(10), what base point would you choose? Why?
4. In physics, we often use sin(x) = x for small angles. How small is "small enough" for 1% accuracy?

### Assessment

Students should be able to:

- Explain why linear approximations get worse with distance
- Identify which functions have rapidly or slowly growing error
- Use relative error to decide if an approximation is "good enough"
- Choose appropriate base points for approximation problems
- Relate approximation error to the curvature of the function

### Extension Activities

1. **Mathematical Connection**: The error is approximately (1/2)|f''(c)|(x-a)^2 for some c between a and x. Have students verify this by examining the error graph shape.

2. **Real-World Application**: Research how linear approximation is used in:
   - Calculator algorithms for computing square roots
   - Physics approximations (pendulum motion, small angle approximation)
   - Financial models for interest calculations

## References

- [Linear Approximation on Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-contextual-applications-new/ab-4-6/a/linear-approximation)
- [Linearization and Differentials - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/LinearApproximations.aspx)
- [Taylor's Theorem and Error Bounds](https://en.wikipedia.org/wiki/Taylor%27s_theorem)
