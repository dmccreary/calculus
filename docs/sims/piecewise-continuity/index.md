---
title: Piecewise Continuity Explorer
description: Interactive MicroSim for determining whether piecewise functions are continuous at boundary points by checking all three conditions for continuity.
quality_score: 90
image: /sims/piecewise-continuity/piecewise-continuity.png
og:image: /sims/piecewise-continuity/piecewise-continuity.png
twitter:image: /sims/piecewise-continuity/piecewise-continuity.png
social:
   cards: false
---
# Piecewise Continuity Explorer

<iframe src="main.html" height="572px" width="100%" scrolling="no"></iframe>

[Run the Piecewise Continuity Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Piecewise Continuity Explorer with the p5.js editor](https://editor.p5js.org/)

## Iframe Embed Code

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/piecewise-continuity/main.html" height="572px" scrolling="no"></iframe>
```

## Description

This MicroSim helps students determine whether piecewise functions are continuous at their boundary points by systematically checking all three conditions for continuity:

1. **The function is defined at the boundary point**: f(a) exists
2. **The limit exists at the boundary point**: The left-hand limit equals the right-hand limit
3. **The function value equals the limit**: f(a) = lim(x->a) f(x)

### Visual Elements

- **Two-colored graph**: The left piece of the function is shown in blue, the right piece in orange
- **Approach indicators**: Colored dots show values approaching the boundary from each side
- **Boundary analysis**: Green dot shows the actual function value at the boundary point
- **Info panel**: Displays the left limit, right limit, and function value
- **Condition checklist**: Animates through verification of each continuity condition
- **Verdict display**: Shows "CONTINUOUS" or "DISCONTINUOUS" based on the analysis

### Interactive Controls

- **Evaluate Continuity**: Animates the approach to the boundary and steps through the three conditions
- **Reset**: Returns to the initial state
- **Select Example**: Dropdown menu to choose from four preset examples:
    - Continuous Piecewise (all conditions met)
    - Jump Discontinuity (limits do not match)
    - Removable Discontinuity (function value does not equal limit)
    - Challenge Case (a non-obvious continuous case)
- **Approach slider**: Manually adjust how close the approach points are to the boundary

!!! quote "Delta Moment"
    "Can I walk here smoothly, or is there a gap I'd fall through? That's what continuity is all about. If the left side and right side meet up perfectly AND the function actually touches that meeting point... I can roll right through!"

## Lesson Plan

### Learning Objective

Students will be able to determine whether piecewise functions are continuous at boundary points by checking all three conditions for continuity.

### Warm-Up (5 minutes)

1. Ask students: "What does it mean for a function to be continuous?"
2. Have students sketch a function that is NOT continuous and explain why

### Guided Exploration (15 minutes)

1. Open the MicroSim and start with Example 1 (Continuous Piecewise)
2. Click "Evaluate Continuity" and observe each condition being checked
3. Discuss:
   - What does the blue dot represent? (Left-hand limit approach)
   - What does the orange dot represent? (Right-hand limit approach)
   - What does the green dot represent? (Actual function value)

4. Switch to Example 2 (Jump Discontinuity)
5. Before clicking Evaluate, ask students to predict: Will this be continuous?
6. Run the evaluation and discuss which condition fails

### Independent Practice (10 minutes)

Have students work through Examples 3 and 4:

- For each example, FIRST predict the outcome
- THEN verify using the MicroSim
- Write down which condition(s) fail for discontinuous cases

### Challenge Questions

1. Can a function be discontinuous if the limit exists at a point?
2. If both one-sided limits equal each other, is the function automatically continuous?
3. Create your own piecewise function that has a removable discontinuity at x = 1

### Assessment

Students should be able to:

- [ ] State all three conditions for continuity
- [ ] Identify which condition fails for a given discontinuous function
- [ ] Distinguish between jump and removable discontinuities
- [ ] Explain why all three conditions are necessary

## References

- [Continuity - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-limits-new/ab-1-12/a/continuity-at-a-point)
- [Piecewise Functions - Paul's Online Math Notes](https://tutorial.math.lamar.edu/classes/calci/continuity.aspx)
- [Three Conditions for Continuity - Math is Fun](https://www.mathsisfun.com/calculus/continuity.html)
