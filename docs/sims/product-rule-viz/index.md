---
title: Product Rule Visualization
description: Interactive geometric visualization of the product rule showing why d(fg) = f*dg + g*df has two terms using area interpretation
quality_score: 90
image: /sims/product-rule-viz/product-rule-viz.png
og:image: /sims/product-rule-viz/product-rule-viz.png
twitter:image: /sims/product-rule-viz/product-rule-viz.png
social:
   cards: false
---

# Product Rule Visualization

<iframe src="main.html" height="517px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This visualization demonstrates **why the product rule has two terms** using a geometric area interpretation. When you have two functions $f(x)$ and $g(x)$, their product $f \cdot g$ can be visualized as the area of a rectangle with sides $f$ and $g$.

### The Key Insight

When $x$ increases by a small amount $\Delta x$:

- $f$ changes by $\Delta f$
- $g$ changes by $\Delta g$
- The **total area change** forms an **L-shaped region**

The L-shape consists of:

1. **Top strip** (green): $f \cdot \Delta g$ - the original width times the height increase
2. **Right strip** (orange): $g \cdot \Delta f$ - the original height times the width increase
3. **Corner** (red): $\Delta f \cdot \Delta g$ - negligibly small as $\Delta x \to 0$

### The Product Rule Emerges

$$\Delta(f \cdot g) = f \cdot \Delta g + g \cdot \Delta f + \Delta f \cdot \Delta g$$

As $\Delta x \to 0$, the corner rectangle $\Delta f \cdot \Delta g$ becomes negligible, leaving:

$$d(f \cdot g) = f \cdot dg + g \cdot df$$

Or in derivative notation:

$$(fg)' = f \cdot g' + g \cdot f'$$

!!! quote "Delta Moment"
    "See that tiny red corner? Watch what happens as I shrink delta-x. The corner gets tinier and tinier until it's basically nothing! That's why the product rule only has TWO terms, not three. The corner disappears in the limit!"

## How to Use

1. **x Slider**: Change the value of x to see different rectangle sizes
2. **Delta-x Slider**: Control how much x changes - watch the L-shape change
3. **Preset Functions**: Try different combinations of f(x) and g(x)
4. **Shrink Delta-x**: Animate delta-x approaching 0 to see the corner become negligible
5. **Reset**: Return to starting values

### What to Observe

- The **blue rectangle** is the original area $f \cdot g$
- The **green strip** shows $f \cdot \Delta g$ (first term of product rule)
- The **orange strip** shows $g \cdot \Delta f$ (second term of product rule)
- The **red corner** is $\Delta f \cdot \Delta g$ (becomes negligible)
- The **info panel** shows numerical values and the percentage contribution of the corner

## Embedding

Place the following line in your website to include this MicroSim:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/product-rule-viz/main.html"
        height="517px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. **Explain** why the product rule has exactly two terms using the area interpretation (Bloom Level 2: Understand)
2. **Interpret** the geometric meaning of each term in the product rule
3. **Demonstrate** how the corner rectangle becomes negligible as delta-x approaches zero

### Prerequisite Knowledge

- Understanding of area as length times width
- Basic concept of derivatives as rates of change
- Familiarity with function notation f(x)

### Suggested Activities

1. **Predict First**: Before using the slider, ask students: "If we have a rectangle and both sides grow, what shape is the added area?" Let them sketch it, then verify with the simulation.

2. **Corner Investigation**: Have students record the percentage contribution of the corner at different delta-x values:
   - delta-x = 1.0: corner is ___% of total change
   - delta-x = 0.5: corner is ___% of total change
   - delta-x = 0.1: corner is ___% of total change
   - delta-x = 0.01: corner is ___% of total change

   What pattern do they notice?

3. **Different Functions**: Try all four function presets. Does the corner always become negligible? Why?

4. **Connect to Formula**: For f(x) = x and g(x) = x^2, have students:
   - Calculate f'(x) and g'(x)
   - Write out (fg)' = f*g' + g*f'
   - Verify this matches the limit of the area change

### Discussion Questions

1. Why does the product rule have exactly two terms, not one or three?
2. What would happen if we tried to multiply three functions together? How many terms would the rule have?
3. The corner rectangle is called "second-order" because it involves two delta terms multiplied together. Why does second-order mean negligible in calculus?
4. How does this visualization connect to the algebraic derivation of the product rule?

### Assessment Questions

1. In the area model of the product rule, what does each colored region represent?
2. If f(2) = 3, g(2) = 4, f'(2) = 1, and g'(2) = 2, what is (fg)'(2)?
3. Why can we ignore the corner rectangle when finding the derivative?
4. Sketch what the "L-shaped region" would look like if f were decreasing (negative derivative) but g were increasing.

## References

- [Product Rule - Wikipedia](https://en.wikipedia.org/wiki/Product_rule)
- [Geometric Interpretation of the Product Rule - 3Blue1Brown](https://www.3blue1brown.com/lessons/derivatives)
- [Derivative Rules - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new)
