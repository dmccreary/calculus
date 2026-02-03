---
title: Inverse Function Derivatives
description: Mastering derivatives of inverse trigonometric functions and logarithmic differentiation
generated_by: claude skill chapter-content-generator
date: 2026-02-03 10:16:00
version: 0.03
---

# Inverse Function Derivatives

## Summary

This chapter focuses on derivatives of inverse functions, particularly inverse trigonometric functions. Students will learn the derivatives of all six inverse trigonometric functions and understand their domain restrictions. The chapter also introduces logarithmic differentiation, a powerful technique for differentiating products, quotients, and functions with variable exponents. After completing this chapter, students will have mastered all derivative formulas needed for AP Calculus.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. Graphical Inverse Deriv
2. Derivative of Arcsin
3. Derivative of Arccos
4. Derivative of Arctan
5. Derivative of Arcsec
6. Derivative of Arccsc
7. Derivative of Arccot
8. Inverse Trig Domain
9. Logarithmic Differentiate
10. Differentiating Products
11. Differentiating Powers
12. Variable Exponents

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Calculus](../01-foundations-of-calculus/index.md)
- [Chapter 9: Product, Quotient, and Transcendental Derivatives](../09-product-quotient-transcendental-derivatives/index.md)
- [Chapter 11: Implicit Differentiation](../11-implicit-differentiation/index.md)

---

## Introduction: Retracing Your Steps

Imagine you've climbed a mountain trail. You know exactly how your altitude changed as you walked forward. But what if you wanted to describe your horizontal progress based on your altitude? That's essentially what inverse functions do—they swap the roles of input and output.

!!! quote "Delta Moment"
    "Inverse functions are like retracing my path—same journey, opposite direction! If $f$ tells me my altitude from my position, $f^{-1}$ tells me my position from my altitude."

In this chapter, we'll discover how to find derivatives of inverse functions, with special attention to the six inverse trigonometric functions. We'll also learn a clever technique called **logarithmic differentiation** that makes seemingly impossible derivatives surprisingly manageable.

## The Graphical Relationship: Inverse Derivatives

Before diving into formulas, let's understand what happens graphically when we differentiate an inverse function. This visual intuition will make the formulas feel natural rather than mysterious.

### Reflecting Across the Line $y = x$

Recall that the graph of $f^{-1}$ is the reflection of $f$ across the line $y = x$. This reflection swaps the roles of $x$ and $y$, which has fascinating consequences for slopes.

Consider a point $(a, b)$ on the graph of $f$, where $f(a) = b$. The corresponding point on $f^{-1}$ is $(b, a)$. If the tangent line to $f$ at $(a, b)$ has slope $m$, then the tangent line to $f^{-1}$ at $(b, a)$ has slope $\frac{1}{m}$.

