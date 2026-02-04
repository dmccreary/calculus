---
title: Closed Interval Method
description: Interactive MicroSim demonstrating the Closed Interval Method for finding absolute extrema on closed intervals through a step-by-step guided process.
quality_score: 90
image: /sims/closed-interval-method/closed-interval-method.png
og:image: /sims/closed-interval-method/closed-interval-method.png
twitter:image: /sims/closed-interval-method/closed-interval-method.png
social:
   cards: false
---
# Closed Interval Method

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run the Closed Interval Method MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Closed Interval Method MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This interactive simulation guides students through the **Closed Interval Method** for finding absolute (global) extrema of a continuous function on a closed interval [a, b]. The method consists of three systematic steps:

1. **Find Candidates**: Identify all critical points (where f'(x) = 0 or undefined) within the interval, plus the two endpoints
2. **Evaluate All**: Calculate f(x) at each candidate point
3. **Identify Extrema**: Compare all values to find the absolute maximum and minimum

### Visual Elements

- **Blue squares** mark the interval endpoints
- **Orange dots** mark critical points within the interval
- **Green crown** indicates the absolute maximum
- **Red valley** indicates the absolute minimum
- The **candidate table** on the right tracks your progress through the method

### Controls

- **Function dropdown**: Choose from preset functions with different behaviors
- **Interval sliders**: Adjust the left endpoint (a) and right endpoint (b) to explore different intervals
- **Step buttons**: Work through the method one step at a time
- **Reset button**: Clear your work and start over

### Preset Functions

1. **f(x) = x^3 - 3x^2 + 1**: Cubic with two critical points (x = 0 and x = 2)
2. **f(x) = sin(x)**: Periodic function with multiple critical points
3. **f(x) = x^2 - 4x + 3**: Parabola with one critical point (x = 2)
4. **f(x) = -x^2 + 6x - 5**: Inverted parabola with one critical point (x = 3)
5. **f(x) = x^4 - 4x^2**: Quartic with three critical points

## Embedding This MicroSim

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/closed-interval-method/main.html" height="522px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will be able to apply the Closed Interval Method to find absolute extrema of continuous functions on closed intervals.

### Grade Level

AP Calculus AB/BC, College Calculus I (Grades 11-12, Undergraduate)

### Prerequisites

- Understanding of derivatives
- Ability to find critical points by setting f'(x) = 0
- Understanding of continuity on closed intervals
- Knowledge of the Extreme Value Theorem

### Duration

15-20 minutes

### Warm-Up Activity (3 minutes)

Before using the simulation, ask students:

- "What guarantees that a continuous function on [a, b] has absolute extrema?" (Extreme Value Theorem)
- "Where can absolute extrema occur?" (At critical points or endpoints)

### Guided Exploration (10 minutes)

1. **Start with f(x) = x^3 - 3x^2 + 1 on [-1, 4]**
   - Click "Find Candidates" - observe the endpoints and critical points marked
   - Click "Evaluate All" - see the function values calculated
   - Click "Identify Extrema" - identify which are absolute max/min

2. **Explore endpoint behavior**
   - Change the interval to [0, 3] using the sliders
   - Work through the three steps again
   - Notice how the absolute max now occurs at an endpoint instead of a critical point

3. **Try different functions**
   - Select sin(x) and use interval [0, 6.28]
   - How many critical points appear?
   - Which are maxima? Which are minima?

### Discussion Questions

1. "Why do we need to check endpoints, not just critical points?"
2. "Can the absolute max and min ever occur at the same point?"
3. "What happens if we change the interval to exclude a critical point?"
4. "How does this method relate to the Extreme Value Theorem?"

### Extension Activities

- **Algebraic connection**: Have students verify the critical points by hand using calculus
- **Challenge**: Predict where the extrema will occur before clicking the buttons
- **Real-world application**: Discuss optimization problems where the domain is naturally restricted

### Assessment Ideas

- Students demonstrate the method on a new function not in the preset list
- Students explain why both endpoints and critical points must be checked
- Students solve a related optimization word problem

## References

- [Khan Academy: Finding Absolute Extrema](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-5/v/using-extreme-value-theorem)
- [Paul's Online Math Notes: Finding Absolute Extrema](https://tutorial.math.lamar.edu/Classes/CalcI/AbsExtrema.aspx)
- Stewart, James. *Calculus: Early Transcendentals*, Section 4.1
