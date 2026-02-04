---
title: Zoom to Linear
description: An interactive MicroSim demonstrating that sufficiently zoomed-in views of differentiable functions appear linear, matching the tangent line.
image: /sims/zoom-to-linear/zoom-to-linear.png
og:image: /sims/zoom-to-linear/zoom-to-linear.png
twitter:image: /sims/zoom-to-linear/zoom-to-linear.png
quality_score: 85
social:
   cards: false
---

# Zoom to Linear: Local Linearity

<iframe src="main.html" height="552px" width="100%" scrolling="no" style="border: none;"></iframe>

[Run the Zoom to Linear MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This interactive visualization demonstrates one of the most profound ideas in calculus: **local linearity**. When you zoom in far enough on any differentiable function at a point, the curve becomes indistinguishable from its tangent line.

!!! quote "Delta Moment"
    "Watch this magic trick! As I zoom in on where I'm standing, the curvy hill
    under my wheels flattens out into a perfectly straight ramp. That's not
    cheating—that's calculus!"

### Key Features

- **Function curve** (blue): The actual function you're examining
- **Tangent line** (pink/magenta): The linear approximation at the selected point
- **Zoom control**: Smoothly magnify from 1x to 100x
- **Auto-zoom**: Watch the transformation happen automatically
- **Draggable point**: Click and drag on the graph to move the tangent point

### Functions Included

| Function | Derivative | Default Point |
|----------|-----------|---------------|
| sin(x) | cos(x) | x = π/4 |
| x² | 2x | x = 1 |
| eˣ | eˣ | x = 0.5 |
| x³ | 3x² | x = 0.8 |
| ln(x) | 1/x | x = 1.5 |
| cos(x) | -sin(x) | x = π/3 |

## The Big Idea

At low zoom levels, you can clearly see the difference between the curved function and the straight tangent line. But as you increase the zoom, something remarkable happens:

1. At **1x zoom**: Curve and tangent are clearly different
2. At **10x zoom**: They're getting closer
3. At **50x zoom**: Nearly indistinguishable
4. At **100x zoom**: Effectively identical!

This is why the derivative (the slope of the tangent line) is so useful. Near any point where a function is differentiable, the function *behaves* like a straight line. This makes:

- **Linear approximation** possible (estimate function values using the tangent)
- **Differential equations** tractable (locally, everything is linear)
- **Numerical methods** effective (work with lines, which are easy!)

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/zoom-to-linear/main.html"
        height="552px"
        width="100%"
        scrolling="no"
        style="border: none;">
</iframe>
```

## Lesson Plan

### Learning Objective

Students will demonstrate that sufficiently zoomed-in views of differentiable functions appear linear, matching the tangent line.

**Bloom's Taxonomy Level:** Understand (L2)

**Bloom's Verb:** Demonstrate, Observe

### Grade Level

High School (Grades 11-12) - AP Calculus AB/BC

### Duration

15-20 minutes

### Prerequisites

- Understanding of tangent lines
- Basic concept of derivatives
- Familiarity with common functions (polynomial, trigonometric, exponential)

### Activities

#### Activity 1: Discovery (5 minutes)

1. Start with f(x) = x² at the default point
2. Ask students: "How different do the curve and tangent line look at 1x zoom?"
3. Have students slowly increase the zoom using the slider
4. Ask: "At what zoom level can you no longer tell them apart?"

#### Activity 2: Compare Functions (5 minutes)

1. Switch between different functions
2. Ask: "Does every function become linear when zoomed in enough?"
3. Have students drag the point to different locations
4. Discuss: "Does the zoom-to-linear effect work everywhere on the curve?"

#### Activity 3: Connect to Derivatives (5 minutes)

1. Note the slope value displayed in the info box
2. Switch to f(x) = x² at x = 1
3. Ask: "The slope shows 2. What is the derivative of x² at x = 1?"
4. Verify: f'(x) = 2x, so f'(1) = 2. It matches!
5. Try other points and functions to verify

#### Activity 4: The Auto-Zoom Experience (5 minutes)

1. Click "Auto Zoom" and watch the animation
2. Ask students to describe what they observe
3. Discuss: "Why is this property so important for calculus?"

### Discussion Questions

1. What does "local linearity" mean in your own words?
2. Why do we care that curves look like lines when zoomed in?
3. If a function had a sharp corner (like |x| at x = 0), would it still look linear when zoomed in?
4. How does this connect to the idea of "instantaneous rate of change"?

### Assessment

Ask students to explain in writing:

1. What happens visually as you zoom in on a differentiable function at a point?
2. Why does this behavior justify using the tangent line to approximate function values near a point?
3. Give an example of how you might use local linearity to estimate a function value without a calculator.

## Mathematical Background

The formal statement of local linearity is:

$$f(x) \approx f(a) + f'(a)(x - a)$$

for $x$ near $a$. This is called the **linear approximation** or **linearization** of $f$ at $a$.

The error in this approximation is $O((x-a)^2)$, meaning it shrinks quadratically as you get closer to $a$. This is why the curve and tangent become indistinguishable at high zoom levels—the error becomes negligibly small.

## References

- [Khan Academy: Local Linearity](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-1/v/local-linearity)
- [3Blue1Brown: Essence of Calculus](https://www.youtube.com/watch?v=WUvTyaaNkzM)
- [p5.js Reference](https://p5js.org/reference/)
