---
title: Derivative of Inverse Functions
description: Interactive visualization showing geometrically why the derivative of an inverse function equals the reciprocal of the original derivative.
image: /sims/inverse-derivative/inverse-derivative.png
---

# Derivative of Inverse Functions

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit with p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This visualization demonstrates one of the beautiful relationships in calculus: **the derivative of an inverse function is the reciprocal of the original function's derivative**.

If you have a function $f$ and its inverse $f^{-1}$, then:

$$(f^{-1})'(b) = \frac{1}{f'(a)}$$

where $b = f(a)$, meaning $(a, b)$ is on the graph of $f$ and $(b, a)$ is on the graph of $f^{-1}$.

### The Geometric Intuition

Why does this work? Look at what happens when you reflect a tangent line across $y = x$:

- A tangent line with slope $m$ becomes a tangent line with slope $1/m$
- The reflection swaps the "rise" and "run" of the slope triangle
- This is exactly what happens when coordinates $(a, b)$ become $(b, a)$

!!! quote "Delta Moment"
    "Wait, if I'm rolling along $f(x)$ at a steep angle, my reflection on $f^{-1}$ is tilted gently? The steeper I go, the flatter my mirror-self becomes. That's... actually kind of beautiful!"

### Functions Available

| Function | Inverse | Restriction |
|----------|---------|-------------|
| $f(x) = x^2$ | $f^{-1}(x) = \sqrt{x}$ | $x \geq 0$ |
| $f(x) = x^3$ | $f^{-1}(x) = \sqrt[3]{x}$ | none |
| $f(x) = e^x$ | $f^{-1}(x) = \ln(x)$ | none |
| $f(x) = \sin(x)$ | $f^{-1}(x) = \arcsin(x)$ | $-\pi/2 \leq x \leq \pi/2$ |

## How to Use

1. **Select a function** using the buttons at the bottom
2. **Drag the blue point** along the curve to see how slopes change
3. **Toggle the y = x line** to see or hide the reflection axis
4. **Click Animate** to watch the point sweep along the curve automatically
5. **Watch the info panel** to verify that the product of slopes always equals 1

### What to Observe

- The **blue tangent line** on $f(x)$ and the **orange tangent line** on $f^{-1}(x)$
- The **slopes displayed** in the info panel are always reciprocals
- The **product of slopes** is always 1 (within rounding)
- When $f$ is steep, $f^{-1}$ is shallow, and vice versa

## The Mathematics

### Derivation Using the Chain Rule

If $f$ and $f^{-1}$ are inverses, then:

$$f(f^{-1}(x)) = x$$

Differentiating both sides using the chain rule:

$$f'(f^{-1}(x)) \cdot (f^{-1})'(x) = 1$$

Solving for $(f^{-1})'(x)$:

$$(f^{-1})'(x) = \frac{1}{f'(f^{-1}(x))}$$

If we let $a = f^{-1}(b)$ (so $b = f(a)$), this becomes:

$$(f^{-1})'(b) = \frac{1}{f'(a)}$$

### Example: Square Root Function

For $f(x) = x^2$ (with $x \geq 0$), we have $f^{-1}(x) = \sqrt{x}$.

- $f'(x) = 2x$
- $(f^{-1})'(x) = \frac{1}{2\sqrt{x}}$

At the point $(2, 4)$ on $f$:
- $f'(2) = 4$
- The corresponding point on $f^{-1}$ is $(4, 2)$
- $(f^{-1})'(4) = \frac{1}{2\sqrt{4}} = \frac{1}{4}$

Product: $4 \times \frac{1}{4} = 1$

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. **Explain** why the derivative of an inverse function equals the reciprocal of the original derivative (Bloom Level 2: Understand)
2. **Interpret** the geometric relationship between tangent lines on $f$ and $f^{-1}$
3. **Illustrate** the reflection property across $y = x$
4. **Apply** the inverse function derivative formula to calculate specific values

### Prerequisite Knowledge

- Understanding of derivatives and tangent lines
- Familiarity with inverse functions and the line $y = x$
- Basic knowledge of exponential, logarithmic, and trigonometric functions

### Suggested Activities

1. **Predict First**: Before selecting a function, ask students to predict what will happen to the slope of the inverse's tangent line if the original slope is 3. Then verify with the simulation.

2. **Pattern Recognition**: For each function, record several pairs of slopes. Verify that their product is always 1.

3. **Edge Cases**: What happens when $f'(a) = 0$? When is $(f^{-1})'(b)$ undefined? Explore these cases with the simulation.

4. **Connection to Horizontal/Vertical Tangents**: Find points where the tangent line on $f$ is horizontal. What does this imply about the tangent line on $f^{-1}$?

### Discussion Questions

1. Why must we restrict $f(x) = x^2$ to $x \geq 0$ for it to have an inverse?
2. If a function has a horizontal tangent line at some point, what can you say about its inverse at the corresponding point?
3. Why does reflecting across $y = x$ swap the slope to its reciprocal?
4. How does this relationship help us find derivatives of inverse trig functions?

### Assessment Questions

1. If $f'(3) = 5$ and $f(3) = 7$, what is $(f^{-1})'(7)$?
2. Find the slope of the tangent line to $y = \sqrt{x}$ at $x = 9$ using the inverse function derivative formula.
3. Explain geometrically why the tangent line to $y = \ln(x)$ at $x = e$ has slope $1/e$.
4. If the tangent line to $f$ at $(2, 8)$ is horizontal, what can you conclude about $f^{-1}$ at $x = 8$?

## Embedding

```html
<iframe src="https://dmccreary.github.io/calculus/sims/inverse-derivative/main.html"
        height="552px" width="100%" scrolling="no"></iframe>
```

## References

- [Inverse Functions - Wikipedia](https://en.wikipedia.org/wiki/Inverse_function)
- [Derivative of Inverse Functions - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-2-new/ab-3-3/a/derivatives-of-inverse-functions)
- [Inverse Trigonometric Functions - Wikipedia](https://en.wikipedia.org/wiki/Inverse_trigonometric_functions)
