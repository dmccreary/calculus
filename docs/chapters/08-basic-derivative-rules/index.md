---
title: Basic Derivative Rules
description: Essential rules for computing derivatives efficiently
generated_by: claude skill chapter-content-generator
date: 2026-02-03 11:00:00
version: 0.03
---

# Basic Derivative Rules

## Summary

This chapter introduces the fundamental rules for computing derivatives without using the limit definition. Students will learn the constant rule, power rule, and the linearity properties (sum, difference, and constant multiple rules). These rules enable efficient differentiation of polynomial functions and expressions with negative and fractional exponents. After completing this chapter, students will be able to quickly differentiate polynomial functions and understand the foundation for more complex derivative rules.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Derivative Rules
2. Constant Rule
3. Power Rule Derivative
4. Sum Rule Derivative
5. Difference Rule Deriv
6. Constant Multiple Deriv
7. Linear Combination
8. Polynomial Derivative
9. Derivative of x to n
10. Negative Exponent Deriv
11. Fractional Exponent
12. Derivative of Root
13. Product Rule
14. Product Rule Formula
15. Quotient Rule

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: The Derivative Concept](../06-derivative-concept/index.md)
- [Chapter 7: Differentiability](../07-differentiability/index.md)

---

## Introduction: From Definition to Efficiency

In Chapter 6, we learned to find derivatives using the limit definition:

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

This definition is powerful and fundamental—but it's also slow. Imagine computing every derivative from scratch using limits! Fortunately, mathematicians have developed rules that let us differentiate quickly and reliably.

!!! quote "Delta Moment"
    "The limit definition taught me what a derivative IS. These rules teach me how to find one FAST. It's like the difference between walking everywhere and learning to ride a bike!"

In this chapter, you'll learn a toolkit of derivative rules that will serve you throughout calculus. Once you master these, you'll be able to differentiate most functions in seconds.

## The Constant Rule

Let's start with the simplest case: the derivative of a constant function.

!!! tip "The Constant Rule"
    If $f(x) = c$ where $c$ is a constant, then $f'(x) = 0$.

    In Leibniz notation: $\frac{d}{dx}[c] = 0$

**Why does this make sense?**

A constant function has the same output no matter what the input is. Its graph is a horizontal line with slope 0. Since the derivative measures how fast the function changes, and a constant doesn't change at all, its derivative is zero.

**Proof using the limit definition:**

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{h \to 0} \frac{c - c}{h} = \lim_{h \to 0} \frac{0}{h} = 0$$

**Examples:**

- If $f(x) = 5$, then $f'(x) = 0$
- If $g(x) = -17$, then $g'(x) = 0$
- If $h(x) = \pi$, then $h'(x) = 0$

Remember: $\pi$, $e$, $\sqrt{2}$, and other irrational numbers are still constants!

## The Power Rule

The power rule is the workhorse of differentiation—you'll use it more than any other rule.

!!! tip "The Power Rule"
    If $f(x) = x^n$ where $n$ is any real number, then $f'(x) = nx^{n-1}$.

    In Leibniz notation: $\frac{d}{dx}[x^n] = nx^{n-1}$

The pattern is simple: bring down the exponent as a coefficient, then reduce the exponent by 1.

**Examples with positive integer exponents:**

| Function | Derivative | Work |
|----------|------------|------|
| $x^5$ | $5x^4$ | Bring down 5, subtract 1 from exponent |
| $x^3$ | $3x^2$ | Bring down 3, subtract 1 from exponent |
| $x^2$ | $2x^1 = 2x$ | Bring down 2, subtract 1 from exponent |
| $x^1 = x$ | $1 \cdot x^0 = 1$ | Bring down 1, $x^0 = 1$ |

!!! note "Special Case: $x^1$"
    The derivative of $f(x) = x$ is $f'(x) = 1$. This makes sense: $y = x$ is a line with slope 1.

