---
title: FTC Connection Visualization
description: Visualize how FTC Part 1 and Part 2 are two sides of the same relationship between differentiation and integration.
quality_score: 90
image: /sims/ftc-connection/ftc-connection.png
og:image: /sims/ftc-connection/ftc-connection.png
twitter:image: /sims/ftc-connection/ftc-connection.png
social:
   cards: false
---
# FTC Connection Visualization

<iframe src="main.html" height="602px" scrolling="no" style="width: 100%;"></iframe>

[Run the FTC Connection Visualization Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This visualization shows the deep connection between the two parts of the Fundamental Theorem:

- **Panel 1**: f(x) - the integrand (what we're integrating)
- **Panel 2**: F(x) - the antiderivative (whose derivative is f)
- **Panel 3**: The connection - the slope of F equals f(x)

The arrows show how integration and differentiation are inverse operations.

## Iframe Code

```html
<iframe src="https://dmccreary.github.io/calculus/sims/ftc-connection/main.html" height="602px" scrolling="no" style="width: 100%;"></iframe>
```

## Lesson Plan

### Learning Objectives

Students will be able to:

1. Analyze the relationship between differentiation and integration
2. Explain how FTC Part 1 and Part 2 express the same underlying relationship
3. Verify that the derivative of the antiderivative returns the original function

### Activities

1. **Visual Exploration (5 min)**: Move x and observe the tangent line slope matching f(x)
2. **Part 1 Focus (5 min)**: Verify that d/dx[∫f(t)dt] = f(x) visually
3. **Part 2 Focus (5 min)**: Connect F(b) - F(a) to the shaded area
4. **Synthesis (5 min)**: Explain in your own words why these two theorems are really one

### The Grand Connection

**FTC Part 1**: Differentiation undoes integration
$$\frac{d}{dx}\left[\int_a^x f(t)\,dt\right] = f(x)$$

**FTC Part 2**: Integration "undoes" differentiation
$$\int_a^b F'(x)\,dx = F(b) - F(a)$$

Both say the same thing: **differentiation and integration are inverse operations**.

## References

- [The Fundamental Theorem of Calculus - 3Blue1Brown](https://www.youtube.com/watch?v=rfG8ce4nNh0)
- [FTC Explained - Brilliant.org](https://brilliant.org/wiki/fundamental-theorem-of-calculus/)
