---
title: Transcendental Integrals
description: Extending integration to trigonometric, exponential, logarithmic, and inverse trigonometric functions
generated_by: claude skill chapter-content-generator
date: 2026-02-03 14:10:00
version: 0.03
---

# Transcendental Integrals

## Summary

This chapter extends integration to transcendental functions. Students will learn the integrals of all six trigonometric functions, exponential functions (both e^x and a^x), and the natural logarithm integral arising from 1/x. The chapter also covers integrals that produce inverse trigonometric functions, including arcsin, arctan, and arcsec forms. After completing this chapter, students will have a complete toolkit of basic antiderivative formulas for AP Calculus.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. Integral of Sin x
2. Integral of Cos x
3. Integral of Sec Squared
4. Integral of Csc Squared
5. Integral of Sec Tan
6. Integral of Csc Cot
7. Integral of e to x
8. Integral of a to x
9. Integral of 1 Over x
10. Natural Log Integral
11. Inverse Trig Integrals
12. Arcsin Integral
13. Arctan Integral
14. Arcsec Integral

## Prerequisites

This chapter builds on concepts from:

- [Chapter 9: Product, Quotient, and Transcendental Derivatives](../09-product-quotient-transcendental-derivatives/index.md)
- [Chapter 12: Inverse Function Derivatives](../12-inverse-function-derivatives/index.md)
- [Chapter 20: Basic Antiderivatives](../20-basic-antiderivatives/index.md)

---

## Introduction: Beyond Polynomials

In Chapter 20, you learned to integrate polynomials using the power rule. But polynomials are just the beginning! The real world is full of waves, spirals, exponential growth, and decay—phenomena described by trigonometric, exponential, and logarithmic functions.

!!! quote "Delta Moment"
    "Running the derivative machine backwards is getting exciting! Polynomials were like gentle rolling hills. Now I'm ready to tackle waves, rocket trajectories, and radioactive decay. My integration backpack is about to get a serious upgrade!"

This chapter completes your basic integration toolkit by answering: **What are the antiderivatives of transcendental functions?** By the end, you'll be able to integrate virtually any elementary function you'll encounter on the AP exam.

The key insight remains the same: **integration reverses differentiation**. If you know that $\frac{d}{dx}[F(x)] = f(x)$, then $\int f(x) \, dx = F(x) + C$.

## Integrals of Sine and Cosine

Let's start with the most fundamental trigonometric integrals. Since we know the derivatives of sine and cosine, finding their antiderivatives is straightforward.

### The Integral of Sine

From Chapter 9, we know that $\frac{d}{dx}[\cos x] = -\sin x$. This means $\frac{d}{dx}[-\cos x] = \sin x$.

!!! tip "Integral of Sine"
    $$\int \sin x \, dx = -\cos x + C$$

**Verification:** $\frac{d}{dx}[-\cos x + C] = -(-\sin x) + 0 = \sin x$ ✓

Watch out for that negative sign! It's a common source of errors.

### The Integral of Cosine

Since $\frac{d}{dx}[\sin x] = \cos x$:

!!! tip "Integral of Cosine"
    $$\int \cos x \, dx = \sin x + C$$

**Verification:** $\frac{d}{dx}[\sin x + C] = \cos x$ ✓

### Memory Aid: The Negative Follows Cosine

Here's a pattern to help you remember:

- **Sine integral:** The answer involves cosine, and there's a negative → $\int \sin x \, dx = -\cos x + C$
- **Cosine integral:** The answer involves sine, no negative → $\int \cos x \, dx = \sin x + C$

Think of it as: "**Co**sine gets the negative when you differentiate, so **co**sine loses the negative when you integrate."

| Derivative Direction | Integral Direction |
|---------------------|-------------------|
| $\sin x \to \cos x$ | $\cos x \to \sin x$ |
| $\cos x \to -\sin x$ | $\sin x \to -\cos x$ |

!!! quote "Delta Moment"
    "When I integrate $\sin x$, I have to remember: sine and cosine are dance partners who switch roles, but cosine always brings that negative sign along. Don't forget the minus!"

### Examples with Sine and Cosine

**Example 1:** Find $\int 3\sin x \, dx$

$$= 3 \int \sin x \, dx = 3(-\cos x) + C = -3\cos x + C$$

**Example 2:** Find $\int (2\cos x - 5\sin x) \, dx$

$$= 2\int \cos x \, dx - 5\int \sin x \, dx$$
$$= 2\sin x - 5(-\cos x) + C$$
$$= 2\sin x + 5\cos x + C$$