**Proof for positive integers (using the binomial theorem):**

For $f(x) = x^n$:

$$f'(x) = \lim_{h \to 0} \frac{(x+h)^n - x^n}{h}$$

Expanding $(x+h)^n = x^n + nx^{n-1}h + (\text{terms with } h^2, h^3, \ldots)$:

$$= \lim_{h \to 0} \frac{nx^{n-1}h + (\text{higher powers of }h)}{h} = \lim_{h \to 0} [nx^{n-1} + (\text{terms with }h)] = nx^{n-1}$$

#### Diagram: Power Rule Pattern Explorer

<iframe src="../../sims/power-rule-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Power Rule Pattern Explorer MicroSim</summary>
Type: microsim

Purpose: Visualize the power rule by showing how $x^n$ and its derivative $nx^{n-1}$ relate graphically.

Learning Objective: Students will apply the power rule to compute derivatives (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, calculate, demonstrate

Visual elements:

- Two panels: Left shows $f(x) = x^n$, Right shows $f'(x) = nx^{n-1}$
- Moving point on left curve with tangent line
- Corresponding point on right curve showing derivative value
- Display of the power rule calculation: $\frac{d}{dx}[x^n] = nx^{n-1}$

Interactive controls:

- Slider: Choose exponent n (range: -3 to 5, including fractions)
- Slider: Move point along the x-axis
- Toggle: Show/hide tangent line on left panel
- Display: Current x, $f(x)$, $f'(x)$, tangent slope

Behavior:

- Changing n updates both graphs immediately
- Moving x-position updates point and tangent
- Tangent slope on left always equals y-value on right
- Works for positive, negative, and fractional exponents

Instructional Rationale: Seeing the visual relationship between function and derivative for various powers builds pattern recognition and confidence with the rule.

Implementation: p5.js with dual-panel display
</details>

## Negative Exponents and the Power Rule

The power rule works for negative exponents too. This lets us differentiate functions like $\frac{1}{x}$, $\frac{1}{x^2}$, etc.

**Key insight:** Rewrite fractions using negative exponents first.

$$\frac{1}{x^n} = x^{-n}$$

**Examples:**

| Function | Rewrite | Derivative | Simplify |
|----------|---------|------------|----------|
| $\frac{1}{x}$ | $x^{-1}$ | $-1 \cdot x^{-2}$ | $-\frac{1}{x^2}$ |
| $\frac{1}{x^2}$ | $x^{-2}$ | $-2x^{-3}$ | $-\frac{2}{x^3}$ |
| $\frac{1}{x^3}$ | $x^{-3}$ | $-3x^{-4}$ | $-\frac{3}{x^4}$ |

**Example worked out:** Find $\frac{d}{dx}\left[\frac{5}{x^4}\right]$

Step 1: Rewrite using negative exponent: $\frac{5}{x^4} = 5x^{-4}$

Step 2: Apply power rule (and constant multiple rule): $\frac{d}{dx}[5x^{-4}] = 5 \cdot (-4)x^{-5} = -20x^{-5}$

Step 3: Rewrite in original form: $-20x^{-5} = -\frac{20}{x^5}$

!!! warning "Domain Matters"
    For $f(x) = x^{-n}$, the function is undefined at $x = 0$. The derivative $f'(x) = -nx^{-n-1}$ is also undefined at $x = 0$. Always consider domain when differentiating!

## Fractional Exponents and Roots

The power rule also handles fractional exponents, which lets us differentiate roots.

**Key insight:** Rewrite roots using fractional exponents.

$$\sqrt{x} = x^{1/2}, \quad \sqrt[3]{x} = x^{1/3}, \quad \sqrt[n]{x} = x^{1/n}$$

**Examples:**

| Function | Rewrite | Derivative | Simplify |
|----------|---------|------------|----------|
| $\sqrt{x}$ | $x^{1/2}$ | $\frac{1}{2}x^{-1/2}$ | $\frac{1}{2\sqrt{x}}$ |
| $\sqrt[3]{x}$ | $x^{1/3}$ | $\frac{1}{3}x^{-2/3}$ | $\frac{1}{3\sqrt[3]{x^2}}$ |
| $\sqrt[4]{x}$ | $x^{1/4}$ | $\frac{1}{4}x^{-3/4}$ | $\frac{1}{4\sqrt[4]{x^3}}$ |

**Example worked out:** Find $\frac{d}{dx}[\sqrt[5]{x^3}]$

Step 1: Rewrite using fractional exponent: $\sqrt[5]{x^3} = x^{3/5}$

Step 2: Apply power rule: $\frac{d}{dx}[x^{3/5}] = \frac{3}{5}x^{3/5 - 1} = \frac{3}{5}x^{-2/5}$

Step 3: Rewrite (optional): $\frac{3}{5}x^{-2/5} = \frac{3}{5\sqrt[5]{x^2}}$

!!! quote "Delta Moment"
    "Fractional exponents used to scare me, but they follow the exact same rule! Bring down the fraction, subtract 1 from the exponent. The power rule doesn't discriminate!"

## The Constant Multiple Rule

When a constant multiplies a function, it "passes through" the derivative.

!!! tip "The Constant Multiple Rule"
    If $c$ is a constant and $f$ is differentiable, then $\frac{d}{dx}[c \cdot f(x)] = c \cdot f'(x)$.

    In other words: the derivative of $c$ times $f$ equals $c$ times the derivative of $f$.

**Why does this make sense?**

Multiplying a function by a constant stretches or compresses its graph vertically. The slopes get scaled by the same factor.

**Proof using the limit definition:**

$$\frac{d}{dx}[c \cdot f(x)] = \lim_{h \to 0} \frac{c \cdot f(x+h) - c \cdot f(x)}{h} = c \cdot \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = c \cdot f'(x)$$

**Examples:**

- $\frac{d}{dx}[7x^3] = 7 \cdot 3x^2 = 21x^2$
- $\frac{d}{dx}[-4x^5] = -4 \cdot 5x^4 = -20x^4$
- $\frac{d}{dx}[\frac{1}{3}x^6] = \frac{1}{3} \cdot 6x^5 = 2x^5$

## The Sum and Difference Rules

The derivative of a sum (or difference) is the sum (or difference) of the derivatives.

!!! tip "The Sum Rule"
    If $f$ and $g$ are differentiable, then $\frac{d}{dx}[f(x) + g(x)] = f'(x) + g'(x)$.

!!! tip "The Difference Rule"
    If $f$ and $g$ are differentiable, then $\frac{d}{dx}[f(x) - g(x)] = f'(x) - g'(x)$.

**Why does this make sense?**

If two quantities are changing, their combined rate of change is the sum of their individual rates. If you earn money at two rates, your total earning rate is the sum.

**Proof of the Sum Rule:**

$$\frac{d}{dx}[f(x) + g(x)] = \lim_{h \to 0} \frac{[f(x+h) + g(x+h)] - [f(x) + g(x)]}{h}$$

$$= \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} + \lim_{h \to 0} \frac{g(x+h) - g(x)}{h} = f'(x) + g'(x)$$