!!! tip "The Inverse Function Derivative Formula"
    If $f$ is differentiable at $a$ and $f'(a) \neq 0$, then $f^{-1}$ is differentiable at $b = f(a)$, and:

    $$(f^{-1})'(b) = \frac{1}{f'(a)} = \frac{1}{f'(f^{-1}(b))}$$

    In Leibniz notation: $\frac{dx}{dy} = \frac{1}{\frac{dy}{dx}}$

**Why does this work?** When you reflect a line across $y = x$, a slope of $m$ becomes $\frac{1}{m}$. A line rising 3 units for every 1 unit right becomes a line rising 1 unit for every 3 units right.

### Visual Example

Consider $f(x) = x^3$ and its inverse $f^{-1}(x) = \sqrt[3]{x}$.

- At $x = 2$: $f(2) = 8$ and $f'(2) = 3(2)^2 = 12$
- The corresponding point on $f^{-1}$ is $(8, 2)$
- The slope of $f^{-1}$ at $x = 8$ should be $\frac{1}{12}$

Let's verify: $(f^{-1})'(x) = \frac{1}{3}x^{-2/3}$, so $(f^{-1})'(8) = \frac{1}{3} \cdot \frac{1}{4} = \frac{1}{12}$ ✓

<details markdown="1">
<summary>Inverse Function Derivatives MicroSim</summary>

#### Diagram: Graphical Inverse Derivatives

Type: interactive visualization

Purpose: Show the relationship between a function and its inverse, with tangent lines demonstrating the reciprocal slope property.

Learning Objective: Students will understand that the derivative of an inverse function equals the reciprocal of the original function's derivative (Bloom Level 2: Understand)

Bloom Taxonomy Verb: explain, interpret, demonstrate

Visual elements:

- Two graphs side by side: $f(x)$ and $f^{-1}(x)$
- Line $y = x$ shown as dashed reference
- Draggable point on $f(x)$ with tangent line
- Corresponding point on $f^{-1}(x)$ with tangent line
- Slope values displayed for both tangent lines
- Visual showing $m_1 \times m_2 = 1$

Interactive controls:

- Draggable point along the curve $f(x)$
- Dropdown: Select function family (cubic, exponential, etc.)
- Toggle: Show/hide $y = x$ line
- Toggle: Show/hide slope calculations

Behavior:

- As user drags point on $f$, corresponding point on $f^{-1}$ updates
- Tangent lines update in real-time
- Slope display shows both values and their product (always 1)
- Animation option: Auto-trace along the curve

Instructional Rationale: Seeing slopes as reciprocals builds intuition before the formula. The interactive element allows students to verify the relationship at many points.

Implementation: p5.js with synchronized graphs
</details>

## Inverse Trigonometric Functions: Domain Restrictions

Before we can differentiate inverse trig functions, we need to address a crucial issue: trigonometric functions aren't one-to-one, so they don't have true inverses unless we restrict their domains.

### Why Restrictions Are Necessary

The sine function oscillates forever between -1 and 1. If you ask "what angle has sine equal to 0.5?", there are infinitely many answers: $\frac{\pi}{6}, \frac{5\pi}{6}, \frac{13\pi}{6}, \ldots$

To create a proper inverse function, mathematicians chose **principal value ranges** for each inverse trig function:

| Function | Domain | Range (Principal Values) |
|----------|--------|-------------------------|
| $\arcsin(x)$ | $[-1, 1]$ | $\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]$ |
| $\arccos(x)$ | $[-1, 1]$ | $[0, \pi]$ |
| $\arctan(x)$ | $(-\infty, \infty)$ | $\left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$ |
| $\text{arcsec}(x)$ | $(-\infty, -1] \cup [1, \infty)$ | $\left[0, \frac{\pi}{2}\right) \cup \left(\frac{\pi}{2}, \pi\right]$ |
| $\text{arccsc}(x)$ | $(-\infty, -1] \cup [1, \infty)$ | $\left[-\frac{\pi}{2}, 0\right) \cup \left(0, \frac{\pi}{2}\right]$ |
| $\text{arccot}(x)$ | $(-\infty, \infty)$ | $(0, \pi)$ |

**Key insight:** The domain of an inverse trig function is the range of the original trig function (restricted). The range of the inverse is the restricted domain we chose.

!!! warning "Notation Alert"
    $\arcsin(x)$ and $\sin^{-1}(x)$ mean the same thing: the inverse sine function. But $\sin^{-1}(x) \neq \frac{1}{\sin(x)}$! The notation $(\sin x)^{-1} = \csc x$ is for the reciprocal. Context matters!

<details markdown="1">
<summary>Inverse Trig Domains MicroSim</summary>

#### Diagram: Inverse Trig Domain Visualization

Type: interactive diagram

Purpose: Visualize the domain restrictions for inverse trig functions and why they're necessary.

Learning Objective: Students will identify the domain and range of each inverse trigonometric function (Bloom Level 1: Remember)

Bloom Taxonomy Verb: identify, recognize, list

Visual elements:

- Six panels, one for each inverse trig function
- Original trig function with restricted domain highlighted
- Inverse function graph shown below
- Horizontal line test demonstration
- Domain and range labeled clearly

