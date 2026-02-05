---
title: Integral Properties and Techniques
description: Mastering definite integral properties and the powerful u-substitution technique
generated_by: claude skill chapter-content-generator
date: 2026-02-03
version: 0.03
---

# Integral Properties and Techniques

## Summary

This chapter covers properties of definite integrals and introduces integration techniques beyond basic formulas. Students will learn properties including additivity over intervals, reversing limits, and special properties for even and odd functions. The average value of a function and Mean Value Theorem for Integrals are introduced. The chapter then covers u-substitution, the most important integration technique, along with strategies using long division, completing the square, and partial fractions. After completing this chapter, students will have mastered the integration skills needed for AP Calculus.

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

1. Additivity Property
2. Reversing Limits
3. Zero Width Integral
4. Integral of Sum
5. Integral Bounds Split
6. Comparison Property
7. Even Function Integral
8. Odd Function Integral
9. Average Value
10. Average Value Formula
11. Mean Value Integral
12. u-Substitution
13. Substitution Method
14. Choosing u
15. du Calculation
16. Back Substitution
17. Definite Substitution
18. Changing Bounds
19. Long Division Method
20. Completing Square
21. Partial Fractions
22. Integration Strategy

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Calculus](../01-foundations-of-calculus/index.md)
- [Chapter 10: The Chain Rule](../10-chain-rule/index.md)
- [Chapter 20: Basic Antiderivatives](../20-basic-antiderivatives/index.md)
- [Chapter 22: Riemann Sums and the Fundamental Theorem](../22-riemann-sums-and-ftc/index.md)

---

## Introduction: Expanding Your Integration Toolkit

You've learned the Fundamental Theorem of Calculus—the remarkable bridge connecting derivatives and integrals. You can now evaluate definite integrals by finding antiderivatives. But what happens when the integrand doesn't match any of your basic formulas?

This chapter is about two things: understanding the **properties** of definite integrals that let you manipulate and simplify them, and learning **techniques** that transform difficult integrals into ones you already know how to solve.

!!! quote "Delta Moment"
    "Think of it like this: I've learned to walk on simple curves. Now I need to learn how to handle detours, shortcuts, and even some sneaky transformations. The properties tell me what shortcuts are legal, and the techniques show me how to turn a confusing path into one I recognize!"

By the end of this chapter, you'll have the integration toolkit needed for AP Calculus success. Let's build it piece by piece.

## Part 1: Properties of Definite Integrals

Before diving into new techniques, let's explore the fundamental properties of definite integrals. These properties aren't just abstract rules—they're powerful tools for simplifying calculations and understanding what integrals mean geometrically.

### The Zero Width Integral

What happens when you integrate over an interval with no width? If the lower and upper limits are the same, the integral equals zero:

$$\int_a^a f(x) \, dx = 0$$

This makes perfect sense! You're calculating the "area" under the curve from $x = a$ to $x = a$—an interval with zero width. No width means no area.

Think of it like asking, "How far did I travel from my house to my house?" If you never left, the answer is zero.

### Reversing Limits

What if you integrate "backwards"—from a larger value to a smaller one? The result flips sign:

$$\int_a^b f(x) \, dx = -\int_b^a f(x) \, dx$$

!!! tip "Reversing Limits Property"
    Switching the limits of integration reverses the sign of the integral.

This property is incredibly useful. If you accidentally set up an integral with the limits reversed, you can fix it by simply adding a negative sign.

**Example:** If $\int_2^5 f(x) \, dx = 7$, then $\int_5^2 f(x) \, dx = -7$.

Geometrically, this makes sense too. When we go from left to right ($a$ to $b$ where $a < b$), we accumulate positive area (for positive functions). Going from right to left accumulates in the opposite direction.

### The Additivity Property

One of the most useful properties lets you split an integral at any point:

$$\int_a^c f(x) \, dx = \int_a^b f(x) \, dx + \int_b^c f(x) \, dx$$

This is the **additivity property** (also called the **Integral Bounds Split** property). It works for any value of $b$—even outside the interval $[a, c]$!

!!! tip "Additivity Property"
    The integral over an entire interval equals the sum of integrals over any partition of that interval.

**Why this matters:**

- You can break a difficult integral into easier pieces
- You can combine separate integrals into one
- This property underlies many calculus techniques

**Example:** Given $\int_0^4 f(x) \, dx = 10$ and $\int_0^2 f(x) \, dx = 3$, find $\int_2^4 f(x) \, dx$.

Using additivity: $\int_0^4 f(x) \, dx = \int_0^2 f(x) \, dx + \int_2^4 f(x) \, dx$

So: $10 = 3 + \int_2^4 f(x) \, dx$

Therefore: $\int_2^4 f(x) \, dx = 7$

!!! quote "Delta's Sidequest"
    "The additivity property is like keeping a travel log in sections! If I record my total distance from home to downtown, it should equal my distance from home to the park PLUS my distance from the park to downtown. Math checks out!"

#### Diagram: Additivity Property Visualization

<iframe src="../../sims/additivity-property/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Additivity Property Visualization MicroSim</summary>
Type: microsim

Purpose: Demonstrate how the area under a curve can be split into sub-regions that sum to the total.

Learning Objective: Students will explain the additivity property of definite integrals (Bloom Level 2: Understand)

Bloom Taxonomy Verb: explain, visualize, interpret

Visual elements:

- A smooth curve $f(x)$ plotted over interval $[a, c]$
- Shaded region showing total area under curve
- Draggable vertical line at $x = b$ that splits the region
- Left region shaded in blue (integral from $a$ to $b$)
- Right region shaded in green (integral from $b$ to $c$)
- Display showing numerical values of each integral
- Equation display: $\int_a^c = \int_a^b + \int_b^c$

Interactive controls:

- Draggable point to move the split point $b$
- Dropdown: Choose different functions to integrate
- Toggle: Show/hide numerical values
- Animation: Watch split point sweep across interval

Data Visibility Requirements:

- Stage 1: Show total integral $\int_a^c f(x) \, dx$ with value
- Stage 2: As user drags split point, show both sub-integrals
- Stage 3: Display running sum showing sub-integrals always equal total

Behavior:

- Dragging the split point updates both sub-regions in real-time
- Numerical values update continuously
- Sum of sub-integrals always equals total (verification display)
- Works even when split point is outside original interval

Instructional Rationale: Interactive manipulation builds intuition that the additivity property holds regardless of where the split occurs. Seeing the numbers stay balanced reinforces the concept.

Implementation: p5.js with draggable control and numerical integration for display values
</details>

### Integral of a Sum

Just like derivatives, integrals distribute over addition:

$$\int_a^b [f(x) + g(x)] \, dx = \int_a^b f(x) \, dx + \int_a^b g(x) \, dx$$

This extends to constant multiples too:

$$\int_a^b k \cdot f(x) \, dx = k \int_a^b f(x) \, dx$$

These properties mean integration is **linear**—a hugely important fact that simplifies countless calculations.

**Example:** Evaluate $\int_0^{\pi} (3\sin x + 2) \, dx$

$$= 3\int_0^{\pi} \sin x \, dx + 2\int_0^{\pi} 1 \, dx$$

$$= 3[-\cos x]_0^{\pi} + 2[x]_0^{\pi}$$

$$= 3[-\cos \pi - (-\cos 0)] + 2[\pi - 0]$$

$$= 3[1 + 1] + 2\pi = 6 + 2\pi$$

### The Comparison Property

If one function is always greater than or equal to another on an interval, their integrals reflect this:

$$\text{If } f(x) \geq g(x) \text{ for all } x \in [a, b], \text{ then } \int_a^b f(x) \, dx \geq \int_a^b g(x) \, dx$$

This seems obvious geometrically—if one curve is always above another, it has more area beneath it!

**Useful special cases:**

- If $f(x) \geq 0$ on $[a, b]$, then $\int_a^b f(x) \, dx \geq 0$
- If $m \leq f(x) \leq M$ on $[a, b]$, then $m(b-a) \leq \int_a^b f(x) \, dx \leq M(b-a)$

The second case gives us bounds on an integral even without calculating it exactly!

### Properties Summary Table

| Property | Formula | Meaning |
|----------|---------|---------|
| Zero Width | $\int_a^a f(x) \, dx = 0$ | No width = no area |
| Reversing Limits | $\int_a^b f(x) \, dx = -\int_b^a f(x) \, dx$ | Backwards = negative |
| Additivity | $\int_a^c f(x) \, dx = \int_a^b f(x) \, dx + \int_b^c f(x) \, dx$ | Split at any point |
| Sum | $\int_a^b [f + g] \, dx = \int_a^b f \, dx + \int_a^b g \, dx$ | Integrate term by term |
| Constant Multiple | $\int_a^b kf(x) \, dx = k\int_a^b f(x) \, dx$ | Pull out constants |
| Comparison | If $f \geq g$, then $\int f \geq \int g$ | Higher curve = more area |

## Part 2: Even and Odd Function Properties

Some of the most elegant integral properties involve symmetry. If a function is even or odd, we can exploit this to simplify (or sometimes instantly evaluate!) definite integrals over symmetric intervals.

### Review: Even and Odd Functions

Recall from earlier in the course:

- **Even function:** $f(-x) = f(x)$ for all $x$ (symmetric about the y-axis)
  - Examples: $x^2$, $\cos x$, $|x|$

- **Odd function:** $f(-x) = -f(x)$ for all $x$ (symmetric about the origin)
  - Examples: $x^3$, $\sin x$, $\tan x$, $x$

### Even Function Integrals

For an **even function** integrated over a symmetric interval $[-a, a]$:

$$\int_{-a}^{a} f(x) \, dx = 2\int_0^{a} f(x) \, dx$$

!!! tip "Even Function Integral Property"
    For even functions over symmetric intervals, the integral equals twice the integral over the positive half.

**Why?** The area from $-a$ to $0$ mirrors the area from $0$ to $a$ exactly. So instead of calculating both, just calculate one and double it!

**Example:** Evaluate $\int_{-2}^{2} x^2 \, dx$

Since $x^2$ is even:

$$\int_{-2}^{2} x^2 \, dx = 2\int_0^{2} x^2 \, dx = 2\left[\frac{x^3}{3}\right]_0^{2} = 2 \cdot \frac{8}{3} = \frac{16}{3}$$

### Odd Function Integrals

For an **odd function** integrated over a symmetric interval $[-a, a]$:

$$\int_{-a}^{a} f(x) \, dx = 0$$

!!! tip "Odd Function Integral Property"
    For odd functions over symmetric intervals, the integral is always zero.

**Why?** The area above the x-axis from $0$ to $a$ exactly cancels the area below from $-a$ to $0$. The positive and negative contributions are perfect opposites!