**Examples:**

- $\frac{d}{dx}[x^3 + x^2] = 3x^2 + 2x$
- $\frac{d}{dx}[x^5 - x^3] = 5x^4 - 3x^2$
- $\frac{d}{dx}[x^4 + 7x^2 - 3x + 9] = 4x^3 + 14x - 3$

## Linear Combinations: Putting It Together

A **linear combination** is an expression of the form $c_1 f_1(x) + c_2 f_2(x) + \cdots + c_n f_n(x)$ where the $c_i$ are constants.

The rules we've learned say that differentiation is **linear**:

$$\frac{d}{dx}[c_1 f_1(x) + c_2 f_2(x) + \cdots] = c_1 f'_1(x) + c_2 f'_2(x) + \cdots$$

This means you can differentiate term by term, bringing constants along for the ride.

#### Diagram: Term-by-Term Differentiation

<iframe src="../../sims/term-by-term-diff/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Term-by-Term Differentiation MicroSim</summary>
Type: microsim

Purpose: Show how polynomial differentiation works term by term, with each term's contribution to the derivative highlighted.

Learning Objective: Students will apply the sum/difference and constant multiple rules to differentiate polynomials (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, calculate, execute

Visual elements:

- Input area showing polynomial with terms in boxes
- Each term has its own row showing the differentiation step
- Animation: terms "transform" via the power rule
- Final derivative assembled from individual results
- Graph showing original polynomial and derivative

Interactive controls:

- Input: Polynomial coefficients and exponents (or text input)
- Button: "Differentiate Step by Step"
- Button: "Differentiate All at Once"
- Toggle: Show/hide graph
- Preset polynomial selection

Step-by-step display for $3x^4 - 2x^2 + 5x - 7$:

| Term | Rule Applied | Result |
|------|-------------|--------|
| $3x^4$ | Power & Constant Multiple | $12x^3$ |
| $-2x^2$ | Power & Constant Multiple | $-4x$ |
| $5x$ | Power rule ($x = x^1$) | $5$ |
| $-7$ | Constant rule | $0$ |
| **Total** | Sum rule | $12x^3 - 4x + 5$ |

Behavior:

- Animation shows each term being differentiated
- Results collect to form final answer
- Graph updates to show both curves

Instructional Rationale: Breaking differentiation into individual term operations builds procedural fluency and shows how the rules combine systematically.

Implementation: p5.js with animated text transformations
</details>

## Differentiating Polynomials

A polynomial is a sum of terms of the form $ax^n$ where $a$ is a coefficient and $n$ is a non-negative integer. With our rules, differentiating polynomials is straightforward.

**Strategy for differentiating polynomials:**

1. Apply the sum/difference rules to work term by term
2. For each term $ax^n$, apply the constant multiple and power rules: $\frac{d}{dx}[ax^n] = anx^{n-1}$
3. Don't forget that constant terms become 0

**Example:** Find the derivative of $f(x) = 2x^5 - 7x^3 + x^2 - 4x + 9$.

$$f'(x) = \frac{d}{dx}[2x^5] - \frac{d}{dx}[7x^3] + \frac{d}{dx}[x^2] - \frac{d}{dx}[4x] + \frac{d}{dx}[9]$$

$$= 2(5x^4) - 7(3x^2) + 2x - 4(1) + 0$$

$$= 10x^4 - 21x^2 + 2x - 4$$

!!! note "Degree Drops by 1"
    Notice that the degree of the derivative is always one less than the degree of the original polynomial. A degree-5 polynomial has a degree-4 derivative.

**More examples:**

| Polynomial | Derivative |
|------------|------------|
| $x^7 + 3x^4 - x + 2$ | $7x^6 + 12x^3 - 1$ |
| $4x^3 - x^2$ | $12x^2 - 2x$ |
| $x^{10} - 1$ | $10x^9$ |
| $5x + 8$ | $5$ |
| $-6$ | $0$ |

## The Product Rule

What about the derivative of a product of functions? You might guess that $\frac{d}{dx}[f(x) \cdot g(x)] = f'(x) \cdot g'(x)$, but this is **wrong**!

!!! tip "The Product Rule"
    If $f$ and $g$ are differentiable, then:

    $$\frac{d}{dx}[f(x) \cdot g(x)] = f'(x) \cdot g(x) + f(x) \cdot g'(x)$$

    In words: (derivative of first)(second) + (first)(derivative of second)

**Memory aids:**

- "First times the derivative of the second, plus second times the derivative of the first"
- Some people remember: $(fg)' = f'g + fg'$

**Why isn't it just $f'(x) \cdot g'(x)$?**

Consider $f(x) = x$ and $g(x) = x$. Then $f(x) \cdot g(x) = x^2$.

- Correct: $(x^2)' = 2x$
- Wrong method: $f'(x) \cdot g'(x) = 1 \cdot 1 = 1$ ✗

**Proof of the Product Rule:**

$$\frac{d}{dx}[f(x)g(x)] = \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x)g(x)}{h}$$

