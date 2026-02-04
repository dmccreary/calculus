---
title: One-Sided Derivatives
description: Interactive visualization showing how left and right secant lines approach a point, demonstrating when one-sided derivatives match or differ to determine differentiability.
quality_score: 90
image: /sims/one-sided-derivatives/one-sided-derivatives.png
og:image: /sims/one-sided-derivatives/one-sided-derivatives.png
twitter:image: /sims/one-sided-derivatives/one-sided-derivatives.png
social:
   cards: false
---
# One-Sided Derivatives

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the One-Sided Derivatives MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the One-Sided Derivatives MicroSim with the p5.js editor](https://editor.p5js.org/)

Place the following line in your website to include this in your course.

```html
<iframe src="https://dmccreary.github.io/calculus/sims/one-sided-derivatives/main.html" height="482px" scrolling="no"></iframe>
```

## Description

This MicroSim helps students analyze one-sided derivatives to determine whether a function is differentiable at a given point. The visualization shows:

- **A function plotted on a coordinate plane** - Select from smooth functions (like x^2 or sin(x)+1) or functions with corners/cusps (like |x| or max(x,0))
- **Point of interest at x = 0** - This is where we examine differentiability
- **Left secant line (blue)** - Connects (a-h, f(a-h)) to (a, f(a)), representing the left-hand difference quotient
- **Right secant line (red)** - Connects (a, f(a)) to (a+h, f(a+h)), representing the right-hand difference quotient
- **Slope values** - Real-time display of left and right secant slopes

As students decrease the h-value using the slider, they can observe whether the two secant slopes converge to the same value (differentiable) or approach different limits (not differentiable).

!!! quote "Delta Moment"
    "When I roll toward a corner, my left wheel and right wheel suddenly disagree about which way is 'up.' That's what a non-differentiable point feels like - my two sides have different opinions about the slope!"

## How to Use

1. **Select a function** from the dropdown to explore different cases
2. **Adjust the h slider** to control how close the secant points are to x = 0
3. **Observe** the left (blue) and right (red) secant lines as h decreases
4. **Compare** the slopes shown in the info panel
5. **Determine** if the function is differentiable based on whether slopes converge

## Key Observations

| Function Type | What Happens as h approaches 0 | Differentiable? |
|--------------|-------------------------------|-----------------|
| Smooth (x^2, sin(x)) | Both slopes approach the same value | Yes |
| Corner (absolute value x) | Left slope approaches -1, right approaches +1 | No |
| Cusp (square root of absolute value x) | Slopes diverge to infinity | No |

## Lesson Plan

### Learning Objective

Students will analyze one-sided derivatives to determine differentiability at a point (Bloom Level 4: Analyze)

### Grade Level

High School AP Calculus (Grades 11-12)

### Duration

15-20 minutes

### Prior Knowledge Required

- Understanding of limits
- Concept of secant lines and slopes
- Definition of the derivative as a limit of difference quotients

### Activity Sequence

#### Part 1: Introduction (3 minutes)

1. Review the definition of the derivative:
   $$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

2. Explain that for this limit to exist, both one-sided limits must exist and be equal

#### Part 2: Exploring Smooth Functions (5 minutes)

1. Start with the "Smooth: x^2" function
2. Set h = 1.0 and observe both secant lines
3. Slowly decrease h and observe how both slopes converge to 0
4. Discuss: "Why do both secant slopes approach the same value?"

#### Part 3: Discovering Non-Differentiability (7 minutes)

1. Switch to "Corner: |x|" function
2. With h = 1.0, note the difference between left and right slopes
3. Decrease h and observe that slopes approach different values (-1 and +1)
4. Ask students: "What does this tell us about the derivative at x = 0?"
5. Explore the cusp function to see slopes diverging

#### Part 4: Synthesis (5 minutes)

1. Have students predict which functions will be differentiable before testing
2. Use the "max(x,0)" function as a test case
3. Discuss real-world examples where non-differentiable points matter

### Assessment Questions

1. Explain why a corner causes non-differentiability in your own words
2. If the left-hand derivative is 2 and the right-hand derivative is 5, is the function differentiable at that point?
3. Sketch a function that is continuous but not differentiable at x = 2

### Extensions

- Have students create their own piecewise functions and predict differentiability
- Connect to the concept of "sharp corners" in optimization problems
- Discuss why physicists care about smoothness of position functions

## References

- [Differentiability - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-4/a/differentiability-at-a-point-algebraic)
- [One-Sided Derivatives - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/Continuity.aspx)
- [AP Calculus AB/BC Course Description - College Board](https://apcentral.collegeboard.org/courses/ap-calculus-ab)

---
*Reminder: Please capture a screenshot for social media previews using `~/.local/bin/bk-capture-screenshot`*
