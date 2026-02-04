---
title: Three Connected Graphs Explorer
description: Interactive visualization showing f(x), f'(x), and f''(x) simultaneously with synchronized cursor to examine relationships between a function and its derivatives.
quality_score: 85
image: /sims/three-graphs-explorer/three-graphs-explorer.png
og:image: /sims/three-graphs-explorer/three-graphs-explorer.png
twitter:image: /sims/three-graphs-explorer/three-graphs-explorer.png
social:
   cards: false
---

# Three Connected Graphs Explorer

<iframe src="main.html" width="100%" height="662px" scrolling="no"></iframe>

[Run Three Graphs Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/three-graphs-explorer/main.html" width="100%" height="662px" scrolling="no"></iframe>
```

## Description

This MicroSim displays three vertically stacked coordinate planes showing a function f(x), its first derivative f'(x), and its second derivative f''(x). A synchronized vertical cursor line appears on all three graphs, allowing students to examine how values at a single x-coordinate relate across all three functions.

### Key Features

**Visual Elements:**

- Three panels showing f(x), f'(x), and f''(x) with color-coded curves (blue, green, purple)
- Synchronized vertical cursor line that spans all three graphs
- Green shading indicates where f is increasing (f' > 0)
- Red shading indicates where f is decreasing (f' < 0)
- Blue dots mark local extrema (maxima and minima) on f(x), corresponding to zeros of f'(x)
- Purple diamond markers show inflection points on f(x), corresponding to zeros of f''(x) where sign changes occur
- Orange tangent line on f(x) showing the current slope

**Interactive Controls:**

- Draggable x-position slider to move the cursor across all graphs
- Click and drag directly on any graph panel to explore
- Function selector with four pre-built examples:
  - **Cubic:** f(x) = x^3 - 3x
  - **Quartic:** f(x) = x^4 - 4x^2
  - **Sine:** f(x) = sin(x)
  - **Rational:** f(x) = x/(x^2+1)
- Checkboxes to toggle visibility of each graph
- "Animate Cursor" button to automatically sweep through x-values

**Information Panel:**

- Displays current x-value and corresponding values of f(x), f'(x), and f''(x)
- Provides contextual insights such as:
  - "f' = 0: Horizontal tangent!" when at a critical point
  - "f'' = 0: Inflection point!" when at an inflection point
  - "f' > 0: f increasing" or "f' < 0: f decreasing" for general points

### How to Use

1. **Select a function** using the buttons at the bottom to explore different curve shapes
2. **Drag the slider** or click on any graph panel to move the vertical cursor
3. **Watch the information panel** to see how f, f', and f'' values change together
4. **Look for patterns:** When f'(x) crosses zero, f(x) has a horizontal tangent (potential max/min). When f''(x) crosses zero with a sign change, f(x) has an inflection point.
5. **Use the checkboxes** to hide/show specific graphs and focus on particular relationships
6. **Click "Animate Cursor"** to watch the cursor sweep through values automatically

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Examine** how zeros of f'(x) correspond to horizontal tangents and potential extrema on f(x)
2. **Analyze** the relationship between the sign of f'(x) and whether f(x) is increasing or decreasing
3. **Connect** zeros of f''(x) (with sign changes) to inflection points on f(x)
4. **Interpret** concavity by observing the sign of f''(x) and the behavior of f'(x)

### Target Audience

- AP Calculus AB/BC students
- College Calculus I students
- Prerequisites: Understanding of derivatives as rates of change and slopes of tangent lines

### Suggested Activities

**Activity 1: Discovering Critical Points (10 minutes)**

1. Select the Cubic function f(x) = x^3 - 3x
2. Slowly drag the cursor from left to right
3. Find the two points where f'(x) = 0 (the green curve crosses the x-axis)
4. At these points, what do you notice about the tangent line on f(x)?
5. Which is a local maximum? Which is a local minimum? How does f''(x) help you determine this?

**Activity 2: Inflection Point Investigation (10 minutes)**

1. Keep the Cubic function selected
2. Find the point where f''(x) = 0 (the purple curve crosses the x-axis)
3. At this x-value, what happens to the concavity of f(x)?
4. Observe the f'(x) graph at this point. What is special about f'(x) here?
5. Repeat with the Quartic function - how many inflection points does it have?

**Activity 3: Comparing Functions (15 minutes)**

1. Work through each of the four functions
2. Create a table recording:
   - Number of critical points
   - Number of inflection points
   - Intervals where f is increasing
   - Intervals where f is concave up
3. Discuss: What determines the number of critical points and inflection points a function can have?

### Assessment Questions

1. When f'(x) > 0, what can you conclude about f(x)?
2. If f''(x) changes from positive to negative at x = a, what happens to f(x) at that point?
3. Can f(x) have a local maximum where f''(x) > 0? Explain.
4. The rational function f(x) = x/(x^2+1) has exactly one critical point. Why doesn't it have a local minimum or maximum in the traditional sense?

## References

1. [Wikipedia: Derivative](https://en.wikipedia.org/wiki/Derivative) - Comprehensive overview of derivatives and their geometric interpretation as slopes of tangent lines.

2. [Wikipedia: Second Derivative](https://en.wikipedia.org/wiki/Second_derivative) - Explains the second derivative, concavity, and inflection points.

3. [Wikipedia: Critical Point (Mathematics)](https://en.wikipedia.org/wiki/Critical_point_(mathematics)) - Definition and significance of critical points in calculus.

4. [Wikipedia: Inflection Point](https://en.wikipedia.org/wiki/Inflection_point) - Detailed explanation of inflection points and their relationship to the second derivative.

5. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used to create this interactive visualization.
