---
title: Basic Antiderivatives
description: Introduction to integration as the reverse of differentiation
generated_by: claude skill chapter-content-generator
date: 2026-02-03 13:45:00
version: 0.03
---

# Basic Antiderivatives

## Summary

This chapter introduces integration as the reverse of differentiation. Students will learn the concept of antiderivatives and indefinite integrals, including proper notation with the integral sign and constant of integration. The chapter covers basic integration rules that reverse the derivative rules: power rule, constant rule, sum/difference rules, and constant multiple rule. Basic trigonometric integrals are also introduced. After completing this chapter, students will be able to find antiderivatives of polynomial and simple trigonometric functions.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. Antiderivative
2. Indefinite Integral
3. Integral Notation
4. Integrand
5. Variable of Integration
6. Constant of Integration
7. General Antiderivative
8. Particular Antideriv
9. Power Rule Integration
10. Constant Rule Integr
11. Sum Rule Integration
12. Difference Rule Integr
13. Constant Multiple Integ
14. Basic Trig Integrals

## Prerequisites

This chapter builds on concepts from:

- [Chapter 8: Basic Derivative Rules](../08-basic-derivative-rules/index.md)
- [Chapter 9: Product, Quotient, and Transcendental Derivatives](../09-product-quotient-transcendental-derivatives/index.md)

---

## Introduction: Running the Derivative Machine Backwards

Throughout the first half of this course, you've become an expert at finding derivatives. Given a function $f(x)$, you can compute $f'(x)$ using the power rule, product rule, chain rule, and all the other tools in your toolkit.

Now we ask a fundamentally different question: **What if we know the derivative and want to find the original function?**

This is like running the derivative machine backwards. Instead of asking "What is the rate of change of this function?" we ask "What function has this rate of change?"

!!! quote "Delta Moment"
    "For months, I've been looking at curves and asking 'How steep am I right now?' Now I'm looking at steepness data and asking 'What curve was I climbing?' It's like detective work—tracing my footsteps backwards from the clues I left behind!"

This backward process is called **antidifferentiation** or **integration**, and it's one of the two central ideas of calculus. The remarkable Fundamental Theorem of Calculus (coming soon!) will reveal that integration is intimately connected to finding areas under curves.

## What is an Antiderivative?

Let's start with a simple example. We know that:

$$\frac{d}{dx}[x^2] = 2x$$

So if someone asks "What function has derivative $2x$?" one answer is $x^2$.

!!! tip "Definition: Antiderivative"
    A function $F(x)$ is called an **antiderivative** of $f(x)$ if $F'(x) = f(x)$.

    In words: $F$ is an antiderivative of $f$ if the derivative of $F$ equals $f$.

**Examples:**

- $x^2$ is an antiderivative of $2x$ because $\frac{d}{dx}[x^2] = 2x$
- $x^3$ is an antiderivative of $3x^2$ because $\frac{d}{dx}[x^3] = 3x^2$
- $\sin x$ is an antiderivative of $\cos x$ because $\frac{d}{dx}[\sin x] = \cos x$

Notice the relationship: finding an antiderivative is the **reverse** of finding a derivative.

| Finding Derivatives | Finding Antiderivatives |
|---------------------|-------------------------|
| Given: $f(x)$ | Given: $f(x)$ |
| Find: $f'(x)$ | Find: $F(x)$ such that $F'(x) = f(x)$ |
| Question: "What's the slope?" | Question: "What has this slope?" |

## The Constant of Integration: Why There's More Than One Answer

Here's something interesting. We said $x^2$ is an antiderivative of $2x$. But what about:

- $x^2 + 1$? Is it an antiderivative of $2x$?
- $x^2 - 7$?
- $x^2 + \pi$?

Let's check: $\frac{d}{dx}[x^2 + 1] = 2x + 0 = 2x$ ✓

Yes! Since the derivative of any constant is 0, adding any constant to $x^2$ still gives a derivative of $2x$.

!!! warning "Crucial Insight"
    If $F(x)$ is an antiderivative of $f(x)$, then so is $F(x) + C$ for **any** constant $C$.

    This means there are infinitely many antiderivatives of any function!

