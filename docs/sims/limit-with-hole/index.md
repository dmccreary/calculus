---
title: Limit Visualization with Hole
description: Interactive visualization showing how function values approach a limit even when the function has a hole at that point
image: /sims/limit-with-hole/limit-with-hole.png
---

# Limit Visualization with Hole

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This visualization demonstrates the core concept of limits: what value a function *approaches* as x gets closer to a target, even when the function is undefined at that exact point.

The function shown is:

$$f(x) = \frac{x^2 - 4}{x - 2}$$

This simplifies to $f(x) = x + 2$ for all $x \neq 2$, but has a **hole** at $x = 2$ where the original expression is undefined (0/0).

### Key Observations

- As x approaches 2 from either side, f(x) approaches 4
- The function value at x = 2 doesn't exist (there's a hole)
- The **limit** still equals 4 because we care about what the function *approaches*, not what it equals

## How to Use

1. **Distance Slider**: Adjust how close x is to 2
2. **Approach Direction**: Choose to approach from left, right, or both simultaneously
3. **Animate**: Watch the approach happen automatically
4. **Reset**: Return to starting position

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. Explain that a limit describes approach behavior, not the actual function value
2. Interpret limit notation $\lim_{x \to c} f(x) = L$
3. Identify when a function has a removable discontinuity (hole)

### Suggested Activities

1. **Predict and Observe**: Before animating, have students predict what y-value the function approaches
2. **Compare Approaches**: Switch between left, right, and both approaches to verify they give the same limit
3. **Discussion**: Why does the limit exist even though f(2) is undefined?

### Assessment Questions

1. What is $\lim_{x \to 2} \frac{x^2 - 4}{x - 2}$?
2. Is f(2) defined? Why or why not?
3. How is the limit different from the function value?

## Embedding

```html
<iframe src="https://dmccreary.github.io/calculus/sims/limit-with-hole/main.html"
        height="482px" width="100%" scrolling="no"></iframe>
```
