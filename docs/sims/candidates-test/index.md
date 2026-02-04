---
title: Candidates Test Calculator
description: An interactive step-by-step guide through the closed interval method for finding global extrema on closed intervals.
quality_score: 90
image: /sims/candidates-test/candidates-test.png
og:image: /sims/candidates-test/candidates-test.png
twitter:image: /sims/candidates-test/candidates-test.png
social:
   cards: false
---
# Candidates Test Calculator

<iframe src="main.html" height="592px" scrolling="no"></iframe>

[Run the Candidates Test Calculator Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Candidates Test MicroSim with the p5.js editor](https://editor.p5js.org/)

## Embedding

Place the following line in your website to include this in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/candidates-test/main.html" height="592px" scrolling="no"></iframe>
```

## Description

The Candidates Test Calculator is an interactive MicroSim that guides students through the **closed interval method** (also called the candidates test) for finding global (absolute) extrema on a closed interval [a, b].

This step-by-step visualization helps students understand that to find the global maximum and minimum values of a continuous function on a closed interval, we must:

1. **Find the endpoints** of the interval
2. **Find all critical points** where f'(x) = 0 (or is undefined) within the interval
3. **Evaluate the function** at each candidate point
4. **Compare the values** to identify the largest (global max) and smallest (global min)

### Visual Elements

- **Function graph** showing the curve on the closed interval with vertical dashed lines marking the endpoints
- **Critical points** marked in orange
- **Endpoints** marked in blue
- **Horizontal dashed lines** indicating the global max and min values
- **Animated circles** highlighting the winning candidates
- **Progressive table** showing all candidate points with their function values
- **Stars** on the table rows for global extrema

### Interactive Controls

- **Function selector**: Choose from Cubic, Quadratic, Quartic, or Sine functions
- **Interval controls**: Adjust the endpoints a and b with +/- buttons
- **Next Step**: Reveal one step at a time for guided learning
- **Show All**: Reveal the complete solution immediately
- **Reset**: Start over with the current function
- **Show f'(x)**: Toggle the derivative curve to see why critical points occur where f'(x) = 0

!!! quote "Delta Moment"
    "Finding the highest peak and deepest valley on my path? I need to check everywhere
    I stop moving (critical points) AND the start and end of my journey (endpoints).
    It's like a treasure hunt with a checklist!"

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. **Apply** the closed interval method to find global extrema on [a, b]
2. **Identify** all candidate points (endpoints and critical points)
3. **Evaluate** a function at candidate points
4. **Compare** function values to determine global max and min
5. **Explain** why both endpoints and critical points must be checked

### Pre-requisites

- Understanding of derivatives
- Ability to find critical points by setting f'(x) = 0
- Knowledge of local vs. global extrema

### Warm-up Activity (5 minutes)

Ask students: "If you're hiking on a trail that starts at point A and ends at point B, where might you find the highest point of your hike?" Lead them to realize it could be at the start, the end, or somewhere in between where the trail levels off.

### Guided Exploration (15 minutes)

1. **Start with the Cubic function** f(x) = x^3 - 3x on [-2, 2]
2. Click **Next Step** to reveal each step one at a time
3. At each step, ask students to predict what comes next
4. **Toggle Show f'(x)** to see the derivative curve and observe that critical points occur where f'(x) crosses zero
5. Discuss why the algorithm works: continuous functions on closed intervals always achieve their max and min (Extreme Value Theorem)

### Independent Practice (10 minutes)

Have students:

1. Select the **Quadratic** function and adjust the interval
2. Predict the global max and min before clicking through steps
3. Use the **Show All** button to check their answers
4. Repeat with **Quartic** and **Sine** functions

### Discussion Questions

1. What happens when a critical point falls outside the interval?
2. Can the global max and global min occur at the same point?
3. How does the Extreme Value Theorem guarantee we'll always find extrema on closed intervals?
4. Why don't we check inflection points in this method?

### Assessment

Present students with a new function not in the MicroSim and have them:

1. List all candidate points on a given interval
2. Evaluate the function at each candidate
3. Identify the global maximum and minimum
4. Verify their answer using the MicroSim

### Extensions

- What happens for functions with multiple critical points in the interval?
- How would you modify this method for open intervals?
- What if the function is not continuous on the interval?

## References

- [Extreme Value Theorem - Wikipedia](https://en.wikipedia.org/wiki/Extreme_value_theorem)
- [Finding Absolute Extrema - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/AbsExtrema.aspx)
- [AP Calculus AB Course Description - College Board](https://apcentral.collegeboard.org/courses/ap-calculus-ab)