Interactive controls:

- Select inverse trig function from dropdown
- Slider: Draw horizontal line to show why restriction is needed
- Toggle: Show both original and inverse on same axes
- Button: "Why this range?" reveals explanation

Behavior:

- Horizontal line intersects unrestricted function at multiple points
- Highlight shows chosen interval passes horizontal line test
- Inverse graph updates based on selection
- Clear labeling of domain/range

Instructional Rationale: Students often struggle with why domain restrictions exist. Showing the horizontal line test makes the necessity concrete.

Implementation: p5.js with multiple function graphs
</details>

## Derivative of Arcsine

Let's derive the formula for $\frac{d}{dx}[\arcsin(x)]$ using implicit differentiation.

Let $y = \arcsin(x)$. Then by definition:

$$\sin(y) = x$$

where $-\frac{\pi}{2} \leq y \leq \frac{\pi}{2}$

Differentiate both sides with respect to $x$:

$$\cos(y) \cdot \frac{dy}{dx} = 1$$

$$\frac{dy}{dx} = \frac{1}{\cos(y)}$$

Now we need to express $\cos(y)$ in terms of $x$. Since $\sin(y) = x$, we use the Pythagorean identity:

$$\cos^2(y) + \sin^2(y) = 1$$

$$\cos^2(y) = 1 - x^2$$

$$\cos(y) = \pm\sqrt{1 - x^2}$$

Here's where the domain restriction matters! Since $-\frac{\pi}{2} \leq y \leq \frac{\pi}{2}$, we know $\cos(y) \geq 0$, so:

$$\cos(y) = \sqrt{1 - x^2}$$

!!! tip "Derivative of Arcsine"
    $$\frac{d}{dx}[\arcsin(x)] = \frac{1}{\sqrt{1 - x^2}}$$

    where: $-1 < x < 1$ (derivative undefined at endpoints)

**Example:** Find $\frac{d}{dx}[\arcsin(3x)]$

Using the chain rule with $u = 3x$:

$$\frac{d}{dx}[\arcsin(3x)] = \frac{1}{\sqrt{1 - (3x)^2}} \cdot 3 = \frac{3}{\sqrt{1 - 9x^2}}$$

## Derivative of Arccosine

The derivation follows the same pattern. Let $y = \arccos(x)$, so $\cos(y) = x$ where $0 \leq y \leq \pi$.

Differentiating: $-\sin(y) \cdot \frac{dy}{dx} = 1$

Since $0 \leq y \leq \pi$, we have $\sin(y) \geq 0$, so $\sin(y) = \sqrt{1 - x^2}$.

!!! tip "Derivative of Arccosine"
    $$\frac{d}{dx}[\arccos(x)] = -\frac{1}{\sqrt{1 - x^2}}$$

    where: $-1 < x < 1$

**Notice something?** The derivatives of arcsine and arccosine are negatives of each other! This makes sense because $\arcsin(x) + \arccos(x) = \frac{\pi}{2}$ for all $x$ in $[-1, 1]$.

!!! quote "Delta Moment"
    "Whoa—arcsine and arccosine are complementary angles! No wonder their derivatives are opposites. When one tilts up, the other tilts down by the same amount!"

## Derivative of Arctangent

This is perhaps the most important inverse trig derivative for applications. Let $y = \arctan(x)$, so $\tan(y) = x$ where $-\frac{\pi}{2} < y < \frac{\pi}{2}$.

Differentiating: $\sec^2(y) \cdot \frac{dy}{dx} = 1$

$$\frac{dy}{dx} = \frac{1}{\sec^2(y)} = \cos^2(y)$$

Using the identity $\sec^2(y) = 1 + \tan^2(y) = 1 + x^2$:

!!! tip "Derivative of Arctangent"
    $$\frac{d}{dx}[\arctan(x)] = \frac{1}{1 + x^2}$$

    where: $x$ can be any real number

