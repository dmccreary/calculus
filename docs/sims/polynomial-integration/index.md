---
title: Polynomial Integration
description: Interactive step-by-step guide to integrating polynomial functions using the power rule, with animated transformations and graph visualization.
image: /sims/polynomial-integration/polynomial-integration.png
og:image: /sims/polynomial-integration/polynomial-integration.png
twitter:image: /sims/polynomial-integration/polynomial-integration.png
quality_score: 85
social:
   cards: false
---

# Polynomial Integration

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run Polynomial Integration Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/polynomial-integration/main.html" height="602px" width="100%" scrolling="no"></iframe>
```

## Description

The Polynomial Integration MicroSim demonstrates how to integrate polynomials term by term using the power rule. Each term of the polynomial is integrated separately, showing the rule applied and the result, then assembled into the complete antiderivative.

### The Power Rule for Integration

For any term $ax^n$ where $n \neq -1$:

$$\int ax^n \, dx = \frac{a}{n+1}x^{n+1} + C$$

In words: "Add 1 to the exponent, then divide by the new exponent."

For constants:

$$\int k \, dx = kx + C$$

### How to Use

1. **Select a preset polynomial**: Click one of the four preset polynomials to load it
2. **Step through the process**: Click "Next Step" to reveal each term's integration
3. **Or integrate all at once**: Click "Integrate All" to see the complete solution immediately
4. **Adjust the constant C**: Use the slider to shift the antiderivative vertically and see the family of solutions
5. **Observe the graph**: Watch how the antiderivative (red) relates to the integrand (blue)

### Integration Steps Example

For the polynomial $f(x) = 2x^3 - 4x + 5$:

| Term | Rule Applied | Result |
|------|-------------|--------|
| $2x^3$ | Power rule: add 1, divide by 4 | $\frac{2}{4}x^4 = \frac{1}{2}x^4$ |
| $-4x$ | Power rule: $x^1$ becomes $x^2/2$ | $\frac{-4}{2}x^2 = -2x^2$ |
| $5$ | Constant rule | $5x$ |
| **Total** | Sum rule + C | $\frac{1}{2}x^4 - 2x^2 + 5x + C$ |

### Visual Features

- **Step-by-step table**: Shows each term, the rule applied, and the integrated result
- **Animated progression**: Steps fade in smoothly as you advance
- **Current step highlighting**: A pulsing border shows which step you're on
- **Dual graph display**: Blue curve shows the integrand $f(x)$, red curve shows the antiderivative $F(x)$
- **Interactive C slider**: Adjust the constant to see how it shifts the antiderivative vertically

!!! quote "Delta Moment"
    "Integration is like reverse engineering! When I see $2x^3$, I ask: 'What function, when differentiated, gives me this?' The answer: bump up the power to 4, divide by 4, and voila - $\frac{1}{2}x^4$ differentiates right back to $2x^3$!"

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Apply** the power rule for integration to polynomial terms
2. **Calculate** antiderivatives of polynomial functions term by term
3. **Execute** the complete integration process from start to finish
4. **Recognize** that antiderivatives form a family of curves differing by a constant

### Grade Level

High School (AP Calculus AB/BC) and Undergraduate Calculus I

### Duration

15-20 minutes for initial exploration; can be revisited for practice

### Prerequisites

Students should be familiar with:

- The power rule for differentiation
- Polynomial functions and their terms
- The concept that integration "reverses" differentiation
- Understanding of constants of integration

### Activities

#### Activity 1: Pattern Recognition (5 minutes)

Work through the first preset $2x^3 - 4x + 5$ step by step:

1. Watch how each term is integrated independently
2. Notice the pattern: exponent goes up by 1, coefficient divides by new exponent
3. Observe how the constant term becomes a linear term

#### Activity 2: Comparing Polynomials (10 minutes)

Try all four presets and compare:

1. $2x^3 - 4x + 5$ - cubic becomes quartic
2. $x^2 + 3x + 2$ - quadratic becomes cubic
3. $3x^3 - 2x^2 + x$ - no constant term, so no linear term in result
4. $-x^2 + 4$ - simple quadratic

For each, predict the antiderivative before clicking "Integrate All."

#### Activity 3: The Family of Antiderivatives (5 minutes)

Using any preset:

1. Complete the integration to see the graph
2. Slide the C slider from -5 to +5
3. Observe how the red curve (antiderivative) shifts vertically
4. Notice that the blue curve (integrand) stays fixed - the slope doesn't change!

### Discussion Questions

1. Why do we add "+ C" to every indefinite integral? (Answer: Because the derivative of any constant is zero, so we lose that information when differentiating)

2. What would happen if we tried to integrate $x^{-1}$ using the power rule? (Answer: We'd divide by zero! This is why $\int \frac{1}{x} dx = \ln|x| + C$ is a special case)

3. How does the degree of the polynomial change when we integrate? (Answer: It increases by 1 - if you integrate a quadratic, you get a cubic)

### Assessment

**Quick Check:**
Without using the MicroSim, find the antiderivatives:

1. $\int 6x^2 \, dx$
2. $\int (4x^3 - 2x + 7) \, dx$
3. $\int (x^2 - 5) \, dx$

**Exit Ticket:**
Given $f(x) = 3x^2 - 6x + 1$, find $F(x)$ such that $F'(x) = f(x)$ and $F(0) = 4$.

### Common Mistakes to Address

| Mistake | Example | Correction |
|---------|---------|------------|
| Forgetting + C | Writing $\int 2x \, dx = x^2$ | Must be $x^2 + C$ |
| Wrong power adjustment | $\int x^3 \, dx = \frac{x^3}{3}$ | Should be $\frac{x^4}{4}$ |
| Applying power rule to constants | $\int 5 \, dx = \frac{5x^1}{1}$ | The result $5x$ is correct, but it's simpler to think "constant times x" |
| Not simplifying | Leaving answer as $\frac{2}{4}x^4$ | Simplify to $\frac{1}{2}x^4$ |

## References

1. [Integration Rules - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-integration-new/ab-6-8a/a/basic-integration-rules) - Video explanations and practice problems

2. [Antiderivatives - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/ComputingIndefiniteIntegrals.aspx) - Detailed derivation and examples

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this visualization
