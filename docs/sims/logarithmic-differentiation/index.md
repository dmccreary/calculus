---
title: Logarithmic Differentiation
description: Step-by-step guide through the logarithmic differentiation process with color-coded transformations for products, quotients, and variable exponent functions.
image: /sims/logarithmic-differentiation/logarithmic-differentiation.png
og:image: /sims/logarithmic-differentiation/logarithmic-differentiation.png
twitter:image: /sims/logarithmic-differentiation/logarithmic-differentiation.png
quality_score: 85
social:
   cards: false
---

# Logarithmic Differentiation

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Logarithmic Differentiation MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Logarithmic Differentiation MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This interactive guide walks you through the logarithmic differentiation process step-by-step. Logarithmic differentiation is a powerful technique for finding derivatives of functions that involve:

- **Products** of multiple terms raised to powers
- **Quotients** with complicated numerators and denominators
- **Variable exponents** where both base and exponent contain the variable

The MicroSim uses color coding to highlight which logarithm property is being applied:

- **Blue** for product rule: ln(ab) = ln(a) + ln(b)
- **Red** for quotient rule: ln(a/b) = ln(a) - ln(b)
- **Green** for power rule: ln(a^n) = n*ln(a)

!!! quote "Delta Moment"
    "Logarithmic differentiation is like having a secret decoder ring for
    complicated derivatives. When you see x^x or products of many factors,
    just take the ln of both sides and watch the magic happen!"

## How to Use

1. **Select a category** from the buttons at the bottom:
   - Products: Functions like x^2(x+1)^3(x+2)^4
   - Quotients: Fractions like (x+1)^2/(x+2)^3
   - Powers: Functions like (sin x)^x
   - Variable Exp: Classic examples like x^x

2. **Click "Next Step"** to advance through the derivation process

3. **Click "Why?"** at any step to see an explanation of why that transformation works

4. **Click "Try It"** when available to test your understanding by selecting the correct log property

5. **Click "Reset"** to start the current example over

## Iframe Embedding

Copy this iframe to embed the MicroSim in your website:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/logarithmic-differentiation/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Learning Objectives

After using this MicroSim, students will be able to:

1. **Apply** logarithmic differentiation to find derivatives of complex products
2. **Calculate** derivatives of quotients using logarithmic differentiation
3. **Solve** derivative problems involving variable bases and exponents
4. **Identify** which logarithm property to apply at each step
5. **Explain** why logarithmic differentiation simplifies certain problems

## The Logarithmic Differentiation Process

### Step-by-Step Method

1. **Take the natural logarithm of both sides**: ln(y) = ln(f(x))
2. **Apply logarithm properties** to simplify the right side:
   - Product rule: ln(ab) = ln(a) + ln(b)
   - Quotient rule: ln(a/b) = ln(a) - ln(b)
   - Power rule: ln(a^n) = n*ln(a)
3. **Differentiate both sides** with respect to x:
   - Left side becomes (1/y)(dy/dx) by implicit differentiation
   - Right side uses standard differentiation rules
4. **Solve for dy/dx** by multiplying both sides by y
5. **Substitute** the original expression for y

### When to Use Logarithmic Differentiation

Use this technique when you encounter:

- Products of many factors: y = f(x)*g(x)*h(x)*...
- Complex quotients: y = f(x)/g(x) with powers
- Variable exponents: y = f(x)^g(x)
- Any combination of the above

## Lesson Plan

### Grade Level
High School (Grades 11-12) or Early College (Calculus I)

### Duration
20-30 minutes for guided exploration

### Prerequisites
- Natural logarithm and its properties
- Implicit differentiation
- Chain rule
- Product and quotient rules

### Warm-Up Questions (5 minutes)
1. What is d/dx[ln(x)]?
2. If ln(y) = x^2, what is dy/dx? (Hint: use implicit differentiation)
3. Simplify: ln(x^3) + ln(x^2)

### Guided Exploration (15 minutes)

1. **Start with Products**
   - Work through the first example completely
   - Notice how products become sums after taking ln
   - Sums are much easier to differentiate than products!

2. **Try the "Why?" Button**
   - Read explanations to understand the reasoning
   - Connect each step to logarithm properties you learned

3. **Test Yourself with "Try It"**
   - Can you predict which property to apply?
   - Immediate feedback helps build intuition

4. **Explore Variable Exponents**
   - Try y = x^x - the classic example
   - Notice: this cannot be done with regular rules alone!

### Practice Problems

After using the MicroSim, try these on paper:

1. y = x^3(x+1)^4
2. y = (x-1)/(x+1)^2
3. y = x^(sin x)
4. y = (cos x)^x

### Assessment Ideas

1. **Exit Ticket**: Given y = x^2(x+3)^5, set up the first two steps of logarithmic differentiation
2. **Quiz**: Find d/dx[x^x] using logarithmic differentiation (show all steps)
3. **Extension**: When would you NOT want to use logarithmic differentiation?

## Mathematical Background

### Why It Works

Logarithmic differentiation exploits three key properties:

$$\ln(ab) = \ln(a) + \ln(b)$$

$$\ln\left(\frac{a}{b}\right) = \ln(a) - \ln(b)$$

$$\ln(a^n) = n\ln(a)$$

These properties convert:
- **Multiplication** into **addition**
- **Division** into **subtraction**
- **Exponentiation** into **multiplication**

Since derivatives of sums/differences are easier than derivatives of products/quotients, logarithmic differentiation simplifies complex expressions.

### Example: Finding d/dx[x^x]

$$y = x^x$$

$$\ln(y) = \ln(x^x) = x\ln(x)$$

$$\frac{1}{y}\frac{dy}{dx} = \ln(x) + x \cdot \frac{1}{x} = \ln(x) + 1$$

$$\frac{dy}{dx} = y(\ln(x) + 1) = x^x(\ln(x) + 1)$$

### Example Functions in This MicroSim

| Category | Example | Key Challenge |
|----------|---------|---------------|
| Products | y = x^2(x+1)^3(x+2)^4 | Multiple factors with powers |
| Quotients | y = (x+1)^2/(x+2)^3 | Fraction with exponents |
| Powers | y = (sin x)^x | Variable in base and exponent |
| Variable Exp | y = x^x | Classic logarithmic diff example |

## Common Mistakes to Avoid

1. **Forgetting the chain rule on ln(y)**: The left side becomes (1/y)(dy/dx), not just 1/y
2. **Not substituting y back**: The final answer should not contain y
3. **Sign errors in quotients**: Remember ln(a/b) = ln(a) - ln(b) (subtraction!)
4. **Applying log rules incorrectly**: ln(a+b) does NOT equal ln(a) + ln(b)

## References

1. [Logarithmic Differentiation - Wikipedia](https://en.wikipedia.org/wiki/Logarithmic_derivative) - Mathematical background on the technique
2. [Logarithm Properties - Khan Academy](https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:logs/x2ec2f6f830c9fb89:log-prop/v/introduction-to-logarithm-properties) - Review of logarithm properties
3. [Implicit Differentiation - Paul's Online Notes](https://tutorial.math.lamar.edu/Classes/CalcI/ImplicitDiff.aspx) - Detailed explanation of implicit differentiation
4. [AP Calculus AB Course Description - College Board](https://apcentral.collegeboard.org/courses/ap-calculus-ab) - Official curriculum including logarithmic differentiation
