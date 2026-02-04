---
title: Growth Rate Comparison
description: Compare growth rates of logarithmic, polynomial, and exponential functions to understand which dominates as x approaches infinity.
quality_score: 85
image: /sims/growth-rates/growth-rates.png
og:image: /sims/growth-rates/growth-rates.png
twitter:image: /sims/growth-rates/growth-rates.png
social:
   cards: false
---
# Growth Rate Comparison

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run the Growth Rate Comparison MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Growth Rate Comparison MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim visualizes one of calculus's most important insights: **not all infinities grow at the same rate**. When comparing functions as x approaches infinity, some functions completely dominate others.

The dominance hierarchy is:

1. **Logarithmic functions** (slowest growth) - ln(x), log10(x)
2. **Polynomial functions** (medium growth) - sqrt(x), x, x^2, x^3
3. **Exponential functions** (fastest growth) - 2^x, e^x, 10^x

This hierarchy has profound implications for evaluating limits of the form infinity/infinity or determining which term dominates in complex expressions.

!!! quote "Delta Moment"
    "At x = 10, these functions look like they're in a close race. But watch what happens as we zoom out to x = 1000... the exponential just LEAVES everyone in the dust! It's not even close!"

## How to Use

1. **Select Functions**: Use the checkboxes to enable/disable different functions for comparison
2. **Adjust X-Range**: Drag the slider to change the viewing window (10 to 1000)
3. **Race to Infinity**: Click "Race!" to watch the functions grow in real-time
4. **Toggle Y-Scale**: Switch between Linear and Logarithmic y-axis to see different scales
5. **Ratio Mode**: Compare two functions directly by viewing their ratio

## Key Observations

**Stage 1 (x = 1 to 10)**: Functions appear similar in magnitude
- At x = 10: ln(10) = 2.3, x^2 = 100, e^x = 22,026

**Stage 2 (x = 10 to 100)**: Polynomial dominates logarithmic
- Polynomial powers start separating from each other

**Stage 3 (x = 100 to 1000)**: Exponential completely dominates
- e^1000 is astronomically larger than any polynomial

## Embedding

Place the following line in your website to include this MicroSim:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/growth-rates/main.html" height="522px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will compare growth rates of logarithmic, polynomial, and exponential functions to predict limit behavior.

### Bloom's Taxonomy Level

**Evaluate (L5)** - Students judge the relative growth rates and predict which function dominates in limit calculations.

### Prerequisites

- Understanding of basic function families (log, polynomial, exponential)
- Familiarity with limits and infinity
- Knowledge of indeterminate forms (infinity/infinity)

### Warm-Up Activity (5 minutes)

Ask students to predict:
- Which is bigger at x = 10: x^2 or 2^x?
- Which is bigger at x = 100: x^2 or 2^x?
- At what point does 2^x "pass" x^2?

### Guided Exploration (15 minutes)

1. **Stage 1: Small Scale**
   - Set x-range to 10
   - Enable ln(x), x^2, and e^x
   - Observe that they appear somewhat comparable
   - Click "Race!" and note the starting values

2. **Stage 2: Medium Scale**
   - Increase x-range to 100
   - Watch the polynomial pull ahead of logarithmic
   - Note that exponential is starting to accelerate

3. **Stage 3: Large Scale**
   - Increase x-range to 1000
   - Switch to logarithmic y-scale (necessary to even see all functions!)
   - Observe the exponential completely dominating

4. **Ratio Analysis**
   - Enable Ratio Mode
   - Compare ln(x)/x - ratio approaches 0 (x dominates)
   - Compare x/e^x - ratio approaches 0 (e^x dominates)
   - Compare x^2/x^3 - ratio approaches 0 (higher power dominates)

### Key Questions for Discussion

1. If you're evaluating lim(x->infinity) of ln(x)/x^2, what's the answer? Why?
2. In L'Hopital's rule for infinity/infinity forms, why do exponentials always "win"?
3. How does this help us evaluate limits like lim(x->infinity) (x^100)/(2^x)?

### Independent Practice

Have students predict the limit of these ratios, then verify with the MicroSim:

1. lim(x->infinity) sqrt(x)/x
2. lim(x->infinity) x^2/e^x
3. lim(x->infinity) ln(x)/sqrt(x)
4. lim(x->infinity) 10^x/e^x

### Assessment

Students demonstrate understanding by:
- Correctly predicting which function dominates in various comparisons
- Explaining why "infinity/infinity" is indeterminate (depends on which infinity!)
- Using growth rate knowledge to evaluate limits without L'Hopital's rule
- Creating their own examples of each dominance relationship

### Extension: The Dominance Ladder

Challenge students to arrange these functions from slowest to fastest growth:
- ln(ln(x))
- ln(x)
- sqrt(x)
- x
- x*ln(x)
- x^2
- x^3
- e^x
- x!
- x^x

## Mathematical Background

The formal statement of dominance is:

$$\lim_{x \to \infty} \frac{\ln(x)}{x^a} = 0 \quad \text{for any } a > 0$$

$$\lim_{x \to \infty} \frac{x^n}{e^x} = 0 \quad \text{for any } n$$

These facts mean:
- Any positive power of x eventually beats any logarithm
- Any exponential eventually beats any polynomial

## References

- [Growth of Functions - Wikipedia](https://en.wikipedia.org/wiki/Big_O_notation#Orders_of_common_functions) - Comprehensive overview of function growth rates and Big O notation
- [Khan Academy: Comparing Exponential and Polynomial Growth](https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:exp/x2ec2f6f830c9fb89:exp-vs-linear/v/exponential-vs-linear-growth) - Video explanation of why exponentials dominate polynomials
- [Paul's Online Math Notes: L'Hopital's Rule](https://tutorial.math.lamar.edu/classes/calci/lhospitalsrule.aspx) - Applications of growth rate comparisons in limit evaluation
