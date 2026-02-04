---
title: u-Substitution Steps
description: Interactive step-by-step guide to applying u-substitution for evaluating integrals with color-coded tracking of u and du through each transformation.
image: /sims/u-substitution/screenimage.png
og:image: /sims/u-substitution/screenimage.png
twitter:image: /sims/u-substitution/screenimage.png
quality_score: 85
social:
   cards: false
---

# u-Substitution Steps

<iframe src="main.html" height="572px" width="100%" scrolling="no"></iframe>

[Run u-Substitution Steps Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/u-substitution/main.html" height="572px" width="100%" scrolling="no"></iframe>
```

## Description

The u-Substitution Steps MicroSim breaks down the u-substitution process into five explicit steps, helping students internalize the systematic procedure for evaluating integrals using substitution. Each step is revealed sequentially with color-coded highlighting that distinguishes u (blue) from du (green).

### The u-Substitution Method

For an integral of the form $\int f(g(x)) \cdot g'(x) \, dx$:

$$\text{Let } u = g(x), \quad du = g'(x) \, dx$$

$$\int f(g(x)) \cdot g'(x) \, dx = \int f(u) \, du$$

Or in words: "Find the inside function, call it u, replace everything, integrate, then substitute back."

### How to Use

1. **Select an example integral**: Click one of the six preset integrals at the bottom
2. **Step through the process**: Click "Next Step" to reveal each step of the substitution
3. **Or show all at once**: Click "Show All" to see the complete solution immediately
4. **Verify your answer**: Click "Verify" to see the derivative check confirming the answer
5. **Reset and try another**: Click "Reset" to start over with the same integral, or select a new one

### The Five Steps

| Step | Action | Example with $\int 2x \cos(x^2) \, dx$ |
|------|--------|----------------------------------------|
| 1 | Identify u (inside function) | $u = x^2$ |
| 2 | Calculate du | $du = 2x \, dx$ |
| 3 | Rewrite in terms of u | $\int \cos(u) \, du$ |
| 4 | Integrate in u | $\sin(u) + C$ |
| 5 | Back-substitute | $\sin(x^2) + C$ |

### Visual Features

- **Color coding**: Blue highlights u throughout, green highlights du
- **Animated progression**: Steps fade in smoothly as you advance
- **Current step highlighting**: A pulsing border shows which step you are on
- **Verification panel**: Shows the derivative check to confirm your answer
- **Animated arrow**: Points to the next step to reveal

!!! quote "Delta Moment"
    "u-substitution is like putting on a disguise. The integral looks complicated, but once you substitute, it becomes something you already know how to handle. Then you unmask at the end. Very sneaky, very satisfying!"

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Apply** u-substitution systematically to evaluate integrals
2. **Identify** the correct choice of u in an integrand
3. **Execute** the five-step substitution procedure
4. **Implement** u-substitution across various function types (trig, exponential, polynomial, radical)

### Grade Level

High School (AP Calculus AB/BC) and Undergraduate Calculus I

### Duration

15-20 minutes for initial exploration; can be revisited for practice

### Prerequisites

Students should be familiar with:

- Basic antiderivative rules (power rule, trig integrals, exponential integrals)
- The chain rule for differentiation
- The concept of composite functions
- Differential notation (du, dx)

### Activities

#### Activity 1: Recognizing the Pattern (5 minutes)

Work through the first two examples:

1. $\int 2x \cos(x^2) \, dx$ -- the derivative of the inside function appears directly
2. $\int (2x+3)^4 \, dx$ -- need to solve for dx in terms of du

For each, identify: What is u? What is du? Does du appear in the integral?

#### Activity 2: Building Complexity (10 minutes)

Move to the remaining examples and work through each:

1. $\int x\sqrt{x^2+1} \, dx$ -- only part of du appears (constant adjustment needed)
2. $\int \sin^3(x)\cos(x) \, dx$ -- recognizing trig substitution patterns
3. $\int e^{3x} \, dx$ -- exponential with linear inner function
4. $\int \cos(x)/\sin(x) \, dx$ -- rational form leading to logarithm

Compare Step 2 across examples: when does du appear exactly vs. needing adjustment?

#### Activity 3: Verification Practice (5 minutes)

For each example, click "Verify" and trace through the chain rule differentiation:

1. Does differentiating the answer give back the original integrand?
2. How does the chain rule connect to u-substitution?

### Discussion Questions

1. Why is u-substitution called the "reverse chain rule"? (Answer: It undoes the chain rule pattern in the integrand)
2. What makes a good choice for u? (Answer: Look for a function whose derivative also appears in the integrand)
3. What happens if you choose the wrong u? (Answer: The substitution won't simplify the integral; try a different choice)
4. Why do we always verify by differentiating? (Answer: Integration is harder than differentiation, so checking catches errors)

### Assessment

**Quick Check:**
Without using the MicroSim, identify u and du for:

1. $\int 3x^2 \sin(x^3) \, dx$
2. $\int \frac{e^x}{1 + e^x} \, dx$
3. $\int x(x^2 - 4)^6 \, dx$

**Exit Ticket:**
Evaluate $\int \frac{\cos(\ln x)}{x} \, dx$ showing all five steps of your work.

### Common Mistakes to Address

| Mistake | Example | Correction |
|---------|---------|------------|
| Forgetting to substitute dx | $\int (2x+3)^4 \, dx = \int u^4$ | Must replace dx with du/2: $\frac{1}{2}\int u^4 \, du$ |
| Not back-substituting | Final answer left as $\frac{u^5}{10} + C$ | Must replace u: $\frac{(2x+3)^5}{10} + C$ |
| Variable adjustment error | Putting x inside the integral after substitution | After substitution, no x should remain |
| Wrong choice of u | Choosing $u = \cos(x^2)$ for $\int 2x\cos(x^2) \, dx$ | Choose the inside function: $u = x^2$ |

## References

1. [u-Substitution - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-integration-new/ab-6-9/a/u-substitution-review) - Video explanations and practice problems

2. [Integration by Substitution - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/SubstitutionRuleIndefinite.aspx) - Detailed derivation and examples

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this visualization
