---
title: Intermediate Value Theorem Visualization
description: Interactive visualization demonstrating the Intermediate Value Theorem with Delta robot traveling along continuous functions to show guaranteed existence of roots.
quality_score: 90
image: /sims/ivt-visualization/ivt-visualization.png
og:image: /sims/ivt-visualization/ivt-visualization.png
twitter:image: /sims/ivt-visualization/ivt-visualization.png
social:
   cards: false
---
# Intermediate Value Theorem Visualization

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run the IVT Visualization Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive visualization helps you understand the **Intermediate Value Theorem (IVT)**, one of the most important theorems in calculus. The theorem states:

> If f is continuous on the closed interval [a, b] and N is any number between f(a) and f(b), then there exists at least one number c in (a, b) such that f(c) = N.

In plain language: if you have a continuous function and you pick any y-value between the two endpoint values, the function MUST cross that y-value somewhere in between.

!!! quote "Delta Moment"
    "Think of it like this: if I'm traveling along a smooth curve from one altitude to another, I HAVE to pass through every altitude in between. There's no teleporting allowed on continuous functions!"

## How to Use

1. **Step Forward**: Click to progress through the stages of the IVT demonstration
2. **Select a Function**: Choose from several continuous functions to explore
3. **Adjust Endpoints**: Use the a and b sliders to set the interval
4. **Set Target Value N**: The pink dashed line shows your target value
5. **Watch Delta Travel**: In stage 3, Delta robot travels along the curve and highlights where it crosses N
6. **Show All Solutions**: Toggle to reveal all points where f(c) = N

## Stages

| Stage | What You See |
|-------|--------------|
| 1 | Endpoint values f(a) and f(b) highlighted |
| 2 | Target value N displayed as horizontal line |
| 3 | Delta animates along the curve, crossing N |
| 4 | Solution point c where f(c) = N is displayed |

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/ivt-visualization/main.html" height="522px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. **Explain** the Intermediate Value Theorem in their own words
2. **Identify** the conditions required for IVT to apply (continuity on a closed interval)
3. **Predict** when IVT guarantees the existence of a root
4. **Apply** IVT to verify that equations have solutions in given intervals

### Prerequisite Knowledge

- Understanding of continuous functions
- Familiarity with function notation f(x)
- Basic graphing skills

### Guided Exploration (15 minutes)

**Activity 1: Discovering IVT**

1. Select the function f(x) = x^2 - 2
2. Set a = 0 and b = 2
3. Step through all stages and observe f(0) = -2 and f(2) = 2
4. Notice that N = 0 (the x-axis) is between -2 and 2
5. Watch Delta travel and find where the function crosses y = 0

**Discussion Questions:**

- Why must the function cross y = 0 somewhere between x = 0 and x = 2?
- What would happen if the function had a jump discontinuity?
- Can you find the exact value of c where f(c) = 0? (Hint: it's the square root of 2!)

**Activity 2: Multiple Solutions**

1. Select f(x) = sin(x)
2. Set a = 0 and b = 4
3. Set N = 0.5
4. Step through and enable "Show All Solutions"
5. Count how many times the function crosses N

**Key Insight:** IVT guarantees AT LEAST one solution exists, but there may be more!

### Assessment Questions

1. **Conceptual:** Why is continuity essential for IVT? Give an example of a discontinuous function where IVT would fail.

2. **Application:** Use IVT to prove that x^3 + x - 1 = 0 has a solution between 0 and 1.

3. **Analysis:** If f(1) = 3 and f(5) = 3, does IVT guarantee f(c) = 0 for some c in [1, 5]? Explain.

### Common Misconceptions

- **Misconception:** IVT tells us exactly where the solution is
- **Reality:** IVT only guarantees existence, not location

- **Misconception:** The solution must be unique
- **Reality:** There may be multiple solutions; IVT guarantees at least one

### Extension Activities

1. **Root Finding:** Research the bisection method, which uses IVT repeatedly to narrow down root locations

2. **Real-World Application:** Temperature must pass through every value between morning low and afternoon high (assuming continuous change)

3. **Counterexamples:** Draw a discontinuous function where an intermediate value is never achieved

## References

- [IVT on Wikipedia](https://en.wikipedia.org/wiki/Intermediate_value_theorem)
- [Paul's Online Math Notes - IVT](https://tutorial.math.lamar.edu/Classes/CalcI/Continuity.aspx)
- AP Calculus AB/BC Curriculum Framework - Limits and Continuity