**Why is this special?** The arctangent derivative is defined for ALL real numbers—no square roots, no domain restrictions (except it approaches 0 as $x \to \pm\infty$).

**Example:** Find $\frac{d}{dx}[\arctan(e^x)]$

Using the chain rule:

$$\frac{d}{dx}[\arctan(e^x)] = \frac{1}{1 + (e^x)^2} \cdot e^x = \frac{e^x}{1 + e^{2x}}$$

## Derivatives of Arcsecant, Arccosecant, and Arccotangent

The remaining three inverse trig functions appear less frequently on the AP exam, but their derivatives follow similar derivation patterns.

### Derivative of Arcsecant

Let $y = \text{arcsec}(x)$, so $\sec(y) = x$.

Differentiating: $\sec(y)\tan(y) \cdot \frac{dy}{dx} = 1$

After careful analysis of the domain restrictions:

!!! tip "Derivative of Arcsecant"
    $$\frac{d}{dx}[\text{arcsec}(x)] = \frac{1}{|x|\sqrt{x^2 - 1}}$$

    where: $|x| > 1$

**The absolute value** is necessary because the derivative must be positive for both $x > 1$ and $x < -1$ (arcsecant is increasing on both parts of its domain).

### Derivative of Arccosecant

!!! tip "Derivative of Arccosecant"
    $$\frac{d}{dx}[\text{arccsc}(x)] = -\frac{1}{|x|\sqrt{x^2 - 1}}$$

    where: $|x| > 1$

### Derivative of Arccotangent

!!! tip "Derivative of Arccotangent"
    $$\frac{d}{dx}[\text{arccot}(x)] = -\frac{1}{1 + x^2}$$

    where: $x$ can be any real number

Notice that $\frac{d}{dx}[\text{arccot}(x)] = -\frac{d}{dx}[\arctan(x)]$, similar to the sine/cosine relationship.

## Summary: All Inverse Trig Derivatives

Here's your reference table for all six inverse trig derivatives:

| Function | Derivative | Domain |
|----------|------------|--------|
| $\arcsin(x)$ | $\frac{1}{\sqrt{1-x^2}}$ | $-1 < x < 1$ |
| $\arccos(x)$ | $-\frac{1}{\sqrt{1-x^2}}$ | $-1 < x < 1$ |
| $\arctan(x)$ | $\frac{1}{1+x^2}$ | all real $x$ |
| $\text{arccot}(x)$ | $-\frac{1}{1+x^2}$ | all real $x$ |
| $\text{arcsec}(x)$ | $\frac{1}{\|x\|\sqrt{x^2-1}}$ | $\|x\| > 1$ |
| $\text{arccsc}(x)$ | $-\frac{1}{\|x\|\sqrt{x^2-1}}$ | $\|x\| > 1$ |

**Memory patterns:**

- Arcsine and arccosine use $\sqrt{1-x^2}$ (their domains require $|x| \leq 1$)
- Arctangent and arccotangent use $1+x^2$ (no domain restrictions)
- Arcsecant and arccosecant use $|x|\sqrt{x^2-1}$ (their domains require $|x| \geq 1$)
- "Co-functions" have negative derivatives (arccos, arccot, arccsc)

<details markdown="1">
<summary>Inverse Trig Derivatives Quiz MicroSim</summary>

#### Diagram: Inverse Trig Derivatives Practice

Type: interactive quiz

Purpose: Help students memorize and apply inverse trig derivative formulas.

Learning Objective: Students will apply the inverse trigonometric derivative formulas to compute derivatives (Bloom Level 3: Apply)

Bloom Taxonomy Verb: calculate, apply, solve

Visual elements:

- Flashcard-style interface
- Six cards showing each inverse trig function
- Graph of each function with tangent line at user-selected point
- Derivative formula revealed after attempt

Interactive controls:

- Click card to attempt derivative
- Type answer before reveal
- "Check" button for verification
- Slider: Evaluate derivative at specific x-value
- Progress tracker: 0/6 mastered

Behavior:

