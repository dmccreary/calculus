---
title: Power Rule Integration
description: Interactive visualization showing the relationship between derivative and integral power rules with bidirectional arrows and step-by-step verification.
image: /sims/power-rule-integration/power-rule-integration.png
og:image: /sims/power-rule-integration/power-rule-integration.png
twitter:image: /sims/power-rule-integration/power-rule-integration.png
quality_score: 85
social:
   cards: false
---

# Power Rule Integration

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run Power Rule Integration Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/power-rule-integration/main.html" height="562px" width="100%" scrolling="no"></iframe>
```

## Description

The Power Rule Integration MicroSim visualizes how the derivative power rule and the integration power rule are inverse operations. A bidirectional diagram shows the relationship between f(x) = x^n and its antiderivative F(x) = x^(n+1)/(n+1), with arrows indicating the transformation in each direction.

### The Power Rule for Integration

For any real number n where n is not -1:

$$\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$$

This is the reverse of the power rule for derivatives:

$$\frac{d}{dx}\left[\frac{x^{n+1}}{n+1}\right] = x^n$$

### How to Use

1. **Adjust the exponent**: Use the slider to choose different values of n (from -3 to 6, noting that n = -1 is a special case)
2. **Step through the calculation**: Click "Next Step" to see each stage of the integration or differentiation process
3. **Toggle direction**: Switch between viewing the integration process (left arrow) or the differentiation process (right arrow)
4. **Observe the graphs**: Watch how both the function and its antiderivative change as you adjust n
5. **Verify numerically**: Check the example calculations at x = 2 to confirm your understanding

### The Four Steps

| Step | Integration Direction | Derivative Direction |
|------|----------------------|---------------------|
| 1 | Start with f(x) = x^n | Start with F(x) = x^(n+1)/(n+1) |
| 2 | Add 1 to exponent | Multiply by exponent |
| 3 | Divide by new exponent | Subtract 1 from exponent |
| 4 | Verify by differentiating | Result is f(x) = x^n |

### Visual Features

- **Bidirectional arrows**: Show that differentiation and integration are inverse operations
- **Color coding**: Orange for integration, blue for differentiation
- **Step-by-step breakdown**: Each calculation stage is revealed sequentially
- **Live graphs**: See both functions plotted simultaneously
- **Numerical verification**: Confirm results with specific x values

!!! quote "Delta Moment"
    "Integration is like climbing back up a slide I just went down. If differentiating x^3 gave me 3x^2 by bringing down the 3 and reducing the power, then integrating x^2 means I add 1 to get x^3 and divide by 3 to undo that multiplication. It's like rewinding a video!"

### Special Case: n = -1

When n = -1, the power rule doesn't work because you'd be dividing by zero. Instead:

$$\int x^{-1} \, dx = \int \frac{1}{x} \, dx = \ln|x| + C$$

The MicroSim highlights this special case when you select n = -1.

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Apply** the power rule for integration to find antiderivatives
2. **Calculate** integrals of polynomial terms
3. **Use** differentiation to verify integration results
4. **Recognize** that integration and differentiation are inverse operations

### Grade Level

High School (AP Calculus AB/BC) and Undergraduate Calculus I

### Duration

15-20 minutes for initial exploration; can be revisited for practice

### Prerequisites

Students should be familiar with:

- The power rule for derivatives
- Exponent rules (adding, subtracting exponents)
- The concept of antiderivatives
- Basic polynomial manipulation

### Activities

#### Activity 1: Pattern Discovery (5 minutes)

1. Start with n = 2 and step through the integration process
2. Verify by switching to derivative direction
3. Repeat for n = 3, 4, 5
4. Ask: What pattern do you notice in the relationship between n and the resulting coefficient?

#### Activity 2: Negative Exponents (5 minutes)

1. Set n = -2 and observe the integration
2. Try n = -3
3. Now try n = -1 and observe the special case warning
4. Discuss: Why doesn't the power rule work when n = -1?

#### Activity 3: Verification Practice (5 minutes)

For each of these, use the MicroSim to find the integral, then verify by differentiating:

1. x^4
2. x^(-2)
3. x^0 (constant)
4. x^(1/2) (if your teacher has introduced fractional exponents)

### Discussion Questions

1. Why do we add 1 to the exponent when integrating? (Hint: Think about what happens when we differentiate)
2. Why do we divide by the new exponent? (Hint: Undo the multiplication that happens in differentiation)
3. What does the "+C" represent and why is it necessary?
4. How does the graph of F(x) relate to the graph of f(x)?

### Assessment

**Quick Check:**
Without using the MicroSim, find:

1. The integral of x^5 dx
2. The integral of x^(-4) dx
3. The integral of 1 dx (hint: 1 = x^0)

**Exit Ticket:**
Find the integral of 3x^4 dx and verify your answer by differentiating.

### Common Mistakes to Address

| Mistake | Example | Correction |
|---------|---------|------------|
| Forgetting to add 1 | integral of x^3 = x^3/3 | Should be x^4/4 |
| Forgetting to divide | integral of x^3 = x^4 | Should be x^4/4 |
| Wrong sign with negatives | integral of x^(-2) = x^(-1) | Should be x^(-1)/(-1) = -x^(-1) |
| Using rule for n=-1 | integral of x^(-1) = x^0/0 | Use ln|x| instead |
| Forgetting +C | integral of x^2 = x^3/3 | Should include +C |

## References

1. [Power Rule for Integration - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-integration-new/ab-6-8a/a/reverse-power-rule-review) - Video explanations and practice problems

2. [Basic Integration Rules - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/IntegralsIntro.aspx) - Detailed derivation and examples

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this visualization
