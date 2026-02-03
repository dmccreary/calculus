---
title: The Chain Rule
description: Differentiating composite functions by decomposing into inside and outside functions
generated_by: claude skill chapter-content-generator
date: 2026-02-03 11:30:00
version: 0.03
---

# The Chain Rule

## Summary

This chapter introduces the chain rule, which enables differentiation of composite functions. Students will learn to identify the "inside" and "outside" functions, apply the chain rule formula, and handle nested compositions requiring multiple applications. The chapter covers applications to power functions, trigonometric compositions, exponential compositions, and logarithmic compositions. After completing this chapter, students will be able to differentiate any composite function by combining the chain rule with other derivative rules.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

1. Chain Rule
2. Chain Rule Formula
3. Composition Derivative
4. Inside Function
5. Outside Function
6. Nested Chain Rule
7. Leibniz Chain Rule
8. Derivative of f of g
9. Recognizing Composition
10. Power Chain Rule
11. Trig Chain Rule
12. Exponential Chain Rule
13. Log Chain Rule
14. Multiple Chain Rule
15. General Power Rule
16. Combining Chain Rule

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Calculus](../01-foundations-of-calculus/index.md)
- [Chapter 8: Basic Derivative Rules](../08-basic-derivative-rules/index.md)
- [Chapter 9: Product, Quotient, and Transcendental Derivatives](../09-product-quotient-transcendental-derivatives/index.md)

---

## Introduction: Functions Within Functions

Consider the function $f(x) = (x^2 + 1)^5$. How would you find its derivative?

You could expand $(x^2 + 1)^5$ into a polynomial and then differentiate term by term... but that's a lot of work! And what about $\sin(x^3)$ or $e^{x^2}$? These can't be expanded at all.

The key observation is that these are **composite functions**—functions built by putting one function inside another. The chain rule is the tool for differentiating them efficiently.

!!! quote "Delta Moment"
    "A curve on a curve? It's like slopes within slopes—Inception style! The chain rule tells me how my tilt depends on BOTH the outer shape AND the inner one."

The chain rule is arguably the most important derivative rule because it allows us to differentiate the vast majority of functions we encounter in practice.

## What is a Composite Function?

A **composite function** is formed when one function is applied to the output of another function. If we have functions $f$ and $g$, the composite function $f \circ g$ (read "f composed with g") is defined as:

$$(f \circ g)(x) = f(g(x))$$

We call:

- $g(x)$ the **inside function** (or inner function)
- $f$ the **outside function** (or outer function)

**Example:** For $h(x) = (x^2 + 1)^5$:

- Inside function: $g(x) = x^2 + 1$
- Outside function: $f(u) = u^5$
- Composite: $h(x) = f(g(x)) = (x^2 + 1)^5$

The inside function does its job first, then its output becomes the input to the outside function.

| Composite Function | Inside $g(x)$ | Outside $f(u)$ |
|-------------------|---------------|----------------|
| $(3x - 2)^4$ | $3x - 2$ | $u^4$ |
| $\sin(x^2)$ | $x^2$ | $\sin u$ |
| $e^{5x}$ | $5x$ | $e^u$ |
| $\ln(x^2 + 1)$ | $x^2 + 1$ | $\ln u$ |
| $\sqrt{x^3 - x}$ | $x^3 - x$ | $\sqrt{u}$ |

## Recognizing Composite Functions

Before applying the chain rule, you need to recognize when a function is composite. Here are some telltale signs:

**Signs of a composite function:**

1. **Something other than $x$ is raised to a power:** $(x^2 + 1)^3$
2. **Something other than $x$ is inside a trig function:** $\cos(3x)$, $\sin(x^2)$
3. **Something other than $x$ is in the exponent:** $e^{2x}$, $2^{x^2}$
4. **Something other than $x$ is inside a logarithm:** $\ln(x + 1)$
5. **Something other than $x$ is under a root:** $\sqrt{5 - x^2}$

If the "input" to a familiar function isn't just plain $x$, you likely have a composite function.