Add and subtract $f(x+h)g(x)$ in the numerator:

$$= \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x+h)g(x) + f(x+h)g(x) - f(x)g(x)}{h}$$

$$= \lim_{h \to 0} \left[f(x+h) \cdot \frac{g(x+h) - g(x)}{h} + g(x) \cdot \frac{f(x+h) - f(x)}{h}\right]$$

$$= f(x) \cdot g'(x) + g(x) \cdot f'(x)$$

**Example:** Find $\frac{d}{dx}[(x^2 + 1)(x^3 - x)]$

Let $f(x) = x^2 + 1$ and $g(x) = x^3 - x$.

Then $f'(x) = 2x$ and $g'(x) = 3x^2 - 1$.

By the product rule:

$$\frac{d}{dx}[(x^2 + 1)(x^3 - x)] = (2x)(x^3 - x) + (x^2 + 1)(3x^2 - 1)$$

$$= 2x^4 - 2x^2 + 3x^4 - x^2 + 3x^2 - 1$$

$$= 5x^4 - 1$$

!!! note "Alternative Approach"
    For this example, you could also multiply out first: $(x^2 + 1)(x^3 - x) = x^5 - x^3 + x^3 - x = x^5 - x$. Then differentiate: $(x^5 - x)' = 5x^4 - 1$. Both methods give the same answer!