- Cards flip to reveal derivative
- Incorrect attempts show hint then answer
- Graph updates to show derivative value at selected point
- Track mastery: 3 correct in a row = mastered

Instructional Rationale: Active recall through quizzing is more effective than passive review. Immediate feedback corrects misconceptions.

Implementation: p5.js with card flip animation and quiz logic
</details>

## Logarithmic Differentiation: A Powerful Technique

Now we introduce a technique that seems like a detour but unlocks problems that would otherwise be extremely difficult. **Logarithmic differentiation** converts multiplication into addition and powers into multiplication—making complex expressions much simpler.

### The Basic Idea

To find $\frac{d}{dx}[f(x)]$ using logarithmic differentiation:

1. Take the natural log of both sides: $\ln(y) = \ln(f(x))$
2. Use log properties to simplify the right side
3. Differentiate both sides implicitly
4. Solve for $\frac{dy}{dx}$
5. Substitute back $y = f(x)$

### Why This Works: The Logarithmic Properties

Recall these essential properties:

- $\ln(ab) = \ln(a) + \ln(b)$ (products become sums)
- $\ln\left(\frac{a}{b}\right) = \ln(a) - \ln(b)$ (quotients become differences)
- $\ln(a^n) = n \cdot \ln(a)$ (powers become products)

These transformations turn multiplicative complexity into additive simplicity!

## Differentiating Products with Logarithmic Differentiation

**Example:** Find $\frac{d}{dx}[x^2 \cdot \sin(x) \cdot e^x]$

You could use the product rule twice, but logarithmic differentiation is cleaner.

Let $y = x^2 \cdot \sin(x) \cdot e^x$

**Step 1:** Take the natural log:

$$\ln(y) = \ln(x^2 \cdot \sin(x) \cdot e^x)$$

**Step 2:** Apply log properties:

$$\ln(y) = \ln(x^2) + \ln(\sin x) + \ln(e^x)$$

$$\ln(y) = 2\ln(x) + \ln(\sin x) + x$$

**Step 3:** Differentiate both sides:

$$\frac{1}{y} \cdot \frac{dy}{dx} = \frac{2}{x} + \frac{\cos x}{\sin x} + 1$$

$$\frac{1}{y} \cdot \frac{dy}{dx} = \frac{2}{x} + \cot(x) + 1$$

**Step 4:** Solve for $\frac{dy}{dx}$:

$$\frac{dy}{dx} = y \left(\frac{2}{x} + \cot(x) + 1\right)$$

**Step 5:** Substitute back:

$$\frac{dy}{dx} = x^2 \sin(x) \cdot e^x \left(\frac{2}{x} + \cot(x) + 1\right)$$

This can be simplified:

$$\frac{dy}{dx} = e^x \left(2x\sin(x) + x^2\cos(x) + x^2\sin(x)\right)$$

## Differentiating Powers with Logarithmic Differentiation

Logarithmic differentiation shines when differentiating expressions with many factors or complicated exponents.

**Example:** Find $\frac{d}{dx}\left[\frac{x^3(x+1)^4}{(2x-1)^5}\right]$

Let $y = \frac{x^3(x+1)^4}{(2x-1)^5}$

**Step 1-2:** Take log and simplify:

$$\ln(y) = 3\ln(x) + 4\ln(x+1) - 5\ln(2x-1)$$

**Step 3:** Differentiate:

$$\frac{1}{y} \cdot \frac{dy}{dx} = \frac{3}{x} + \frac{4}{x+1} - \frac{5 \cdot 2}{2x-1}$$

$$\frac{1}{y} \cdot \frac{dy}{dx} = \frac{3}{x} + \frac{4}{x+1} - \frac{10}{2x-1}$$

**Step 4-5:** Solve and substitute:

$$\frac{dy}{dx} = \frac{x^3(x+1)^4}{(2x-1)^5} \left(\frac{3}{x} + \frac{4}{x+1} - \frac{10}{2x-1}\right)$$

