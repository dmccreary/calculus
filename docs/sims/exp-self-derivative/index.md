---
title: e^x is Its Own Derivative
description: Interactive MicroSim demonstrating that the exponential function e^x is unique because its derivative equals the function itself - the tangent slope at any point equals the function value.
quality_score: 92
image: /sims/exp-self-derivative/exp-self-derivative.png
og:image: /sims/exp-self-derivative/exp-self-derivative.png
twitter:image: /sims/exp-self-derivative/exp-self-derivative.png
social:
   cards: false
---
# e^x is Its Own Derivative

<iframe src="main.html" height="482px" scrolling="no"></iframe>

[Run the e^x Derivative MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit this MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This interactive visualization demonstrates one of the most remarkable properties in all of calculus: **the function f(x) = e^x is its own derivative**. This means that at every point on the curve, the slope of the tangent line equals the function value itself.

!!! quote "Delta Moment"
    "Wait... my tilt equals my height? At x = 0, I'm at height 1 and tilted at slope 1.
    At x = 1, I'm at height e (about 2.718) and tilted at slope e.
    This is wild! I've never seen a function where what I AM equals how fast I'm changing!"

### Why This Matters

The exponential function e^x is the only function (up to a constant multiple) that equals its own derivative. This property makes it:

- **Essential for modeling growth and decay** - Population growth, radioactive decay, and compound interest all use e^x
- **The basis for solving differential equations** - Many natural phenomena are described by equations involving derivatives
- **Fundamental to calculus** - Understanding e^x unlocks deeper understanding of limits, derivatives, and integrals

### How to Use

1. **Move the slider** to change the x-value and watch the point travel along the curve
2. **Observe the info panel** showing both the y-value (e^x) and the tangent slope - they always match!
3. **Click "Compare y and slope"** to highlight this equality with a visual pulse
4. **Toggle the tangent line** to see or hide it using the checkbox

### The Key Insight

At any point x:
- **Function value:** y = e^x
- **Slope (derivative):** dy/dx = e^x

These are identical! This is what makes e^x special.

## Iframe Embedding

Place the following line in your website to include this MicroSim:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/exp-self-derivative/main.html" height="482px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will explain why e^x is its own derivative by observing that the tangent slope equals the function value at every point on the curve.

### Grade Level

High School (AP Calculus) or early undergraduate

### Duration

10-15 minutes

### Prerequisites

- Understanding of derivatives as slopes of tangent lines
- Familiarity with exponential functions
- Basic knowledge of the number e (approximately 2.718)

### Warm-Up Questions

1. What does the derivative of a function tell us geometrically?
2. For the function f(x) = x^2, what is f'(x)? Are f(x) and f'(x) the same function?
3. Can you think of any function where f(x) = f'(x)?

### Guided Exploration

1. **Set x = 0**: What is e^0? What is the slope? (Both should be 1)
2. **Set x = 1**: What is e^1? What is the slope? (Both should be approximately 2.718)
3. **Set x = -1**: What is e^(-1)? What is the slope? (Both should be approximately 0.368)
4. **Try several values**: Does the pattern hold everywhere?

### Discussion Questions

1. Why do you think e^x has this special property while other exponential functions like 2^x do not?
2. If a population grows according to P(t) = e^t, what does it mean that the growth rate equals the population size?
3. How might this property be useful when solving differential equations?

### Extension Activity

Compare the graphs of f(x) = e^x and g(x) = 2^x. For 2^x, the derivative is 2^x * ln(2). Why does the extra factor ln(2) appear, and why is it exactly 1 for e^x?

### Assessment

Have students complete these tasks:
1. Use the MicroSim to find the slope at x = 2 and verify it matches e^2
2. Explain in their own words why "the function equals its derivative" is remarkable
3. Predict what happens to the slope as x approaches negative infinity

## References

- [Khan Academy: Derivative of e^x](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-7/v/proof-d-dx-e-x-e-x)
- [Paul's Online Math Notes: Exponential Functions](https://tutorial.math.lamar.edu/Classes/CalcI/DiffExpLogFcns.aspx)
- [Wikipedia: Characterizations of the exponential function](https://en.wikipedia.org/wiki/Characterizations_of_the_exponential_function)
