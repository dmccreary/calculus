---
title: Changing Bounds in u-Substitution
description: Interactive visualization showing how integration bounds transform from x-domain to u-domain during u-substitution, with side-by-side graphs confirming area equality.
image: /sims/changing-bounds/screenimage.png
og:image: /sims/changing-bounds/screenimage.png
twitter:image: /sims/changing-bounds/screenimage.png
quality_score: 85
social:
   cards: false
---

# Changing Bounds in u-Substitution

<iframe src="main.html" height="610px" width="100%" scrolling="no"></iframe>

[Run the Changing Bounds MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit with the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

When you use **u-substitution** on a definite integral, you have a choice: either substitute back to x after finding the antiderivative, or **change the bounds** so you never have to back-substitute at all. This MicroSim visualizes that second approach -- and shows you *why* it works geometrically.

The key idea is that the substitution $u = g(x)$ maps the interval $[a, b]$ in the x-domain to the interval $[g(a), g(b)]$ in the u-domain, and the shaded areas under both curves are exactly equal:

$$\int_a^b f(g(x)) \cdot g'(x)\, dx = \int_{g(a)}^{g(b)} f(u)\, du$$

!!! quote "Delta Moment"
    "So instead of backtracking to x after all that substitution work,
    I can just update my start and end points? That's like changing my
    GPS coordinates instead of retracing my steps. Way more efficient!"

## How to Use

1. **Select an example** from the bottom row to explore different u-substitutions
2. **Walk through stages 1--5** using the stage buttons to see the transformation unfold step by step
3. **Adjust the bounds** a and b using the sliders on the left to see how the transformation changes
4. **Click Animate** to watch dots travel along the transformation arrows from x-domain to u-domain
5. **Check Stage 5** to verify that both shaded areas give the same numerical value

## Visual Elements

- **Left graph (purple):** The original integrand $f(g(x)) \cdot g'(x)$ in the x-domain with shaded area between bounds $[a, b]$
- **Right graph (green):** The transformed integrand $f(u)$ in the u-domain with shaded area between bounds $[g(a), g(b)]$
- **Blue curved arrows:** Show the mapping $u = g(x)$ that transforms one domain to the other
- **Red dashed lines:** Bound markers on both graphs
- **Info panel:** Displays stage-specific explanations, bound calculations, and area values

## The Five Stages

| Stage | What It Shows |
|-------|---------------|
| 1 | Original integral in x with shaded area between $[a, b]$ |
| 2 | The substitution $u = g(x)$ and how it transforms the integrand |
| 3 | Bound transformation: $x = a \to u = g(a)$ and $x = b \to u = g(b)$ |
| 4 | New integral in u with transformed bounds and shaded area |
| 5 | Numerical confirmation that both areas are equal |

## Embedding This MicroSim

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/changing-bounds/main.html"
        height="610px"
        width="100%"
        scrolling="no">
</iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Apply** u-substitution to definite integrals by changing the limits of integration
2. **Transform** integration bounds from the x-domain to the u-domain using the substitution function
3. **Calculate** the new bounds $g(a)$ and $g(b)$ and verify that the integral value is preserved

### Bloom's Taxonomy Level

**Apply (Level 3)** -- Students apply the technique of changing bounds during u-substitution, transforming definite integrals from x-domain to u-domain.

### Prerequisites

- Understanding of u-substitution for indefinite integrals
- Knowledge of definite integrals and the Fundamental Theorem of Calculus
- Familiarity with function composition and the chain rule

### Suggested Activities

#### Activity 1: Stage Walk-Through (10 minutes)
Have students select the first example ($2x\cos(x^2)$) and click through all five stages. At each stage, ask them to write down what changed and why. This builds conceptual understanding of the full transformation process.

#### Activity 2: Bound Exploration (10 minutes)
Using Stage 5 (Show All), have students adjust the sliders for $a$ and $b$ and observe how both shaded areas change simultaneously while remaining equal. Ask: "Can you find bounds where the integral is zero? What does that mean geometrically?"

#### Activity 3: Prediction Challenge (15 minutes)
For each example, have students calculate $g(a)$ and $g(b)$ by hand before revealing Stage 3. Then check their work against the visualization. This reinforces the mechanical skill of bound transformation.

#### Activity 4: Cross-Example Comparison (10 minutes)
Ask students to compare the four examples and discuss: "In which example do the bounds change the most dramatically? Why?" This promotes deeper analysis of how different substitution functions affect the transformation.

### Assessment Questions

1. For $\int_0^2 2x \cos(x^2)\, dx$ with $u = x^2$, what are the new bounds? Verify using Stage 3.
2. If you change the lower bound $a$ but keep $b$ fixed, what happens to $g(a)$ and the u-domain area? Why do both areas still match?
3. Explain geometrically why the two shaded regions have the same area even though they look different.
4. For $u = \sin(x)$, what happens to the bounds when $a = 0$ and $b = \pi$? What is unusual about this case?

### Common Misconceptions

- **Misconception:** You must always back-substitute to x after finding the antiderivative
  - **Clarification:** Changing bounds lets you evaluate entirely in the u-domain, which is often simpler. The MicroSim shows both approaches give the same answer.

- **Misconception:** The new bounds are always in the same order (lower < upper)
  - **Clarification:** If $g(x)$ is decreasing on $[a, b]$, then $g(a) > g(b)$ and the bounds "flip." The integral still works correctly because of how signed area is defined.

- **Misconception:** The two shaded regions should look identical
  - **Clarification:** The regions look different because the coordinate systems are different. What matters is that the *numerical* areas are equal -- the substitution maps one region to the other while preserving area.

## References

- Stewart, James. *Calculus: Early Transcendentals*, Section 5.5: The Substitution Rule
- [u-Substitution - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-integration-new/ab-6-9/a/u-substitution-definite-integrals)