!!! quote "Delta Moment"
    "Logarithmic differentiation is like getting a translator for a language I don't speak. The original expression looks scary, but the log version? I can handle that!"

## Variable Exponents: When Both Base and Power Change

Here's where logarithmic differentiation becomes absolutely essential. Consider $f(x) = x^x$. The power rule assumes a constant exponent. The exponential rule assumes a constant base. But here, BOTH vary!

### The Function $y = x^x$

Let $y = x^x$ for $x > 0$.

**Step 1-2:** Take log and simplify:

$$\ln(y) = \ln(x^x) = x \cdot \ln(x)$$

**Step 3:** Differentiate using the product rule:

$$\frac{1}{y} \cdot \frac{dy}{dx} = 1 \cdot \ln(x) + x \cdot \frac{1}{x}$$

$$\frac{1}{y} \cdot \frac{dy}{dx} = \ln(x) + 1$$

**Step 4-5:** Solve and substitute:

$$\frac{dy}{dx} = y(\ln(x) + 1) = x^x(\ln(x) + 1)$$

!!! tip "Derivative of Variable Exponent Functions"
    For $y = [f(x)]^{g(x)}$ where $f(x) > 0$:

    $$\frac{dy}{dx} = [f(x)]^{g(x)} \left[g'(x)\ln(f(x)) + g(x) \cdot \frac{f'(x)}{f(x)}\right]$$

    Equivalently, think of it as: $\frac{dy}{dx} = y \cdot \frac{d}{dx}[g(x)\ln(f(x))]$

### More Variable Exponent Examples

**Example:** Find $\frac{d}{dx}[(\sin x)^x]$ for $0 < x < \pi$

Let $y = (\sin x)^x$

$$\ln(y) = x \ln(\sin x)$$

$$\frac{1}{y} \cdot \frac{dy}{dx} = \ln(\sin x) + x \cdot \frac{\cos x}{\sin x}$$

$$\frac{dy}{dx} = (\sin x)^x \left[\ln(\sin x) + x\cot(x)\right]$$

**Example:** Find $\frac{d}{dx}[x^{\sin x}]$ for $x > 0$

Let $y = x^{\sin x}$

$$\ln(y) = \sin(x) \cdot \ln(x)$$

$$\frac{1}{y} \cdot \frac{dy}{dx} = \cos(x) \cdot \ln(x) + \sin(x) \cdot \frac{1}{x}$$

$$\frac{dy}{dx} = x^{\sin x} \left[\cos(x) \ln(x) + \frac{\sin(x)}{x}\right]$$

<details markdown="1">
<summary>Logarithmic Differentiation MicroSim</summary>

#### Diagram: Logarithmic Differentiation Step-by-Step

Type: interactive tutorial

Purpose: Guide students through the logarithmic differentiation process with multiple examples.

