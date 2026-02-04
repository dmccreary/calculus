---
title: Complete Curve Sketch
description: Interactive MicroSim demonstrating the complete curve sketching process, building graphs step-by-step with intercepts, asymptotes, extrema, and concavity.
quality_score: 85
image: /sims/complete-curve-sketch/complete-curve-sketch.png
og:image: /sims/complete-curve-sketch/complete-curve-sketch.png
twitter:image: /sims/complete-curve-sketch/complete-curve-sketch.png
social:
   cards: false
---

# Complete Curve Sketch

<iframe src="main.html" width="100%" height="552px" scrolling="no"></iframe>

[Run Complete Curve Sketch Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/complete-curve-sketch/main.html" width="100%" height="552px" scrolling="no"></iframe>
```

## Description

This MicroSim guides students through the complete curve sketching process by building a graph step-by-step. Instead of seeing the final curve all at once, students can click through each step of the analysis to see how the pieces combine:

1. **Draw axes and domain** - Start with the coordinate plane and identify domain restrictions
2. **Plot intercepts** - Mark x-intercepts (green dots) and y-intercepts with coordinates
3. **Vertical asymptotes** - Add red dashed lines showing where the function is undefined
4. **Horizontal asymptote** - Add blue dashed line showing end behavior
5. **Increasing/decreasing** - Add directional arrows showing where the curve rises or falls
6. **Local extrema** - Mark local maximum and minimum points (orange dots)
7. **Concavity regions** - Shade regions showing where curve is concave up or down
8. **Final smooth curve** - Connect all information into the complete graph

The color-coded features help students distinguish between different types of curve information:

- **Green dots**: Intercepts
- **Red dashed lines**: Vertical asymptotes
- **Blue dashed lines**: Horizontal asymptotes
- **Orange dots**: Local extrema
- **Purple shading**: Concave up regions
- **Cyan shading**: Concave down regions

### Functions Available

Three rational functions are available for exploration:

- **f(x) = x^2/(x^2-1)**: Has two vertical asymptotes and a horizontal asymptote at y=1
- **f(x) = x^3/(x^2+1)**: No vertical asymptotes, no horizontal asymptote (oblique behavior)
- **f(x) = (x-1)/(x^2-4)**: Two vertical asymptotes and horizontal asymptote at y=0

## How to Use

1. Click **Next Step** to progress through the curve sketching process
2. Click **Previous** to go back and review earlier steps
3. Click **Show All** to reveal the complete graph instantly
4. Click **Start Over** to reset and begin again
5. Select a different function using the buttons at the bottom

!!! quote "Delta Moment"
    "Each step adds another piece to the puzzle! By the time we connect the curve,
    we already know exactly what shape to expect. No surprises - just
    calculus doing its thing!"

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. Identify the correct sequence of steps in curve sketching
2. Connect domain restrictions to the appearance of vertical asymptotes
3. Use first derivative information to determine increasing/decreasing intervals
4. Use second derivative information to identify concavity
5. Synthesize multiple pieces of information into a complete curve sketch

### Target Audience

- AP Calculus AB/BC students
- College Calculus I students
- Students reviewing for calculus exams

### Prerequisites

- Understanding of limits and continuity
- Knowledge of derivatives (first and second)
- Familiarity with asymptotes (vertical and horizontal)
- Understanding of critical points and extrema

### Suggested Activities

**Activity 1: Predict Before Reveal (10 minutes)**

Before clicking "Next Step," have students predict:
- Where will the intercepts be?
- Where will the asymptotes appear?
- Will there be a local max or min?

**Activity 2: Compare Functions (15 minutes)**

1. Complete all steps for f(x) = x^2/(x^2-1)
2. Reset and select f(x) = (x-1)/(x^2-4)
3. Compare: How does moving the numerator's zero affect the intercepts?
4. Discuss: Why does one function have extrema while another doesn't?

**Activity 3: Sketch First, Check Second (20 minutes)**

1. Give students the formula f(x) = x^2/(x^2-1)
2. Have them complete the curve sketch on paper using calculus
3. Use the MicroSim to check their work step-by-step
4. Identify any steps where their analysis differed

### Assessment Ideas

1. **Exit Ticket**: List the 8 steps of curve sketching in order
2. **Quiz Question**: Given a new function, identify which steps would yield what information
3. **Practice Problem**: Sketch a curve by hand, then verify with the MicroSim

## References

1. [AP Calculus Course Description](https://apcentral.collegeboard.org/courses/ap-calculus-ab) - College Board's official curriculum guide including curve sketching objectives

2. [Curve Sketching - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/CurveSketch.aspx) - Comprehensive tutorial on the curve sketching process with worked examples

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used to create this MicroSim
