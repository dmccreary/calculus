---
title: FTC Part 1 Calculator
description: Practice applying the Fundamental Theorem of Calculus Part 1 to find derivatives of accumulation functions, with and without chain rule.
quality_score: 90
image: /sims/ftc-part1-calculator/ftc-part1-calculator.png
og:image: /sims/ftc-part1-calculator/ftc-part1-calculator.png
twitter:image: /sims/ftc-part1-calculator/ftc-part1-calculator.png
social:
   cards: false
---
# FTC Part 1 Calculator

<iframe src="main.html" height="502px" scrolling="no" style="width: 100%;"></iframe>

[Run the FTC Part 1 Calculator Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This step-by-step calculator helps students practice FTC Part 1:

$$\frac{d}{dx}\left[\int_a^x f(t)\,dt\right] = f(x)$$

With chain rule:

$$\frac{d}{dx}\left[\int_a^{g(x)} f(t)\,dt\right] = f(g(x)) \cdot g'(x)$$

## Iframe Code

```html
<iframe src="https://dmccreary.github.io/calculus/sims/ftc-part1-calculator/main.html" height="502px" scrolling="no" style="width: 100%;"></iframe>
```

## Lesson Plan

### Learning Objectives

Students will be able to:

1. Apply FTC Part 1 to find derivatives of accumulation functions
2. Identify when the chain rule is needed (variable upper limit that isn't just x)
3. Calculate derivatives of integrals without evaluating the integral

### Activities

1. **Basic Problems (5 min)**: Work through problems where the upper limit is simply x
2. **Chain Rule Problems (10 min)**: Practice problems where upper limit is a function of x
3. **Predict Before Reveal (5 min)**: Try to solve each problem before clicking "Next Step"

### Key Formula

$$\frac{d}{dx}\left[\int_a^{g(x)} f(t)\,dt\right] = f(g(x)) \cdot g'(x)$$

Don't forget to multiply by the derivative of the upper limit!

## References

- [FTC Part 1 - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-integration-new/ab-6-4/v/fundamental-theorem-of-calculus)
