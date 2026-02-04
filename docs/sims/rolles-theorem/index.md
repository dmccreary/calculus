---
title: Rolle's Theorem Visualizer
description: Interactive visualization of Rolle's Theorem showing functions with equal endpoint values and the guaranteed existence of horizontal tangent lines at critical points.
image: /sims/rolles-theorem/rolles-theorem.png
og:image: /sims/rolles-theorem/rolles-theorem.png
twitter:image: /sims/rolles-theorem/rolles-theorem.png
quality_score: 85
social:
   cards: false
---
# Rolle's Theorem Visualizer

<iframe src="main.html" width="100%" height="552px" scrolling="no"></iframe>

[Run the Rolle's Theorem Visualizer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit this MicroSim with the p5.js Editor](https://editor.p5js.org/){ .md-button }

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/rolles-theorem/main.html" width="100%" height="552px" scrolling="no"></iframe>
```

## Description

This MicroSim helps students understand **Rolle's Theorem**, one of the fundamental theorems in calculus. The theorem states:

> If a function $f$ is continuous on the closed interval $[a, b]$, differentiable on the open interval $(a, b)$, and $f(a) = f(b)$, then there exists at least one point $c$ in $(a, b)$ where $f'(c) = 0$.

In plain language: if a curve starts and ends at the same height, and the curve is smooth (no breaks or sharp corners), then somewhere in between there must be a point where the tangent line is perfectly horizontal.

### How to Use This MicroSim

1. **Select a Function**: Choose from three function types:
   - **Parabola**: A simple quadratic function
   - **Sine Wave**: A trigonometric function
   - **Cubic**: A polynomial with multiple turning points

2. **Adjust the Interval**: Use the **a** and **b** sliders to set the interval endpoints. The theorem requires $f(a) = f(b)$, so watch the checklist to see when this condition is satisfied.

3. **Shape the Curve**: Use the **Shape** slider to modify the function while exploring how the curve's geometry affects the location of critical points.

4. **Find Critical Points**: Click the **"Find Critical Points"** button to locate all points $c$ where $f'(c) = 0$. These points are marked with green diamond markers, and horizontal tangent lines are drawn through them.

5. **Toggle Tangent Lines**: Use the **Show Tangent** toggle to show or hide the horizontal tangent lines at critical points.

### Visual Elements

- **Red dots**: Mark the endpoints $(a, f(a))$ and $(b, f(b))$
- **Dashed horizontal line**: Connects the two endpoints when $f(a) = f(b)$
- **Green diamonds**: Mark critical points where $f'(c) = 0$
- **Green horizontal lines**: Tangent lines at critical points
- **Checklist**: Shows which of Rolle's three conditions are currently satisfied

!!! quote "Delta Moment"
    "See those green diamond markers? Those are the spots where I'm perfectly level -
    not tilted up, not tilted down. Rolle's Theorem promises me that if I start and
    end at the same height, at least one of those level spots MUST exist. Math guarantees it!"

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Explain** the three conditions required for Rolle's Theorem to apply (Bloom Level 2)
2. **Interpret** the geometric meaning of $f'(c) = 0$ as a horizontal tangent line (Bloom Level 2)
3. **Verify** whether a given function on a given interval satisfies Rolle's conditions (Bloom Level 2)

### Target Audience

- AP Calculus AB/BC students
- First-year college calculus students
- Grades 11-12

### Prerequisites

- Understanding of limits and continuity
- Basic understanding of derivatives and their geometric interpretation
- Knowledge of function notation

### Suggested Activities

**Activity 1: Exploring the Conditions (5 minutes)**

1. Start with the parabola function with default settings
2. Adjust slider **a** until the checklist shows "$f(a) = f(b)$" with a red X
3. Observe that no critical point can be guaranteed
4. Adjust **a** back so all three conditions are met

**Activity 2: Multiple Critical Points (5 minutes)**

1. Switch to the **Cubic** function
2. With symmetric interval settings (e.g., $a = -2$, $b = 2$), click "Find Critical Points"
3. Observe that Rolle's Theorem guarantees *at least one* critical point, but there can be more
4. Discuss: Why does the theorem say "at least one" rather than "exactly one"?

**Activity 3: Predict Before You Click (5 minutes)**

1. Choose a function and set an interval
2. Before clicking "Find Critical Points," have students predict approximately where $c$ will be
3. Click the button and compare predictions to actual locations
4. Repeat with different functions

### Assessment Questions

1. Why must the function be continuous on $[a, b]$? What would happen at a discontinuity?

2. Why must the function be differentiable on $(a, b)$? Give an example of a continuous function that isn't differentiable everywhere.

3. If $f(a) \neq f(b)$, can we still conclude anything about horizontal tangent lines? (Hint: Think about the Mean Value Theorem)

4. A function satisfies all three conditions of Rolle's Theorem on $[0, 4]$. The function has exactly three critical points in $(0, 4)$. Is this possible? Why or why not?

## References

1. [Rolle's Theorem - Wikipedia](https://en.wikipedia.org/wiki/Rolle%27s_theorem) - Comprehensive article on the theorem's history, proof, and applications

2. [AP Calculus Course Description - College Board](https://apcentral.collegeboard.org/courses/ap-calculus-ab) - Official AP Calculus curriculum including Mean Value Theorem unit

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this visualization
