---
title: Integration Verifier
description: Interactive tool to verify integration results by differentiating the proposed antiderivative and comparing to the original integrand.
image: /sims/integration-verifier/integration-verifier.png
og:image: /sims/integration-verifier/integration-verifier.png
twitter:image: /sims/integration-verifier/integration-verifier.png
quality_score: 85
social:
   cards: false
---

# Integration Verifier

<iframe src="main.html" height="620px" width="100%" scrolling="no"></iframe>

[Run Integration Verifier Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/integration-verifier/main.html" height="620px" width="100%" scrolling="no"></iframe>
```

## Description

The Integration Verifier reinforces one of the most important habits in calculus: checking your integration work by differentiating the answer. This MicroSim presents integration problems with proposed antiderivatives and walks students through the verification process step by step.

### The Verification Principle

Integration and differentiation are inverse operations. If F(x) is the antiderivative of f(x), then:

$$\frac{d}{dx}[F(x)] = f(x)$$

This means you can always check an indefinite integral by differentiating your answer. If the derivative matches the original integrand, your antiderivative is correct.

### How to Use

1. **View the problem**: See the integrand f(x) and the proposed antiderivative F(x)
2. **Make a prediction**: Before clicking, predict whether the proposed answer is correct
3. **Check the answer**: Click "Check My Answer" to see the verification
4. **View the steps**: Click "Show Steps" to see the complete differentiation process
5. **Navigate examples**: Use Next/Prev or click the dots to explore different examples

### Visual Features

- **Two-panel display**: Left panel shows the integration problem, right panel shows verification
- **Color-coded results**: Green border for correct, red border for incorrect
- **Step-by-step differentiation**: See exactly how to verify by differentiation
- **Error identification**: When incorrect, the specific error type is highlighted
- **Example indicators**: Dots at bottom show which examples are correct vs. contain errors

!!! quote "Delta Moment"
    "Here's my secret weapon: whenever I find an antiderivative, I differentiate it right away to check. It's like checking your GPS against the actual landmarks - takes an extra second but saves you from going miles in the wrong direction!"

## Common Integration Errors

This MicroSim includes examples of common errors students make:

| Error Type | Example | What Went Wrong |
|------------|---------|-----------------|
| Sign Error | Integrating sin(x) as cos(x)+C | Forgot the negative: should be -cos(x)+C |
| Coefficient Error | Integrating 6x^2 as 3x^3+C | Wrong coefficient: should be 2x^3+C |
| Chain Rule Error | Integrating cos(2x) as sin(2x)+C | Missing the 1/2 factor: should be (1/2)sin(2x)+C |

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Verify** an antiderivative by differentiating it
2. **Identify** common integration errors through differentiation
3. **Analyze** proposed antiderivatives to determine correctness
4. **Apply** differentiation rules systematically to check integration work

### Grade Level

High School (AP Calculus AB/BC) and Undergraduate Calculus I/II

### Duration

15-20 minutes for exploration; recommended as ongoing practice tool

### Prerequisites

Students should be familiar with:

- Basic differentiation rules (power rule, constant multiple, sum/difference)
- Derivatives of trigonometric functions
- Derivatives of exponential and logarithmic functions
- Chain rule and product rule for differentiation
- Basic antiderivatives

### Activities

#### Activity 1: Build the Verification Habit (5 minutes)

Work through the first four examples:

1. Integral of 2x with answer x^2 + C (correct)
2. Integral of 3x^2 with answer x^3 (correct but missing +C)
3. Integral of cos(x) with answer sin(x) + C (correct)
4. Integral of sin(x) with answer cos(x) + C (incorrect - sign error)

For each, predict whether it's correct before clicking Check.

#### Activity 2: Spot the Errors (10 minutes)

Navigate to find all the incorrect examples. For each:

1. Try to identify what's wrong before checking
2. Click "Show Steps" to see where the error becomes apparent
3. Write down the correct antiderivative

There are 3 incorrect examples to find:

- Example 4: sin(x) integral (sign error)
- Example 8: 6x^2 integral (coefficient error)
- Example 9: cos(2x) integral (chain rule error)

#### Activity 3: Create Your Own (5 minutes)

Without the MicroSim, write down:

1. An integral and its correct antiderivative
2. An integral with a deliberately wrong antiderivative

Exchange with a partner and verify each other's answers by differentiation.

### Discussion Questions

1. Why is verification by differentiation always reliable? (Answer: Because differentiation is the inverse of integration - if F'(x) = f(x), then F(x) is definitely an antiderivative of f(x))

2. What's the most common error you've seen, and how does verification catch it? (Students share experiences)

3. When checking an answer like sin(2x) + C, what rules do you need to apply? (Answer: Chain rule - you need to multiply by the derivative of the inside function)

4. Why might students skip the verification step, and how can we build better habits? (Discussion of time pressure vs. accuracy)

### Assessment

**Quick Check:**
Verify the following by differentiation (without the MicroSim):

1. Is x^4 + C the antiderivative of 4x^3? (Yes)
2. Is e^(2x) + C the antiderivative of e^(2x)? (No - missing the 1/2 factor)
3. Is tan(x) + C the antiderivative of sec^2(x)? (Yes)

**Exit Ticket:**
Given that a student claims the antiderivative of x*cos(x) is x*sin(x) + C, verify this claim and explain whether it's correct or incorrect. (It's incorrect - by product rule, d/dx[x*sin(x)] = sin(x) + x*cos(x), not x*cos(x))

### Common Mistakes to Address

| Mistake | How Verification Catches It |
|---------|----------------------------|
| Forgetting +C | Doesn't affect derivative, but remind students it's needed |
| Sign errors with trig | Derivative won't match: d/dx[cos(x)] = -sin(x), not sin(x) |
| Missing chain rule factor | Derivative includes extra factor: d/dx[sin(2x)] = 2cos(2x) |
| Wrong power in power rule | Exponent will be off by 1 when differentiating |

## Tips for Teachers

This MicroSim works well as:

- **Warm-up activity**: Start class with 2-3 verification problems
- **Error analysis exercise**: Have students find all incorrect examples
- **Paired practice**: Partners create and verify each other's integrals
- **Self-checking tool**: Students use during homework to verify their work

!!! quote "Delta's Study Tip"
    "I keep a 'verification checklist' in my notebook: Power rule? Check. Chain rule needed? Check. Sign correct? Check. It takes 30 seconds to verify and can save you from losing points on an entire problem!"

## References

1. [Antiderivatives - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-integration-new/ab-6-7/a/antiderivatives-review) - Review of basic antiderivatives

2. [Checking Integrals - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/ComputingIndefiniteIntegrals.aspx) - Computing and verifying indefinite integrals

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this visualization
