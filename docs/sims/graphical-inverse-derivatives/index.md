---
title: Graphical Inverse Derivatives
description: Interactive visualization showing the relationship between a function and its inverse, with tangent lines demonstrating the reciprocal slope property.
image: /sims/graphical-inverse-derivatives/screenimage.png
---

# Graphical Inverse Derivatives

<iframe src="main.html" height="525px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit with p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This visualization demonstrates one of calculus's most elegant relationships: **the derivative of an inverse function equals the reciprocal of the original function's derivative**. In mathematical notation:

$$\frac{d}{dx}[f^{-1}(x)] = \frac{1}{f'(f^{-1}(x))}$$

When you drag a point along f(x) on the left graph, the corresponding point on $f^{-1}(x)$ updates on the right graph. The tangent lines at these corresponding points always have slopes that are **reciprocals** of each other, meaning their product equals 1.

!!! quote "Delta Moment"
    "Check this out: if I'm climbing a slope of 2 on f(x), the same spot on the inverse has me at slope 1/2. Flip it and reverse it - literally! The slopes are reciprocals, and 2 times 1/2 is... wait for it... 1!"

### The Key Insight

If the point $(a, b)$ is on $f(x)$, then the point $(b, a)$ is on $f^{-1}(x)$ - the coordinates swap. The tangent line slopes at these corresponding points multiply to exactly 1:

$$m_f \cdot m_{f^{-1}} = 1$$

### Why Does This Work?

Think about it geometrically: reflecting a line across $y = x$ inverts its slope. If a tangent has slope $m$, its reflection has slope $1/m$. Since $f^{-1}(x)$ is the reflection of $f(x)$ across $y = x$, their tangent lines at corresponding points must have reciprocal slopes.

## How to Use

1. **Select a Function**: Use the dropdown to choose different function families (Cubic, Square Root, Exponential, Linear)
2. **Drag the Point**: Click and drag on the left graph to move the point along f(x)
3. **Use the Slider**: Adjust the x-value precisely using the slider
4. **Toggle y = x Line**: Show or hide the dashed reference line
5. **Toggle Slopes**: Show or hide the slope calculation panel
6. **Animate**: Watch the point trace along the curve automatically

### What to Observe

- The **blue tangent line** on f(x) and the **orange tangent line** on $f^{-1}(x)$ have reciprocal slopes
- The slope panel shows $m_f \times m_{inv} = 1$ at every point
- The dashed $y = x$ line shows the mirror relationship between the curves
- As slope increases on f(x), it decreases on $f^{-1}(x)$ and vice versa

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. **Explain** why the derivative of an inverse function equals the reciprocal of the original derivative (Bloom Level 2: Understand)
2. **Interpret** the graphical relationship between tangent lines on f(x) and $f^{-1}(x)$
3. **Demonstrate** the reciprocal slope property by identifying corresponding points and their tangent slopes

### Prerequisite Knowledge

- Understanding of derivatives as slopes of tangent lines
- Knowledge of inverse functions and their graphical relationship (reflection across y = x)
- Basic familiarity with exponential, logarithmic, and power functions

### Suggested Activities

1. **Prediction Challenge**: Before moving the point, students predict: "If the slope on f(x) is 3, what will the slope be on $f^{-1}(x)$?" Verify with the simulation.

2. **Slope Detective**: For each function type, find the point where both slopes equal 1. What special property does this point have? (It lies on the line y = x!)

3. **Edge Cases**: Explore what happens as slopes approach 0 or infinity. For the square root function, observe how a very small slope on one curve corresponds to a very large slope on the other.

4. **Formula Connection**: After building intuition graphically, derive the formula algebraically using implicit differentiation on $f(f^{-1}(x)) = x$.

### Discussion Questions

1. Why must the product of the slopes always equal 1?
2. What happens at a point where f'(x) = 0? Can the inverse have a tangent line there?
3. How does the reflection relationship across y = x explain the reciprocal slopes?
4. For f(x) = $e^x$, the derivative at any point equals the y-coordinate. How does this connect to the inverse?

### Assessment Questions

1. If f(x) = $x^3$ and you're at the point (2, 8), what is the slope of the tangent to $f^{-1}(x)$ at (8, 2)?
2. For f(x) = $\sqrt{x}$ at x = 4, the slope is 1/4. What is the slope of $f^{-1}(x)$ at the corresponding point?
3. Explain in your own words why inverse function derivatives are reciprocals.

## Mathematical Background

### The Inverse Function Derivative Formula

Starting from $f(f^{-1}(x)) = x$, differentiate both sides using the chain rule:

$$f'(f^{-1}(x)) \cdot (f^{-1})'(x) = 1$$

Solving for $(f^{-1})'(x)$:

$$(f^{-1})'(x) = \frac{1}{f'(f^{-1}(x))}$$

### Example: Exponential and Logarithm

For $f(x) = e^x$ with $f^{-1}(x) = \ln(x)$:

- At x = 1 on $f(x) = e^x$: the point is $(1, e)$ and $f'(1) = e$
- The corresponding point on $\ln(x)$ is $(e, 1)$
- The slope of $\ln(x)$ at $x = e$ is $1/e$
- Product: $e \cdot \frac{1}{e} = 1$

## Embedding

```html
<iframe src="https://dmccreary.github.io/calculus/sims/graphical-inverse-derivatives/main.html"
        height="525px" width="100%" scrolling="no"></iframe>
```

## References

- [Inverse Function Derivative - Wikipedia](https://en.wikipedia.org/wiki/Inverse_function_rule)
- [Implicit Differentiation - Wikipedia](https://en.wikipedia.org/wiki/Implicit_function#Implicit_differentiation)
- [Inverse Functions - Khan Academy](https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions/x2f8bb11595b61c86:inverse-functions-intro/a/intro-to-inverse-functions)
