---
title: Product, Quotient, and Transcendental Derivatives
description: Completing the derivative toolkit with trigonometric, exponential, and logarithmic functions
generated_by: claude skill chapter-content-generator
date: 2026-02-03 11:15:00
version: 0.03
---

# Product, Quotient, and Transcendental Derivatives

## Summary

This chapter completes the toolkit of basic derivative rules by covering the quotient rule formula and derivatives of transcendental functions. Students will master the derivatives of all six trigonometric functions, exponential functions (both natural and general bases), and logarithmic functions. The chapter emphasizes strategies for combining multiple rules and simplifying expressions before differentiating. After completing this chapter, students will be able to differentiate any combination of elementary functions.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. Quotient Rule Formula
2. Reciprocal Rule
3. Derivative of Sine
4. Derivative of Cosine
5. Derivative of Tangent
6. Derivative of Cotangent
7. Derivative of Secant
8. Derivative of Cosecant
9. Derivative of e to x
10. Derivative of a to x
11. Derivative of ln x
12. Derivative of log x
13. Combining Rules
14. Simplifying First

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Calculus](../01-foundations-of-calculus/index.md)
- [Chapter 8: Basic Derivative Rules](../08-basic-derivative-rules/index.md)

---

## Introduction: Beyond Polynomials

In Chapter 8, we mastered derivatives of polynomial functions using the power rule and linearity. But the mathematical world is much richer than polynomials. Think about the waves of sound, the oscillation of a pendulum, population growth, or radioactive decay—these phenomena are described by trigonometric, exponential, and logarithmic functions.

!!! quote "Delta Moment"
    "Polynomials are like straight roads with gentle curves. But the real world has waves, spirals, and explosive growth! Time to expand my toolkit."

These functions—called **transcendental functions** because they "transcend" polynomial algebra—each have their own derivative rules. Once you learn them, you'll be able to differentiate virtually any function you'll encounter.

## The Quotient Rule: A Closer Look

We introduced the quotient rule in Chapter 8. Let's reinforce it here since it's essential for deriving the derivatives of tangent, cotangent, secant, and cosecant.

!!! tip "The Quotient Rule Formula"
    If $f$ and $g$ are differentiable and $g(x) \neq 0$, then:

    $$\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{f'(x) \cdot g(x) - f(x) \cdot g'(x)}{[g(x)]^2}$$

**Memory device: "Lo d-Hi minus Hi d-Lo, over Lo-Lo"**

- Lo = bottom function $g(x)$
- Hi = top function $f(x)$
- d-Hi = derivative of top $f'(x)$
- d-Lo = derivative of bottom $g'(x)$

The formula: $\frac{\text{Lo} \cdot \text{d-Hi} - \text{Hi} \cdot \text{d-Lo}}{(\text{Lo})^2}$

### The Reciprocal Rule

A special case occurs when the numerator is 1:

!!! tip "The Reciprocal Rule"
    $$\frac{d}{dx}\left[\frac{1}{g(x)}\right] = -\frac{g'(x)}{[g(x)]^2}$$

This is just the quotient rule with $f(x) = 1$ and $f'(x) = 0$:

$$\frac{d}{dx}\left[\frac{1}{g}\right] = \frac{0 \cdot g - 1 \cdot g'}{g^2} = -\frac{g'}{g^2}$$

**Example:** Find $\frac{d}{dx}\left[\frac{1}{x^2 + 1}\right]$

Using the reciprocal rule with $g(x) = x^2 + 1$ and $g'(x) = 2x$:

$$\frac{d}{dx}\left[\frac{1}{x^2 + 1}\right] = -\frac{2x}{(x^2 + 1)^2}$$

## Derivatives of Trigonometric Functions

The six trigonometric functions have derivatives that you should memorize. We'll derive the first two and show the pattern for the others.

### Derivative of Sine

!!! tip "Derivative of Sine"
    $$\frac{d}{dx}[\sin x] = \cos x$$

**Derivation using the limit definition:**

$$\frac{d}{dx}[\sin x] = \lim_{h \to 0} \frac{\sin(x + h) - \sin x}{h}$$

Using the angle addition formula $\sin(x + h) = \sin x \cos h + \cos x \sin h$:

$$= \lim_{h \to 0} \frac{\sin x \cos h + \cos x \sin h - \sin x}{h}$$

$$= \lim_{h \to 0} \frac{\sin x (\cos h - 1) + \cos x \sin h}{h}$$

$$= \sin x \lim_{h \to 0} \frac{\cos h - 1}{h} + \cos x \lim_{h \to 0} \frac{\sin h}{h}$$

Using the special limits $\lim_{h \to 0} \frac{\sin h}{h} = 1$ and $\lim_{h \to 0} \frac{\cos h - 1}{h} = 0$:

$$= \sin x \cdot 0 + \cos x \cdot 1 = \cos x$$

### Derivative of Cosine

!!! tip "Derivative of Cosine"
    $$\frac{d}{dx}[\cos x] = -\sin x$$

Notice the negative sign! The derivative of cosine is **negative** sine.

**Derivation:** Similar to sine, using $\cos(x + h) = \cos x \cos h - \sin x \sin h$:

$$\frac{d}{dx}[\cos x] = \lim_{h \to 0} \frac{\cos x \cos h - \sin x \sin h - \cos x}{h}$$

$$= \cos x \lim_{h \to 0} \frac{\cos h - 1}{h} - \sin x \lim_{h \to 0} \frac{\sin h}{h}$$

$$= \cos x \cdot 0 - \sin x \cdot 1 = -\sin x$$

!!! quote "Delta Moment"
    "When I climb a sine wave, my steepness follows a cosine wave. And when I climb a cosine wave, my steepness follows a negative sine wave. It's like they're dancing partners, always one step apart!"

### The Trigonometric Derivative Pattern

There's a beautiful pattern in the derivatives of trig functions:

```
sin x  →  cos x  →  -sin x  →  -cos x  →  sin x  → ...
```

Taking four derivatives of $\sin x$ brings you back to $\sin x$!

#### Diagram: Trig Derivative Cycle

<iframe src="../../sims/trig-derivative-cycle/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Trig Derivative Cycle MicroSim</summary>
Type: infographic

Purpose: Visualize the cyclic nature of sine and cosine derivatives.

Learning Objective: Students will recall the pattern of trigonometric derivatives (Bloom Level 1: Remember)

Bloom Taxonomy Verb: recall, identify, recognize

Visual elements:

- Circular diagram showing sin → cos → -sin → -cos → sin
- Arrows connecting each function to its derivative
- Two graphs: one showing f(x), one showing f'(x)
- Animation: click through derivatives to see graphs update

Interactive controls:

- Button: "Take Derivative" - advances the cycle
- Reset button
- Toggle: Show both graphs simultaneously
- Display: Current function and its derivative

Behavior:

- Each click advances to next derivative
- Graphs update to show current function and derivative
- Cycle repeats after 4 clicks
- Color coding matches the circular diagram

Instructional Rationale: The visual cycle makes the pattern memorable. Seeing the graphs update reinforces the relationship between function and derivative shapes.

Implementation: p5.js with circular diagram and dual graphs
</details>

### Derivative of Tangent

Now we can find the derivative of tangent using the quotient rule:

$$\tan x = \frac{\sin x}{\cos x}$$

!!! tip "Derivative of Tangent"
    $$\frac{d}{dx}[\tan x] = \sec^2 x$$

**Derivation:**

$$\frac{d}{dx}[\tan x] = \frac{d}{dx}\left[\frac{\sin x}{\cos x}\right]$$

Using the quotient rule with $f(x) = \sin x$ and $g(x) = \cos x$:

$$= \frac{\cos x \cdot \cos x - \sin x \cdot (-\sin x)}{\cos^2 x}$$

$$= \frac{\cos^2 x + \sin^2 x}{\cos^2 x} = \frac{1}{\cos^2 x} = \sec^2 x$$

### Derivative of Cotangent

Similarly, since $\cot x = \frac{\cos x}{\sin x}$:

!!! tip "Derivative of Cotangent"
    $$\frac{d}{dx}[\cot x] = -\csc^2 x$$

**Derivation:**

$$\frac{d}{dx}[\cot x] = \frac{d}{dx}\left[\frac{\cos x}{\sin x}\right]$$

$$= \frac{\sin x \cdot (-\sin x) - \cos x \cdot \cos x}{\sin^2 x}$$

$$= \frac{-\sin^2 x - \cos^2 x}{\sin^2 x} = \frac{-1}{\sin^2 x} = -\csc^2 x$$

### Derivative of Secant

Since $\sec x = \frac{1}{\cos x}$, we use the reciprocal rule:

!!! tip "Derivative of Secant"
    $$\frac{d}{dx}[\sec x] = \sec x \tan x$$

**Derivation:**

$$\frac{d}{dx}[\sec x] = \frac{d}{dx}\left[\frac{1}{\cos x}\right] = -\frac{-\sin x}{\cos^2 x} = \frac{\sin x}{\cos^2 x}$$

$$= \frac{1}{\cos x} \cdot \frac{\sin x}{\cos x} = \sec x \tan x$$

### Derivative of Cosecant

Since $\csc x = \frac{1}{\sin x}$:

!!! tip "Derivative of Cosecant"
    $$\frac{d}{dx}[\csc x] = -\csc x \cot x$$

**Derivation:**

$$\frac{d}{dx}[\csc x] = \frac{d}{dx}\left[\frac{1}{\sin x}\right] = -\frac{\cos x}{\sin^2 x}$$

$$= -\frac{1}{\sin x} \cdot \frac{\cos x}{\sin x} = -\csc x \cot x$$

### Summary: All Six Trig Derivatives

| Function | Derivative | Memory Aid |
|----------|------------|------------|
| $\sin x$ | $\cos x$ | "Sine becomes cosine" |
| $\cos x$ | $-\sin x$ | "Cosine becomes negative sine" |
| $\tan x$ | $\sec^2 x$ | "Tan and sec go together" |
| $\cot x$ | $-\csc^2 x$ | "Cot and csc go together (negative)" |
| $\sec x$ | $\sec x \tan x$ | "Sec stays, tan joins" |
| $\csc x$ | $-\csc x \cot x$ | "Csc stays, cot joins (negative)" |

**Pattern to notice:** The "co-functions" (cosine, cotangent, cosecant) all have negative signs in their derivatives!

#### Diagram: Trig Derivatives Reference Card

<iframe src="../../sims/trig-derivatives-card/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Trig Derivatives Reference Card MicroSim</summary>
Type: infographic

Purpose: Interactive flashcard-style reference for memorizing trig derivatives.

Learning Objective: Students will recall the derivatives of all six trigonometric functions (Bloom Level 1: Remember)

Bloom Taxonomy Verb: recall, list, identify

Visual elements:

- Six cards arranged in pairs: (sin, cos), (tan, cot), (sec, csc)
- Each card shows function on front, derivative on back
- Graph of function and derivative shown when revealed
- Color coding: positive derivatives in blue, negative in red

Interactive controls:

- Click card to flip and reveal derivative
- "Quiz Mode" button: hides derivatives, user must guess
- "Show All" and "Hide All" buttons
- Dropdown: Select individual function to focus on

Behavior:

- Cards flip with animation
- In quiz mode, user types answer before reveal
- Feedback on correct/incorrect
- Progress tracker for quiz attempts

Instructional Rationale: Active recall through flashcard practice is more effective than passive reading. The quiz mode encourages retrieval practice.

Implementation: p5.js with card flip animations
</details>

## Derivatives of Exponential Functions

Exponential functions model growth and decay—from population dynamics to compound interest to radioactive decay. Their derivatives have a remarkable property.

### The Derivative of $e^x$

!!! tip "Derivative of $e^x$"
    $$\frac{d}{dx}[e^x] = e^x$$

This is perhaps the most amazing derivative in all of calculus: **$e^x$ is its own derivative!**

The number $e \approx 2.71828...$ is specifically defined as the base for which this property holds. No other exponential function has this property.

**Why is this important?**

If $y = e^x$, then $\frac{dy}{dx} = e^x = y$. This means:

> The rate of change of $e^x$ is proportional to its current value, with proportionality constant 1.

This is the mathematical model for "natural growth"—growth where the rate is exactly equal to the current amount.

!!! quote "Delta Moment"
    "When I climb the $e^x$ curve, my steepness at any point equals my height! The higher I am, the steeper I'm climbing. It's exponential growth in action!"

#### Diagram: e^x Self-Derivative Visualizer

<iframe src="../../sims/exp-self-derivative/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>e^x Self-Derivative Visualizer MicroSim</summary>
Type: microsim

Purpose: Demonstrate that $e^x$ is its own derivative by showing that tangent slope equals function value.

Learning Objective: Students will explain why $e^x$ is its own derivative (Bloom Level 2: Understand)

Bloom Taxonomy Verb: explain, interpret, demonstrate

Visual elements:

- Graph of $y = e^x$
- Moving point on the curve
- Tangent line at the point
- Displays: x-value, y-value ($e^x$), slope of tangent
- Visual emphasis that y-value = slope

Interactive controls:

- Slider: Move point along x-axis (range -3 to 3)
- Toggle: Show/hide tangent line
- Button: "Compare y and slope" - highlights equality
- Display: "At x = [val]: y = e^x = [val], slope = [val]"

Behavior:

- As point moves, both y-value and slope update
- They always match (within rounding)
- Comparison mode draws attention to the equality

Instructional Rationale: Seeing the numerical equality between function value and tangent slope at every point makes the remarkable property concrete and memorable.

Implementation: p5.js with dynamic point and tangent
</details>

### The Derivative of $a^x$

What about exponential functions with other bases, like $2^x$ or $10^x$?

!!! tip "Derivative of $a^x$"
    $$\frac{d}{dx}[a^x] = a^x \ln a$$

    where $a > 0$ and $a \neq 1$.

The derivative of $a^x$ is $a^x$ multiplied by the natural logarithm of the base.

**Examples:**

- $\frac{d}{dx}[2^x] = 2^x \ln 2 \approx 2^x \cdot 0.693$
- $\frac{d}{dx}[10^x] = 10^x \ln 10 \approx 10^x \cdot 2.303$
- $\frac{d}{dx}[e^x] = e^x \ln e = e^x \cdot 1 = e^x$ ✓

Notice that when $a = e$, we get $\ln e = 1$, recovering the formula for $e^x$.

**Why does $\ln a$ appear?**

We can write $a^x = e^{x \ln a}$ (since $e^{\ln a} = a$). Then using the chain rule (coming in the next chapter):

$$\frac{d}{dx}[a^x] = \frac{d}{dx}[e^{x \ln a}] = e^{x \ln a} \cdot \ln a = a^x \ln a$$

## Derivatives of Logarithmic Functions

Logarithms are the inverses of exponential functions, and their derivatives reflect this relationship.

### The Derivative of $\ln x$

!!! tip "Derivative of Natural Log"
    $$\frac{d}{dx}[\ln x] = \frac{1}{x}$$

    for $x > 0$.

This is another beautiful result: the derivative of $\ln x$ is $\frac{1}{x}$, which is $x^{-1}$.

Remember when we said the power rule works for all exponents? There was one exception: $\int x^{-1} \, dx$ doesn't give us another power function. Instead, it gives us $\ln x$. The derivative $\frac{d}{dx}[\ln x] = \frac{1}{x}$ is the flip side of that story.

**Derivation using implicit differentiation (preview):**

Let $y = \ln x$. Then $e^y = x$.

Differentiating both sides: $e^y \frac{dy}{dx} = 1$

Solving: $\frac{dy}{dx} = \frac{1}{e^y} = \frac{1}{x}$

### The Derivative of $\log_a x$

!!! tip "Derivative of Logarithm Base a"
    $$\frac{d}{dx}[\log_a x] = \frac{1}{x \ln a}$$

    for $x > 0$, $a > 0$, $a \neq 1$.

Using the change of base formula $\log_a x = \frac{\ln x}{\ln a}$:

$$\frac{d}{dx}[\log_a x] = \frac{1}{\ln a} \cdot \frac{d}{dx}[\ln x] = \frac{1}{\ln a} \cdot \frac{1}{x} = \frac{1}{x \ln a}$$

**Examples:**

- $\frac{d}{dx}[\log_{10} x] = \frac{1}{x \ln 10} \approx \frac{0.434}{x}$
- $\frac{d}{dx}[\log_2 x] = \frac{1}{x \ln 2} \approx \frac{1.443}{x}$
- $\frac{d}{dx}[\ln x] = \frac{1}{x \ln e} = \frac{1}{x}$ ✓

### Summary: Exponential and Log Derivatives

| Function | Derivative |
|----------|------------|
| $e^x$ | $e^x$ |
| $a^x$ | $a^x \ln a$ |
| $\ln x$ | $\frac{1}{x}$ |
| $\log_a x$ | $\frac{1}{x \ln a}$ |

## Combining Multiple Rules

Real-world functions often require combining several rules. Here's a systematic approach:

**Strategy:**

1. Identify the overall structure (sum, product, quotient, composition)
2. Work from the outside in
3. Apply rules one at a time
4. Simplify at the end

**Example 1: $f(x) = 3\sin x + 2e^x$**

This is a sum of constant multiples:

$$f'(x) = 3\cos x + 2e^x$$

**Example 2: $f(x) = x^2 \cos x$**

This is a product. Let $u = x^2$ and $v = \cos x$:

$$f'(x) = u'v + uv' = 2x \cos x + x^2(-\sin x) = 2x \cos x - x^2 \sin x$$

**Example 3: $f(x) = \frac{e^x}{x^2}$**

This is a quotient. Let $f = e^x$ and $g = x^2$:

$$\frac{d}{dx}\left[\frac{e^x}{x^2}\right] = \frac{e^x \cdot x^2 - e^x \cdot 2x}{x^4} = \frac{e^x(x^2 - 2x)}{x^4} = \frac{e^x(x - 2)}{x^3}$$

**Example 4: $f(x) = \ln x \cdot \tan x$**

Product rule with $u = \ln x$ and $v = \tan x$:

$$f'(x) = \frac{1}{x} \cdot \tan x + \ln x \cdot \sec^2 x = \frac{\tan x}{x} + \ln x \sec^2 x$$

#### Diagram: Multi-Rule Derivative Builder

<iframe src="../../sims/multi-rule-builder/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Multi-Rule Derivative Builder MicroSim</summary>
Type: microsim

Purpose: Step-by-step tool showing how multiple derivative rules combine to differentiate complex functions.

Learning Objective: Students will apply multiple derivative rules in sequence to differentiate complex functions (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, execute, implement

Visual elements:

- Input: Complex function (e.g., $x^2 \sin x + e^x/x$)
- Tree diagram showing function structure
- Step-by-step derivation panel
- Each step shows: rule used, partial result
- Final answer highlighted

Interactive controls:

- Function input (text or builder interface)
- "Step Through" button to advance one step
- "Show All Steps" to reveal complete derivation
- Dropdown: Select from preset examples
- Reset button

Steps display for $x^2 \sin x$:

1. Identify: Product of $x^2$ and $\sin x$
2. Apply product rule: $(x^2)' \cdot \sin x + x^2 \cdot (\sin x)'$
3. Compute $(x^2)' = 2x$
4. Compute $(\sin x)' = \cos x$
5. Substitute: $2x \sin x + x^2 \cos x$
6. Final answer: $2x \sin x + x^2 \cos x$

Behavior:

- Each step reveals with explanation
- Color coding shows which parts are being differentiated
- Tree diagram highlights current focus

Instructional Rationale: Seeing the systematic breakdown of complex derivatives builds procedural knowledge and metacognitive awareness of when to apply each rule.

Implementation: p5.js with animated step-through
</details>

## The Power of Simplifying First

Sometimes, simplifying before differentiating saves significant work.

**Example: Simplify first**

Find $\frac{d}{dx}\left[\frac{\sin x}{\csc x}\right]$

Don't use the quotient rule! Instead, simplify:

$$\frac{\sin x}{\csc x} = \sin x \cdot \sin x = \sin^2 x$$

Hmm, but $\sin^2 x$ requires the chain rule (next chapter). Alternatively:

$$\frac{\sin x}{\csc x} = \sin x \cdot \frac{1}{\csc x} = \sin x \cdot \sin x$$

Actually, let's use a different example:

**Better example: $\frac{1 - \cos^2 x}{\sin x}$**

Don't use quotient rule! Simplify using $1 - \cos^2 x = \sin^2 x$:

$$\frac{1 - \cos^2 x}{\sin x} = \frac{\sin^2 x}{\sin x} = \sin x$$

Then: $\frac{d}{dx}[\sin x] = \cos x$

Much easier than the quotient rule!

**When to simplify first:**

- Fractions that can be reduced
- Expressions with trig identities
- Products that can be expanded into simpler terms
- Common factors that cancel

| Complex Form | Simplified Form | Derivative |
|--------------|-----------------|------------|
| $\frac{\sin x}{\cos x}$ | $\tan x$ | $\sec^2 x$ |
| $\frac{1}{\cos x}$ | $\sec x$ | $\sec x \tan x$ |
| $e^x \cdot e^{-x}$ | $1$ | $0$ |
| $\ln(e^x)$ | $x$ | $1$ |

## Practice Problems with Solutions

**Problem 1:** Find $\frac{d}{dx}[5\cos x - 3\sin x]$

$$= 5(-\sin x) - 3(\cos x) = -5\sin x - 3\cos x$$

**Problem 2:** Find $\frac{d}{dx}[x^3 e^x]$

Product rule:

$$= 3x^2 \cdot e^x + x^3 \cdot e^x = e^x(3x^2 + x^3) = x^2 e^x(3 + x)$$

**Problem 3:** Find $\frac{d}{dx}\left[\frac{\ln x}{x}\right]$

Quotient rule with $f = \ln x$ and $g = x$:

$$= \frac{\frac{1}{x} \cdot x - \ln x \cdot 1}{x^2} = \frac{1 - \ln x}{x^2}$$

**Problem 4:** Find $\frac{d}{dx}[\sec x + \csc x]$

$$= \sec x \tan x + (-\csc x \cot x) = \sec x \tan x - \csc x \cot x$$

**Problem 5:** Find $\frac{d}{dx}[2^x + \log_2 x]$

$$= 2^x \ln 2 + \frac{1}{x \ln 2}$$

!!! quote "Delta's Pun Corner"
    "Why did $e^x$ feel lonely at the calculus party? Because it was always equal to its own derivative—nobody could change it!"

## Summary of All Derivative Rules

Here's your complete toolkit:

**Basic Rules:**

| Rule | Formula |
|------|---------|
| Constant | $\frac{d}{dx}[c] = 0$ |
| Power | $\frac{d}{dx}[x^n] = nx^{n-1}$ |
| Constant Multiple | $\frac{d}{dx}[cf] = c \cdot f'$ |
| Sum/Difference | $\frac{d}{dx}[f \pm g] = f' \pm g'$ |
| Product | $\frac{d}{dx}[fg] = f'g + fg'$ |
| Quotient | $\frac{d}{dx}[f/g] = \frac{f'g - fg'}{g^2}$ |

**Trigonometric Derivatives:**

| Function | Derivative |
|----------|------------|
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |
| $\cot x$ | $-\csc^2 x$ |
| $\sec x$ | $\sec x \tan x$ |
| $\csc x$ | $-\csc x \cot x$ |

**Exponential and Logarithmic Derivatives:**

| Function | Derivative |
|----------|------------|
| $e^x$ | $e^x$ |
| $a^x$ | $a^x \ln a$ |
| $\ln x$ | $\frac{1}{x}$ |
| $\log_a x$ | $\frac{1}{x \ln a}$ |

## Key Takeaways

- **Quotient rule:** $\frac{d}{dx}\left[\frac{f}{g}\right] = \frac{f'g - fg'}{g^2}$ (remember: "Lo d-Hi minus Hi d-Lo, over Lo-Lo")

- **Trigonometric derivatives:** Memorize all six! The co-functions (cos, cot, csc) have negative derivatives.

- **$e^x$ is special:** $\frac{d}{dx}[e^x] = e^x$ — it's its own derivative!

- **General exponential:** $\frac{d}{dx}[a^x] = a^x \ln a$

- **Natural log:** $\frac{d}{dx}[\ln x] = \frac{1}{x}$

- **General log:** $\frac{d}{dx}[\log_a x] = \frac{1}{x \ln a}$

- **Strategy for complex functions:**
  1. Identify the overall structure
  2. Apply rules systematically
  3. Consider simplifying first to save work

??? question "Check Your Understanding: Find $\frac{d}{dx}\left[\frac{e^x \sin x}{x}\right]$"
    This requires the quotient rule. Let $f(x) = e^x \sin x$ (numerator) and $g(x) = x$ (denominator).

    First, find $f'(x)$ using the product rule:

    $f'(x) = e^x \sin x + e^x \cos x = e^x(\sin x + \cos x)$

    And $g'(x) = 1$.

    Now apply the quotient rule:

    $$\frac{d}{dx}\left[\frac{e^x \sin x}{x}\right] = \frac{e^x(\sin x + \cos x) \cdot x - e^x \sin x \cdot 1}{x^2}$$

    $$= \frac{e^x[x(\sin x + \cos x) - \sin x]}{x^2}$$

    $$= \frac{e^x[x\sin x + x\cos x - \sin x]}{x^2}$$

    $$= \frac{e^x[(x-1)\sin x + x\cos x]}{x^2}$$

    **Answer:** $\frac{e^x[(x-1)\sin x + x\cos x]}{x^2}$