**Example 3:** Find $\int (\cos x + x^2) \, dx$

Mixing trig with polynomials? No problem—integrate term by term:

$$= \sin x + \frac{x^3}{3} + C$$

## Integrals of Secant Squared and Cosecant Squared

These integrals come directly from the derivatives of tangent and cotangent.

### The Integral of Secant Squared

Since $\frac{d}{dx}[\tan x] = \sec^2 x$:

!!! tip "Integral of Secant Squared"
    $$\int \sec^2 x \, dx = \tan x + C$$

**Why this matters:** This integral appears constantly in applications—anytime you have $\frac{1}{\cos^2 x}$ or the "derivative form" of tangent.

### The Integral of Cosecant Squared

Since $\frac{d}{dx}[\cot x] = -\csc^2 x$, we have $\frac{d}{dx}[-\cot x] = \csc^2 x$:

!!! tip "Integral of Cosecant Squared"
    $$\int \csc^2 x \, dx = -\cot x + C$$

Notice that negative sign again! It appears because the derivative of cotangent is negative cosecant squared.

### Examples

**Example 1:** Find $\int 4\sec^2 x \, dx$

$$= 4\tan x + C$$

**Example 2:** Find $\int (\sec^2 x + \csc^2 x) \, dx$

$$= \tan x + (-\cot x) + C = \tan x - \cot x + C$$

**Example 3:** Verify that $\int \sec^2 x \, dx = \tan x + C$ by differentiation.

$$\frac{d}{dx}[\tan x + C] = \sec^2 x + 0 = \sec^2 x \, \checkmark$$

## Integrals of Secant-Tangent and Cosecant-Cotangent Products

These integrals look intimidating but come straight from the derivatives of secant and cosecant.

### The Integral of Secant Times Tangent

Since $\frac{d}{dx}[\sec x] = \sec x \tan x$:

!!! tip "Integral of Sec x Tan x"
    $$\int \sec x \tan x \, dx = \sec x + C$$

### The Integral of Cosecant Times Cotangent

Since $\frac{d}{dx}[\csc x] = -\csc x \cot x$:

!!! tip "Integral of Csc x Cot x"
    $$\int \csc x \cot x \, dx = -\csc x + C$$

### Pattern Recognition

Notice how these integrals are "self-referential"—the integrand contains the function that appears in the answer:

| Integrand | Answer | Pattern |
|-----------|--------|---------|
| $\sec^2 x$ | $\tan x + C$ | $\sec$ related to $\tan$ |
| $\csc^2 x$ | $-\cot x + C$ | $\csc$ related to $\cot$ |
| $\sec x \tan x$ | $\sec x + C$ | $\sec$ appears in both |
| $\csc x \cot x$ | $-\csc x + C$ | $\csc$ appears in both |

The "co-functions" (csc, cot) always bring negative signs.

#### Diagram: Trigonometric Integral Reference

<iframe src="../../sims/trig-integral-reference/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Trigonometric Integral Reference MicroSim</summary>
Type: infographic

Purpose: Interactive reference showing all six basic trig integrals with visual connections to their derivatives.

Learning Objective: Students will recall the integrals of the six basic trigonometric forms (Bloom Level 1: Remember)

Bloom Taxonomy Verb: recall, identify, list

Visual elements:

- Six cards arranged in pairs showing each trig integral
- Derivative arrow going one direction, integral arrow going reverse
- Color coding: positive results in blue, negative results in red
- Graph of integrand and antiderivative shown when selected
- Animation: clicking an integrand shows integration "flowing" to the answer

Interactive controls:

- Click any card to highlight the derivative-integral pair
- Toggle: Show verification (derivative of answer)
- Quiz mode: Hide answers and test recall
- Button: "Show all" and "Hide all"

Behavior:

- Each pair shows the reciprocal relationship
- Hover reveals memory aid for that pair
- Quiz mode tracks correct/incorrect responses
- Visual emphasis on which functions get negative signs

Instructional Rationale: Organizing the six integrals visually helps students see patterns (co-functions have negatives) and reinforces the derivative-integral connection.

Implementation: p5.js with card-based interface and animations
</details>

## Summary: The Six Basic Trig Integrals

Here's your complete reference for the basic trigonometric antiderivatives:

| Integrand | Antiderivative | From derivative of |
|-----------|----------------|-------------------|
| $\sin x$ | $-\cos x + C$ | $-\cos x$ |
| $\cos x$ | $\sin x + C$ | $\sin x$ |
| $\sec^2 x$ | $\tan x + C$ | $\tan x$ |
| $\csc^2 x$ | $-\cot x + C$ | $-\cot x$ |
| $\sec x \tan x$ | $\sec x + C$ | $\sec x$ |
| $\csc x \cot x$ | $-\csc x + C$ | $-\csc x$ |