#### Diagram: Product Rule Visualizer

<iframe src="../../sims/product-rule-viz/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Product Rule Visualizer MicroSim</summary>
Type: microsim

Purpose: Illustrate the product rule geometrically using the area interpretation.

Learning Objective: Students will explain why the product rule includes two terms (Bloom Level 2: Understand)

Bloom Taxonomy Verb: explain, interpret, demonstrate

Visual elements:

- Rectangle with sides $f(x)$ and $g(x)$
- When x increases by $\Delta x$:
  - Show $f(x+\Delta x)$ and $g(x + \Delta x)$
  - Highlight the change in area as L-shaped region
  - Label the two main strips: $f \cdot \Delta g$ and $g \cdot \Delta f$
  - Small corner rectangle $\Delta f \cdot \Delta g$ (negligible)

Interactive controls:

- Slider: Value of x
- Slider: Value of $\Delta x$ (approaches 0)
- Input: Choose $f(x)$ and $g(x)$ from presets
- Animation: Watch rectangle grow as x changes
- Display: Numerical values of all quantities

Behavior:

- As $\Delta x$ shrinks, corner rectangle becomes negligible
- Area change dominated by the two strips
- Formula emerges: $d(fg) = f \, dg + g \, df$

Instructional Rationale: The geometric interpretation explains why there are TWO terms in the product rule. Seeing the area change as an L-shape makes the formula memorable.

Implementation: p5.js with animated rectangle
</details>

## The Quotient Rule

For dividing functions, we have the quotient rule.

!!! tip "The Quotient Rule"
    If $f$ and $g$ are differentiable and $g(x) \neq 0$, then:

    $$\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{f'(x) \cdot g(x) - f(x) \cdot g'(x)}{[g(x)]^2}$$

    In words: (derivative of top)(bottom) minus (top)(derivative of bottom), all over (bottom) squared.

**Memory aids:**

- "Low d-high minus high d-low, over low squared"
- $(f/g)' = \frac{f'g - fg'}{g^2}$
- "Bottom times derivative of top, minus top times derivative of bottom, all over bottom squared"

