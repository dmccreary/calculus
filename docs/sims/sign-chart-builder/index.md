---
title: Sign Chart Builder
description: Construct sign charts for derivatives to determine intervals of increase and decrease by placing critical points and evaluating derivative signs in each interval.
image: /sims/sign-chart-builder/sign-chart-builder.png
og:image: /sims/sign-chart-builder/sign-chart-builder.png
twitter:image: /sims/sign-chart-builder/sign-chart-builder.png
quality_score: 85
social:
   cards: false
---

# Sign Chart Builder

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run the Sign Chart Builder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Sign Chart Builder MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

Sign charts are one of the most powerful tools in calculus for understanding function behavior. This interactive MicroSim lets you practice building sign charts for derivatives, helping you identify where functions increase and decrease.

!!! quote "Delta Moment"
    "Building a sign chart is like making a map of my journey! First I find the
    spots where I'm perfectly level (critical points), then I figure out which
    direction I'm tilted in each section. Plus signs mean I'm climbing, minus
    signs mean I'm descending. With this map, I know exactly what the landscape
    looks like before I even start rolling!"

## How to Use

1. **Choose a function** by clicking f1, f2, f3, f4, or f5 in the control area
2. **Place critical points** by double-clicking on the number line where you think f'(x) = 0
3. **Determine signs** by clicking on each interval to cycle through +, -, or blank
4. **Add test points** (optional) by right-clicking in an interval to see the actual derivative value
5. **Check your work** by clicking "Check My Work" to see the correct answer
6. **Toggle the graph** to show or hide the function curve with color-coded regions

### Visual Feedback

- **Green regions**: Where the derivative is positive (function increasing)
- **Red regions**: Where the derivative is negative (function decreasing)
- **Yellow dots**: Critical points on the graph where the derivative equals zero
- **Arrows**: Test point indicators showing whether f'(x) is positive or negative

## Iframe Embedding

Copy this iframe to embed the MicroSim in your website:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/sign-chart-builder/main.html" height="582px" width="100%" scrolling="no"></iframe>
```

## Learning Objectives

After using this MicroSim, students will be able to:

1. **Identify** critical points of a function where f'(x) = 0
2. **Construct** a sign chart showing the sign of f'(x) in each interval
3. **Determine** intervals where a function is increasing (f'(x) > 0) or decreasing (f'(x) < 0)
4. **Connect** the sign chart to the graphical behavior of the original function
5. **Verify** sign determinations using test point evaluation

## Mathematical Background

A **sign chart** for f'(x) organizes information about where a function increases and decreases:

1. **Find critical points**: Solve f'(x) = 0 to find x-values where the derivative is zero
2. **Divide the domain**: Critical points split the number line into intervals
3. **Test each interval**: Choose a test point in each interval and evaluate f'(x)
4. **Determine behavior**:
   - If f'(x) > 0 on an interval, f is **increasing** on that interval
   - If f'(x) < 0 on an interval, f is **decreasing** on that interval

### Example: f(x) = x^3 - 3x

**Step 1**: Find f'(x) = 3x^2 - 3

**Step 2**: Solve f'(x) = 0:
$$3x^2 - 3 = 0 \Rightarrow x^2 = 1 \Rightarrow x = \pm 1$$

**Step 3**: Create sign chart with critical points at x = -1 and x = 1

| Interval | Test Point | f'(test) | Sign | Behavior |
|----------|------------|----------|------|----------|
| (-oo, -1) | x = -2 | 3(4) - 3 = 9 | + | Increasing |
| (-1, 1) | x = 0 | 3(0) - 3 = -3 | - | Decreasing |
| (1, +oo) | x = 2 | 3(4) - 3 = 9 | + | Increasing |

**Conclusion**: f increases on (-oo, -1), decreases on (-1, 1), and increases on (1, +oo).

## Functions in This MicroSim

| Button | Function | Derivative | Critical Points |
|--------|----------|------------|-----------------|
| f1 | f(x) = x^3 - 3x | f'(x) = 3x^2 - 3 | x = -1, 1 |
| f2 | f(x) = x^2 - 4 | f'(x) = 2x | x = 0 |
| f3 | f(x) = x^3 - 12x | f'(x) = 3x^2 - 12 | x = -2, 2 |
| f4 | f(x) = x^4 - 8x^2 | f'(x) = 4x^3 - 16x | x = -2, 0, 2 |
| f5 | f(x) = -x^2 + 2x + 3 | f'(x) = -2x + 2 | x = 1 |

## Lesson Plan

### Grade Level
High School (Grades 11-12) or Early College (Calculus I)

### Duration
20-30 minutes for complete exploration

### Prerequisites
- Understanding of derivatives and their meaning
- Knowledge that derivatives indicate slope/rate of change
- Familiarity with solving equations for zeros

### Warm-Up Questions (5 minutes)
1. If a car's velocity is positive, what direction is it moving?
2. At the very top of a roller coaster hill, what is the derivative of the position function?
3. If f'(x) > 0 for all x in an interval, what can you say about f on that interval?

### Guided Exploration (15 minutes)

**Part 1: Understanding the Connection**
1. Start with f1 (x^3 - 3x) and keep the graph visible
2. Ask: "Looking at the graph, where does the function appear to have horizontal tangent lines?"
3. Place critical points at those locations
4. Verify by checking your work

**Part 2: Determining Signs**
1. Reset and work with f2 (x^2 - 4) which has only one critical point
2. Place the critical point at x = 0
3. Ask: "For x < 0, is the parabola going up or down as we move right?"
4. Click the left interval to set the appropriate sign
5. Repeat for the right interval
6. Check your work and observe the color coding

**Part 3: More Complex Functions**
1. Try f4 (x^4 - 8x^2) which has three critical points
2. Hide the graph for an extra challenge
3. Place all three critical points
4. Use test points (right-click) to help determine signs
5. Reveal graph to verify

### Discussion Questions
- Why do we only need ONE test point per interval?
- Can a function be increasing on two separate intervals?
- What happens at critical points that are NOT local maxima or minima?

### Assessment Ideas

1. **Quick Check**: Given f(x) = x^3 - 6x^2 + 9x, create a sign chart without using the MicroSim
2. **Conceptual**: Draw a function whose sign chart looks like: + | - | - | +
3. **Extension**: Explain why f(x) = x^3 has a critical point at x = 0 but neither a max nor min there

## Connection to AP Calculus

Sign charts are essential for:
- **Finding local extrema** (First Derivative Test)
- **Analyzing function behavior** without graphing technology
- **Justifying answers** on free-response questions
- **Understanding the relationship** between f, f', and f''

On the AP Exam, you must often justify your answers by citing the sign of the derivative on specific intervals.

## Tips for Success

1. **Find ALL critical points** before determining signs
2. **Test points should be easy numbers** - choose integers when possible
3. **Remember**: f'(x) = 0 means the tangent line is horizontal at that point
4. **The sign in an interval is consistent** - if positive anywhere, positive everywhere in that interval
5. **Check your reasoning**: increasing means going UP as x increases (left to right)

## References

1. [First Derivative Test - Wikipedia](https://en.wikipedia.org/wiki/Derivative_test) - Overview of using derivatives to find extrema
2. [Increasing and Decreasing Functions - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-3/v/increasing-decreasing-intervals) - Video explanation of interval analysis
3. [AP Calculus AB Course Description - College Board](https://apcentral.collegeboard.org/courses/ap-calculus-ab) - Official AP Calculus curriculum
4. [Sign Charts - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/ShapeofGraphPtI.aspx) - Detailed explanation with examples
