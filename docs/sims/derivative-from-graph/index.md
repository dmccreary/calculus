---
title: Derivative from Graph
description: Practice estimating derivatives by drawing tangent lines on curves and comparing your estimated slope to the actual derivative value.
image: /sims/derivative-from-graph/derivative-from-graph.png
og:image: /sims/derivative-from-graph/derivative-from-graph.png
twitter:image: /sims/derivative-from-graph/derivative-from-graph.png
quality_score: 85
social:
   cards: false
---

# Derivative from Graph

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Derivative from Graph MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Derivative from Graph MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This interactive exercise helps you develop your graphical intuition for derivatives. Instead of calculating derivatives algebraically, you will:

1. **See a curve** with a marked point P
2. **Draw a tangent line** by clicking and dragging through the point
3. **Check your answer** to see the actual tangent line and compare slopes
4. **Get feedback** on how close your estimate was

!!! quote "Delta Moment"
    "See that point P on the curve? That's me! I need to know my tilt
    right NOW at this exact spot. Help me figure out my slope by drawing
    a line that just kisses the curve at this point."

## How to Use

1. **Observe** the curve and the marked point P
2. **Click and drag** through or near point P to draw your estimated tangent line
3. **Click "Check Answer"** to reveal the actual tangent line (green dashed)
4. **Review your accuracy** in the results panel showing percent error
5. **Click "New Function"** to try a different curve
6. **Adjust difficulty** to challenge yourself:
   - **Easy**: Parabolas (quadratic functions)
   - **Medium**: Cubic functions
   - **Hard**: Trigonometric functions

## Iframe Embedding

Copy this iframe to embed the MicroSim in your website:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/derivative-from-graph/main.html" height="482px" width="100%" scrolling="no"></iframe>
```

## Learning Objectives

After using this MicroSim, students will be able to:

1. **Estimate** the slope of a tangent line visually at any point on a curve
2. **Recognize** that the derivative at a point equals the slope of the tangent line
3. **Distinguish** between tangent lines with positive, negative, and zero slopes
4. **Connect** the graphical representation of a derivative to its numerical value
5. **Improve accuracy** through practice and immediate feedback

## Lesson Plan

### Grade Level
High School (Grades 11-12) or Early College (Calculus I)

### Duration
15-20 minutes for basic exploration; 30+ minutes for comprehensive practice

### Prerequisites
- Understanding of slope (rise over run)
- Basic familiarity with the concept of a tangent line
- Introduction to the derivative as instantaneous rate of change

### Warm-Up Questions (5 minutes)
1. What is the slope of a horizontal line?
2. If you're skiing downhill, is your slope positive or negative?
3. At the very top of a hill, what do you think the slope is?

### Guided Exploration (10 minutes)

1. **Start with Easy mode**
   - Try 3-4 parabolas
   - Notice: Where is the tangent line flat (slope = 0)?
   - Notice: How does the slope change as you move along the curve?

2. **Key Discovery Questions**
   - At what point on y = x^2 is the slope equal to 0?
   - Is the slope positive or negative when x > 0? When x < 0?
   - How does the steepness change as you move away from the vertex?

3. **Progress to Medium and Hard**
   - Cubic functions have more interesting slope changes
   - Trig functions show periodic slope patterns

### Practice Activity (10-15 minutes)

**Challenge:** Try to get within 10% error on 5 consecutive problems at each difficulty level.

**Discussion Prompts:**
- Which types of functions are easiest to estimate? Why?
- At what kinds of points is estimation most challenging?
- How does practicing with visual estimation help you understand derivatives?

### Assessment Ideas

1. **Quick Check:** Without using the MicroSim, sketch a tangent line on a given curve at a marked point
2. **Exit Ticket:** Given a graph of f(x), estimate f'(2) by drawing and measuring
3. **Extension:** If f(x) = x^3, predict where the tangent line will be steepest

## Mathematical Background

The derivative of a function f at a point x = a is defined as:

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

Geometrically, this limit represents the **slope of the tangent line** to the curve at the point (a, f(a)).

### Functions Used in This MicroSim

| Difficulty | Function | Derivative |
|------------|----------|------------|
| Easy | f(x) = x^2 | f'(x) = 2x |
| Easy | f(x) = -x^2 + 4 | f'(x) = -2x |
| Medium | f(x) = x^3/3 | f'(x) = x^2 |
| Medium | f(x) = x^3 - x | f'(x) = 3x^2 - 1 |
| Hard | f(x) = 2sin(x) | f'(x) = 2cos(x) |
| Hard | f(x) = cos(x) + x | f'(x) = -sin(x) + 1 |

## Tips for Accuracy

1. **Position carefully:** Your line should pass through point P
2. **Use the grid:** Count grid squares to estimate rise/run
3. **Think about curvature:** The tangent barely touches the curve
4. **Check sign:** Make sure your line slopes in the right direction
5. **Zero slopes:** Horizontal tangents occur at peaks and valleys

## References

1. [Tangent Line - Wikipedia](https://en.wikipedia.org/wiki/Tangent) - Comprehensive overview of tangent lines in mathematics
2. [Derivative - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-2/v/calculus-derivatives-1) - Video introduction to derivatives
3. [Visual Calculus - David Tall](https://www.researchgate.net/publication/255611528_Visual_Calculus) - Research on visual approaches to teaching calculus
4. [AP Calculus AB Course Description - College Board](https://apcentral.collegeboard.org/courses/ap-calculus-ab) - Official AP Calculus curriculum guidelines
