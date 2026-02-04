---
title: Second Derivative Explorer
description: Interactive visualization showing f(x), f'(x), and f''(x) in three synchronized panels to help students analyze how the second derivative relates to the curvature of the original function.
quality_score: 90
image: /sims/second-derivative-explorer/second-derivative-explorer.png
og:image: /sims/second-derivative-explorer/second-derivative-explorer.png
twitter:image: /sims/second-derivative-explorer/second-derivative-explorer.png
social:
   cards: false
---
# Second Derivative Explorer

<iframe src="main.html" height="610px" scrolling="no"></iframe>

[Run the Second Derivative Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Second Derivative Explorer with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim displays a function and both of its derivatives in three stacked panels, with a synchronized point that shows the chain of relationships between them. As you move the slider, watch how:

- **Top panel (blue)**: The original function f(x) with a point and tangent line
- **Middle panel (green)**: The first derivative f'(x) showing the slope of f
- **Bottom panel (red)**: The second derivative f''(x) showing the rate of change of the slope

**The key connection**: The second derivative tells us about the *curvature* of the original function:

- When f''(x) > 0: The curve bends upward (concave up), and f'(x) is increasing
- When f''(x) < 0: The curve bends downward (concave down), and f'(x) is decreasing
- When f''(x) = 0: A potential inflection point where the curvature changes

!!! quote "Delta Moment"
    "Now I'm not just tracking my tilt - I'm tracking how my tilt is *changing*! When f''(x) is positive, my climb is getting steeper. When it's negative, my descent is easing up. And when f''(x) crosses zero? That's the *vibe shift* - the feel of the curve just changed!"

## How to Use

1. **Move the x slider** to explore different points along the function
2. **Switch between functions** using the function buttons (x^3, x^4-3x^2, sin(x))
3. **Toggle the f''(x) panel** on/off to compare with just two panels
4. **Watch the info panel** for exact values of x, f(x), f'(x), and f''(x)
5. **Observe the concavity indicator** on the f(x) panel

## Key Observations

### When f''(x) > 0 (positive second derivative):
- The original curve is **concave up** (opens upward like a smile)
- The first derivative is **increasing** (the slope is getting steeper)
- The tangent line rotates counterclockwise as x increases

### When f''(x) < 0 (negative second derivative):
- The original curve is **concave down** (opens downward like a frown)
- The first derivative is **decreasing** (the slope is getting less steep)
- The tangent line rotates clockwise as x increases

### When f''(x) = 0 (zero second derivative):
- **Possible inflection point** - where the curve changes from concave up to concave down (or vice versa)
- The first derivative has a local maximum or minimum
- The curve is momentarily "flat" in terms of curvature

## Embed This MicroSim

Place the following line in your website to include this MicroSim:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/second-derivative-explorer/main.html" height="610px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Analyze** the relationship between a function, its first derivative, and its second derivative (Bloom Level 4)
2. **Connect** the sign of the second derivative to the concavity of the original function
3. **Interpret** inflection points as places where the second derivative changes sign
4. **Predict** the behavior of f'(x) from the sign of f''(x)

### Prerequisite Knowledge

- Understanding of the first derivative as slope
- Familiarity with tangent lines
- Basic knowledge of the functions: x^3, polynomials, sin(x)
- Concept of "increasing" and "decreasing" functions

### Activity Sequence (20-25 minutes)

#### Part 1: Guided Discovery with x^3 (7 minutes)

1. Start with f(x) = x^3 and all three panels showing
2. Set x = -1 and observe: "What's the sign of f''(x)? What's happening to the curve?"
3. Slowly drag x from -1 to 1, crossing through x = 0
4. Key questions:
   - "At x = 0, what happens to f''(x)?"
   - "How does the shape of the curve change as we cross x = 0?"
   - "What's happening to f'(x) when f''(x) = 0?"

#### Part 2: Finding Inflection Points (8 minutes)

1. Switch to f(x) = x^4 - 3x^2
2. Challenge: "This function has TWO inflection points. Can you find them?"
3. Students record the x-values where f''(x) = 0
4. Verify by observing: "Does the concavity actually change at these points?"
5. Discussion: "Why are both inflection points not at x = 0?"

#### Part 3: The Sine Function (5 minutes)

1. Switch to sin(x)
2. Find where f''(x) = 0 (multiples of pi)
3. Notice: "For sin(x), where are the inflection points? Where are the extrema?"
4. Key insight: "The inflection points of sin(x) are where the function crosses the x-axis!"

#### Part 4: Two-Panel Comparison (5 minutes)

1. Turn OFF the f''(x) panel
2. Challenge: "Can you predict when the curve is concave up just by looking at f'(x)?"
3. Students should notice: "When f'(x) is increasing, f(x) is concave up"

### Assessment

Have students complete this quick check:

1. If f''(a) > 0, the curve is __________ at x = a.
2. If the first derivative is decreasing, then f''(x) is __________.
3. For f(x) = x^3, the inflection point is at x = __________.
4. At an inflection point, the curve changes from __________ to __________.

### Extensions

- Sketch f''(x) from f(x) without using the simulation
- Connect to real-world examples: acceleration as the second derivative of position
- Explore the relationship between f''(x) and the Second Derivative Test for extrema
- Investigate functions with no inflection points (like e^x or x^2)

## References

- [Khan Academy: Second derivative test](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-6b/v/second-derivative-test)
- [3Blue1Brown: What does the second derivative tell you?](https://www.3blue1brown.com/lessons/higher-order-derivatives)
- AP Calculus AB/BC Course Description: Unit 5 - Analytical Applications of Differentiation
