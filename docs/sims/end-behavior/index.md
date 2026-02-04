---
title: End Behavior Explorer
description: Interactive MicroSim for examining how leading term characteristics determine the end behavior of polynomial and rational functions.
quality_score: 90
image: /sims/end-behavior/end-behavior.png
og:image: /sims/end-behavior/end-behavior.png
twitter:image: /sims/end-behavior/end-behavior.png
social:
   cards: false
---
# End Behavior Explorer

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run the End Behavior Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive visualization helps students understand how the **leading term** of a polynomial or rational function determines its **end behavior**--what happens to the function values as x approaches positive or negative infinity.

### Key Concepts

- **Leading Coefficient**: The coefficient of the highest-degree term determines whether the ends of the graph point up or down
- **Degree**: Whether the degree is even or odd affects the symmetry of end behavior
- **End Behavior Notation**: We use arrows to show the direction of the function as x approaches infinity

### How to Use

1. **Toggle Function Type**: Switch between polynomial and rational functions
2. **Adjust Lead Coefficient**: Use the slider to change from negative to positive values
3. **Change Degree**: Observe how even vs. odd degrees affect the end behavior
4. **Zoom Out**: Increase the zoom level to see the "far-out" behavior more clearly
5. **Animate**: Watch Delta travel toward infinity to visualize the end behavior

### End Behavior Patterns for Polynomials

| Lead Coef | Degree | Left (x->-inf) | Right (x->+inf) | Notation |
|-----------|--------|----------------|-----------------|----------|
| Positive  | Even   | Up             | Up              | up up    |
| Positive  | Odd    | Down           | Up              | down up  |
| Negative  | Even   | Down           | Down            | down down|
| Negative  | Odd    | Up             | Down            | up down  |

!!! quote "Delta Moment"
    "See those purple arrows? They show where I'm headed when I roll toward infinity.
    If the leading coefficient is positive and the degree is even, both ends point UP--
    like a giant smile! If it's odd degree... well, one end goes up and one goes down.
    It's like a roller coaster that never ends!"

## Iframe Embedding

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/end-behavior/main.html" height="522px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will examine how leading term characteristics (coefficient sign and degree) determine the end behavior of polynomial and rational functions.

### Grade Level

High School (AP Calculus, Pre-Calculus)

### Duration

15-20 minutes

### Prerequisites

- Understanding of polynomial degree and leading coefficient
- Basic graphing of polynomial functions
- Concept of infinity

### Activities

#### Activity 1: Polynomial Exploration (5 minutes)

1. Start with a positive leading coefficient and degree 2 (quadratic)
2. Observe the end behavior arrows and notation
3. Predict what happens when you change to degree 3
4. Test your prediction by moving the degree slider
5. Record the pattern for positive coefficients with even vs. odd degrees

#### Activity 2: The Effect of Sign (5 minutes)

1. Keep degree at 2 (even)
2. Change the leading coefficient from positive to negative
3. Observe how both arrows flip direction
4. Now change to degree 3 and repeat
5. Formulate a rule: "When the leading coefficient is negative..."

#### Activity 3: Zoom Out Challenge (5 minutes)

1. Set up a polynomial with small leading coefficient (like 0.5)
2. At low zoom, the middle behavior dominates
3. Gradually increase zoom to see the end behavior emerge
4. Discuss: Why does the leading term "win" at extreme x values?

#### Activity 4: Animation and Conceptual Understanding (5 minutes)

1. Click "Animate" to watch Delta travel toward infinity
2. Observe Delta's speech bubble as they approach the edges
3. Discuss: What does it mean for a function to "approach infinity"?

### Assessment Questions

1. If f(x) = -3x^5 + 2x^3 - x + 7, what is the end behavior?
2. A polynomial has end behavior: as x -> -inf, y -> +inf; as x -> +inf, y -> -inf. Is the degree even or odd? Is the leading coefficient positive or negative?
3. Why does only the leading term matter for end behavior?

### Common Misconceptions

- **Misconception**: All polynomials eventually go to positive infinity
- **Reality**: The sign of the leading coefficient determines whether the function goes to positive or negative infinity

- **Misconception**: Higher degree means "goes to infinity faster"
- **Reality**: While true, the key insight for end behavior is whether the degree is even or odd

### Extensions

- Explore rational functions and compare their end behavior
- Connect to limits at infinity: lim(x->inf) f(x)
- Discuss horizontal asymptotes for rational functions

## References

- [AP Calculus Course Description](https://apcentral.collegeboard.org/courses/ap-calculus-ab)
- [Khan Academy: End Behavior of Polynomials](https://www.khanacademy.org/math/algebra2/polynomial-functions/end-behavior-of-polynomials/v/polynomial-end-behavior)
- [Paul's Online Math Notes: Polynomials](https://tutorial.math.lamar.edu/Classes/Alg/Polynomials.aspx)
