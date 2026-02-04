---
title: Curve Analysis Dashboard
description: Complete interactive visualization showing how to fully analyze a function using derivatives, including critical points, inflection points, concavity, and increasing/decreasing intervals.
quality_score: 90
image: /sims/curve-analysis-dashboard/curve-analysis-dashboard.png
og:image: /sims/curve-analysis-dashboard/curve-analysis-dashboard.png
twitter:image: /sims/curve-analysis-dashboard/curve-analysis-dashboard.png
social:
   cards: false
---
# Curve Analysis Dashboard

<iframe src="main.html" width="100%" height="682px" scrolling="no"></iframe>

[Run Curve Analysis Dashboard Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

Place the following line in your website to include this MicroSim:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/curve-analysis-dashboard/main.html" width="100%" height="682px" scrolling="no"></iframe>
```

## Description

The **Curve Analysis Dashboard** is a comprehensive interactive tool that synthesizes all derivative-based analysis techniques to fully describe a function's behavior. This MicroSim brings together concepts from an entire calculus unit into one unified visualization.

### What This MicroSim Shows

The dashboard displays four coordinated panels:

1. **Main Graph (Top)**: The original function f(x) with:
   - Color-coded shading showing increasing (green) and decreasing (red) regions
   - Curve style indicating concavity: solid line for concave up, dashed for concave down
   - Critical points marked with circles (filled for local max/min, open for neither)
   - Inflection points marked with purple diamonds

2. **First Derivative Panel (Left)**: Graph of f'(x) with:
   - Zero crossings highlighted (corresponding to critical points)
   - Sign chart showing + and - regions
   - Synchronized vertical line showing current x position

3. **Second Derivative Panel (Right)**: Graph of f''(x) with:
   - Zero crossings highlighted (corresponding to inflection points)
   - Sign chart showing concavity regions
   - Synchronized vertical line

4. **Summary Table (Bottom)**: Dynamic analysis showing:
   - Current values of f(x), f'(x), and f''(x)
   - Behavior at current point (increasing/decreasing, concave up/down)
   - List of all critical and inflection points with classifications

### Interactive Features

- **Function Selection**: Choose from three preset functions of varying complexity
- **Toggle Checkboxes**: Show/hide critical points, inflection points, concavity shading, and derivative graphs
- **Step-Through Mode**: Reveals analysis features one at a time, guiding students through the complete analysis process
- **Interactive Exploration**: Drag on the main graph or use the slider to explore how f, f', and f'' relate at any x-value
- **Hover Information**: Move your mouse over the main graph to see detailed values at any point

### Color Coding Legend

| Visual Element | Meaning |
|----------------|---------|
| Green shading | Function is increasing (f'(x) > 0) |
| Red shading | Function is decreasing (f'(x) < 0) |
| Solid blue curve | Concave up (f''(x) > 0) |
| Dashed orange curve | Concave down (f''(x) < 0) |
| Green filled circle | Local minimum |
| Red filled circle | Local maximum |
| Open circle | Critical point that's neither max nor min |
| Purple diamond | Inflection point |

!!! quote "Delta Moment"
    "This is where everything clicks! My tilt (the derivative) AND how my tilt is changing (the second derivative) together tell the complete story of every curve I explore. It's like having a full GPS readout for mathematical terrain!"

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Identify** critical points by finding where f'(x) = 0 or is undefined
2. **Classify** critical points as local maxima, minima, or neither using the second derivative test
3. **Locate** inflection points where f''(x) = 0 and concavity changes
4. **Describe** intervals of increase/decrease based on the sign of f'(x)
5. **Describe** intervals of concavity based on the sign of f''(x)
6. **Synthesize** all information into a complete curve sketch

### Prerequisites

- Understanding of derivatives and their interpretation as slope
- Ability to find critical points (setting f'(x) = 0)
- Understanding of concavity and inflection points
- Second derivative test for classifying extrema

### Suggested Activities

#### Activity 1: Step-Through Discovery (15 minutes)
1. Select the function f(x) = x^4 - 4x^3 + 10
2. Turn on Step Mode
3. Progress through each step, discussing what each reveals
4. At each step, have students predict what they'll see before clicking Next

#### Activity 2: Prediction Practice (20 minutes)
1. Hide all overlays (uncheck all boxes)
2. For a selected function, have students:
   - Predict where critical points occur
   - Predict where inflection points occur
   - Sketch the sign charts for f'(x) and f''(x)
3. Reveal each feature to check predictions

#### Activity 3: Comparative Analysis (15 minutes)
1. Compare the three preset functions
2. For each, answer:
   - How many critical points? What type?
   - How many inflection points?
   - What's the relationship between the number of zeros of f'(x) and critical points?

#### Activity 4: The Big Picture Connection (10 minutes)
1. Focus on one function
2. Move the x slider slowly across the domain
3. Observe how:
   - f'(x) crossing zero corresponds to horizontal tangents on f(x)
   - f''(x) crossing zero corresponds to curve shape changes
   - The three graphs "tell the same story" in different ways

### Assessment Questions

1. At a local maximum, what must be true about f'(x) and f''(x)?
2. If f''(x) > 0 on an interval, what does this tell us about f(x) on that interval?
3. Can a function have an inflection point where f''(x) does not equal zero? Explain.
4. How do you distinguish between a local maximum and a global maximum using this dashboard?

### Extensions

- **Challenge**: Sketch a function given only its sign charts for f'(x) and f''(x)
- **Research**: Investigate the difference between inflection points where f''(x) = 0 versus where f''(x) is undefined
- **Connection**: Relate concavity to the economic concept of "diminishing returns"

## Technical Notes

- **Canvas dimensions**: 800 x 680 pixels (responsive width, minimum 600px)
- **Control region**: 100 pixels
- **Library**: p5.js 1.11.10
- **All controls are canvas-based** (no DOM elements) for iframe compatibility

## References

1. [Stewart Calculus - Applications of Differentiation](https://www.stewartcalculus.com/) - Standard reference for curve sketching techniques
2. [Khan Academy - Analyzing Functions](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new) - Video lessons on using derivatives to analyze function behavior
3. [Paul's Online Math Notes - Shape of a Graph](https://tutorial.math.lamar.edu/Classes/CalcI/ShapeofGraphPtI.aspx) - Comprehensive guide to curve analysis