**Example:** Evaluate $\int_{-\pi}^{\pi} \sin x \, dx$

Since $\sin x$ is odd:

$$\int_{-\pi}^{\pi} \sin x \, dx = 0$$

No calculation needed! The symmetry does all the work.

!!! quote "Delta Moment"
    "Odd functions over symmetric intervals are like climbing up one side of a valley and down the other—you end up right where you started. Net change: zero. I love when symmetry does my work for me!"

#### Diagram: Even and Odd Function Symmetry

<iframe src="../../sims/even-odd-integrals/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Even and Odd Function Integral Symmetry MicroSim</summary>
Type: microsim

Purpose: Visualize how symmetry properties of even and odd functions affect definite integrals over symmetric intervals.

Learning Objective: Students will predict integral values based on function symmetry (Bloom Level 4: Analyze)

Bloom Taxonomy Verb: analyze, predict, compare

Visual elements:

- Function graph with shaded regions
- For even functions: Both sides shaded same color, showing equal areas
- For odd functions: Opposite sides shaded in contrasting colors (blue/red) showing cancellation
- Symmetry axis (y-axis) clearly marked
- Area annotations showing values

Interactive controls:

- Dropdown: Select function type (Even: $x^2$, $\cos x$, $x^4$; Odd: $x^3$, $\sin x$, $x$; Neither: $x^2 + x$)
- Slider: Adjust interval bound $a$ from 0 to 4
- Toggle: Show numerical area values
- Animation: Watch areas being calculated from left to right

Data Visibility Requirements:

- Stage 1: Show function and symmetric interval $[-a, a]$
- Stage 2: Shade left half area with value
- Stage 3: Shade right half area with value
- Stage 4: Show sum/cancellation for final result

Behavior:

- Even functions: Both regions same color, final value = 2 times one region
- Odd functions: Regions opposite colors, values cancel to zero
- Neither even nor odd: Both regions different colors, no simplification
- Numerical displays confirm visual observations

Instructional Rationale: Seeing the cancellation for odd functions (red + blue = 0) and doubling for even functions builds geometric intuition that makes these properties memorable.

Implementation: p5.js with dynamic shading and numerical integration
</details>

### Combining Properties for Complex Integrals

When evaluating integrals over symmetric intervals, first check if the integrand can be split into even and odd parts:

**Example:** Evaluate $\int_{-3}^{3} (x^4 + x^3 - 2x) \, dx$

Separate into even and odd parts:

- Even part: $x^4$
- Odd parts: $x^3$ and $-2x$

$$\int_{-3}^{3} (x^4 + x^3 - 2x) \, dx = \int_{-3}^{3} x^4 \, dx + \int_{-3}^{3} x^3 \, dx - 2\int_{-3}^{3} x \, dx$$

The odd parts vanish! We only need:

$$= \int_{-3}^{3} x^4 \, dx = 2\int_0^{3} x^4 \, dx = 2\left[\frac{x^5}{5}\right]_0^{3} = 2 \cdot \frac{243}{5} = \frac{486}{5}$$

## Part 3: Average Value and the Mean Value Theorem for Integrals

### What is the Average Value of a Function?

You know how to find the average of a set of numbers: add them up and divide by how many there are. But what's the "average" of a continuous function over an interval? You can't just add up infinitely many values!

The answer comes from integrals. The **average value** of a function $f$ over $[a, b]$ is:

$$f_{avg} = \frac{1}{b-a} \int_a^b f(x) \, dx$$

!!! tip "Average Value Formula"
    $$f_{avg} = \frac{1}{b-a} \int_a^b f(x) \, dx$$

    The average value equals the integral divided by the interval width.

**Interpretation:** If you could "flatten" the area under the curve into a rectangle with the same base $[a, b]$, the height of that rectangle would be the average value.

**Example:** Find the average value of $f(x) = x^2$ on $[0, 3]$.

$$f_{avg} = \frac{1}{3-0} \int_0^3 x^2 \, dx = \frac{1}{3} \left[\frac{x^3}{3}\right]_0^{3} = \frac{1}{3} \cdot \frac{27}{3} = \frac{1}{3} \cdot 9 = 3$$

The average value of $x^2$ on $[0, 3]$ is 3. Note that the function values range from 0 to 9 on this interval, so an average of 3 makes sense!

#### Diagram: Average Value Visualization

<iframe src="../../sims/average-value/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Average Value of a Function MicroSim</summary>
Type: microsim

Purpose: Illustrate the average value as the height of a rectangle with equal area to the region under the curve.

