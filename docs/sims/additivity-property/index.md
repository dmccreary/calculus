---
title: Additivity Property Visualization
description: Demonstrates how the area under a curve can be split into sub-regions that sum to the total, illustrating the additivity property of definite integrals.
quality_score: 90
image: /sims/additivity-property/additivity-property.png
og:image: /sims/additivity-property/additivity-property.png
twitter:image: /sims/additivity-property/additivity-property.png
social:
   cards: false
---
# Additivity Property Visualization

<iframe src="main.html" height="502px" scrolling="no" style="width: 100%;"></iframe>

[Run the Additivity Property Visualization Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This visualization helps students understand the **additivity property** of definite integrals:

$$\int_a^c f(x)\,dx = \int_a^b f(x)\,dx + \int_b^c f(x)\,dx$$

- **Blue region** shows the integral from $a$ to the split point $b$
- **Green region** shows the integral from the split point $b$ to $c$
- The **sum of both regions** always equals the **total integral** from $a$ to $c$

## How to Use

1. **Drag the orange handle** to move the split point $b$ along the x-axis
2. **Choose a function** from the dropdown to see the property with different curves
3. **Toggle values** to show or hide the numerical integral values
4. **Animate** to watch the split point sweep across the interval automatically

## Iframe Code

```html
<iframe src="https://dmccreary.github.io/calculus/sims/additivity-property/main.html" height="502px" scrolling="no" style="width: 100%;"></iframe>
```

## Lesson Plan

### Learning Objectives

Students will be able to:

1. Explain the additivity property of definite integrals in their own words
2. Visualize how splitting an interval produces sub-integrals that sum to the total
3. Interpret the property for different types of functions

### Activities

1. **Exploration (5 min)**: Drag the split point across the interval and observe how the blue and green areas change while their sum stays constant
2. **Prediction (5 min)**: Before changing functions, predict: will the additivity property still hold for $f(x) = \sin(x) + 2$? Test your prediction
3. **Discovery (5 min)**: Find a split point where the left and right integrals are approximately equal. What does this tell you about the function?
4. **Extension (5 min)**: If you split the interval into *three* parts, would the property still hold? How would you express that mathematically?

### Key Insights

- The additivity property holds for **all** continuous functions, regardless of shape
- $\int_a^c f(x)\,dx = \int_a^b f(x)\,dx + \int_b^c f(x)\,dx$ for any $b$ between $a$ and $c$
- This property is fundamental to how we compute integrals numerically (splitting into many small pieces)
- It also underpins the proof of the Fundamental Theorem of Calculus

### Discussion Questions

1. Why does this property seem "obvious" geometrically but still needs a formal proof?
2. How is this property related to Riemann sums?
3. What happens if the split point $b$ is outside the interval $[a, c]$?

## References

- [Properties of Definite Integrals - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-integration-new/ab-6-6/a/definite-integral-properties)
