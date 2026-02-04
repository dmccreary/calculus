---
title: Vertical Asymptote Explorer
description: Interactive visualization showing how one-sided limits determine function behavior near vertical asymptotes, with animated approach points and direction arrows.
quality_score: 90
image: /sims/vertical-asymptote/vertical-asymptote.png
og:image: /sims/vertical-asymptote/vertical-asymptote.png
twitter:image: /sims/vertical-asymptote/vertical-asymptote.png
social:
   cards: false
---
# Vertical Asymptote Explorer

<iframe src="main.html" height="482px" scrolling="no"></iframe>

[Run the Vertical Asymptote Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Vertical Asymptote Explorer with the p5.js editor](https://editor.p5js.org/)

## Iframe Example

Place the following line in your website to include this MicroSim:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/vertical-asymptote/main.html" height="482px" scrolling="no"></iframe>
```

## Description

This MicroSim helps students understand vertical asymptotes by visualizing how function values behave as x approaches the asymptote from both sides. Key features include:

- **Multiple function examples**: Choose from four rational functions including 1/x, 1/x^2, and functions with multiple asymptotes
- **Animated approach**: Watch points trace along the curve as they get closer to the asymptote
- **Direction indicators**: Arrows show whether the function heads toward positive or negative infinity
- **One-sided limit notation**: The info panel displays the formal one-sided limit notation for each direction
- **Adjustable approach distance**: Use the slider to manually control how close to the asymptote the approach points get

The color coding helps distinguish the two approaches:
- **Teal**: Approaching from the left (x approaching a from below)
- **Orange**: Approaching from the right (x approaching a from above)

!!! quote "Delta Moment"
    "See how I get closer and closer to that vertical line but can NEVER cross it?
    Watch my y-value--it's heading off to infinity! The slope under my wheels is
    getting steeper... and steeper... WHEEE!"

## Lesson Plan

### Learning Objective

Students will **explain** how one-sided limits determine the behavior of a function near its vertical asymptotes.

### Bloom's Taxonomy Level

**Understand (L2)** - Students interpret visual representations to explain mathematical behavior.

### Prerequisites

- Understanding of function notation
- Basic knowledge of limits
- Familiarity with rational functions

### Warm-Up (5 minutes)

1. Start with f(x) = 1/x selected
2. Ask: "What happens to the function value when x is very small and positive? Very small and negative?"
3. Let students predict before using the animation

### Guided Exploration (10 minutes)

1. **Same-sign behavior (1/x^2)**:
   - Switch to f(x) = 1/x^2
   - Animate the approach
   - Ask: "Do both sides go to the same infinity or different infinities?"
   - Discuss why (squaring makes everything positive)

2. **Different-sign behavior (1/x)**:
   - Switch back to f(x) = 1/x
   - Animate and compare
   - Ask: "Why do the two sides go in opposite directions?"

3. **Multiple asymptotes**:
   - Select f(x) = x/((x-2)(x+1))
   - Explore behavior at both x = -1 and x = 2
   - Note: The function selector shows the first asymptote by default

### Independent Practice (10 minutes)

Have students complete the following:

1. For each function, predict the one-sided limit behavior before animating
2. Sketch the function near its asymptote(s)
3. Write the formal one-sided limit notation

### Assessment Questions

1. If the left-hand limit is +infinity and the right-hand limit is -infinity, can the two-sided limit exist? Why or why not?

2. For f(x) = 1/x^2, explain why both one-sided limits equal +infinity even though the function approaches from different directions.

3. Given a new rational function, how would you predict where the vertical asymptotes occur?

### Extension Activities

- **Challenge**: Can you create a function where the left limit is +infinity and the right limit is a finite number? (Discuss piecewise functions)
- **Connection to continuity**: How do vertical asymptotes relate to discontinuities?

## References

- [AP Calculus: Limits at Infinity and Infinite Limits](https://apcentral.collegeboard.org/courses/ap-calculus-ab)
- [Khan Academy: Vertical Asymptotes](https://www.khanacademy.org/math/ap-calculus-ab/ab-limits-new/ab-1-5/a/limits-at-infinity-and-graphs)
- [Paul's Online Math Notes: Infinite Limits](https://tutorial.math.lamar.edu/Classes/CalcI/InfiniteLimits.aspx)
