---
title: Secant Lines Approaching Tangent Line
description: Interactive visualization showing how secant lines approach the tangent line as h approaches 0, demonstrating the limit definition of the derivative
image: /sims/secant-to-tangent/secant-to-tangent.png
---

# Secant Lines Approaching Tangent Line

<iframe src="main.html" height="517px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This visualization demonstrates the fundamental concept connecting secant lines to tangent lines through limits. You can watch as the secant line rotates to become the tangent line when the second point Q approaches the fixed point P.

The function shown is:

$$f(x) = x^2$$

The secant line passes through two points on the curve:

- **Point P** at $(x, x^2)$ - the fixed point
- **Point Q** at $(x + h, (x + h)^2)$ - the moving point

### The Secant Slope Formula

The slope of the secant line PQ is:

$$\text{slope} = \frac{f(x+h) - f(x)}{h} = \frac{(x+h)^2 - x^2}{h}$$

For $f(x) = x^2$, this simplifies to:

$$\text{slope} = \frac{x^2 + 2xh + h^2 - x^2}{h} = \frac{2xh + h^2}{h} = 2x + h$$

### The Key Insight

As $h \to 0$, the secant slope approaches the **tangent slope**:

$$\lim_{h \to 0} (2x + h) = 2x$$

This is exactly the derivative $f'(x) = 2x$!

!!! quote "Delta Moment"
    "See that orange line rotating toward the green one? That rotation IS the limiting process. When h gets super tiny, I can't tell the secant from the tangent - they're practically the same line!"

## How to Use

1. **h Slider**: Control how close point Q is to point P
2. **Point P at x Slider**: Move the fixed point P along the parabola
3. **Watch h approach 0**: Animate the approach automatically
4. **Reset**: Return to starting values

### What to Observe

- The **orange secant line** rotates as h changes
- The **green dashed tangent line** shows the target slope
- The **info panel** shows the current secant slope converging to the limit slope
- The **table** fills with (h, slope) pairs showing numerical convergence

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. **Explain** how the slope of a secant line relates to the slope of a tangent line through a limiting process (Bloom Level 2: Understand)
2. **Interpret** the limit definition of the derivative geometrically
3. **Predict** the tangent slope at any point on $f(x) = x^2$ using the derivative formula

### Prerequisite Knowledge

- Understanding of slope as rise over run
- Familiarity with the parabola $f(x) = x^2$
- Basic concept of limits (approaching a value)

### Suggested Activities

1. **Predict First**: Before moving the slider, ask students to predict what the tangent slope should be at x = 1. Then verify with the simulation.

2. **Pattern Recognition**: Try different x values for point P. Record the tangent slope at each. What pattern do students notice? (They should discover slope = 2x)

3. **Numerical Evidence**: Use the table to see how the secant slope converges. At what value of h can you no longer visually distinguish the secant from the tangent?

4. **Connection to Algebra**: Show that the secant slope formula $\frac{(x+h)^2 - x^2}{h}$ simplifies to $2x + h$, which approaches $2x$ as $h \to 0$.

### Discussion Questions

1. Why does the secant line become the tangent line as h approaches 0?
2. What happens to point Q as h gets very small?
3. Why do we need limits? Why can't we just set h = 0 directly in the slope formula?
4. How would this visualization change for a different function, like $f(x) = x^3$?

### Assessment Questions

1. What is the slope of the tangent line to $f(x) = x^2$ at $x = 3$?
2. If the secant slope is 5.1 when h = 0.1 and x = 2.5, what is the tangent slope?
3. Write the limit that defines the derivative of $f(x) = x^2$.

## Embedding

```html
<iframe src="https://dmccreary.github.io/calculus/sims/secant-to-tangent/main.html"
        height="517px" width="100%" scrolling="no"></iframe>
```

## References

- [Derivative - Wikipedia](https://en.wikipedia.org/wiki/Derivative)
- [Tangent Line - Wikipedia](https://en.wikipedia.org/wiki/Tangent)
- [Secant Line - Wikipedia](https://en.wikipedia.org/wiki/Secant_line)
