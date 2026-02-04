---
title: Trig Derivative Cycle
description: Interactive visualization showing the cyclic pattern of trigonometric derivatives where sin cycles through cos, -sin, -cos, and back to sin.
quality_score: 90
image: /sims/trig-derivative-cycle/trig-derivative-cycle.png
og:image: /sims/trig-derivative-cycle/trig-derivative-cycle.png
twitter:image: /sims/trig-derivative-cycle/trig-derivative-cycle.png
social:
   cards: false
---
# Trig Derivative Cycle

<iframe src="main.html" height="482px" scrolling="no"></iframe>

[Run the Trig Derivative Cycle MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Trig Derivative Cycle MicroSim with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive visualization demonstrates the cyclic nature of trigonometric derivatives. One of the beautiful patterns in calculus is that taking the derivative of sine and cosine functions creates a repeating cycle:

$$\frac{d}{dx}\sin(x) = \cos(x) \rightarrow \frac{d}{dx}\cos(x) = -\sin(x) \rightarrow \frac{d}{dx}(-\sin(x)) = -\cos(x) \rightarrow \frac{d}{dx}(-\cos(x)) = \sin(x)$$

After four derivatives, you return to the original function!

## How to Use

1. **Take Derivative Button**: Click to advance to the next function in the cycle
2. **Reset Button**: Return to sin(x) as the starting function
3. **Show Both Graphs Checkbox**: Toggle to see both f(x) and f'(x) graphs simultaneously

## The Derivative Cycle

The circular diagram on the left shows the four-step cycle:

| Step | Function | Derivative |
|------|----------|------------|
| 1 | sin(x) | cos(x) |
| 2 | cos(x) | -sin(x) |
| 3 | -sin(x) | -cos(x) |
| 4 | -cos(x) | sin(x) |

The color coding in the circular diagram matches the graphs, helping you visually connect each function to its derivative.

## Iframe Embedding

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/trig-derivative-cycle/main.html" height="482px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will be able to **recall** the cyclic pattern of trigonometric derivatives (sin, cos, -sin, -cos) and **identify** the derivative of any function in the cycle.

### Grade Level

High School (Grades 11-12), AP Calculus

### Duration

10-15 minutes

### Prerequisites

- Understanding of what a derivative represents
- Familiarity with sine and cosine functions
- Basic graphing skills

### Warm-Up Activity (3 minutes)

Ask students: "What do you notice about the graphs of sin(x) and cos(x)? How are they related?"

### Main Activity (7-10 minutes)

1. **Exploration Phase**: Have students click through all four derivatives once while observing:
   - How the graphs change
   - The pattern in the circular diagram
   - What happens after 4 clicks

2. **Pattern Recognition**: Ask students to predict:
   - What is the 5th derivative of sin(x)?
   - What is the 8th derivative of sin(x)?
   - What is the 100th derivative of sin(x)?

3. **Discussion Questions**:
   - Why does this cycle happen? (Hint: Think about phase shifts)
   - How could you use this pattern to quickly find high-order derivatives?

### Assessment Questions

1. What is the derivative of cos(x)?
2. If you take the derivative of sin(x) three times, what do you get?
3. Why does the cycle repeat after exactly 4 derivatives?

### Extension Activities

- Have students explore what happens with sin(2x) or cos(3x)
- Connect to the unit circle and phase shifts
- Explore the relationship to Euler's formula: $e^{ix} = \cos(x) + i\sin(x)$

## References

- [Derivatives of Trigonometric Functions - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-7/a/derivative-of-sinx)
- [The Unit Circle and Trigonometric Functions](https://www.mathsisfun.com/geometry/unit-circle.html)
- Stewart, James. "Calculus: Early Transcendentals", Chapter 3.3 - Derivatives of Trigonometric Functions