Learning Objective: Students will apply logarithmic differentiation to compute derivatives of complex products, quotients, and variable exponent functions (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, calculate, solve

Visual elements:

- Split screen: original function left, log form right
- Step-by-step transformation showing each log property applied
- Color coding: products in blue, quotients in red, powers in green
- Final answer with simplification options

Interactive controls:

- Example selector: Products, Quotients, Powers, Variable Exponents
- "Next Step" button to advance through derivation
- "Why?" button at each step for explanation
- "Try It" mode: Student selects which log property to apply

Behavior:

- Each step highlights the transformation
- Hover over terms to see which log property applies
- Error feedback if wrong property selected
- Multiple examples per category

Instructional Rationale: Breaking the process into discrete steps builds procedural fluency. The "Why?" buttons address the reasoning behind each transformation.

Implementation: p5.js with step-through animation
</details>

## Combining Techniques: Complex Derivatives

Real problems often require combining multiple differentiation techniques. Here's a comprehensive example.

**Example:** Find $\frac{d}{dx}\left[\frac{(x^2+1)^3 \cdot \arctan(x)}{e^{2x}}\right]$

This combines:

- A product of three functions
- Inverse trig (arctan)
- Exponential function
- Chain rule applications

**Using logarithmic differentiation:**

Let $y = \frac{(x^2+1)^3 \cdot \arctan(x)}{e^{2x}}$

$$\ln(y) = 3\ln(x^2+1) + \ln(\arctan(x)) - 2x$$

$$\frac{1}{y} \cdot \frac{dy}{dx} = \frac{3 \cdot 2x}{x^2+1} + \frac{1}{\arctan(x)} \cdot \frac{1}{1+x^2} - 2$$

$$\frac{1}{y} \cdot \frac{dy}{dx} = \frac{6x}{x^2+1} + \frac{1}{(1+x^2)\arctan(x)} - 2$$

Therefore:

$$\frac{dy}{dx} = \frac{(x^2+1)^3 \cdot \arctan(x)}{e^{2x}} \left[\frac{6x}{x^2+1} + \frac{1}{(1+x^2)\arctan(x)} - 2\right]$$

This can be simplified by distributing, but the logarithmic form is often preferable for computation.

## Practice Problems

**Basic Inverse Trig Derivatives:**

1. $\frac{d}{dx}[\arcsin(2x)]$
2. $\frac{d}{dx}[\arctan(x^2)]$
3. $\frac{d}{dx}[\arccos(\sqrt{x})]$
4. $\frac{d}{dx}[x \cdot \arctan(x)]$

**Logarithmic Differentiation:**

5. Find $\frac{d}{dx}[(x+1)(x+2)(x+3)]$ using logarithmic differentiation
6. Find $\frac{d}{dx}\left[\frac{\sqrt{x}(x-1)^2}{(x+1)^3}\right]$
7. Find $\frac{d}{dx}[x^{\cos x}]$
8. Find $\frac{d}{dx}[(\ln x)^x]$ for $x > 1$

<details markdown="1">
<summary>Practice Problem Answers</summary>

1. $\frac{2}{\sqrt{1-4x^2}}$

2. $\frac{2x}{1+x^4}$

3. $-\frac{1}{2\sqrt{x}\sqrt{1-x}} = -\frac{1}{2\sqrt{x-x^2}}$

4. $\arctan(x) + \frac{x}{1+x^2}$

5. $(x+1)(x+2)(x+3)\left[\frac{1}{x+1} + \frac{1}{x+2} + \frac{1}{x+3}\right]$

6. $\frac{\sqrt{x}(x-1)^2}{(x+1)^3}\left[\frac{1}{2x} + \frac{2}{x-1} - \frac{3}{x+1}\right]$

7. $x^{\cos x}\left[-\sin(x)\ln(x) + \frac{\cos(x)}{x}\right]$

8. $(\ln x)^x\left[\ln(\ln x) + \frac{1}{\ln x}\right]$

</details>

## Chapter Summary

In this chapter, you've mastered two powerful derivative techniques:

**Inverse Trig Derivatives:**

- Derived using implicit differentiation
- Domain restrictions determine the sign of square roots
- Key formulas: $\arcsin' = \frac{1}{\sqrt{1-x^2}}$, $\arctan' = \frac{1}{1+x^2}$
- "Co-functions" have negative derivatives

**Logarithmic Differentiation:**

- Converts products to sums, quotients to differences, powers to products
- Essential for variable exponent functions like $x^x$
- Process: ln both sides → simplify → implicit differentiation → solve for $\frac{dy}{dx}$

With these tools, you can now differentiate virtually any combination of functions you'll encounter in AP Calculus. That's a significant milestone!

!!! quote "Delta's Pun Corner"
    "Why did the inverse function break up with the original? Because their relationship was too one-to-one! ...okay, that one was a stretch. But seriously, you've just mastered some seriously powerful techniques. Time to celebrate with a victory lap around the unit circle!"

## Looking Ahead

In the next chapter, we'll apply all our derivative techniques to solve **related rates problems**—situations where multiple quantities change together, and we need to find how fast one is changing based on another. Delta will be measuring shadows, filling tanks, and chasing moving objects!

