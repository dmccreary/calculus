---
title: Three Conditions for Continuity Visualized
description: An interactive MicroSim that helps students explain how each of the three continuity conditions corresponds to visual features of a function graph.
quality_score: 88
image: /sims/continuity-conditions/continuity-conditions.png
og:image: /sims/continuity-conditions/continuity-conditions.png
twitter:image: /sims/continuity-conditions/continuity-conditions.png
social:
   cards: false
---
# Three Conditions for Continuity Visualized

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Three Conditions MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Three Conditions MicroSim with the p5.js Editor](https://editor.p5js.org/)

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/continuity-conditions/main.html" height="552px" width="100%" scrolling="no"></iframe>
```

## Description

This MicroSim visualizes the three conditions required for a function to be continuous at a point c:

1. **f(c) is defined** - The function has a value at the point
2. **The limit exists** - Both left and right limits exist and are equal
3. **The limit equals f(c)** - The function value matches the limit

Watch Delta, our triangular calculus robot mascot, as she tries to navigate along each function. When she can smoothly travel through a point, the function is continuous there. When she encounters a gap, jump, or misplaced landing spot, the function is discontinuous.

### Five Scenarios

Use the A-E buttons to explore different discontinuity types:

- **A: Continuous** - All three conditions pass. Delta travels smoothly.
- **B: Hole** - f(c) is undefined. Delta hovers over empty space.
- **C: Jump** - The left and right limits differ. Delta would have to teleport.
- **D: Misplaced Point** - f(c) exists but doesn't match the limit. The landing spot is in the wrong place.
- **E: Vertical Asymptote** - The limit doesn't exist at all. Delta sees infinity.

### How to Use

1. Select a scenario (A-E) to see different discontinuity types
2. Use the slider to move the target point c along the x-axis
3. Click "Check at c" to watch the three conditions be evaluated one by one
4. See the final verdict: CONTINUOUS (green) or DISCONTINUOUS (red)
5. Click "Reset" to try again

!!! quote "Delta Moment"
    "Can I walk here smoothly, or is there a gap I'd fall through? That's what continuity is all about! I need three things: somewhere to land, a clear path from both sides, and that path has to actually reach my landing spot."

## Lesson Plan

### Learning Objective

Students will explain how each of the three continuity conditions corresponds to visual features of a function graph.

### Grade Level

High School (AP Calculus) or Early Undergraduate

### Prerequisites

- Understanding of function notation f(x)
- Basic concept of limits (left-hand, right-hand)
- Familiarity with coordinate graphing

### Duration

15-20 minutes

### Activities

**Warm-up (3 minutes):**
Ask students: "What does it mean intuitively for a graph to be 'continuous'?" Gather responses like "no breaks," "can draw without lifting pencil," etc.

**Exploration (10 minutes):**

1. Start with Scenario A (continuous). Have students predict what will happen before clicking "Check at c." Verify all three conditions pass.

2. Move to Scenario B (hole). Ask: "Which condition do you think will fail?" Check and discuss why f(c) being undefined breaks continuity.

3. Explore Scenarios C, D, and E. For each:
   - Predict which condition(s) will fail
   - Verify with the MicroSim
   - Discuss the visual feature that causes the failure

**Discussion (5 minutes):**

- "Why do we need all THREE conditions? Why isn't just having f(c) defined enough?"
- "Which type of discontinuity (hole, jump, asymptote) seems most 'severe'? Why?"
- "Can you think of real-world situations where each type might occur?"

### Assessment

Have students draw their own function with a discontinuity at x = 3 and identify which of the three conditions fails. Trade drawings with a partner and verify each other's analysis.

### Extensions

- Challenge: Create a function that fails ONLY condition 3 (like Scenario D)
- Research: Find real-world functions that have discontinuities (step functions in tax brackets, voltage switches, etc.)

## References

1. [Wikipedia: Continuous Function](https://en.wikipedia.org/wiki/Continuous_function) - Comprehensive overview of continuity in mathematics
2. [Khan Academy: Continuity at a Point](https://www.khanacademy.org/math/ap-calculus-ab/ab-limits-new/ab-1-11/v/continuity-at-a-point) - Video explanation with examples
3. [Paul's Online Math Notes: Continuity](https://tutorial.math.lamar.edu/Classes/CalcI/Continuity.aspx) - Detailed notes with worked examples