!!! note "Not Composite vs. Composite"
    - $x^5$ is NOT composite (just $x$ to a power)
    - $(x + 1)^5$ IS composite (something other than $x$ to a power)
    - $\sin x$ is NOT composite (just $x$ in the trig function)
    - $\sin(2x)$ IS composite (something other than $x$ in the trig function)

#### Diagram: Composite Function Identifier

<iframe src="../../sims/composite-identifier/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Composite Function Identifier MicroSim</summary>
Type: microsim

Purpose: Train students to recognize composite functions and identify the inside and outside functions.

Learning Objective: Students will identify composite functions and decompose them into inside and outside functions (Bloom Level 4: Analyze)

Bloom Taxonomy Verb: analyze, distinguish, deconstruct

Visual elements:

- Function display area showing a function expression
- Two labeled boxes: "Inside (g)" and "Outside (f)"
- Drag-and-drop interface to place parts in correct boxes
- Feedback: correct/incorrect with explanation
- Visual diagram showing function "layers"

Interactive controls:

- "New Function" button generates random composite
- Dropdown to select difficulty (simple, medium, nested)
- Text input for custom function testing
- "Check Answer" button
- "Show Solution" button

Example functions with solutions:

- $\cos(x^3)$: Inside = $x^3$, Outside = $\cos(u)$
- $e^{2x+1}$: Inside = $2x+1$, Outside = $e^u$
- $(5x-1)^7$: Inside = $5x-1$, Outside = $u^7$

Behavior:

- Student drags/types inside and outside functions
- System validates correctness
- Shows step-by-step decomposition on solution reveal

Instructional Rationale: Active identification practice is essential before students can successfully apply the chain rule. Immediate feedback corrects misconceptions.

Implementation: p5.js with drag-and-drop interface
</details>

## The Chain Rule Formula

Now for the main event. The chain rule tells us how to differentiate a composite function.

!!! tip "The Chain Rule"
    If $y = f(g(x))$ where $f$ and $g$ are both differentiable, then:

    $$\frac{dy}{dx} = f'(g(x)) \cdot g'(x)$$

    In words: **Derivative of outside (evaluated at inside) times derivative of inside.**

Let's unpack this:

1. $f'(g(x))$ — Take the derivative of the outside function, but leave the inside function alone
2. $g'(x)$ — Then multiply by the derivative of the inside function

**Memory device:** "Derivative of the outside, keep the inside, times derivative of the inside."

### Leibniz Notation Version

The chain rule is beautifully expressed in Leibniz notation. If $y = f(u)$ and $u = g(x)$, then:

$$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$$

This looks like fractions canceling! (The $du$'s "cancel" on the right side.) While this isn't technically what's happening, this notation makes the chain rule easy to remember and apply.

**Example using Leibniz notation:**

Find $\frac{dy}{dx}$ if $y = u^5$ and $u = x^2 + 1$.

$$\frac{dy}{du} = 5u^4, \quad \frac{du}{dx} = 2x$$

$$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx} = 5u^4 \cdot 2x = 5(x^2 + 1)^4 \cdot 2x = 10x(x^2 + 1)^4$$

## Applying the Chain Rule: Step by Step

Here's a systematic approach:

**Step 1:** Identify the composite structure. What's inside? What's outside?

**Step 2:** Find the derivative of the outside function, keeping the inside unchanged.

**Step 3:** Multiply by the derivative of the inside function.

**Step 4:** Simplify if needed.

**Example 1: $y = (3x + 2)^4$**

Step 1: Inside = $3x + 2$, Outside = $u^4$

Step 2: Derivative of outside = $4u^3 = 4(3x + 2)^3$

Step 3: Derivative of inside = $3$

Step 4: $\frac{dy}{dx} = 4(3x + 2)^3 \cdot 3 = 12(3x + 2)^3$

**Example 2: $y = \sin(x^2)$**

Step 1: Inside = $x^2$, Outside = $\sin u$

Step 2: Derivative of outside = $\cos u = \cos(x^2)$

Step 3: Derivative of inside = $2x$

Step 4: $\frac{dy}{dx} = \cos(x^2) \cdot 2x = 2x\cos(x^2)$

**Example 3: $y = e^{5x}$**

