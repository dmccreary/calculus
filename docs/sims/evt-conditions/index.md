---
title: EVT Conditions Explorer
description: Interactive visualization showing why the Extreme Value Theorem requires both continuity and a closed interval, with counterexamples demonstrating failure modes.
quality_score: 85
image: /sims/evt-conditions/evt-conditions.png
og:image: /sims/evt-conditions/evt-conditions.png
twitter:image: /sims/evt-conditions/evt-conditions.png
social:
   cards: false
---
# EVT Conditions Explorer

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run the EVT Conditions Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

## Embedding This MicroSim

Place the following line in your website to include this in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/evt-conditions/main.html" height="522px" width="100%" scrolling="no"></iframe>
```

## Description

This MicroSim helps students understand why the **Extreme Value Theorem (EVT)** requires BOTH conditions to be satisfied:

1. **Continuity** on the interval
2. **Closed interval** [a, b]

The visualization allows students to experiment with violating each condition and observe the consequences.

### How to Use

1. **Select a scenario** from the dropdown:
   - **Continuous on closed**: The standard case where EVT applies
   - **Jump discontinuity**: A function with a sudden jump at x = 1
   - **Removable discontinuity**: A function with a "hole" at its maximum

2. **Adjust the interval** using the left (a) and right (b) endpoint sliders

3. **Toggle endpoint types** using the buttons:
   - Click "[a, (closed)" to toggle between [a (closed) and (a (open)
   - Click "b] (closed)" to toggle between b] (closed) and b) (open)

4. **Find Extrema** button highlights where the maximum and minimum occur (or shows why they may not exist)

### What to Observe

- **When both conditions are met**: Green checkmarks appear, and the global maximum and minimum are clearly marked
- **When continuity fails**: See how the function's behavior at a discontinuity prevents a guaranteed extremum
- **When the interval is open**: Watch the animation showing how values can get arbitrarily close to an extremum without reaching it

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. State the two conditions required for the Extreme Value Theorem to apply
2. Predict whether EVT applies given a function and interval description
3. Explain why each condition is necessary using counterexamples
4. Evaluate real-world scenarios to determine if EVT guarantees extrema

### Prerequisites

- Understanding of function continuity
- Knowledge of interval notation (open vs. closed)
- Basic understanding of maximum and minimum values

### Suggested Activities

#### Activity 1: Exploration (10 minutes)
Have students start with "Continuous on closed" scenario and verify that EVT applies. Then systematically explore what happens when each condition is violated.

#### Activity 2: Prediction Challenge (15 minutes)
Before clicking "Find Extrema," students predict:
- Will a maximum exist? Why or why not?
- Will a minimum exist? Why or why not?
Then verify their predictions.

#### Activity 3: Real-World Connection (10 minutes)
Discuss scenarios where:
- Temperature on a given day (closed interval, continuous)
- Stock price at a specific moment (may have "jumps")
- Distance traveled during a trip (endpoint considerations)

### Assessment Questions

1. A continuous function is defined on (0, 5]. Does EVT guarantee a maximum exists? Explain.

2. Consider f(x) = 1/x on [1, 10]. Does EVT apply? What are the extrema?

3. If f(x) has a removable discontinuity at its maximum point on [a, b], does the maximum actually exist as a function value? Why does this violate EVT?

!!! quote "Delta Moment"
    "I'm rolling along this curve, getting higher and higher... but wait, there's a HOLE right at the peak! I can get arbitrarily close to the top, but I'll never actually reach it. That's what happens when continuity fails!"

## References

1. [Extreme Value Theorem - Wikipedia](https://en.wikipedia.org/wiki/Extreme_value_theorem) - Comprehensive mathematical treatment of EVT and its proof

2. [Khan Academy - Extreme Value Theorem](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-2/v/extreme-value-theorem) - Video explanation with examples

3. [Paul's Online Math Notes - Finding Absolute Extrema](https://tutorial.math.lamar.edu/Classes/CalcI/AbsExtrema.aspx) - Detailed procedure for finding extrema on closed intervals