Learning Objective: Students will calculate and interpret the average value of a function (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, calculate, interpret

Visual elements:

- Curve $f(x)$ over interval $[a, b]$
- Shaded region under curve (semi-transparent blue)
- Rectangle overlay showing $f_{avg}$ height (same area, different color)
- Horizontal line at height $f_{avg}$
- Area displays for both shapes

Interactive controls:

- Dropdown: Select function ($x^2$, $\sin x$, $e^x$, $\sqrt{x}$)
- Sliders: Adjust interval endpoints $a$ and $b$
- Button: "Show Average Rectangle"
- Toggle: Animate rectangle height adjusting to match area
- Display: Formula, integral value, and average value

Data Visibility Requirements:

- Stage 1: Show curve and shaded region with area value
- Stage 2: Show rectangle with height = $f_{avg}$
- Stage 3: Verify areas match numerically

Behavior:

- Rectangle and curve region have identical areas
- Adjusting interval updates both shapes
- Animation shows rectangle "finding" the correct height
- Formula updates with specific values

Instructional Rationale: The rectangle visualization makes "average value" concrete. Students see that flattening the curve to a constant height preserves area—the defining property of the average.

Implementation: p5.js with numerical integration and animated rectangle
</details>

### The Mean Value Theorem for Integrals

Here's a beautiful theorem: the average value of a continuous function is actually achieved somewhere on the interval!

!!! tip "Mean Value Theorem for Integrals"
    If $f$ is continuous on $[a, b]$, then there exists at least one value $c$ in $(a, b)$ such that:

    $$f(c) = \frac{1}{b-a} \int_a^b f(x) \, dx = f_{avg}$$

In other words: **there's some point where the function equals its average value.**

This is the integral version of the Mean Value Theorem for derivatives. Just as the derivative MVT guarantees a point where the instantaneous rate equals the average rate, this theorem guarantees a point where the function value equals the average value.

**Example:** For $f(x) = x^2$ on $[0, 3]$, we found $f_{avg} = 3$.

The MVT for Integrals says there's some $c$ in $(0, 3)$ where $f(c) = 3$:

$$c^2 = 3 \implies c = \sqrt{3} \approx 1.732$$

Indeed, $\sqrt{3}$ is in the interval $(0, 3)$, and $f(\sqrt{3}) = 3 = f_{avg}$.

!!! quote "Delta Moment"
    "The Mean Value Theorem for Integrals tells me that if I calculate my average elevation on a hike, there's some point where I was actually AT that elevation. I can't have an average of 5 feet without ever actually being at 5 feet somewhere along the way!"

## Part 4: Introduction to u-Substitution

Now we arrive at the most powerful and commonly used integration technique: **u-substitution** (also called the **substitution method** or **reverse chain rule**).

### The Problem: Integrands That Don't Match Basic Forms

Consider $\int 2x \cos(x^2) \, dx$. This doesn't match any basic formula. We can't integrate $\cos(x^2)$ directly, and the $2x$ in front seems random.

But wait—let's think about this from a derivative perspective. What function has derivative $2x \cos(x^2)$?

If we let $u = x^2$, then by the chain rule:
$$\frac{d}{dx}[\sin(x^2)] = \cos(x^2) \cdot 2x$$

That's our integrand! So $\int 2x \cos(x^2) \, dx = \sin(x^2) + C$.

u-substitution is essentially the **chain rule run backwards**.

### The Substitution Method

!!! tip "u-Substitution"
    To evaluate $\int f(g(x)) \cdot g'(x) \, dx$:

    1. Let $u = g(x)$ (the "inside function")
    2. Compute $du = g'(x) \, dx$
    3. Rewrite the integral in terms of $u$: $\int f(u) \, du$
    4. Integrate with respect to $u$
    5. Substitute back to express the answer in terms of $x$

The key insight: when we see $g'(x)$ multiplied by a function of $g(x)$, substitution will simplify the integral.

### Choosing u: What to Substitute

The art of u-substitution is choosing the right $u$. General guidelines:

- **Look for a function and its derivative:** If you see something and its derivative (or a constant multiple of its derivative) together, the "something" is probably $u$
- **Choose the inside function:** In compositions like $\cos(x^2)$, the inside function $x^2$ is often a good choice for $u$
- **Check if du appears:** After choosing $u$, see if $du$ (or a constant multiple) shows up in the integrand

| Integrand Pattern | Good Choice for $u$ | Why |
|-------------------|---------------------|-----|
| $2x \cos(x^2)$ | $u = x^2$ | $du = 2x \, dx$ is present |
| $(3x^2 + 1)^5 \cdot 6x$ | $u = 3x^2 + 1$ | $du = 6x \, dx$ is present |
| $\frac{\cos x}{\sin x}$ | $u = \sin x$ | $du = \cos x \, dx$ is present |
| $e^{x} \cdot e^{e^x}$ | $u = e^x$ | $du = e^x \, dx$ is present |

### Step-by-Step Examples

**Example 1:** Evaluate $\int (2x + 3)^4 \, dx$

Step 1: Choose $u = 2x + 3$ (the inside function)

Step 2: Compute $du$:
$$du = 2 \, dx \implies dx = \frac{du}{2}$$

Step 3: Substitute:
$$\int (2x + 3)^4 \, dx = \int u^4 \cdot \frac{du}{2} = \frac{1}{2} \int u^4 \, du$$

Step 4: Integrate:
$$= \frac{1}{2} \cdot \frac{u^5}{5} + C = \frac{u^5}{10} + C$$

Step 5: Back-substitute:
$$= \frac{(2x + 3)^5}{10} + C$$

**Verify:** $\frac{d}{dx}\left[\frac{(2x + 3)^5}{10}\right] = \frac{5(2x + 3)^4 \cdot 2}{10} = (2x + 3)^4$ ✓

**Example 2:** Evaluate $\int x \sqrt{x^2 + 1} \, dx$

Step 1: Choose $u = x^2 + 1$

Step 2: Compute $du$:
$$du = 2x \, dx \implies x \, dx = \frac{du}{2}$$

Step 3: Substitute:
$$\int x \sqrt{x^2 + 1} \, dx = \int \sqrt{u} \cdot \frac{du}{2} = \frac{1}{2} \int u^{1/2} \, du$$

Step 4: Integrate:
$$= \frac{1}{2} \cdot \frac{u^{3/2}}{3/2} + C = \frac{1}{2} \cdot \frac{2u^{3/2}}{3} + C = \frac{u^{3/2}}{3} + C$$

Step 5: Back-substitute:
$$= \frac{(x^2 + 1)^{3/2}}{3} + C$$

**Example 3:** Evaluate $\int \sin^3 x \cos x \, dx$

Step 1: Choose $u = \sin x$ (since $\cos x \, dx$ appears, which is exactly $du$)

Step 2: Compute $du$:
$$du = \cos x \, dx$$

Step 3: Substitute:
$$\int \sin^3 x \cos x \, dx = \int u^3 \, du$$

Step 4: Integrate:
$$= \frac{u^4}{4} + C$$

Step 5: Back-substitute:
$$= \frac{\sin^4 x}{4} + C$$

!!! quote "Delta's Pun Corner"
    "u-substitution is like putting on a disguise. The integral doesn't recognize itself and becomes much easier to evaluate. Then you remove the mask at the end. Very cloak-and-dagger!"

#### Diagram: u-Substitution Process

<iframe src="../../sims/u-substitution/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>u-Substitution Step-by-Step MicroSim</summary>
Type: microsim

Purpose: Walk through the u-substitution process step by step with visual tracking.

Learning Objective: Students will apply u-substitution to evaluate integrals (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, execute, implement

Visual elements:

- Original integral displayed at top
- Step-by-step transformation showing:
  1. Identify u (highlighted in original)
  2. Calculate du (shown as equation)
  3. Rewrite integral in terms of u
  4. Integrate in u
  5. Back-substitute to get answer
- Color coding: u in blue, du in green, other parts in black
- Arrow flow showing transformation

Interactive controls:

- Dropdown: Select example integral
- Button: "Next Step" to advance through process
- Button: "Show All Steps" to see complete solution
- Toggle: Show verification by differentiating
- Input: Try your own integral (with preset parsing)

Data Visibility Requirements:

- Stage 1: Show original integral, highlight potential u choices
- Stage 2: Show $u = ...$ and $du = ...$ equations
- Stage 3: Show substituted integral with u
- Stage 4: Show integration result in u
- Stage 5: Show final answer after back-substitution
- Optional: Show derivative verification

Behavior:

- Each step highlights what changes
- Color coding tracks u and du throughout
- Verification step shows chain rule differentiation
- Common mistakes flagged if user inputs incorrect u

Instructional Rationale: Step-by-step visibility with color coding helps students track the substitution through each transformation, building procedural fluency.

Implementation: p5.js with text rendering and step-through navigation
</details>

### Calculating du and Handling Missing Constants

Sometimes the exact $du$ doesn't appear in the integrand, but a constant multiple of it does. That's okay—we can adjust!

**Example:** Evaluate $\int x^2 e^{x^3} \, dx$

Let $u = x^3$. Then $du = 3x^2 \, dx$.

But we have $x^2 \, dx$, not $3x^2 \, dx$. We solve for what we have:
$$x^2 \, dx = \frac{du}{3}$$

Now substitute:
$$\int x^2 e^{x^3} \, dx = \int e^u \cdot \frac{du}{3} = \frac{1}{3} \int e^u \, du = \frac{1}{3} e^u + C = \frac{1}{3} e^{x^3} + C$$

!!! note "Key Point"
    When $du$ is a constant multiple of what appears in the integrand, multiply and divide by that constant. This only works for constant adjustments—variable adjustments require different techniques.

### Common u-Substitution Patterns

Recognizing patterns speeds up your work:

| Pattern | Choose $u$ | Resulting Integral |
|---------|-----------|-------------------|
| $\int f(ax + b) \, dx$ | $u = ax + b$ | $\frac{1}{a} \int f(u) \, du$ |
| $\int x^{n-1} f(x^n) \, dx$ | $u = x^n$ | $\frac{1}{n} \int f(u) \, du$ |
| $\int e^x f(e^x) \, dx$ | $u = e^x$ | $\int f(u) \, du$ |
| $\int \frac{f'(x)}{f(x)} \, dx$ | $u = f(x)$ | $\int \frac{du}{u} = \ln|u| + C$ |
| $\int f(\sin x) \cos x \, dx$ | $u = \sin x$ | $\int f(u) \, du$ |

## Part 5: Definite Integrals with u-Substitution

When using u-substitution on definite integrals, you have two options:

1. **Back-substitute and use original limits**
2. **Change the limits to match $u$** (usually faster!)

### Method 1: Back-Substitute

Evaluate the indefinite integral with substitution, back-substitute, then apply the original limits.

**Example:** Evaluate $\int_0^2 x(x^2 + 1)^3 \, dx$

Indefinite integral: Let $u = x^2 + 1$, $du = 2x \, dx$, so $x \, dx = \frac{du}{2}$

$$\int x(x^2 + 1)^3 \, dx = \frac{1}{2} \int u^3 \, du = \frac{u^4}{8} + C = \frac{(x^2 + 1)^4}{8} + C$$

Now apply limits:
$$\left[\frac{(x^2 + 1)^4}{8}\right]_0^2 = \frac{(4 + 1)^4}{8} - \frac{(0 + 1)^4}{8} = \frac{625}{8} - \frac{1}{8} = \frac{624}{8} = 78$$

### Method 2: Change the Limits

When you substitute $u = g(x)$, convert the $x$-limits to $u$-limits:

- When $x = a$, $u = g(a)$
- When $x = b$, $u = g(b)$

!!! tip "Changing Bounds in Substitution"
    $$\int_a^b f(g(x)) \cdot g'(x) \, dx = \int_{g(a)}^{g(b)} f(u) \, du$$

    Convert limits along with the substitution—no back-substitution needed!

**Example:** Evaluate $\int_0^2 x(x^2 + 1)^3 \, dx$ (same integral, different method)

Let $u = x^2 + 1$, $du = 2x \, dx$, so $x \, dx = \frac{du}{2}$

Change limits:

- When $x = 0$: $u = 0^2 + 1 = 1$
- When $x = 2$: $u = 2^2 + 1 = 5$

$$\int_0^2 x(x^2 + 1)^3 \, dx = \frac{1}{2} \int_1^5 u^3 \, du = \frac{1}{2} \left[\frac{u^4}{4}\right]_1^5$$

$$= \frac{1}{8}[5^4 - 1^4] = \frac{1}{8}[625 - 1] = \frac{624}{8} = 78$$

Same answer, but we never had to back-substitute!

#### Diagram: Changing Bounds in u-Substitution

<iframe src="../../sims/changing-bounds/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Changing Bounds in u-Substitution MicroSim</summary>
Type: microsim

Purpose: Visualize how the bounds of integration transform when using u-substitution.

Learning Objective: Students will evaluate definite integrals using u-substitution with changed bounds (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, transform, calculate

Visual elements:

- Side-by-side graphs: x-domain and u-domain
- Left graph: Original function with shaded region $[a, b]$
- Right graph: Transformed function in u with shaded region $[g(a), g(b)]$
- Arrow showing transformation $u = g(x)$
- Bound markers on both graphs
- Area displays showing equality

Interactive controls:

- Dropdown: Select integral example
- Slider: Adjust original bounds $a$ and $b$
- Display: Shows $u = g(x)$ transformation formula
- Display: Shows new bounds calculation
- Toggle: Animate the transformation

Data Visibility Requirements:

- Stage 1: Show original integral in x with bounds
- Stage 2: Show u-substitution: $u = g(x)$
- Stage 3: Show bound transformation: $x = a \to u = g(a)$, $x = b \to u = g(b)$
- Stage 4: Show new integral in u with new bounds
- Stage 5: Show both areas are equal (same numerical value)

Behavior:

- Both graphs update as bounds change
- Transformation visually maps one region to the other
- Areas displayed numerically confirm equality
- Animation shows points moving from x to u

Instructional Rationale: Seeing the geometric transformation helps students understand that changing bounds isn't arbitrary—it maps the original region to an equivalent region in the u-domain.

Implementation: p5.js with dual coordinate systems and animated mapping
</details>

## Part 6: Algebraic Techniques for Integration

Sometimes an integral can't be attacked directly with basic rules or u-substitution. We need to **rewrite the integrand** first. Here are three key algebraic techniques.

### Long Division Method

When integrating a rational function where the degree of the numerator is greater than or equal to the degree of the denominator, **polynomial long division** simplifies the integral.

**Example:** Evaluate $\int \frac{x^3 + 2x^2 - x + 1}{x + 1} \, dx$

First, perform polynomial long division:

$$\frac{x^3 + 2x^2 - x + 1}{x + 1} = x^2 + x - 2 + \frac{3}{x + 1}$$

(You can verify by multiplying back: $(x + 1)(x^2 + x - 2) + 3 = x^3 + 2x^2 - x + 1$ ✓)

Now integrate the simpler form:

$$\int \left(x^2 + x - 2 + \frac{3}{x + 1}\right) dx = \frac{x^3}{3} + \frac{x^2}{2} - 2x + 3\ln|x + 1| + C$$

!!! tip "When to Use Long Division"
    Use long division when the numerator's degree is **greater than or equal to** the denominator's degree in a rational function.

### Completing the Square

For integrals involving quadratics (especially in denominators), **completing the square** transforms the expression into a form matching inverse trig integral formulas.

The technique: Transform $ax^2 + bx + c$ into $a(x - h)^2 + k$ form.

**Example:** Evaluate $\int \frac{1}{x^2 + 4x + 8} \, dx$

Complete the square in the denominator:
$$x^2 + 4x + 8 = (x^2 + 4x + 4) + 4 = (x + 2)^2 + 4$$

Now the integral becomes:
$$\int \frac{1}{(x + 2)^2 + 4} \, dx$$

This matches the arctangent pattern $\int \frac{1}{u^2 + a^2} du = \frac{1}{a} \arctan\left(\frac{u}{a}\right) + C$

Let $u = x + 2$, $a = 2$:
$$= \frac{1}{2} \arctan\left(\frac{x + 2}{2}\right) + C$$

**Common patterns after completing the square:**

| Form | Integral |
|------|----------|
| $\int \frac{1}{u^2 + a^2} du$ | $\frac{1}{a} \arctan\left(\frac{u}{a}\right) + C$ |
| $\int \frac{1}{\sqrt{a^2 - u^2}} du$ | $\arcsin\left(\frac{u}{a}\right) + C$ |
| $\int \frac{1}{u\sqrt{u^2 - a^2}} du$ | $\frac{1}{a} \text{arcsec}\left(\frac{|u|}{a}\right) + C$ |

### Partial Fractions (Introduction)

When the denominator of a rational function can be factored, we can decompose the fraction into simpler parts. This technique is called **partial fractions**.

**Example:** Evaluate $\int \frac{1}{x^2 - 1} \, dx$

Factor the denominator: $x^2 - 1 = (x - 1)(x + 1)$

Write as partial fractions:
$$\frac{1}{(x-1)(x+1)} = \frac{A}{x-1} + \frac{B}{x+1}$$

Multiply both sides by $(x-1)(x+1)$:
$$1 = A(x+1) + B(x-1)$$

Solve for $A$ and $B$:

- Let $x = 1$: $1 = A(2) + B(0) \implies A = \frac{1}{2}$
- Let $x = -1$: $1 = A(0) + B(-2) \implies B = -\frac{1}{2}$

So:
$$\frac{1}{x^2 - 1} = \frac{1/2}{x-1} - \frac{1/2}{x+1}$$

Now integrate:
$$\int \frac{1}{x^2 - 1} dx = \frac{1}{2}\ln|x-1| - \frac{1}{2}\ln|x+1| + C = \frac{1}{2}\ln\left|\frac{x-1}{x+1}\right| + C$$

!!! note "Partial Fractions: Full Treatment in BC"
    Partial fractions is introduced here at a basic level. More complex cases (repeated factors, irreducible quadratics) are covered thoroughly in AP Calculus BC.

## Part 7: Integration Strategy

With so many techniques, how do you know which to use? Here's a strategic approach:

### The Integration Decision Tree

1. **Is it a basic form?** Check if the integral directly matches a formula (power rule, trig, exponential, inverse trig).

2. **Can you simplify first?** Expand products, simplify fractions, rewrite using identities.

3. **Is there an obvious substitution?** Look for a function and its derivative appearing together.

4. **For rational functions:**
   - Degree of numerator $\geq$ degree of denominator? Use **long division** first.
   - Factorable denominator? Try **partial fractions**.

5. **Quadratic in denominator or under radical?** Try **completing the square**.

6. **Trig function?** Consider trig identities or trig substitution.

| What You See | What To Try |
|--------------|-------------|
| Basic antiderivative | Apply directly |
| Function and its derivative | u-substitution |
| Polynomial over polynomial | Long division (if needed) then partial fractions |
| $\sqrt{a^2 - x^2}$ or $\frac{1}{x^2 + a^2}$ | Complete the square / Trig substitution |
| Products of sines and cosines | Use trig identities |
| Function that simplifies when differentiated | Integration by parts (BC topic) |

#### Diagram: Integration Strategy Flowchart

<iframe src="../../sims/integration-strategy/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Integration Strategy Decision Flowchart</summary>
Type: infographic

Purpose: Provide a visual decision tree for choosing integration techniques.

Learning Objective: Students will select appropriate integration techniques based on integrand structure (Bloom Level 5: Evaluate)

Bloom Taxonomy Verb: evaluate, select, judge

Visual elements:

- Flowchart with decision nodes (diamonds) and action nodes (rectangles)
- Color-coded paths: Green for basic techniques, Blue for substitution, Orange for algebraic manipulation
- Entry point: "What does your integral look like?"
- Terminal nodes showing technique to apply
- Example integral at each terminal

Decision nodes:

1. "Is it a basic antiderivative form?" -> Yes: Apply basic rule
2. "Can you simplify algebraically?" -> Yes: Simplify first
3. "Do you see a function and its derivative?" -> Yes: u-substitution
4. "Is it a rational function?" -> Yes: Check degree, use long division or partial fractions
5. "Is there a quadratic expression?" -> Yes: Complete the square

Interactive features:

- Hover over nodes to see examples
- Click technique nodes to see worked example
- Path highlighting based on user input integral
- Mini-quiz: Given an integral, trace the correct path

Instructional Rationale: A visual decision tree reduces cognitive load when students face unfamiliar integrals. It transforms technique selection from memorization to systematic analysis.

Implementation: HTML/SVG with JavaScript for interactivity
</details>

### Practice: Identifying the Right Technique

**For each integral, identify which technique to use:**

| Integral | Technique |
|----------|-----------|
| $\int 3x^2 \cos(x^3) \, dx$ | u-substitution ($u = x^3$) |
| $\int \frac{x^4 + 1}{x^2} \, dx$ | Simplify first (divide each term) |
| $\int \frac{1}{x^2 + 6x + 13} \, dx$ | Complete the square |
| $\int \frac{2x + 3}{x^2 - 4} \, dx$ | Partial fractions |
| $\int \frac{x^3}{x - 2} \, dx$ | Long division first |
| $\int e^{\sin x} \cos x \, dx$ | u-substitution ($u = \sin x$) |

!!! quote "Delta Moment"
    "Choosing an integration technique is like choosing the right tool for a job. You wouldn't use a hammer to cut wood! With practice, you'll look at an integral and immediately sense which technique fits. That intuition is the integration superpower."

## Part 8: Putting It All Together

Let's work through several complete examples using multiple techniques and properties.

### Comprehensive Example 1

**Evaluate:** $\int_{-2}^{2} (x^3 + 4x^2) \, dx$

**Solution:** Check for symmetry first!

- $x^3$ is odd
- $4x^2$ is even

Over $[-2, 2]$ (symmetric interval):

$$\int_{-2}^{2} x^3 \, dx = 0 \quad \text{(odd function)}$$

$$\int_{-2}^{2} 4x^2 \, dx = 2 \int_0^{2} 4x^2 \, dx \quad \text{(even function)}$$

Calculate the even part:
$$= 2 \cdot 4 \int_0^{2} x^2 \, dx = 8 \left[\frac{x^3}{3}\right]_0^{2} = 8 \cdot \frac{8}{3} = \frac{64}{3}$$

### Comprehensive Example 2

**Evaluate:** $\int_1^{e} \frac{\ln x}{x} \, dx$

**Solution:** Use u-substitution.

Let $u = \ln x$, then $du = \frac{1}{x} dx$

Change bounds:

- When $x = 1$: $u = \ln 1 = 0$
- When $x = e$: $u = \ln e = 1$

$$\int_1^{e} \frac{\ln x}{x} \, dx = \int_0^{1} u \, du = \left[\frac{u^2}{2}\right]_0^{1} = \frac{1}{2}$$

### Comprehensive Example 3

**Find the average value of** $f(x) = \sin x$ on $[0, \pi]$.

**Solution:** Apply the average value formula:

$$f_{avg} = \frac{1}{\pi - 0} \int_0^{\pi} \sin x \, dx = \frac{1}{\pi} [-\cos x]_0^{\pi}$$

$$= \frac{1}{\pi} [-\cos \pi - (-\cos 0)] = \frac{1}{\pi} [1 + 1] = \frac{2}{\pi}$$

The average value of $\sin x$ over one "hump" is $\frac{2}{\pi} \approx 0.637$.

### Comprehensive Example 4

**Evaluate:** $\int \frac{x^2 + 1}{x - 1} \, dx$

**Solution:** Degree of numerator (2) $\geq$ degree of denominator (1), so use long division.

$$\frac{x^2 + 1}{x - 1} = x + 1 + \frac{2}{x - 1}$$

Now integrate:
$$\int \left(x + 1 + \frac{2}{x - 1}\right) dx = \frac{x^2}{2} + x + 2\ln|x - 1| + C$$

## Summary and Key Takeaways

### Properties of Definite Integrals

- **Zero width:** $\int_a^a f(x) \, dx = 0$
- **Reversing limits:** $\int_a^b f(x) \, dx = -\int_b^a f(x) \, dx$
- **Additivity:** $\int_a^c f(x) \, dx = \int_a^b f(x) \, dx + \int_b^c f(x) \, dx$
- **Sum and constant multiple:** Integrals are linear
- **Even functions:** $\int_{-a}^{a} f(x) \, dx = 2\int_0^{a} f(x) \, dx$
- **Odd functions:** $\int_{-a}^{a} f(x) \, dx = 0$

### Average Value and MVT for Integrals

- **Average value formula:** $f_{avg} = \frac{1}{b-a} \int_a^b f(x) \, dx$
- **Mean Value Theorem for Integrals:** There exists $c$ in $(a, b)$ where $f(c) = f_{avg}$

### u-Substitution

- The reverse of the chain rule
- Choose $u$ = "inside function" when you see function and derivative together
- For definite integrals: either back-substitute or change bounds
- Always verify by differentiating your answer

### Algebraic Techniques

- **Long division:** When numerator degree $\geq$ denominator degree
- **Completing the square:** For quadratics, especially in denominators
- **Partial fractions:** When denominator factors into linear terms

### Integration Strategy

1. Check basic forms first
2. Simplify algebraically if possible
3. Look for substitution opportunities
4. Apply algebraic techniques as needed
5. Always verify your answer!

??? question "Check Your Understanding: Evaluate $\int_{-1}^{1} (x^5 + 3x^2 + \cos x) \, dx$"
    **Solution:** Use symmetry properties over $[-1, 1]$.

    - $x^5$ is odd: $\int_{-1}^{1} x^5 \, dx = 0$
    - $3x^2$ is even: $\int_{-1}^{1} 3x^2 \, dx = 2\int_0^{1} 3x^2 \, dx = 6 \cdot \frac{1}{3} = 2$
    - $\cos x$ is even: $\int_{-1}^{1} \cos x \, dx = 2\int_0^{1} \cos x \, dx = 2[\sin x]_0^{1} = 2\sin 1$

    **Total:** $0 + 2 + 2\sin 1 = 2 + 2\sin 1 \approx 3.68$

??? question "Check Your Understanding: Find $\int \frac{e^x}{1 + e^x} \, dx$"
    **Solution:** Use u-substitution with $u = 1 + e^x$.

    Then $du = e^x \, dx$, which is exactly what appears in the numerator!

    $$\int \frac{e^x}{1 + e^x} \, dx = \int \frac{du}{u} = \ln|u| + C = \ln(1 + e^x) + C$$

    (Note: $1 + e^x > 0$ always, so we don't need the absolute value.)

    **Verify:** $\frac{d}{dx}[\ln(1 + e^x)] = \frac{e^x}{1 + e^x}$ ✓

??? question "Check Your Understanding: Find the average value of $f(x) = x^2$ on $[1, 4]$"
    **Solution:** Apply the average value formula.

    $$f_{avg} = \frac{1}{4 - 1} \int_1^{4} x^2 \, dx = \frac{1}{3} \left[\frac{x^3}{3}\right]_1^{4}$$

    $$= \frac{1}{3} \cdot \frac{1}{3}[64 - 1] = \frac{63}{9} = 7$$

    The average value of $x^2$ on $[1, 4]$ is 7.

    **Find c where $f(c) = 7$:** $c^2 = 7 \implies c = \sqrt{7} \approx 2.65$

    Since $\sqrt{7}$ is in $(1, 4)$, the MVT for Integrals is verified.

[See Annotated References](./references.md)
