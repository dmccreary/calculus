---
title: Fencing Problem Optimizer
description: An interactive MicroSim for visualizing and solving the classic fencing optimization problem where students maximize the area of a rectangular field bounded by a river on one side.
image: /sims/fencing-optimizer/fencing-optimizer.png
og:image: /sims/fencing-optimizer/fencing-optimizer.png
twitter:image: /sims/fencing-optimizer/fencing-optimizer.png
quality_score: 85
social:
   cards: false
---

# Fencing Problem Optimizer

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Fencing Problem Optimizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the Fencing Problem Optimizer MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim helps students visualize and solve one of the most classic optimization problems in calculus: maximizing the area of a rectangular field when one side borders a river (requiring no fence).

### The Problem

A farmer has a fixed amount of fencing material and wants to enclose a rectangular field along a straight river. The river forms one side of the rectangle, so no fence is needed there. What dimensions maximize the enclosed area?

### Mathematical Setup

Given:
- Total fencing available: F meters
- x = length of side parallel to river
- y = length of each side perpendicular to river

Constraint: x + 2y = F (three sides need fencing)

Objective: Maximize A = xy

### Solution Using Calculus

1. Express y in terms of x: y = (F - x)/2
2. Substitute into area formula: A(x) = x(F - x)/2 = (F/2)x - x^2/2
3. Find critical point: A'(x) = F/2 - x = 0, so x = F/2
4. Optimal dimensions: x* = F/2, y* = F/4
5. Maximum area: A_max = F^2/8

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/fencing-optimizer/main.html" height="552px" scrolling="no"></iframe>
```

## Features

- **Bird's Eye View**: See the rectangular field with the river at the top and three fenced sides
- **Area Graph**: Watch how A(x) changes as you adjust the x dimension
- **Real-time Calculations**: See x, y, area, and fencing used update instantly
- **Explore Mode**: Freely experiment with different dimensions
- **Solve Mode**: See the calculus solution with all work shown
- **Adjustable Constraint**: Change the total fencing amount to see how it affects the optimal solution

!!! quote "Delta Moment"
    "See how the area curve has exactly one peak? That's where I'd stop if I were
    rolling along this function. Zero slope means I'm perfectly level - and that's
    the sweet spot for maximum area!"

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Set up an optimization problem from a word description
2. Use constraint equations to reduce the problem to one variable
3. Find critical points by setting the derivative equal to zero
4. Verify that a critical point is a maximum using the second derivative test
5. Connect the visual representation to the algebraic solution

### Warm-Up Activity (5 minutes)

1. Open the MicroSim in Explore Mode
2. Drag the slider to find the maximum area by trial and error
3. Record your best guess for the optimal x value

### Guided Exploration (15 minutes)

1. **Understand the Constraint**
   - Why is the fencing equation x + 2y = F?
   - What happens when x = 0? When x = F/2?

2. **Observe the Graph**
   - What shape is the A(x) curve? (parabola opening downward)
   - Where does the maximum occur?
   - Why does the area become 0 at x = 0 and x = F/2?

3. **Connect to Calculus**
   - Click "Show Solution" or switch to Solve Mode
   - Follow the steps of the calculus solution
   - Verify: x* = F/2 gives y* = F/4 (the optimal y is half of optimal x)

### Practice Problems

1. **Basic**: If you have 100 meters of fencing, what are the optimal dimensions?
2. **Extension**: If you have 600 meters of fencing, what is the maximum possible area?
3. **Challenge**: Why is the optimal x always twice the optimal y for this problem?

### Assessment Questions

1. What is the relationship between x* and y* for this problem? Why?
2. How does changing the total fencing affect the shape of the area curve?
3. If the farmer wanted to maximize the perimeter of the three fenced sides instead, what would change?

## References

- Stewart, J. (2015). *Calculus: Early Transcendentals* (8th ed.). Cengage Learning.
- [Khan Academy: Optimization Problems](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-contextual-applications-new/ab-5-11/v/minimizing-sum-of-squares)
- [Paul's Online Math Notes: Optimization](https://tutorial.math.lamar.edu/Classes/CalcI/Optimization.aspx)