This makes sense graphically. If we shift a curve vertically, we don't change its slope at any point. The functions $x^2$, $x^2 + 1$, $x^2 - 5$, and $x^2 + 100$ are all parallel curves with identical slopes at corresponding x-values.

#### Diagram: Family of Antiderivatives

<iframe src="../../sims/antiderivative-family/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Family of Antiderivatives MicroSim</summary>
Type: microsim

Purpose: Visualize how different values of C produce a family of parallel antiderivative curves.

Learning Objective: Students will explain why antiderivatives differ by a constant (Bloom Level 2: Understand)

Bloom Taxonomy Verb: explain, interpret, visualize

Visual elements:

- Multiple parallel curves representing $F(x) + C$ for various values of C
- A single derivative curve $f(x)$ shown below or in a separate panel
- Moving point on each antiderivative showing tangent lines
- All tangent lines at the same x-value have identical slopes
- Display showing current function and its derivative

Interactive controls:

- Slider: Move x-position to see tangent lines
- Slider: Add or remove curves (number of C values shown)
- Dropdown: Choose base antiderivative (e.g., $x^2$ family, $x^3$ family, $\sin x$ family)
- Toggle: Show/hide derivative curve
- Display: Slope at current x-value (same for all curves)

Behavior:

- All curves move together as a family
- Tangent lines at same x-position are parallel
- Slope display confirms derivatives are identical
- Different C values create vertical shifts only

Instructional Rationale: Seeing multiple curves with identical slopes makes the "+C" concept concrete. Students understand that vertical shifts don't affect instantaneous rates of change.

Implementation: p5.js with multiple curve rendering and tangent line display
</details>

## The General Antiderivative

Since there are infinitely many antiderivatives (one for each value of $C$), we describe them all at once using the **general antiderivative**.

!!! tip "General Antiderivative"
    The **general antiderivative** of $f(x)$ is $F(x) + C$, where $F(x)$ is any particular antiderivative and $C$ represents an arbitrary constant.

For example:

- The general antiderivative of $2x$ is $x^2 + C$
- The general antiderivative of $3x^2$ is $x^3 + C$
- The general antiderivative of $\cos x$ is $\sin x + C$

The $+C$ is **essential**. Without it, you're only giving one member of the infinite family of antiderivatives.

!!! quote "Delta Moment"
    "The '+C' is like asking 'Where did you start?' If I tell you I've been climbing at this steepness pattern, you still don't know my elevation unless I tell you where I began. The constant is my starting altitude!"

## Particular Antiderivatives: Pinning Down C

Sometimes we have additional information that lets us determine the exact value of $C$. This gives us a **particular antiderivative**.

**Example:** Find the antiderivative $F(x)$ of $f(x) = 2x$ that satisfies $F(0) = 5$.

Step 1: Write the general antiderivative: $F(x) = x^2 + C$

Step 2: Use the condition $F(0) = 5$:
$$F(0) = 0^2 + C = C = 5$$

Step 3: The particular antiderivative is $F(x) = x^2 + 5$

We can verify: $F'(x) = 2x$ ✓ and $F(0) = 0 + 5 = 5$ ✓

This process of finding a particular antiderivative given an initial condition is exactly what we'll do when solving differential equations!

## Indefinite Integral Notation

