---
title: Left vs Right Riemann Sums
description: Interactive comparison of left and right Riemann sum approximations showing when each method overestimates or underestimates.
quality_score: 90
image: /sims/left-right-riemann/left-right-riemann.png
og:image: /sims/left-right-riemann/left-right-riemann.png
twitter:image: /sims/left-right-riemann/left-right-riemann.png
social:
   cards: false
---
# Left vs Right Riemann Sums

<iframe src="main.html" height="552px" scrolling="no" style="width: 100%;"></iframe>

[Run the Left vs Right Riemann Sums MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This visualization allows students to compare left and right Riemann sum approximations:

- Blue rectangles show the left Riemann sum (using left endpoints)
- Orange rectangles show the right Riemann sum (using right endpoints)
- The green curve shows the actual function
- The info panel displays numerical values and error analysis

## Iframe Code

```html
<iframe src="https://dmccreary.github.io/calculus/sims/left-right-riemann/main.html" height="552px" scrolling="no" style="width: 100%;"></iframe>
```

## Lesson Plan

### Learning Objectives

Students will be able to:

1. Distinguish between left and right Riemann sums visually and computationally
2. Analyze when left sums overestimate vs underestimate (and vice versa for right sums)
3. Explain the relationship between function behavior (increasing/decreasing) and approximation error

### Activities

1. **Discovery (5 min)**: Observe both approximations on an increasing function. Which is larger?
2. **Analysis (10 min)**: Switch to a decreasing function. Does the relationship flip?
3. **Convergence (5 min)**: Increase n and watch both approximations converge to the true value

### Key Insights

- For **increasing functions**: Left sum underestimates, Right sum overestimates
- For **decreasing functions**: Left sum overestimates, Right sum underestimates
- As n increases, both sums converge to the true integral

## References

- [Riemann Sums - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-integration-new/ab-6-2/a/riemann-sums-review)
