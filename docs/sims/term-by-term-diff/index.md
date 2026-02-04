---
title: Term by Term Differentiation
description: An interactive MicroSim showing how polynomial differentiation works term by term, with each term's contribution to the derivative highlighted using the power rule, constant multiple rule, and sum rule.
quality_score: 85
image: /sims/term-by-term-diff/term-by-term-diff.png
og:image: /sims/term-by-term-diff/term-by-term-diff.png
twitter:image: /sims/term-by-term-diff/term-by-term-diff.png
social:
   cards: false
---

# Term by Term Differentiation

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Term by Term Differentiation MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the MicroSim with the p5.js editor](https://editor.p5js.org/)

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/term-by-term-diff/main.html" height="482px" width="100%" scrolling="no"></iframe>
```

## Description

This MicroSim demonstrates the step-by-step process of differentiating polynomials by showing how each term is individually differentiated using the power rule, and then combined using the sum rule. The visualization makes the abstract process of differentiation concrete by displaying:

- **Original Terms**: Each term of the polynomial displayed in its own row
- **Rules Applied**: The specific differentiation rule used for each term (Power Rule, Constant Rule)
- **Results**: The derivative of each individual term
- **Final Answer**: The complete derivative assembled from all individual term results

### How to Use

1. **Select a Polynomial**: Use the dropdown menu to choose from preset polynomials of varying complexity
2. **Step Through**: Click "Next Step" to see each term differentiated one at a time, with highlighting to show the current term being processed
3. **Show All**: Click "Show All" to instantly reveal all differentiation steps and the final answer
4. **Reset**: Click "Reset" to start over with the same polynomial
5. **Toggle Graph View**: Check "Show Graph" to see the original function f(x) in blue and its derivative f'(x) in green plotted together

### Rules Demonstrated

| Rule | Description | Example |
|------|-------------|---------|
| Power Rule | d/dx(x^n) = nx^(n-1) | d/dx(x^4) = 4x^3 |
| Constant Multiple Rule | d/dx(cf(x)) = c * f'(x) | d/dx(3x^4) = 3 * 4x^3 = 12x^3 |
| Constant Rule | d/dx(c) = 0 | d/dx(7) = 0 |
| Sum/Difference Rule | d/dx(f + g) = f' + g' | Combines all term derivatives |

!!! quote "Delta Moment"
    "See how each term gets its own makeover? The power rule is like a recipe: bring down the exponent, multiply, then subtract one from the power. Do that for each term, add them all up, and you have your derivative!"

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Apply** the power rule to differentiate polynomial terms (Bloom Level 3)
2. **Calculate** derivatives of polynomials by applying the sum/difference rule (Bloom Level 3)
3. **Execute** the step-by-step procedure for polynomial differentiation (Bloom Level 3)

### Target Audience

- AP Calculus AB/BC students
- High school students (grades 11-12)
- College students in Calculus I

### Prerequisites

- Understanding of polynomial functions
- Knowledge of exponent rules
- Introduction to the concept of derivatives

### Activity: Predict-Then-Reveal

**Time**: 15-20 minutes

1. **Warm-up** (3 min): Review the power rule formula: d/dx(x^n) = nx^(n-1)

2. **Prediction Phase** (5 min):
   - Display the polynomial 3x^4 - 2x^2 + 5x - 7
   - Have students write down their prediction for each term's derivative
   - Create a table in their notes matching the MicroSim layout

3. **Verification Phase** (7 min):
   - Use "Next Step" to reveal each derivative one at a time
   - Students check their predictions and correct any errors
   - Discuss any surprises (especially the constant term becoming 0)

4. **Independent Practice** (5 min):
   - Students select different presets and predict before revealing
   - Toggle "Show Graph" to visualize the relationship between f(x) and f'(x)

### Assessment

- **Formative**: Monitor student predictions during the activity
- **Summative**: Provide 3-5 polynomials for students to differentiate without the MicroSim, then verify with the tool

### Extension Activities

1. Have students create their own polynomial and manually calculate the derivative, then verify using the graph view
2. Discuss patterns: What happens to the degree of a polynomial when you differentiate?
3. Challenge: Predict where f'(x) = 0 based on the graph of f(x)

## References

1. [Power Rule - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-5/a/power-rule-review) - Comprehensive review of the power rule with examples and practice problems

2. [Derivative Rules - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/DiffFormulas.aspx) - Complete reference for basic differentiation formulas including power rule and constant multiple rule

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used to create this MicroSim