!!! warning "The Negative Sign Pattern"
    Functions with "co" in their name (cosine, cotangent, cosecant) either **produce** or **require** a negative sign:

    - $\int \sin x \, dx = -\mathbf{cos}\, x + C$ (answer has "co")
    - $\int \mathbf{csc}^2 x \, dx = -\cot x + C$ (integrand has "co")
    - $\int \mathbf{csc}\, x \, \mathbf{cot}\, x \, dx = -\csc x + C$ (both have "co")

## The Exponential Integral: $\int e^x \, dx$

Now let's move to exponential functions. Remember the remarkable fact from Chapter 9: $\frac{d}{dx}[e^x] = e^x$. The exponential function is its own derivative!

This means it's also its own antiderivative:

!!! tip "Integral of e^x"
    $$\int e^x \, dx = e^x + C$$

**Verification:** $\frac{d}{dx}[e^x + C] = e^x + 0 = e^x$ ✓

!!! quote "Delta Moment"
    "The function $e^x$ is the mathematical equivalent of a celebrity who plays themselves in every movie. Differentiate it? Still $e^x$. Integrate it? Still $e^x$. It's beautifully self-consistent!"

### Examples with $e^x$

**Example 1:** Find $\int 5e^x \, dx$

$$= 5e^x + C$$

**Example 2:** Find $\int (e^x + x^3) \, dx$

$$= e^x + \frac{x^4}{4} + C$$

**Example 3:** Find $\int (3e^x - 2\sin x) \, dx$

$$= 3e^x - 2(-\cos x) + C = 3e^x + 2\cos x + C$$

## The General Exponential Integral: $\int a^x \, dx$

What about exponential functions with bases other than $e$? From Chapter 9:

$$\frac{d}{dx}[a^x] = a^x \ln a$$

To reverse this, we need to "undo" that $\ln a$ factor:

!!! tip "Integral of a^x"
    $$\int a^x \, dx = \frac{a^x}{\ln a} + C$$

    where $a > 0$ and $a \neq 1$.

**Verification:** $\frac{d}{dx}\left[\frac{a^x}{\ln a} + C\right] = \frac{1}{\ln a} \cdot a^x \ln a = a^x$ ✓

**Why divide by $\ln a$?** When you differentiate $a^x$, you get an extra factor of $\ln a$. To undo that, integration must divide by $\ln a$.

**Special case:** When $a = e$, we have $\ln e = 1$, so $\frac{e^x}{\ln e} = \frac{e^x}{1} = e^x$. ✓

### Examples with General Exponentials

**Example 1:** Find $\int 2^x \, dx$

$$= \frac{2^x}{\ln 2} + C$$

(Since $\ln 2 \approx 0.693$, this equals approximately $1.443 \cdot 2^x + C$)

**Example 2:** Find $\int 10^x \, dx$

$$= \frac{10^x}{\ln 10} + C$$

**Example 3:** Find $\int (3^x + 3x^2) \, dx$

$$= \frac{3^x}{\ln 3} + x^3 + C$$

#### Diagram: Exponential Integrals Explorer

<iframe src="../../sims/exponential-integrals/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Exponential Integrals Explorer MicroSim</summary>
Type: microsim

Purpose: Demonstrate how the integral of $a^x$ depends on the base $a$, and why dividing by $\ln a$ is necessary.

