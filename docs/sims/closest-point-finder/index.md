---
title: Closest Point Finder
description: An interactive MicroSim that finds the minimum distance from a draggable target point to various curves, demonstrating that at the closest point, the connecting line is perpendicular to the tangent.
quality_score: 92
image: /sims/closest-point-finder/closest-point-finder.png
og:image: /sims/closest-point-finder/closest-point-finder.png
twitter:image: /sims/closest-point-finder/closest-point-finder.png
social:
   cards: false
---
# Closest Point Finder

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Closest Point Finder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Closest Point Finder MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This interactive visualization helps students explore **optimization problems** involving finding the minimum distance from a fixed point to a curve. This is a classic calculus application that connects derivatives, perpendicularity, and optimization.

### Key Concepts Demonstrated

1. **Distance Function**: As you move along a curve, the distance to a fixed target point varies continuously
2. **Minimum Distance Condition**: At the closest point, the line connecting the curve point to the target is **perpendicular** to the tangent line
3. **Why Perpendicularity?**: The derivative of distance equals zero when the connecting line is perpendicular to the curve's direction of travel

### How to Use

1. **Drag the red target point** anywhere on the coordinate plane
2. **Use the slider** to move a point along the selected curve
3. **Click "Find Minimum"** to automatically locate the closest point
4. **Toggle "Show Perp"** to see the perpendicularity verification (purple tangent line + slope calculations)
5. **Select different curves** to explore various optimization scenarios

### Available Curves

- **y = x^2** (Parabola) - The classic example
- **y = x^3** (Cubic) - Asymmetric curve with inflection point
- **x^2 + y^2 = 4** (Circle) - Parametric curve where closest point is along the radius
- **y = sin(x)** (Sine wave) - Periodic curve with multiple local minima

### The Distance Trace Panel

The small graph in the lower right shows how distance varies as you move along the curve. Notice:
- The minimum appears as the lowest point on this trace
- Multiple local minima may exist for some curves and target positions
- The green dot shows your current position; orange shows the minimum

## Iframe Embed Code

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/closest-point-finder/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Compare** distances from various points on a curve to a fixed target point
2. **Explain** why the minimum distance occurs when the connecting line is perpendicular to the tangent
3. **Connect** the perpendicularity condition to the derivative being zero
4. **Apply** this concept to solve optimization problems involving distance minimization

### Suggested Activities

#### Activity 1: Exploration (10 minutes)
1. Place the target point at (1, 3)
2. Use the parabola y = x^2
3. Manually slide along the curve and observe the distance values
4. Predict where the minimum will be, then click "Find Minimum"
5. Enable "Show Perp" and verify the perpendicularity

#### Activity 2: Circle Investigation (5 minutes)
1. Switch to the circle x^2 + y^2 = 4
2. Place the target at (3, 0) - outside the circle
3. Find the minimum distance
4. Observe: the closest point lies on the line from center to target
5. Discuss: why does this make geometric sense?

#### Activity 3: Multiple Minima (10 minutes)
1. Use y = sin(x)
2. Place the target at (0, 2)
3. Observe the distance trace - multiple valleys indicate local minima
4. Move the target and observe how the trace changes
5. Discuss: when does a global minimum become a local minimum?

### Assessment Questions

1. Why is the connecting line perpendicular to the tangent at the minimum distance point?
2. For the parabola y = x^2 with target point (0, a) where a > 0, describe how the minimum distance point changes as 'a' increases.
3. Can you think of a real-world scenario where finding the closest point on a curve is important?

### Mathematical Background

At the minimum distance point, if we parameterize the curve as (x(t), y(t)), the distance function is:

$$D(t) = \sqrt{(x(t) - x_0)^2 + (y(t) - y_0)^2}$$

where (x_0, y_0) is the target point. Setting D'(t) = 0 leads to:

$$(x(t) - x_0) \cdot x'(t) + (y(t) - y_0) \cdot y'(t) = 0$$

This equation states that the vector from the curve point to the target is perpendicular to the tangent vector (x'(t), y'(t)).

## References

- [Khan Academy: Optimization Problems](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-11/v/optimization-problem-walking-to-minimize-travel-time)
- [Paul's Online Math Notes: Optimization](https://tutorial.math.lamar.edu/Classes/CalcI/Optimization.aspx)