We need a notation for "the general antiderivative of $f(x)$." Mathematicians use the **integral sign** $\int$ (an elongated S, for "sum"—we'll see why later).

!!! tip "Indefinite Integral Notation"
    $$\int f(x) \, dx = F(x) + C$$

    This is read as "the integral of $f(x)$ with respect to $x$" or "the indefinite integral of $f(x) \, dx$."

    It means: the general antiderivative of $f(x)$.

Let's break down this notation:

- $\int$ is the **integral sign**
- $f(x)$ is the **integrand** (the function being integrated)
- $dx$ indicates the **variable of integration** (we're integrating with respect to $x$)
- $C$ is the **constant of integration**

| Symbol | Name | Meaning |
|--------|------|---------|
| $\int$ | Integral sign | "Find the antiderivative of..." |
| $f(x)$ | Integrand | The function we're integrating |
| $dx$ | Differential | The variable of integration |
| $C$ | Constant of integration | Accounts for all antiderivatives |

**Examples using the notation:**

- $\int 2x \, dx = x^2 + C$
- $\int 3x^2 \, dx = x^3 + C$
- $\int \cos x \, dx = \sin x + C$

!!! note "The dx is Not Optional"
    Always include the $dx$ (or $dt$, $du$, etc.). It tells us which variable we're integrating with respect to. This matters when functions involve multiple variables.

## The Power Rule for Integration

Now let's develop rules for finding antiderivatives. We'll start by reversing the power rule for derivatives.

Recall the power rule for derivatives: $\frac{d}{dx}[x^n] = nx^{n-1}$

To reverse this, we need to find what function has derivative $x^n$.

If $F(x) = x^{n+1}$, then $F'(x) = (n+1)x^n$.

That's close to $x^n$ but has an extra factor of $(n+1)$. To fix this, divide by $(n+1)$:

If $F(x) = \frac{x^{n+1}}{n+1}$, then $F'(x) = \frac{(n+1)x^n}{n+1} = x^n$ ✓

!!! tip "Power Rule for Integration"
    For any real number $n \neq -1$:

    $$\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$$

    In words: Add 1 to the exponent, then divide by the new exponent.

**Why $n \neq -1$?** If $n = -1$, we'd be dividing by 0. The antiderivative of $x^{-1} = \frac{1}{x}$ is $\ln|x| + C$, which we'll cover in the next chapter.

**Memory aid:** The power rule for integration is the opposite of the power rule for derivatives:

| Derivative | Integral |
|------------|----------|
| Multiply by exponent | Divide by new exponent |
| Subtract 1 from exponent | Add 1 to exponent |

**Examples:**

| Integrand | Work | Antiderivative |
|-----------|------|----------------|
| $x^4$ | Add 1 to get 5, divide by 5 | $\frac{x^5}{5} + C$ |
| $x^7$ | Add 1 to get 8, divide by 8 | $\frac{x^8}{8} + C$ |
| $x^2$ | Add 1 to get 3, divide by 3 | $\frac{x^3}{3} + C$ |
| $x$ (which is $x^1$) | Add 1 to get 2, divide by 2 | $\frac{x^2}{2} + C$ |

#### Diagram: Power Rule Reversal

<iframe src="../../sims/power-rule-integration/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Power Rule Integration MicroSim</summary>
Type: microsim

Purpose: Visualize the relationship between the derivative power rule and the integral power rule.

Learning Objective: Students will apply the power rule for integration (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, calculate, use

Visual elements:

- Two-way diagram showing derivative and integral operations
- Left side: function $F(x) = \frac{x^{n+1}}{n+1}$
- Right side: derivative $f(x) = x^n$
- Arrow going right (derivative): "multiply by n+1, subtract 1 from exponent"
- Arrow going left (integral): "add 1 to exponent, divide by n+1"
- Graphs showing both functions

Interactive controls:

- Slider: Choose exponent n (range -3 to 6, excluding -1)
- Toggle: Show derivative direction / integral direction
- Button: Step through the calculation
- Display: Current formula and numerical verification

Data Visibility Requirements:

- Stage 1: Show $x^n$ with specific n value
- Stage 2: Show "add 1 to exponent" giving $x^{n+1}$
- Stage 3: Show "divide by new exponent" giving $\frac{x^{n+1}}{n+1}$
- Stage 4: Verify by differentiating back to $x^n$

Behavior:

- Changing n updates all displays and graphs
- Verification step confirms the result
- Works for positive, negative, and fractional exponents (except -1)

Instructional Rationale: Seeing the derivative and integral as inverse operations builds conceptual understanding. The step-through reinforces the procedural "add 1, divide" pattern.

Implementation: p5.js with bidirectional arrow diagram and step-through
</details>

## Integrating with Negative and Fractional Exponents

The power rule works for negative and fractional exponents too, just like with derivatives.

**Negative exponents:**

$$\int x^{-3} \, dx = \frac{x^{-3+1}}{-3+1} + C = \frac{x^{-2}}{-2} + C = -\frac{1}{2x^2} + C$$

**Fractional exponents:**

$$\int x^{1/2} \, dx = \frac{x^{1/2+1}}{1/2+1} + C = \frac{x^{3/2}}{3/2} + C = \frac{2x^{3/2}}{3} + C$$

**Rewriting roots:** Just like with derivatives, rewrite roots as fractional exponents first.

$$\int \sqrt{x} \, dx = \int x^{1/2} \, dx = \frac{2x^{3/2}}{3} + C = \frac{2\sqrt{x^3}}{3} + C$$

**Example:** Find $\int \frac{1}{x^4} \, dx$

Step 1: Rewrite with negative exponent: $\frac{1}{x^4} = x^{-4}$

Step 2: Apply power rule: $\int x^{-4} \, dx = \frac{x^{-4+1}}{-4+1} + C = \frac{x^{-3}}{-3} + C$

Step 3: Simplify: $= -\frac{1}{3x^3} + C$

We can verify: $\frac{d}{dx}\left[-\frac{1}{3x^3}\right] = -\frac{1}{3} \cdot (-3)x^{-4} = x^{-4} = \frac{1}{x^4}$ ✓

## The Constant Rule and Constant Multiple Rule

Two simple but essential rules:

!!! tip "Constant Rule for Integration"
    $$\int k \, dx = kx + C$$

    The antiderivative of a constant $k$ is $kx$.

This makes sense: What function has a constant derivative $k$? A linear function $y = kx$ has slope $k$ everywhere.

**Examples:**

- $\int 5 \, dx = 5x + C$
- $\int (-3) \, dx = -3x + C$
- $\int \pi \, dx = \pi x + C$

!!! tip "Constant Multiple Rule for Integration"
    $$\int k \cdot f(x) \, dx = k \int f(x) \, dx$$

    Constants can be "pulled out" of integrals.

This is the reverse of the constant multiple rule for derivatives. Since constants pass through derivatives, they also pass through integrals.

**Examples:**

- $\int 6x^2 \, dx = 6 \int x^2 \, dx = 6 \cdot \frac{x^3}{3} + C = 2x^3 + C$
- $\int \frac{x^5}{4} \, dx = \frac{1}{4} \int x^5 \, dx = \frac{1}{4} \cdot \frac{x^6}{6} + C = \frac{x^6}{24} + C$

## The Sum and Difference Rules

Integration, like differentiation, is **linear**: the integral of a sum equals the sum of the integrals.

!!! tip "Sum and Difference Rules for Integration"
    $$\int [f(x) + g(x)] \, dx = \int f(x) \, dx + \int g(x) \, dx$$

    $$\int [f(x) - g(x)] \, dx = \int f(x) \, dx - \int g(x) \, dx$$

This means we can integrate term by term, just like we differentiated term by term.

**Example:** Find $\int (3x^2 + 5x - 7) \, dx$

$$= \int 3x^2 \, dx + \int 5x \, dx - \int 7 \, dx$$

$$= 3 \cdot \frac{x^3}{3} + 5 \cdot \frac{x^2}{2} - 7x + C$$

$$= x^3 + \frac{5x^2}{2} - 7x + C$$

!!! note "Only One C"
    When integrating a sum, each term technically gets its own constant, but we combine them all into a single $+C$ at the end. (After all, $C_1 + C_2 + C_3$ is just another constant.)

## Integrating Polynomials

Combining our rules, we can now integrate any polynomial.

**Strategy:**

1. Apply the sum/difference rules to work term by term
2. Pull out any constants using the constant multiple rule
3. Apply the power rule to each term
4. Add $+C$ at the end (just once!)

**Example:** Find $\int (4x^5 - 2x^3 + x^2 - 6x + 8) \, dx$

$$= 4 \cdot \frac{x^6}{6} - 2 \cdot \frac{x^4}{4} + \frac{x^3}{3} - 6 \cdot \frac{x^2}{2} + 8x + C$$

$$= \frac{2x^6}{3} - \frac{x^4}{2} + \frac{x^3}{3} - 3x^2 + 8x + C$$

**Verification tip:** You can always check your antiderivative by differentiating it. The derivative should give back the original integrand.

Let's verify the first term: $\frac{d}{dx}\left[\frac{2x^6}{3}\right] = \frac{2}{3} \cdot 6x^5 = 4x^5$ ✓

#### Diagram: Polynomial Integration Step-by-Step

<iframe src="../../sims/polynomial-integration/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Polynomial Integration Step-by-Step MicroSim</summary>
Type: microsim

Purpose: Show how to integrate polynomials term by term with interactive feedback.

Learning Objective: Students will apply integration rules to polynomial functions (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, calculate, execute

Visual elements:

- Input polynomial displayed with terms in separate boxes
- Each term shows its integration step
- Animation: terms transform via the power rule
- Running total assembles the antiderivative
- Graph showing integrand and antiderivative (for C=0)

Interactive controls:

- Input: Polynomial via coefficient sliders or text
- Button: "Integrate Step by Step"
- Button: "Integrate All at Once"
- Slider: Adjust C value to see family of antiderivatives
- Preset polynomials for practice

Step-by-step display for $2x^3 - 4x + 5$:

| Term | Rule Applied | Result |
|------|-------------|--------|
| $2x^3$ | Power rule: add 1, divide by 4 | $\frac{2x^4}{4} = \frac{x^4}{2}$ |
| $-4x$ | Power rule: $x^1$ becomes $\frac{x^2}{2}$ | $-4 \cdot \frac{x^2}{2} = -2x^2$ |
| $5$ | Constant rule | $5x$ |
| **Total** | Sum rule + C | $\frac{x^4}{2} - 2x^2 + 5x + C$ |

Behavior:

- Animation shows each term being integrated
- Results collect to form final answer
- Graph updates to show antiderivative curve
- Adjusting C shifts the antiderivative vertically

Instructional Rationale: Breaking integration into term-by-term operations builds procedural fluency and mirrors the polynomial differentiation process from Chapter 8.

Implementation: p5.js with animated text transformations
</details>

## Basic Trigonometric Integrals

Now let's reverse the trigonometric derivative rules. Since:

- $\frac{d}{dx}[\sin x] = \cos x$
- $\frac{d}{dx}[\cos x] = -\sin x$

We can immediately write the corresponding integrals:

!!! tip "Basic Trig Integrals"
    $$\int \cos x \, dx = \sin x + C$$

    $$\int \sin x \, dx = -\cos x + C$$

Notice the negative sign in the second integral! This follows from $\frac{d}{dx}[-\cos x] = -(-\sin x) = \sin x$ ✓

**More trig integrals from the derivative rules:**

Since $\frac{d}{dx}[\tan x] = \sec^2 x$:
$$\int \sec^2 x \, dx = \tan x + C$$

Since $\frac{d}{dx}[\sec x] = \sec x \tan x$:
$$\int \sec x \tan x \, dx = \sec x + C$$

Since $\frac{d}{dx}[\cot x] = -\csc^2 x$:
$$\int \csc^2 x \, dx = -\cot x + C$$

Since $\frac{d}{dx}[\csc x] = -\csc x \cot x$:
$$\int \csc x \cot x \, dx = -\csc x + C$$

**Summary table:**

| Integral | Antiderivative |
|----------|----------------|
| $\int \cos x \, dx$ | $\sin x + C$ |
| $\int \sin x \, dx$ | $-\cos x + C$ |
| $\int \sec^2 x \, dx$ | $\tan x + C$ |
| $\int \csc^2 x \, dx$ | $-\cot x + C$ |
| $\int \sec x \tan x \, dx$ | $\sec x + C$ |
| $\int \csc x \cot x \, dx$ | $-\csc x + C$ |

!!! quote "Delta's Pun Corner"
    "Why did the integral of sine feel negative? Because it had to deal with -cos-tant negativity!"

## Combining Rules: Integrating Mixed Expressions

With all our rules, we can now integrate expressions that combine polynomials and trig functions.

**Example 1:** Find $\int (3\sin x + 2x^4) \, dx$

$$= 3 \int \sin x \, dx + 2 \int x^4 \, dx$$

$$= 3(-\cos x) + 2 \cdot \frac{x^5}{5} + C$$

$$= -3\cos x + \frac{2x^5}{5} + C$$

**Example 2:** Find $\int (x^2 - \sec^2 x + 4) \, dx$

$$= \frac{x^3}{3} - \tan x + 4x + C$$

**Example 3:** Find $\int \left(\frac{1}{\sqrt{x}} + \cos x\right) \, dx$

Rewrite: $\frac{1}{\sqrt{x}} = x^{-1/2}$

$$= \int x^{-1/2} \, dx + \int \cos x \, dx$$

$$= \frac{x^{1/2}}{1/2} + \sin x + C$$

$$= 2\sqrt{x} + \sin x + C$$

## Verifying Antiderivatives

**Always check your work by differentiating!** If you found $\int f(x) \, dx = F(x) + C$, then $F'(x)$ should equal $f(x)$.

**Example:** Verify that $\int (6x^2 - 4\sin x) \, dx = 2x^3 + 4\cos x + C$

Check: $\frac{d}{dx}[2x^3 + 4\cos x + C] = 6x^2 + 4(-\sin x) + 0 = 6x^2 - 4\sin x$ ✓

This verification process is your safety net. Integration can be tricky, but derivatives are straightforward—use them to catch errors!

#### Diagram: Integration Verification Checker

<iframe src="../../sims/integration-verifier/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Integration Verification Checker MicroSim</summary>
Type: microsim

Purpose: Reinforce the habit of checking integrals by differentiation.

Learning Objective: Students will verify integration results by differentiating (Bloom Level 4: Analyze)

Bloom Taxonomy Verb: verify, check, analyze

Visual elements:

- Two-panel display: Integration panel and Verification panel
- Left: Shows the integral problem and student's proposed answer
- Right: Shows the derivative of the proposed answer
- Green highlight if derivative matches integrand
- Red highlight with correction hints if mismatch

Interactive controls:

- Input: Integrand $f(x)$
- Input: Proposed antiderivative $F(x)$
- Button: "Check My Answer"
- Display: Step-by-step differentiation of $F(x)$
- Preset examples with common errors to identify

Behavior:

- System differentiates the proposed antiderivative
- Compares result with original integrand
- Highlights match or mismatch
- Shows where errors occurred if incorrect
- Tracks which types of errors are most common

Instructional Rationale: The verification habit prevents errors from compounding. Showing the derivative calculation reinforces both differentiation and integration skills.

Implementation: p5.js with symbolic differentiation display
</details>

## Finding Particular Antiderivatives from Initial Conditions

When given an initial condition, we can find the specific value of $C$.

**Example:** Find $f(x)$ if $f'(x) = 3x^2 - 2x + 1$ and $f(1) = 5$.

Step 1: Find the general antiderivative:
$$f(x) = \int (3x^2 - 2x + 1) \, dx = x^3 - x^2 + x + C$$

Step 2: Use the condition $f(1) = 5$:
$$f(1) = 1^3 - 1^2 + 1 + C = 1 - 1 + 1 + C = 1 + C = 5$$
$$C = 4$$

Step 3: Write the particular antiderivative:
$$f(x) = x^3 - x^2 + x + 4$$

Verify: $f'(x) = 3x^2 - 2x + 1$ ✓ and $f(1) = 1 - 1 + 1 + 4 = 5$ ✓

!!! quote "Delta Moment"
    "The initial condition is like someone telling me 'You were at elevation 5 when x was 1.' Now I know exactly which path I was on, not just the family of parallel paths!"

## Common Mistakes to Avoid

Integration has several common pitfalls. Here's how to avoid them:

**Mistake 1: Forgetting the +C**

Wrong: $\int 2x \, dx = x^2$

Correct: $\int 2x \, dx = x^2 + C$

The constant of integration is essential for indefinite integrals!

**Mistake 2: Applying the power rule incorrectly**

Wrong: $\int x^3 \, dx = \frac{x^3}{3} + C$ (forgot to add 1 to exponent)

Correct: $\int x^3 \, dx = \frac{x^4}{4} + C$

**Mistake 3: Sign errors with trig functions**

Wrong: $\int \sin x \, dx = \cos x + C$

Correct: $\int \sin x \, dx = -\cos x + C$

Check: $\frac{d}{dx}[-\cos x] = -(-\sin x) = \sin x$ ✓

**Mistake 4: Using $n = -1$ with the power rule**

Wrong: $\int \frac{1}{x} \, dx = \int x^{-1} \, dx = \frac{x^0}{0} + C$ (division by zero!)

Correct: $\int \frac{1}{x} \, dx = \ln|x| + C$ (covered in next chapter)

**Mistake 5: Not simplifying before integrating**

Harder way: $\int \frac{x^3 + x^2}{x} \, dx$ (would require more advanced techniques)

Better: Simplify first! $\frac{x^3 + x^2}{x} = x^2 + x$, then $\int (x^2 + x) \, dx = \frac{x^3}{3} + \frac{x^2}{2} + C$

## Summary of Integration Rules

Here's your integration toolkit from this chapter:

| Rule | Formula |
|------|---------|
| Power Rule ($n \neq -1$) | $\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$ |
| Constant Rule | $\int k \, dx = kx + C$ |
| Constant Multiple | $\int k \cdot f(x) \, dx = k \int f(x) \, dx$ |
| Sum Rule | $\int [f(x) + g(x)] \, dx = \int f(x) \, dx + \int g(x) \, dx$ |
| Difference Rule | $\int [f(x) - g(x)] \, dx = \int f(x) \, dx - \int g(x) \, dx$ |
| Sine | $\int \sin x \, dx = -\cos x + C$ |
| Cosine | $\int \cos x \, dx = \sin x + C$ |
| Secant squared | $\int \sec^2 x \, dx = \tan x + C$ |
| Cosecant squared | $\int \csc^2 x \, dx = -\cot x + C$ |
| Secant tangent | $\int \sec x \tan x \, dx = \sec x + C$ |
| Cosecant cotangent | $\int \csc x \cot x \, dx = -\csc x + C$ |

## Key Takeaways

- **Antiderivative:** $F(x)$ is an antiderivative of $f(x)$ if $F'(x) = f(x)$

- **Constant of Integration:** If $F(x)$ is an antiderivative, so is $F(x) + C$ for any constant $C$

- **General Antiderivative:** The family $F(x) + C$ represents all antiderivatives

- **Particular Antiderivative:** Using an initial condition to find the specific value of $C$

- **Indefinite Integral:** $\int f(x) \, dx = F(x) + C$ represents the general antiderivative

- **Power Rule for Integration:** $\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$ (works for $n \neq -1$)

- **Linearity:** Integration is linear—constants pull out, sums/differences split up

- **Trig Integrals:** Reverse the trig derivative rules (watch the signs!)

- **Verification:** Always check by differentiating your answer

- **Simplify First:** Sometimes rewriting makes integration much easier

??? question "Check Your Understanding: Find $\int \left(x^3 - \frac{2}{\sqrt{x}} + 3\cos x\right) \, dx$"
    Step 1: Rewrite $\frac{2}{\sqrt{x}} = 2x^{-1/2}$

    Step 2: Integrate term by term:

    $$\int x^3 \, dx = \frac{x^4}{4}$$

    $$\int 2x^{-1/2} \, dx = 2 \cdot \frac{x^{1/2}}{1/2} = 4\sqrt{x}$$

    $$\int 3\cos x \, dx = 3\sin x$$

    Step 3: Combine with proper signs:

    $$= \frac{x^4}{4} - 4\sqrt{x} + 3\sin x + C$$

    **Verify:** $\frac{d}{dx}\left[\frac{x^4}{4} - 4\sqrt{x} + 3\sin x + C\right]$

    $= x^3 - 4 \cdot \frac{1}{2}x^{-1/2} + 3\cos x = x^3 - \frac{2}{\sqrt{x}} + 3\cos x$ ✓

??? question "Check Your Understanding: Find $f(x)$ if $f'(x) = 4x - \sin x$ and $f(0) = 2$"
    Step 1: General antiderivative:
    $$f(x) = \int (4x - \sin x) \, dx = 2x^2 + \cos x + C$$

    Step 2: Use $f(0) = 2$:
    $$f(0) = 2(0)^2 + \cos(0) + C = 0 + 1 + C = 1 + C = 2$$
    $$C = 1$$

    Step 3: Particular antiderivative:
    $$f(x) = 2x^2 + \cos x + 1$$

    **Verify:** $f'(x) = 4x - \sin x$ ✓ and $f(0) = 0 + 1 + 1 = 2$ ✓
