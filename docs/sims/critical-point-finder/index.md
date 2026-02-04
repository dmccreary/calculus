---
title: Critical Point Finder
description: Interactive MicroSim to help students identify critical points by finding where f'(x) = 0 or f'(x) does not exist, with step-by-step solutions.
image: /sims/critical-point-finder/critical-point-finder.png
og:image: /sims/critical-point-finder/critical-point-finder.png
twitter:image: /sims/critical-point-finder/critical-point-finder.png
quality_score: 85
social:
   cards: false
---

# Critical Point Finder

<iframe src="main.html" height="622px" width="100%" scrolling="no"></iframe>

[Run the Critical Point Finder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Critical Point Finder MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This interactive tool helps you find critical points of functions by identifying where the derivative equals zero or does not exist. The dual-graph display shows both f(x) and f'(x) simultaneously, making it easy to visualize the relationship between a function and its derivative.

!!! quote "Delta Moment"
    "Critical points are where I'm perfectly level - no tilt at all! Or sometimes
    they're at sharp corners where I can't even tell which way I'm facing.
    Either way, these are special places worth investigating!"

## How to Use

1. **Select a function type** from the dropdown menu:
   - **Polynomial**: Standard polynomial functions with smooth derivatives
   - **Absolute Value**: Functions with corners where f'(x) doesn't exist
   - **Rational**: Functions with potential discontinuities
   - **Piecewise**: Functions defined differently on different intervals

2. **Click "Find Critical Pts"** to begin the step-by-step solution

3. **Click "Next Step"** to reveal each step of the algebraic solution

4. **Toggle "Show f'(x)"** to show or hide the derivative graph

5. **Adjust the Zoom slider** to zoom in or out on the x-axis

6. **Use Prev/Next** to cycle through different functions of the same type

## Key Concepts

**Critical points** occur where:
- **f'(x) = 0**: The function has a horizontal tangent line (potential local max/min)
- **f'(x) does not exist (DNE)**: The function has a corner, cusp, or vertical tangent

On the graphs:
- **Green vertical dashed lines** mark critical points on both graphs
- **Green dots** on f(x) show the actual critical points
- **Orange/red markers** on f'(x) show where f' = 0 or DNE

## Iframe Embedding

Copy this iframe to embed the MicroSim in your website:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/critical-point-finder/main.html" height="622px" width="100%" scrolling="no"></iframe>
```

## Learning Objectives

After using this MicroSim, students will be able to:

1. **Solve** for critical points by setting f'(x) = 0 and solving algebraically
2. **Identify** critical points where f'(x) does not exist (corners, cusps)
3. **Verify** critical points graphically by observing horizontal tangents on f(x)
4. **Connect** x-intercepts of f'(x) to critical points of f(x)
5. **Distinguish** between different types of critical points (f'=0 vs. f' DNE)

## Lesson Plan

### Grade Level
High School (Grades 11-12) or Early College (Calculus I)

### Duration
20-30 minutes for guided exploration; 45 minutes for comprehensive practice

### Prerequisites
- Understanding of derivatives and derivative rules (power rule, quotient rule)
- Familiarity with graphing functions and their derivatives
- Basic equation-solving skills (factoring, quadratic formula)

### Warm-Up Questions (5 minutes)
1. What does it mean for a function to have a horizontal tangent line?
2. At what points on a parabola y = x^2 is the tangent line horizontal?
3. Can you think of a function that has a "corner" where you cannot draw a tangent?

### Guided Exploration (15 minutes)

**Part 1: Polynomial Functions**

1. Start with "Polynomial" type and the function f(x) = x^3 - 3x
2. Before clicking "Find Critical Pts", predict:
   - How many critical points might this cubic have?
   - Where do you think they are approximately?
3. Click through the solution steps and verify your predictions
4. Notice how the critical points on f(x) correspond to x-intercepts on f'(x)

**Part 2: Functions with Corners**

1. Switch to "Absolute Value" type
2. Observe the corner at x = 0 for f(x) = |x| - 2
3. Notice that f'(x) jumps from -1 to +1 at x = 0
4. Key insight: f'(0) does not exist because left and right derivatives differ

**Part 3: Connection Between Graphs**

Toggle the derivative graph on and off to answer:
- What happens on the f(x) graph at points where f'(x) crosses the x-axis?
- What happens on the f(x) graph at points where f'(x) is discontinuous?

### Practice Activity (10-15 minutes)

**Challenge 1:** For each function type, predict the critical points before revealing the solution.

**Challenge 2:** Given only the f'(x) graph, can you sketch what f(x) might look like?

**Discussion Questions:**
- Why are critical points called "critical"? What makes them special?
- If f'(c) = 0, does that mean f(c) is definitely a local maximum or minimum?
- What's the difference between a critical point where f' = 0 vs. where f' DNE?

### Assessment Ideas

1. **Quick Check:** Given f(x) = x^4 - 8x^2, find all critical points without using the MicroSim
2. **Application:** Sketch a function that has exactly three critical points: two where f' = 0 and one where f' DNE
3. **Extension:** If a polynomial has degree n, what's the maximum number of critical points it can have?

## Mathematical Background

### Definition of Critical Point

A number c in the domain of f is a **critical number** if either:

$$f'(c) = 0 \quad \text{or} \quad f'(c) \text{ does not exist}$$

The point (c, f(c)) is called a **critical point** of f.

### Finding Critical Points Algebraically

**Method 1: Where f'(x) = 0**
1. Find the derivative f'(x)
2. Set f'(x) = 0
3. Solve for x
4. Verify each solution is in the domain of f

**Method 2: Where f'(x) DNE**
1. Look for points where f is defined but f' is not
2. Common causes:
   - Corners (absolute value functions)
   - Vertical tangents (cube root functions)
   - Discontinuities in f' (piecewise functions)

### Why Critical Points Matter

By the **Extreme Value Theorem** and **Fermat's Theorem**, if f has a local maximum or minimum at c and f'(c) exists, then f'(c) = 0. This means:

- Local extrema can only occur at critical points (or endpoints)
- Critical points are the "candidates" for optimization problems
- Understanding critical points is essential for curve sketching

### Functions in This MicroSim

| Type | Example | Critical Points |
|------|---------|-----------------|
| Polynomial | f(x) = x^3 - 3x | x = -1, x = 1 (f' = 0) |
| Polynomial | f(x) = x^4 - 4x^2 | x = 0, plus or minus sqrt(2) (f' = 0) |
| Absolute Value | f(x) = abs(x) - 2 | x = 0 (f' DNE) |
| Rational | f(x) = x + 1/x | x = -1, x = 1 (f' = 0) |
| Piecewise | f(x) = x^2 if x < 1, 2x-1 if x >= 1 | x = 0 (f' = 0) |

## Tips for Success

1. **Always find f' first** before looking for critical points
2. **Factor completely** when setting f'(x) = 0
3. **Check the domain** - critical points must be in the domain of f
4. **Use the graph as verification** - critical points should match where tangent is horizontal
5. **Don't forget DNE points** - check for corners, cusps, and vertical tangents

## References

1. [Critical Point - Wikipedia](https://en.wikipedia.org/wiki/Critical_point_(mathematics)) - Mathematical definition and theory
2. [Critical Numbers - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-2/v/minima-maxima-and-critical-points) - Video explanation with examples
3. [Fermat's Theorem - MathWorld](https://mathworld.wolfram.com/FermatsTheorem.html) - The theorem connecting extrema to critical points
4. [AP Calculus AB: Applications of Derivatives](https://apcentral.collegeboard.org/courses/ap-calculus-ab) - Official College Board curriculum guidelines