**Example:** Find $\frac{d}{dx}\left[\frac{x^2}{x^3 + 1}\right]$

Let $f(x) = x^2$ (top) and $g(x) = x^3 + 1$ (bottom).

Then $f'(x) = 2x$ and $g'(x) = 3x^2$.

By the quotient rule:

$$\frac{d}{dx}\left[\frac{x^2}{x^3 + 1}\right] = \frac{(2x)(x^3 + 1) - (x^2)(3x^2)}{(x^3 + 1)^2}$$

$$= \frac{2x^4 + 2x - 3x^4}{(x^3 + 1)^2} = \frac{-x^4 + 2x}{(x^3 + 1)^2} = \frac{x(2 - x^3)}{(x^3 + 1)^2}$$

!!! warning "The Minus Sign Matters!"
    In the quotient rule, the order matters because of subtraction. It's $(f'g - fg')$, not $(fg' - f'g)$. Getting this backwards is a common error.

**Why the quotient rule works:** We can derive it from the product rule. Since $f = \frac{f}{g} \cdot g$, applying the product rule and solving for $\left(\frac{f}{g}\right)'$ gives the quotient rule.

## Choosing the Right Approach

With multiple rules available, how do you decide which to use?

**Guidelines:**

1. **Simplify first if possible.** Sometimes expanding or simplifying makes differentiation easier.

2. **Polynomials:** Use sum/difference rules, differentiate term by term.

3. **Products of non-polynomial functions:** Use the product rule.

4. **Quotients:** Use the quotient rule, OR rewrite using negative exponents and use the product rule.

5. **Check by alternative method.** If time permits, verify by a different approach.

| Expression | Best Approach |
|------------|---------------|
| $3x^5 - 2x^3 + x$ | Term by term (polynomial) |
| $(x^2 + 1)(x - 3)$ | Expand first, OR product rule |
| $\frac{x^2}{3}$ | Just $\frac{1}{3}x^2$, use constant multiple |
| $\frac{1}{x^4}$ | Rewrite as $x^{-4}$, use power rule |
| $\frac{x^2 + 1}{x^3 - 1}$ | Quotient rule |
| $x^{2/3} \cdot x^{1/2}$ | Simplify first: $x^{2/3 + 1/2} = x^{7/6}$ |

#### Diagram: Rule Selection Decision Tree

<iframe src="../../sims/rule-selector/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Rule Selection Decision Tree MicroSim</summary>
Type: infographic

Purpose: Interactive decision tree to help students choose the appropriate differentiation rule.

Learning Objective: Students will select the most efficient differentiation technique for a given function (Bloom Level 5: Evaluate)

Bloom Taxonomy Verb: evaluate, judge, select

Visual elements:

- Flowchart/decision tree with questions at each node
- Terminal nodes showing which rule to apply
- Example functions that follow each path
- Highlight the current path as user answers questions

Questions in the tree:

1. "Is it a single term (no + or -)?"
   - Yes → "Is it $c \cdot x^n$ form?" → Power + Constant Multiple
   - No → Continue
2. "Is it a sum/difference of terms?"
   - Yes → "Apply sum/difference rule, then handle each term"
   - No → Continue
3. "Is it a product of functions?"
   - Yes → Product Rule
   - No → Continue
4. "Is it a quotient?"
   - Yes → Quotient Rule (or rewrite with negative exponents)

Interactive controls:

- Input: Function to differentiate
- System asks questions, user clicks answers
- Path illuminates as decisions are made
- Final rule highlighted with example application

Behavior:

- User inputs function or selects from examples
- Walks through decision tree
- Shows the rule application at the end

Instructional Rationale: Explicit decision-making practice builds metacognitive awareness of rule selection. The visual tree makes the logic explicit.

Implementation: p5.js with clickable flowchart nodes
</details>

## Practice: Building Speed and Accuracy

The key to mastery is practice. Here are examples with increasing complexity:

**Level 1: Power rule only**

