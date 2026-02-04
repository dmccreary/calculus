---
title: Net Signed Area Visualizer
description: Demonstrates that definite integrals compute net signed area, with regions below the x-axis contributing negatively.
quality_score: 90
image: /sims/net-signed-area/net-signed-area.png
og:image: /sims/net-signed-area/net-signed-area.png
twitter:image: /sims/net-signed-area/net-signed-area.png
social:
   cards: false
---
# Net Signed Area Visualizer

<iframe src="main.html" height="502px" scrolling="no" style="width: 100%;"></iframe>

[Run the Net Signed Area Visualizer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This visualization helps students understand that definite integrals compute **net signed area**:

- Blue regions (above x-axis) contribute **positive** area
- Red regions (below x-axis) contribute **negative** area
- The net signed area is the sum of positive and negative contributions

## Iframe Code

```html
<iframe src="https://dmccreary.github.io/calculus/sims/net-signed-area/main.html" height="502px" scrolling="no" style="width: 100%;"></iframe>
```

## Lesson Plan

### Learning Objectives

Students will be able to:

1. Explain the difference between "area" and "net signed area"
2. Identify regions that contribute positively vs negatively to a definite integral
3. Calculate when positive and negative areas will cancel

### Activities

1. **Exploration (5 min)**: Use f(x) = x and adjust the interval to see positive and negative regions
2. **Prediction (5 min)**: Before adjusting, predict: will the net area be positive, negative, or zero?
3. **Application (10 min)**: For f(x) = sin(x), find an interval where the net signed area is zero

### Key Insights

- $\int_a^b f(x)\,dx$ can be zero even when there's significant area under the curve
- Total (unsigned) area = $\int_a^b |f(x)|\,dx$
- Net signed area = $\int_a^b f(x)\,dx$

## References

- [Definite Integrals and Signed Area - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-integration-new/ab-6-4/a/definite-integrals-intro)
