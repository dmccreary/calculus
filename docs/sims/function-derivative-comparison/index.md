---
title: Function and Derivative Comparison
description: Interactive side-by-side visualization showing a function and its derivative with synchronized point, tangent line, and value displays to help students analyze the relationship between a function and its rate of change.
quality_score: 90
image: /sims/function-derivative-comparison/function-derivative-comparison.png
og:image: /sims/function-derivative-comparison/function-derivative-comparison.png
twitter:image: /sims/function-derivative-comparison/function-derivative-comparison.png
social:
   cards: false
---
# Function and Derivative Comparison

<iframe src="main.html" height="482px" scrolling="no"></iframe>

[Run the Function and Derivative Comparison MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Function and Derivative Comparison MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim displays a function and its derivative side by side, with a synchronized point that shows the connection between function value, tangent slope, and derivative value. As you move the slider, watch how:

- **Left panel**: The original function f(x) with a point and tangent line
- **Right panel**: The derivative function f'(x) with the corresponding point
- **The key connection**: The slope of the tangent line on the left equals the height of the point on the right

!!! quote "Delta Moment"
    "See how my tilt on the left matches my height on the right? When the tangent line is flat (slope = 0), the derivative point sits right on the x-axis. When I'm climbing steeply, the derivative is high above zero. The slope under my wheels IS the derivative value!"

## How to Use

1. **Move the x slider** to explore different points along the function
2. **Switch between functions** using the function buttons (x^2, x^3, sin(x), e^x)
3. **Toggle the tangent line** on/off to focus on different aspects
4. **Watch the info panel** for exact values of x, f(x), and f'(x)

## Key Observations

### When the tangent is horizontal (slope = 0):
- The derivative value f'(x) = 0
- The point on the right graph sits on the x-axis
- This happens at critical points (peaks, valleys, or flat spots)

### When the tangent slopes upward (positive slope):
- The derivative value f'(x) > 0
- The point on the right graph is above the x-axis
- The function is increasing at that point

### When the tangent slopes downward (negative slope):
- The derivative value f'(x) < 0
- The point on the right graph is below the x-axis
- The function is decreasing at that point

## Embed This MicroSim

Place the following line in your website to include this MicroSim:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/function-derivative-comparison/main.html" height="482px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Analyze** the relationship between a function graph and its derivative graph (Bloom Level 4)
2. **Explain** why the derivative value equals the slope of the tangent line
3. **Predict** the sign of the derivative from the function's behavior
4. **Compare** derivative behaviors across different function types

### Prerequisite Knowledge

- Understanding of function notation f(x)
- Concept of slope of a line
- Basic familiarity with the idea of a tangent line
- Knowledge of the functions: x^2, x^3, sin(x), e^x

### Activity Sequence (15-20 minutes)

#### Part 1: Guided Discovery (5 minutes)

1. Start with f(x) = x^2 and the tangent line ON
2. Ask students: "What do you notice about the tangent line at x = 0?"
3. Move the slider slowly from x = -2 to x = 2
4. Key question: "How does the height of the orange point on the right relate to the steepness of the green tangent line on the left?"

#### Part 2: Pattern Recognition (5 minutes)

1. Switch to sin(x)
2. Challenge: "Can you find ALL the places where the derivative equals zero?"
3. Have students record x-values where f'(x) = 0
4. Ask: "What's special about these points on the original function?"

#### Part 3: Function Comparison (5 minutes)

1. Compare x^2 and e^x
2. Discussion: "Both are always increasing for x > 0. What's different about their derivatives?"
3. For e^x, note the special property: the function equals its own derivative

#### Part 4: Reflection Questions

- "If I tell you f'(3) = 5, what does that tell you about f at x = 3?"
- "Why can't a function be both increasing and have a negative derivative?"
- "What would the derivative graph look like for a straight line?"

### Assessment

Have students complete this quick check:

1. If f'(a) = 0, the tangent line at x = a is __________.
2. If the function is decreasing, the derivative is __________.
3. For f(x) = x^2, the derivative at x = 3 is __________.

### Extensions

- Challenge students to sketch f'(x) without looking at the right panel
- Discuss what the derivative of the derivative (second derivative) would look like
- Connect to real-world examples: position/velocity, cost/marginal cost

## References

- [Khan Academy: Derivative as slope of tangent line](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-1/v/derivative-as-slope-of-tangent-line)
- [3Blue1Brown: The Essence of Calculus](https://www.3blue1brown.com/lessons/essence-of-calculus)
- AP Calculus AB Course Description, College Board