- $\frac{d}{dx}[x^8] = 8x^7$
- $\frac{d}{dx}[x^{-3}] = -3x^{-4} = -\frac{3}{x^4}$
- $\frac{d}{dx}[\sqrt{x}] = \frac{d}{dx}[x^{1/2}] = \frac{1}{2}x^{-1/2} = \frac{1}{2\sqrt{x}}$

**Level 2: Constant multiple and power rule**

- $\frac{d}{dx}[4x^6] = 24x^5$
- $\frac{d}{dx}[-\frac{2}{x^5}] = \frac{d}{dx}[-2x^{-5}] = 10x^{-6} = \frac{10}{x^6}$

**Level 3: Polynomial differentiation**

- $\frac{d}{dx}[x^4 - 3x^3 + 2x - 7] = 4x^3 - 9x^2 + 2$
- $\frac{d}{dx}[5x^6 - x^4 + \frac{1}{2}x^2] = 30x^5 - 4x^3 + x$

**Level 4: Product rule**

- $\frac{d}{dx}[(x^2 - 1)(x^3 + 2)]$

  $= (2x)(x^3 + 2) + (x^2 - 1)(3x^2)$

  $= 2x^4 + 4x + 3x^4 - 3x^2 = 5x^4 - 3x^2 + 4x$

**Level 5: Quotient rule**

- $\frac{d}{dx}\left[\frac{x^2 - 1}{x + 1}\right]$

  First, simplify: $\frac{x^2 - 1}{x + 1} = \frac{(x-1)(x+1)}{x+1} = x - 1$ (for $x \neq -1$)

  Then: $\frac{d}{dx}[x - 1] = 1$

!!! quote "Delta's Pun Corner"
    "Why did the polynomial break up with the quotient? Because the relationship had too many terms and conditions!"

## Summary of Derivative Rules

Here's your complete toolkit from this chapter:

| Rule | Formula |
|------|---------|
| Constant | $\frac{d}{dx}[c] = 0$ |
| Power | $\frac{d}{dx}[x^n] = nx^{n-1}$ |
| Constant Multiple | $\frac{d}{dx}[cf(x)] = c \cdot f'(x)$ |
| Sum | $\frac{d}{dx}[f(x) + g(x)] = f'(x) + g'(x)$ |
| Difference | $\frac{d}{dx}[f(x) - g(x)] = f'(x) - g'(x)$ |
| Product | $\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$ |
| Quotient | $\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}$ |

## Key Takeaways

- **Constant Rule:** The derivative of any constant is 0

- **Power Rule:** $\frac{d}{dx}[x^n] = nx^{n-1}$ works for ALL real exponents

- **Negative exponents:** Rewrite $\frac{1}{x^n} = x^{-n}$, then use power rule

- **Fractional exponents:** Rewrite roots as $x^{1/n}$, then use power rule

- **Constant Multiple Rule:** Constants "pass through" the derivative

- **Sum/Difference Rules:** Differentiate term by term

- **Polynomial differentiation:** Combine all the above rules

- **Product Rule:** $(fg)' = f'g + fg'$

- **Quotient Rule:** $\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$

- **Strategy:** Sometimes simplifying before differentiating is faster

??? question "Check Your Understanding: Find $\frac{d}{dx}\left[\frac{x^3 - 8}{x - 2}\right]$"
    First, notice that $x^3 - 8 = (x-2)(x^2 + 2x + 4)$ (difference of cubes).

    So $\frac{x^3 - 8}{x - 2} = \frac{(x-2)(x^2 + 2x + 4)}{x-2} = x^2 + 2x + 4$ (for $x \neq 2$)

    Now differentiate the simplified polynomial:

    $\frac{d}{dx}[x^2 + 2x + 4] = 2x + 2$

    **Answer:** $2x + 2$

    Alternatively, using the quotient rule directly would give the same answer, but with much more algebra!

[See Annotated References](./references.md)