Step 1: Inside = $5x$, Outside = $e^u$

Step 2: Derivative of outside = $e^u = e^{5x}$

Step 3: Derivative of inside = $5$

Step 4: $\frac{dy}{dx} = e^{5x} \cdot 5 = 5e^{5x}$

#### Diagram: Chain Rule Step-Through

<iframe src="../../sims/chain-rule-steps/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Chain Rule Step-Through MicroSim</summary>
Type: microsim

Purpose: Guide students through the chain rule process with visual highlighting of each step.

Learning Objective: Students will apply the chain rule systematically to differentiate composite functions (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, execute, implement

Visual elements:

- Input function displayed prominently
- Highlighting of inside and outside functions with different colors
- Step-by-step display:
  1. "Identify: Inside = [colored], Outside = [colored]"
  2. "Derivative of outside (keep inside): [expression]"
  3. "Derivative of inside: [expression]"
  4. "Multiply: [step 2] × [step 3]"
  5. "Final answer: [simplified]"
- Animated arrows showing the process

Interactive controls:

- Function input or selection from presets
- "Next Step" button to advance
- "Show All" button for immediate solution
- "Reset" to start over
- Difficulty selector: basic, intermediate, advanced

Behavior:

- Each step reveals sequentially
- Color coding persists throughout
- Intermediate expressions shown
- Final simplification step highlighted

Instructional Rationale: Breaking the chain rule into explicit steps with visual highlighting helps students internalize the procedure before it becomes automatic.

Implementation: p5.js with animated text and color highlighting
</details>

## The General Power Rule

A very common application of the chain rule is raising a function to a power:

!!! tip "General Power Rule"
    If $y = [g(x)]^n$, then:

    $$\frac{dy}{dx} = n[g(x)]^{n-1} \cdot g'(x)$$

This is just the chain rule with outside function $u^n$.

**Examples:**

| Function | Derivative |
|----------|------------|
| $(x^2 + 1)^5$ | $5(x^2 + 1)^4 \cdot 2x = 10x(x^2 + 1)^4$ |
| $(3x - 7)^{10}$ | $10(3x - 7)^9 \cdot 3 = 30(3x - 7)^9$ |
| $\sqrt{x^2 + 4} = (x^2 + 4)^{1/2}$ | $\frac{1}{2}(x^2 + 4)^{-1/2} \cdot 2x = \frac{x}{\sqrt{x^2 + 4}}$ |
| $\frac{1}{(x+1)^3} = (x+1)^{-3}$ | $-3(x+1)^{-4} \cdot 1 = -\frac{3}{(x+1)^4}$ |

!!! quote "Delta Moment"
    "The general power rule is like my favorite shortcut! Bring down the exponent, decrease by one—same as the regular power rule—but don't forget to multiply by the derivative of what's inside!"

## Trigonometric Compositions

The chain rule combines with trig derivatives frequently:

!!! tip "Trig Chain Rule"
    For $y = \sin(g(x))$: $\frac{dy}{dx} = \cos(g(x)) \cdot g'(x)$

    For $y = \cos(g(x))$: $\frac{dy}{dx} = -\sin(g(x)) \cdot g'(x)$

    For $y = \tan(g(x))$: $\frac{dy}{dx} = \sec^2(g(x)) \cdot g'(x)$

**Examples:**

| Function | Derivative |
|----------|------------|
| $\sin(3x)$ | $\cos(3x) \cdot 3 = 3\cos(3x)$ |
| $\cos(x^2)$ | $-\sin(x^2) \cdot 2x = -2x\sin(x^2)$ |
| $\tan(5x + 1)$ | $\sec^2(5x + 1) \cdot 5 = 5\sec^2(5x + 1)$ |
| $\sin^2(x) = [\sin(x)]^2$ | $2\sin(x) \cdot \cos(x) = 2\sin(x)\cos(x) = \sin(2x)$ |

Note the last example: $\sin^2(x)$ is actually TWO compositions! The outside is $u^2$ and the inside is $\sin(x)$.

## Exponential Compositions

Exponential functions with composite exponents are very common:

!!! tip "Exponential Chain Rule"
    For $y = e^{g(x)}$: $\frac{dy}{dx} = e^{g(x)} \cdot g'(x)$

    For $y = a^{g(x)}$: $\frac{dy}{dx} = a^{g(x)} \cdot \ln(a) \cdot g'(x)$

**Examples:**

| Function | Derivative |
|----------|------------|
| $e^{3x}$ | $e^{3x} \cdot 3 = 3e^{3x}$ |
| $e^{x^2}$ | $e^{x^2} \cdot 2x = 2xe^{x^2}$ |
| $e^{-x}$ | $e^{-x} \cdot (-1) = -e^{-x}$ |
| $2^{5x}$ | $2^{5x} \cdot \ln(2) \cdot 5 = 5\ln(2) \cdot 2^{5x}$ |

**Important pattern:** The derivative of $e^{kx}$ (where $k$ is a constant) is $ke^{kx}$.

This pattern appears constantly in applications like growth/decay models:

$$\frac{d}{dx}[e^{kt}] = ke^{kt}$$

## Logarithmic Compositions

The chain rule with logarithms gives us:

!!! tip "Log Chain Rule"
    For $y = \ln(g(x))$: $\frac{dy}{dx} = \frac{g'(x)}{g(x)} = \frac{1}{g(x)} \cdot g'(x)$

    For $y = \log_a(g(x))$: $\frac{dy}{dx} = \frac{g'(x)}{g(x) \ln(a)}$

**Examples:**

| Function | Derivative |
|----------|------------|
| $\ln(3x)$ | $\frac{3}{3x} = \frac{1}{x}$ |
| $\ln(x^2 + 1)$ | $\frac{2x}{x^2 + 1}$ |
| $\ln(5x - 2)$ | $\frac{5}{5x - 2}$ |
| $\log_{10}(x^2)$ | $\frac{2x}{x^2 \ln(10)} = \frac{2}{x\ln(10)}$ |

!!! note "Surprising Result"
    $\frac{d}{dx}[\ln(3x)] = \frac{1}{x}$ (the 3 disappears!)

    This is because $\ln(3x) = \ln 3 + \ln x$, and $\ln 3$ is just a constant.

## Nested Chain Rule: Multiple Compositions

Sometimes functions have compositions within compositions. You apply the chain rule repeatedly, working from outside to inside.

**Example: $y = \sin(e^{x^2})$**

This has three layers:

- Outermost: $\sin(\cdot)$
- Middle: $e^{(\cdot)}$
- Innermost: $x^2$

Apply the chain rule layer by layer:

$$\frac{dy}{dx} = \cos(e^{x^2}) \cdot \frac{d}{dx}[e^{x^2}]$$

$$= \cos(e^{x^2}) \cdot e^{x^2} \cdot \frac{d}{dx}[x^2]$$

$$= \cos(e^{x^2}) \cdot e^{x^2} \cdot 2x$$

$$= 2xe^{x^2}\cos(e^{x^2})$$

**Example: $y = \sqrt{\cos(3x)} = [\cos(3x)]^{1/2}$**

Layers: Square root (power 1/2), then cosine, then $3x$.

$$\frac{dy}{dx} = \frac{1}{2}[\cos(3x)]^{-1/2} \cdot (-\sin(3x)) \cdot 3$$

$$= -\frac{3\sin(3x)}{2\sqrt{\cos(3x)}}$$

#### Diagram: Nested Chain Rule Unwrapper

<iframe src="../../sims/nested-chain-unwrap/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Nested Chain Rule Unwrapper MicroSim</summary>
Type: microsim

Purpose: Visualize how nested compositions are differentiated layer by layer using repeated chain rule applications.

Learning Objective: Students will apply the chain rule to nested composite functions (Bloom Level 4: Analyze)

Bloom Taxonomy Verb: analyze, deconstruct, examine

Visual elements:

- "Onion layer" diagram showing nested functions
- Each layer labeled with its function and derivative
- Animated peeling: click to reveal each derivative factor
- Multiplication chain building up as layers peel
- Final answer assembled from all factors

Interactive controls:

- Input: Nested function (e.g., $\sin(e^{x^2})$)
- "Peel Layer" button to proceed one step
- "Show All" button for complete solution
- Preset nested functions at various depths
- Difficulty: 2-layer, 3-layer, 4-layer

Display for $\sin(e^{x^2})$:

- Layer 3 (outer): $\sin(u)$ → derivative: $\cos(u) = \cos(e^{x^2})$
- Layer 2 (middle): $e^v$ → derivative: $e^v = e^{x^2}$
- Layer 1 (inner): $x^2$ → derivative: $2x$
- Combined: $\cos(e^{x^2}) \cdot e^{x^2} \cdot 2x$

Behavior:

- Each "peel" reveals the next derivative factor
- Multiplication chain grows visually
- Final simplification shown at end

Instructional Rationale: The "onion" metaphor makes the layer-by-layer process concrete. Visual multiplication chain shows how factors accumulate.

Implementation: p5.js with animated layered graphics
</details>

## Combining Chain Rule with Other Rules

In practice, you'll often combine the chain rule with the product rule, quotient rule, or sum/difference rules.

**Example: Product Rule + Chain Rule**

Find $\frac{d}{dx}[x^2 \sin(3x)]$

This is a product of $x^2$ and $\sin(3x)$.

$$\frac{d}{dx}[x^2 \sin(3x)] = (2x) \cdot \sin(3x) + x^2 \cdot \cos(3x) \cdot 3$$

$$= 2x\sin(3x) + 3x^2\cos(3x)$$

**Example: Quotient Rule + Chain Rule**

Find $\frac{d}{dx}\left[\frac{e^{2x}}{x + 1}\right]$

Quotient rule with $f = e^{2x}$ and $g = x + 1$:

$$= \frac{(2e^{2x})(x + 1) - (e^{2x})(1)}{(x + 1)^2}$$

$$= \frac{e^{2x}(2(x + 1) - 1)}{(x + 1)^2} = \frac{e^{2x}(2x + 1)}{(x + 1)^2}$$

**Example: Chain Rule within Chain Rule (nested) + Sum**

Find $\frac{d}{dx}[\ln(x^2) + e^{\sin x}]$

Sum rule first, then chain rule on each part:

$$= \frac{2x}{x^2} + e^{\sin x} \cdot \cos x = \frac{2}{x} + e^{\sin x}\cos x$$

## Common Patterns to Memorize

After enough practice, these patterns become automatic:

| Pattern | Derivative | Example |
|---------|------------|---------|
| $[g(x)]^n$ | $n[g(x)]^{n-1} \cdot g'(x)$ | $(2x+1)^5 \to 10(2x+1)^4$ |
| $\sin(kx)$ | $k\cos(kx)$ | $\sin(4x) \to 4\cos(4x)$ |
| $\cos(kx)$ | $-k\sin(kx)$ | $\cos(3x) \to -3\sin(3x)$ |
| $e^{kx}$ | $ke^{kx}$ | $e^{7x} \to 7e^{7x}$ |
| $\ln(kx)$ | $\frac{1}{x}$ | $\ln(5x) \to \frac{1}{x}$ |
| $\ln(g(x))$ | $\frac{g'(x)}{g(x)}$ | $\ln(x^2+1) \to \frac{2x}{x^2+1}$ |

!!! quote "Delta's Pun Corner"
    "Why did the chain rule go to therapy? It had too many layers to work through! But once it unpacked them all, the derivative was clear."

## Strategy: When Do You Need the Chain Rule?

Ask yourself: **Is there a function inside another function?**

- If the input to a trig function isn't just $x$: chain rule
- If the exponent of $e$ isn't just $x$: chain rule
- If the argument of $\ln$ isn't just $x$: chain rule
- If something other than $x$ is raised to a power: chain rule

**Quick checklist:**

1. Identify the overall structure (product? quotient? sum? composition?)
2. If composition: What's inside? What's outside?
3. Apply chain rule: derivative of outside × derivative of inside
4. Simplify

## Practice Problems with Solutions

**Problem 1:** $y = (5x - 3)^7$

Inside: $5x - 3$, Outside: $u^7$

$$y' = 7(5x - 3)^6 \cdot 5 = 35(5x - 3)^6$$

**Problem 2:** $y = \cos(x^3)$

Inside: $x^3$, Outside: $\cos u$

$$y' = -\sin(x^3) \cdot 3x^2 = -3x^2\sin(x^3)$$

**Problem 3:** $y = e^{x^2 + 2x}$

Inside: $x^2 + 2x$, Outside: $e^u$

$$y' = e^{x^2 + 2x} \cdot (2x + 2) = 2(x + 1)e^{x^2 + 2x}$$

**Problem 4:** $y = \ln(\sin x)$

Inside: $\sin x$, Outside: $\ln u$

$$y' = \frac{\cos x}{\sin x} = \cot x$$

**Problem 5:** $y = \sqrt{e^x + 1}$

Inside: $e^x + 1$, Outside: $\sqrt{u} = u^{1/2}$

$$y' = \frac{1}{2}(e^x + 1)^{-1/2} \cdot e^x = \frac{e^x}{2\sqrt{e^x + 1}}$$

**Problem 6 (Nested):** $y = \sin^2(3x) = [\sin(3x)]^2$

Outer: $u^2$, Middle: $\sin(v)$, Inner: $3x$

$$y' = 2\sin(3x) \cdot \cos(3x) \cdot 3 = 6\sin(3x)\cos(3x) = 3\sin(6x)$$

(Using the identity $2\sin\theta\cos\theta = \sin(2\theta)$)

**Problem 7 (Combined):** $y = x^2 e^{-x}$

Product rule: $(x^2)' \cdot e^{-x} + x^2 \cdot (e^{-x})'$

$$= 2x \cdot e^{-x} + x^2 \cdot e^{-x} \cdot (-1)$$

$$= 2xe^{-x} - x^2 e^{-x} = xe^{-x}(2 - x)$$

## Summary: The Chain Rule Toolkit

The chain rule extends your differentiation powers to composite functions:

**Core Formula:**

$$\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)$$

**Leibniz Form:**

$$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$$

**Common Applications:**

| Type | Formula |
|------|---------|
| Power | $\frac{d}{dx}[g^n] = ng^{n-1} \cdot g'$ |
| Trig | $\frac{d}{dx}[\sin g] = \cos g \cdot g'$ |
| Exponential | $\frac{d}{dx}[e^g] = e^g \cdot g'$ |
| Logarithm | $\frac{d}{dx}[\ln g] = \frac{g'}{g}$ |

## Key Takeaways

- A **composite function** has one function inside another: $f(g(x))$

- **Identify inside/outside:** The inside function is what "fills in" for $x$; the outside function does its operation on that

- **Chain rule:** Derivative of outside (keep inside) × derivative of inside

- **Leibniz notation:** $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$ — the $du$'s appear to cancel

- **General power rule:** $\frac{d}{dx}[g(x)^n] = n \cdot g(x)^{n-1} \cdot g'(x)$

- **Nested compositions:** Apply the chain rule repeatedly, from outside to inside

- **Combining rules:** Chain rule often combines with product and quotient rules

- **Recognition is key:** Look for "something other than $x$" inside a function

??? question "Check Your Understanding: Find $\frac{d}{dx}[\ln(\cos(x^2))]$"
    This is a nested composition with three layers.

    - Outermost: $\ln(u)$ → derivative: $\frac{1}{u}$
    - Middle: $\cos(v)$ → derivative: $-\sin(v)$
    - Innermost: $x^2$ → derivative: $2x$

    Apply chain rule layer by layer:

    $$\frac{d}{dx}[\ln(\cos(x^2))] = \frac{1}{\cos(x^2)} \cdot \frac{d}{dx}[\cos(x^2)]$$

    $$= \frac{1}{\cos(x^2)} \cdot (-\sin(x^2)) \cdot \frac{d}{dx}[x^2]$$

    $$= \frac{1}{\cos(x^2)} \cdot (-\sin(x^2)) \cdot 2x$$

    $$= -\frac{2x\sin(x^2)}{\cos(x^2)}$$

    $$= -2x\tan(x^2)$$

    **Answer:** $-2x\tan(x^2)$