Learning Objective: Students will apply the formula $\int a^x \, dx = \frac{a^x}{\ln a} + C$ for various bases (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, calculate, compute

Visual elements:

- Graph showing $f(x) = a^x$ and its antiderivative $F(x) = \frac{a^x}{\ln a}$
- Slider-controlled base $a$ (range 0.5 to 5, default 2)
- Display of $\ln a$ value
- Tangent line on $F(x)$ showing slope equals $a^x$
- Special highlight when $a = e$ showing $\ln a = 1$

Interactive controls:

- Slider: Adjust base $a$
- Toggle: Show/hide derivative verification
- Slider: Move point along curve to check tangent slope
- Display: Current formula $\int a^x \, dx = \frac{a^x}{\ln a} + C$

Behavior:

- As $a$ changes, both curves update
- When $a = e$, display highlights "special case"
- Tangent line slope always equals $a^x$ at the point
- Numerical display shows $\ln a$ value

Instructional Rationale: Seeing how the $\ln a$ factor changes with different bases builds understanding of why it appears in the formula.

Implementation: p5.js with dual graph display and interactive slider
</details>

## The Natural Logarithm Integral: $\int \frac{1}{x} \, dx$

Here's where something special happens. In Chapter 20, we noted that the power rule doesn't work when $n = -1$:

$$\int x^{-1} \, dx = \int \frac{1}{x} \, dx = \, ???$$

If we tried to apply the power rule, we'd get $\frac{x^0}{0}$, which is undefined (division by zero!).

The answer comes from remembering that $\frac{d}{dx}[\ln x] = \frac{1}{x}$:

!!! tip "Integral of 1/x"
    $$\int \frac{1}{x} \, dx = \ln|x| + C$$

    Note the **absolute value** around $x$.

**Why the absolute value?** The function $\frac{1}{x}$ is defined for all $x \neq 0$, including negative values. But $\ln x$ is only defined for $x > 0$.

For $x < 0$, we use the fact that $\frac{d}{dx}[\ln(-x)] = \frac{1}{-x} \cdot (-1) = \frac{1}{x}$

So:

- For $x > 0$: $\int \frac{1}{x} \, dx = \ln x + C$
- For $x < 0$: $\int \frac{1}{x} \, dx = \ln(-x) + C$

Using $|x|$ combines both cases: $\ln|x| + C$ works for all $x \neq 0$.

### The Natural Log Integral in Action

**Example 1:** Find $\int \frac{5}{x} \, dx$

$$= 5 \int \frac{1}{x} \, dx = 5\ln|x| + C$$

**Example 2:** Find $\int \left(\frac{1}{x} + e^x\right) \, dx$

$$= \ln|x| + e^x + C$$

**Example 3:** Verify that $\int \frac{1}{x} \, dx = \ln|x| + C$ for $x > 0$.

For $x > 0$, $|x| = x$, so we're checking that $\frac{d}{dx}[\ln x] = \frac{1}{x}$. ✓

!!! quote "Delta Moment"
    "The integral of $\frac{1}{x}$ is the one case where the power rule breaks down—but nature provides a beautiful answer in the natural logarithm. It's like the universe knew we'd need this function!"

### Why This Integral is Special

The integral $\int \frac{1}{x} \, dx = \ln|x| + C$ is historically significant. In fact, one way to *define* the natural logarithm is:

$$\ln x = \int_1^x \frac{1}{t} \, dt \quad \text{for } x > 0$$

This says: the natural log of $x$ equals the area under the curve $y = \frac{1}{t}$ from $t = 1$ to $t = x$.

#### Diagram: The Natural Log as Area

<iframe src="../../sims/ln-as-area/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Natural Log as Area MicroSim</summary>
Type: microsim

Purpose: Visualize the natural logarithm as the area under the curve $y = \frac{1}{x}$ from 1 to a variable endpoint.

Learning Objective: Students will interpret $\ln x$ as the accumulated area under $y = \frac{1}{t}$ from 1 to $x$ (Bloom Level 2: Understand)

Bloom Taxonomy Verb: interpret, explain, visualize

Visual elements:

- Graph of $y = \frac{1}{x}$ for $x > 0$
- Shaded region from $t = 1$ to movable endpoint $t = a$
- Vertical line at $t = 1$ marking the starting point
- Display: Area value (which equals $\ln a$)
- Reference line showing $y = \ln x$ for comparison

Interactive controls:

- Slider: Move endpoint $a$ from 0.1 to 10
- Toggle: Show/hide the $y = \ln x$ graph overlay
- Display: Current value of $a$ and computed $\ln a$
- Animation: Auto-sweep through values

Behavior:

- Shaded area updates in real-time as $a$ changes
- When $a < 1$, area is negative (shown differently)
- When $a = 1$, area is 0 (ln 1 = 0)
- When $a = e$, area is 1 (ln e = 1)
- Graph of $\ln x$ overlays to show the connection

Instructional Rationale: Seeing the logarithm as accumulated area connects integration to logarithms conceptually and prepares students for the Fundamental Theorem of Calculus.

Implementation: p5.js with numerical integration for shaded region
</details>

## Summary: Exponential and Logarithmic Integrals

Here are your exponential and logarithmic antiderivatives:

| Integrand | Antiderivative | Note |
|-----------|----------------|------|
| $e^x$ | $e^x + C$ | Self-antiderivative! |
| $a^x$ | $\frac{a^x}{\ln a} + C$ | Divide by $\ln a$ |
| $\frac{1}{x}$ | $\ln\|x\| + C$ | Absolute value required |

## Integrals That Produce Inverse Trig Functions

Now we encounter a beautiful surprise. Some very simple-looking integrals have inverse trigonometric functions as their antiderivatives!

### Where Do These Come From?

Recall from Chapter 12 that:

- $\frac{d}{dx}[\arcsin x] = \frac{1}{\sqrt{1-x^2}}$
- $\frac{d}{dx}[\arctan x] = \frac{1}{1+x^2}$
- $\frac{d}{dx}[\text{arcsec } x] = \frac{1}{|x|\sqrt{x^2-1}}$

Reversing these gives us three important integration formulas!

### The Arcsin Integral

!!! tip "Integral Producing Arcsin"
    $$\int \frac{1}{\sqrt{1-x^2}} \, dx = \arcsin x + C$$

    where $-1 < x < 1$.

**Verification:** $\frac{d}{dx}[\arcsin x + C] = \frac{1}{\sqrt{1-x^2}}$ ✓

**Alternate form:** Since $\frac{d}{dx}[\arccos x] = -\frac{1}{\sqrt{1-x^2}}$:

$$\int \frac{1}{\sqrt{1-x^2}} \, dx = -\arccos x + C$$

Both answers are correct! They differ by a constant: $\arcsin x + \arccos x = \frac{\pi}{2}$.

### The Arctan Integral

!!! tip "Integral Producing Arctan"
    $$\int \frac{1}{1+x^2} \, dx = \arctan x + C$$

**Verification:** $\frac{d}{dx}[\arctan x + C] = \frac{1}{1+x^2}$ ✓

This is probably the most frequently used inverse trig integral. Notice that $\frac{1}{1+x^2}$ is defined for all real $x$—no domain restrictions!

### The Arcsecant Integral

!!! tip "Integral Producing Arcsec"
    $$\int \frac{1}{x\sqrt{x^2-1}} \, dx = \text{arcsec}\, |x| + C$$

    where $|x| > 1$.

Note: Some textbooks write this as $\frac{1}{|x|\sqrt{x^2-1}}$ in the integrand. The formula works when $|x| > 1$.

### Recognizing These Patterns

The key is pattern recognition. When you see:

| Integrand Pattern | Think... | Integral |
|-------------------|----------|----------|
| $\frac{1}{\sqrt{1-(\text{something})^2}}$ | Arcsin! | $\arcsin(\text{something}) + C$ |
| $\frac{1}{1+(\text{something})^2}$ | Arctan! | $\arctan(\text{something}) + C$ |
| $\frac{1}{(\text{something})\sqrt{(\text{something})^2-1}}$ | Arcsec! | $\text{arcsec}(\text{something}) + C$ |

!!! quote "Delta Moment"
    "These inverse trig integrals are sneaky! The integrands look like algebra, but the answers involve trigonometry. It's like discovering a secret passage between two rooms I thought were separate!"

## Examples with Inverse Trig Integrals

**Example 1:** Find $\int \frac{1}{\sqrt{1-x^2}} \, dx$

Direct application: $= \arcsin x + C$

**Example 2:** Find $\int \frac{3}{1+x^2} \, dx$

$$= 3\int \frac{1}{1+x^2} \, dx = 3\arctan x + C$$

**Example 3:** Find $\int \frac{1}{x\sqrt{x^2-1}} \, dx$ for $x > 1$

$$= \text{arcsec } x + C$$

**Example 4:** Find $\int \left(\frac{1}{1+x^2} + e^x\right) \, dx$

$$= \arctan x + e^x + C$$

**Example 5:** Find $\int \frac{5}{\sqrt{1-x^2}} \, dx$

$$= 5\arcsin x + C$$

#### Diagram: Inverse Trig Integral Matcher

<iframe src="../../sims/inverse-trig-integral-match/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Inverse Trig Integral Matcher MicroSim</summary>
Type: microsim

Purpose: Help students recognize which inverse trig integral formula applies to different integrands.

Learning Objective: Students will match integrands to their corresponding inverse trig antiderivatives (Bloom Level 4: Analyze)

Bloom Taxonomy Verb: differentiate, distinguish, classify

Visual elements:

- Three columns: Arcsin type, Arctan type, Arcsec type
- Integrand patterns displayed with key features highlighted
- Graph of each integrand alongside graph of antiderivative
- Drag-and-drop sorting interface

Interactive controls:

- Drag integrands to correct category
- "Check" button for verification
- "Hint" button reveals pattern to look for
- Quiz mode: Random integrands to classify
- Score tracker

Example integrands to sort:

- $\frac{1}{\sqrt{1-x^2}}$ → Arcsin
- $\frac{1}{1+x^2}$ → Arctan
- $\frac{1}{\sqrt{1-4x^2}}$ → Arcsin (scaled)
- $\frac{1}{4+x^2}$ → Arctan (scaled)
- $\frac{1}{x\sqrt{x^2-1}}$ → Arcsec

Behavior:

- Correct matches highlight green
- Incorrect matches provide feedback
- Graphs show derivative relationship
- Progressive difficulty levels

Instructional Rationale: Pattern recognition is crucial for these integrals. Active sorting with feedback builds discrimination skills.

Implementation: p5.js with drag-and-drop functionality
</details>

## Generalized Inverse Trig Integrals

The basic inverse trig integral formulas can be extended to handle constants:

### Arcsin with Constant

$$\int \frac{1}{\sqrt{a^2-x^2}} \, dx = \arcsin\frac{x}{a} + C$$

where $a > 0$ and $|x| < a$.

**Example:** Find $\int \frac{1}{\sqrt{9-x^2}} \, dx$

Here $a^2 = 9$, so $a = 3$:

$$= \arcsin\frac{x}{3} + C$$

**Verification:** $\frac{d}{dx}\left[\arcsin\frac{x}{3}\right] = \frac{1}{\sqrt{1-\frac{x^2}{9}}} \cdot \frac{1}{3} = \frac{1}{3\sqrt{\frac{9-x^2}{9}}} = \frac{1}{3 \cdot \frac{\sqrt{9-x^2}}{3}} = \frac{1}{\sqrt{9-x^2}}$ ✓

### Arctan with Constant

$$\int \frac{1}{a^2+x^2} \, dx = \frac{1}{a}\arctan\frac{x}{a} + C$$

where $a > 0$.

**Example:** Find $\int \frac{1}{4+x^2} \, dx$

Here $a^2 = 4$, so $a = 2$:

$$= \frac{1}{2}\arctan\frac{x}{2} + C$$

### Arcsec with Constant

$$\int \frac{1}{x\sqrt{x^2-a^2}} \, dx = \frac{1}{a}\text{arcsec}\frac{|x|}{a} + C$$

where $a > 0$ and $|x| > a$.

### Summary: Generalized Formulas

| Integrand | Antiderivative | Conditions |
|-----------|----------------|------------|
| $\frac{1}{\sqrt{a^2-x^2}}$ | $\arcsin\frac{x}{a} + C$ | $a > 0$, $\|x\| < a$ |
| $\frac{1}{a^2+x^2}$ | $\frac{1}{a}\arctan\frac{x}{a} + C$ | $a > 0$ |
| $\frac{1}{x\sqrt{x^2-a^2}}$ | $\frac{1}{a}\text{arcsec}\frac{\|x\|}{a} + C$ | $a > 0$, $\|x\| > a$ |

!!! note "How to Recognize Which Formula to Use"
    - **Arcsin type:** Square root in denominator, minus sign under the root: $\sqrt{a^2 - x^2}$
    - **Arctan type:** Sum of squares in denominator, no square root: $a^2 + x^2$
    - **Arcsec type:** Square root in denominator, minus sign with $a^2$: $x\sqrt{x^2 - a^2}$

## Combining Everything: Mixed Practice

Now let's put all our transcendental integrals together.

**Example 1:** Find $\int (e^x + \sin x + \frac{1}{x}) \, dx$

$$= e^x + (-\cos x) + \ln|x| + C = e^x - \cos x + \ln|x| + C$$

**Example 2:** Find $\int \left(\sec^2 x + \frac{1}{1+x^2}\right) \, dx$

$$= \tan x + \arctan x + C$$

**Example 3:** Find $\int \left(2^x + \frac{3}{\sqrt{1-x^2}}\right) \, dx$

$$= \frac{2^x}{\ln 2} + 3\arcsin x + C$$

**Example 4:** Find $\int \left(\cos x - \csc^2 x + \frac{1}{x}\right) \, dx$

$$= \sin x - (-\cot x) + \ln|x| + C = \sin x + \cot x + \ln|x| + C$$

**Example 5:** Find $\int \left(\frac{5}{9+x^2}\right) \, dx$

Using the generalized arctan formula with $a = 3$:

$$= 5 \cdot \frac{1}{3}\arctan\frac{x}{3} + C = \frac{5}{3}\arctan\frac{x}{3} + C$$

#### Diagram: Transcendental Integration Practice

<iframe src="../../sims/transcendental-integral-practice/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Transcendental Integration Practice MicroSim</summary>
Type: microsim

Purpose: Interactive practice with all transcendental integral types, providing immediate feedback and step-by-step guidance.

Learning Objective: Students will apply the appropriate antiderivative formula for transcendental functions (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, calculate, solve

Visual elements:

- Problem display showing integrand
- Multiple-choice or fill-in answer field
- Step-by-step solution reveal
- Graph showing integrand and antiderivative
- Category labels: Trig, Exponential, Log, Inverse Trig

Interactive controls:

- Button: Generate new problem
- Dropdown: Select category or "Mixed"
- Difficulty: Basic / Intermediate / Advanced
- "Show Hint" reveals which formula applies
- "Show Solution" provides full step-by-step
- Progress tracker: correct/attempted

Problem types by category:

- **Trig:** $\int \sin x$, $\int \cos x$, $\int \sec^2 x$, etc.
- **Exponential:** $\int e^x$, $\int a^x$
- **Log:** $\int \frac{1}{x}$
- **Inverse Trig:** $\int \frac{1}{\sqrt{1-x^2}}$, $\int \frac{1}{1+x^2}$, etc.
- **Mixed:** Combinations like $\int (e^x + \sin x)$

Behavior:

- Immediate feedback on answer
- Step-through option for complex problems
- Graphs update to show relationship
- Tracks which categories need more practice

Instructional Rationale: Distributed practice across all integral types builds fluency. Immediate feedback prevents error reinforcement.

Implementation: p5.js with problem generation and answer checking
</details>

## The Complete Basic Integration Toolkit

Here is your comprehensive reference of all antiderivatives covered so far:

### Polynomial and Basic Rules (Chapter 20)

| Integrand | Antiderivative |
|-----------|----------------|
| $x^n$ ($n \neq -1$) | $\frac{x^{n+1}}{n+1} + C$ |
| $k$ (constant) | $kx + C$ |
| $kf(x)$ | $k\int f(x) \, dx$ |
| $f(x) + g(x)$ | $\int f(x) \, dx + \int g(x) \, dx$ |

### Trigonometric Integrals (This Chapter)

| Integrand | Antiderivative |
|-----------|----------------|
| $\sin x$ | $-\cos x + C$ |
| $\cos x$ | $\sin x + C$ |
| $\sec^2 x$ | $\tan x + C$ |
| $\csc^2 x$ | $-\cot x + C$ |
| $\sec x \tan x$ | $\sec x + C$ |
| $\csc x \cot x$ | $-\csc x + C$ |

### Exponential and Logarithmic Integrals (This Chapter)

| Integrand | Antiderivative |
|-----------|----------------|
| $e^x$ | $e^x + C$ |
| $a^x$ | $\frac{a^x}{\ln a} + C$ |
| $\frac{1}{x}$ | $\ln\|x\| + C$ |

### Inverse Trigonometric Integrals (This Chapter)

| Integrand | Antiderivative |
|-----------|----------------|
| $\frac{1}{\sqrt{1-x^2}}$ | $\arcsin x + C$ |
| $\frac{1}{1+x^2}$ | $\arctan x + C$ |
| $\frac{1}{x\sqrt{x^2-1}}$ | $\text{arcsec}\|x\| + C$ |
| $\frac{1}{\sqrt{a^2-x^2}}$ | $\arcsin\frac{x}{a} + C$ |
| $\frac{1}{a^2+x^2}$ | $\frac{1}{a}\arctan\frac{x}{a} + C$ |

!!! quote "Delta's Pun Corner"
    "Why did the integral fail its driving test? Because it kept adding C to everything! But seriously, with this toolkit, you're now equipped to handle virtually any basic antiderivative. That's integration-ally impressive!"

## Common Mistakes to Avoid

**Mistake 1: Forgetting the negative in $\int \sin x \, dx$**

Wrong: $\int \sin x \, dx = \cos x + C$

Correct: $\int \sin x \, dx = -\cos x + C$

**Mistake 2: Forgetting the absolute value in $\int \frac{1}{x} \, dx$**

Wrong: $\int \frac{1}{x} \, dx = \ln x + C$

Correct: $\int \frac{1}{x} \, dx = \ln|x| + C$

**Mistake 3: Forgetting to divide by $\ln a$ for general exponentials**

Wrong: $\int 3^x \, dx = 3^x + C$

Correct: $\int 3^x \, dx = \frac{3^x}{\ln 3} + C$

**Mistake 4: Confusing arcsin and arctan patterns**

- $\frac{1}{\sqrt{1-x^2}}$ has a square root → arcsin
- $\frac{1}{1+x^2}$ has no square root → arctan

**Mistake 5: Forgetting the factor of $\frac{1}{a}$ in generalized arctan**

Wrong: $\int \frac{1}{4+x^2} \, dx = \arctan\frac{x}{2} + C$

Correct: $\int \frac{1}{4+x^2} \, dx = \frac{1}{2}\arctan\frac{x}{2} + C$

## Verification Strategy

Always verify your antiderivatives by differentiating! If $\int f(x) \, dx = F(x) + C$, then $F'(x)$ should equal $f(x)$.

**Example verification:** Check that $\int \frac{1}{9+x^2} \, dx = \frac{1}{3}\arctan\frac{x}{3} + C$

$$\frac{d}{dx}\left[\frac{1}{3}\arctan\frac{x}{3}\right] = \frac{1}{3} \cdot \frac{1}{1+\frac{x^2}{9}} \cdot \frac{1}{3}$$

$$= \frac{1}{9} \cdot \frac{1}{\frac{9+x^2}{9}} = \frac{1}{9} \cdot \frac{9}{9+x^2} = \frac{1}{9+x^2} \, \checkmark$$

## Key Takeaways

- **Trig integrals** reverse trig derivatives—watch the negative signs on co-functions!

- **$\int e^x \, dx = e^x + C$** — the exponential function is its own antiderivative.

- **$\int a^x \, dx = \frac{a^x}{\ln a} + C$** — divide by $\ln a$ to compensate for differentiation.

- **$\int \frac{1}{x} \, dx = \ln|x| + C$** — this is the one case where the power rule fails, and the natural log provides the answer.

- **Inverse trig integrals** arise from expressions involving $\sqrt{1-x^2}$, $1+x^2$, and $x\sqrt{x^2-1}$.

- **Pattern recognition** is key: learn to identify which formula applies based on the integrand's structure.

- **Always verify** by differentiating your answer!

??? question "Check Your Understanding: Find $\int \left(3\sin x + \frac{2}{x} + \frac{1}{\sqrt{4-x^2}}\right) \, dx$"
    Work term by term:

    - $\int 3\sin x \, dx = 3(-\cos x) = -3\cos x$
    - $\int \frac{2}{x} \, dx = 2\ln|x|$
    - $\int \frac{1}{\sqrt{4-x^2}} \, dx = \arcsin\frac{x}{2}$ (using $a = 2$)

    **Answer:** $-3\cos x + 2\ln|x| + \arcsin\frac{x}{2} + C$

    **Verify the last term:** $\frac{d}{dx}\left[\arcsin\frac{x}{2}\right] = \frac{1}{\sqrt{1-\frac{x^2}{4}}} \cdot \frac{1}{2} = \frac{1}{2} \cdot \frac{1}{\sqrt{\frac{4-x^2}{4}}} = \frac{1}{2} \cdot \frac{2}{\sqrt{4-x^2}} = \frac{1}{\sqrt{4-x^2}}$ ✓

??? question "Check Your Understanding: Find $\int \left(e^x + 5^x + \sec^2 x\right) \, dx$"
    Work term by term:

    - $\int e^x \, dx = e^x$
    - $\int 5^x \, dx = \frac{5^x}{\ln 5}$
    - $\int \sec^2 x \, dx = \tan x$

    **Answer:** $e^x + \frac{5^x}{\ln 5} + \tan x + C$

??? question "Check Your Understanding: Find $\int \frac{6}{4+x^2} \, dx$"
    Factor out the constant and use the generalized arctan formula with $a^2 = 4$, so $a = 2$:

    $$\int \frac{6}{4+x^2} \, dx = 6 \cdot \frac{1}{2}\arctan\frac{x}{2} + C = 3\arctan\frac{x}{2} + C$$

    **Verify:** $\frac{d}{dx}\left[3\arctan\frac{x}{2}\right] = 3 \cdot \frac{1}{1+\frac{x^2}{4}} \cdot \frac{1}{2} = \frac{3}{2} \cdot \frac{4}{4+x^2} = \frac{6}{4+x^2}$ ✓

## Looking Ahead

With your transcendental integration toolkit complete, you're ready for the next major milestone: **Riemann sums and the Fundamental Theorem of Calculus**. This theorem reveals the profound connection between derivatives and integrals—and shows why the area under a curve is computed by antiderivatives.

Delta will discover that all her slope measurements (derivatives) and distance tracking (integrals) are two sides of the same mathematical coin!
