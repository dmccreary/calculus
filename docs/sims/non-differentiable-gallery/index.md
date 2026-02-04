---
title: Non-Differentiable Points Gallery
description: Interactive gallery showing the three types of non-differentiable points with animated secant lines approaching from both sides
image: /sims/non-differentiable-gallery/non-differentiable-gallery.png
quality_score: 85
---

# Non-Differentiable Points Gallery

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive gallery presents the three types of non-differentiable points, helping you classify and distinguish between them. Each type shows why the derivative fails to exist, even though the function itself may be continuous.

### The Three Types

| Type | Function | Example | Why No Derivative |
|------|----------|---------|-------------------|
| **Corner** | $f(x) = \|x\|$ | Absolute value at 0 | Left and right limits are different |
| **Cusp** | $f(x) = x^{2/3}$ | Cusp at origin | Both limits are infinite, opposite signs |
| **Vertical Tangent** | $f(x) = x^{1/3}$ | Cube root at origin | Both limits are $+\infty$ (vertical line) |

### The Key Question

For a derivative to exist at a point, the limit:

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

must exist as a **single, finite number**. This requires that the left-hand limit (approaching from negative $h$) and the right-hand limit (approaching from positive $h$) both exist and are equal.

!!! quote "Delta Moment"
    "See those two lines? The orange one approaches from the left, the green from the right. For me to have a well-defined tilt at a point, those lines need to settle on the SAME slope. When they don't agree, I'm confused about which way I'm actually tilted!"

## How to Use

1. **Select a Type**: Click the tabs to switch between Corner, Cusp, and Vertical Tangent
2. **Watch the Animation**: Click "Watch h Approach 0" to see secant lines converge
3. **Adjust h Manually**: Drag the slider to control how close the secant points are
4. **Zoom In**: Use the + and - buttons to see detail near the origin

### What to Observe

- **Orange line**: Secant from the LEFT (negative x values)
- **Green line**: Secant from the RIGHT (positive x values)
- **Blue point**: The non-differentiable point at the origin
- **Info panel**: Shows the current slopes from each side

### Classification Guide

**Corner** (like $|x|$ at 0):
- Both one-sided derivatives exist and are finite
- But they are DIFFERENT values (-1 and +1)
- The function makes a "sharp turn"

**Cusp** (like $x^{2/3}$ at 0):
- Both one-sided derivatives approach infinity
- One approaches $-\infty$, the other $+\infty$
- The curve comes to an infinitely sharp point

**Vertical Tangent** (like $x^{1/3}$ at 0):
- Both one-sided derivatives approach $+\infty$
- They agree, but infinity isn't a valid slope
- A tangent line would be vertical (undefined slope)

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. **Classify** non-differentiable points into three categories: corner, cusp, or vertical tangent (Bloom Level 4: Analyze)
2. **Distinguish** between cases where one-sided derivatives differ vs. where they are infinite
3. **Compare** the behavior of secant lines from both sides at each type of point
4. **Predict** which type of non-differentiability a given function exhibits

### Prerequisite Knowledge

- Understanding of limits and one-sided limits
- Familiarity with the limit definition of the derivative
- Knowledge of basic function types (absolute value, fractional powers)

### Suggested Activities

1. **Predict-Observe-Explain**: Before switching to each type, predict what will happen to the secant lines. Then observe and explain any surprises.

2. **Slope Table**: For each type, record the slopes at h = 1, 0.5, 0.1, 0.01. What patterns emerge?

3. **Classification Challenge**: Given a graph of a function with a problematic point, classify the type without seeing the formula.

4. **Create Your Own**: Can students think of other functions that exhibit each type? (Examples: $f(x) = x^{4/3}$ at 0 for a cusp, $f(x) = |x-2|$ at 2 for a corner)

### Discussion Questions

1. All three example functions are continuous at x = 0. Why doesn't continuity guarantee differentiability?

2. For the cusp ($x^{2/3}$), both secant slopes go to infinity, but in opposite directions. Why does this mean no derivative exists?

3. For the vertical tangent ($x^{1/3}$), both slopes agree as $+\infty$. Why can't we just say the derivative is infinity?

4. Which type would you expect at a "kink" in a piece of metal wire that's been bent?

### Assessment Questions

1. Classify the non-differentiable point of $f(x) = |x - 3|$ at $x = 3$. (Answer: Corner)

2. The function $g(x) = x^{4/5}$ has what type of point at $x = 0$? (Answer: Cusp, since $g'(x) = \frac{4}{5}x^{-1/5}$ approaches $\pm\infty$)

3. If $\lim_{h \to 0^-} \frac{f(a+h) - f(a)}{h} = 3$ and $\lim_{h \to 0^+} \frac{f(a+h) - f(a)}{h} = 3$, does $f'(a)$ exist? (Answer: Yes, both limits exist and are equal)

4. Sketch a function that has a corner at $x = -1$, is differentiable at $x = 0$, and has a vertical tangent at $x = 2$.

## Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/non-differentiable-gallery/main.html"
        height="502px" width="100%" scrolling="no"></iframe>
```

## References

- [Differentiable function - Wikipedia](https://en.wikipedia.org/wiki/Differentiable_function)
- [Cusp (singularity) - Wikipedia](https://en.wikipedia.org/wiki/Cusp_(singularity))
- [Non-differentiable function - MathWorld](https://mathworld.wolfram.com/NondifferentiableFunction.html)
