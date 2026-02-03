---
title: Continuity
description: Understanding continuous functions, types of discontinuities, and the Intermediate Value Theorem
generated_by: claude skill chapter-content-generator
date: 2026-02-03 14:40:00
version: 0.03
---

# Continuity

## Summary

This chapter explores the concept of continuity, which describes functions that have no breaks, holes, or jumps in their graphs. Students will learn the three conditions required for continuity at a point, distinguish between different types of discontinuities (removable, jump, and infinite), and understand how to determine continuity for various function types. The chapter culminates with the Intermediate Value Theorem, a powerful result about continuous functions. After completing this chapter, students will be able to analyze function continuity and apply the IVT to prove the existence of roots.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Continuity
2. Continuity at a Point
3. Three Conditions
4. Continuity on Interval
5. One-Sided Continuity
6. Continuous Function
7. Discontinuity
8. Removable Discontinuity
9. Jump Discontinuity
10. Infinite Discontinuity
11. Essential Discontinuity
12. Continuous Extension
13. Removing Discontinuities
14. Piecewise Continuity
15. Continuity of Composites
16. Continuity of Polynomials
17. Continuity of Rationals
18. Continuity of Trig
19. Continuity of Exp Log
20. Intermediate Value Thm

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Calculus](../01-foundations-of-calculus/index.md)
- [Chapter 2: Understanding Limits](../02-understanding-limits/index.md)
- [Chapter 3: Evaluating Limits](../03-evaluating-limits/index.md)

---

## What Does Continuity Mean?

You've mastered limits. Now it's time to connect limits to one of the most intuitive ideas in mathematics: **continuity**.

!!! quote "Delta Moment"
    "Can I roll smoothly along this curve, or is there a gap I'd fall through? That's the question continuity answers. A continuous function is one where I never have to teleport!"

Intuitively, a function is **continuous** if you can draw its graph without lifting your pencil. No holes, no jumps, no gaps. But mathematics demands precision, so let's make this intuition rigorous.

---

## The Three Conditions for Continuity

A function $f$ is **continuous at a point $c$** if and only if three conditions are all met:

!!! tip "Three Conditions for Continuity at $x = c$"
    1. **$f(c)$ is defined** — There's actually a point at $x = c$
    2. **$\lim_{x \to c} f(x)$ exists** — The function approaches a single value
    3. **$\lim_{x \to c} f(x) = f(c)$** — The limit equals the function value

All three must be true. If any one fails, the function is discontinuous at $c$.

Let's see what happens when each condition fails:

| Condition That Fails | What It Looks Like | Example |
|---------------------|-------------------|---------|
| $f(c)$ not defined | Hole in the graph | $f(x) = \frac{x^2-1}{x-1}$ at $x=1$ |
| Limit doesn't exist | Jump in the graph | Step functions |
| Limit ≠ function value | Hole with point elsewhere | Piecewise with mismatched value |

### Example: Checking Continuity

Is $f(x) = \frac{x^2 - 4}{x - 2}$ continuous at $x = 2$?

**Check Condition 1:** Is $f(2)$ defined?
$$f(2) = \frac{4 - 4}{2 - 2} = \frac{0}{0} \quad \text{Undefined! ✗}$$

The function fails the very first condition. We don't even need to check the others—$f$ is **not continuous at $x = 2$**.

!!! warning "One Strike, You're Out"
    A function only needs to fail ONE condition to be discontinuous. Always check Condition 1 first—it's usually the quickest.

#### Diagram: Three Conditions Visualized

<iframe src="../../sims/continuity-conditions/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Three Conditions Visualized MicroSim</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will explain how each of the three continuity conditions corresponds to visual features of a function graph.

Visual elements:

- Coordinate plane with function graph
- Target point $x = c$ highlighted with dashed vertical line
- Three condition checklist displayed:
  - Condition 1: f(c) defined (check/x mark)
  - Condition 2: Limit exists (check/x mark)
  - Condition 3: Limit = f(c) (check/x mark)
- Delta robot positioned at the point (or hovering over a hole)
- Final verdict: "CONTINUOUS" (green) or "DISCONTINUOUS" (red)

Interactive controls:

- Function selector with 5 scenarios:
  - Scenario A: Fully continuous function
  - Scenario B: Hole (condition 1 fails)
  - Scenario C: Jump (condition 2 fails)
  - Scenario D: Misplaced point (condition 3 fails)
  - Scenario E: Vertical asymptote (condition 2 fails)
- Slider: Move the target point c along the x-axis
- Button: "Check continuity at c"

Behavior:

- When checking continuity, conditions animate one by one
- Failed condition is highlighted in red
- Successful conditions show green checkmarks
- Visual cues appear on graph (circle at limit value, dot at function value)

Instructional Rationale: Linking the abstract conditions to visual graph features builds conceptual understanding before procedural skills.

Implementation: p5.js with canvas-based controls
</details>

---

## Types of Discontinuities

When a function isn't continuous at a point, we classify the **type of discontinuity** based on how it fails. This classification helps us understand the function's behavior and sometimes repair it.

### Removable Discontinuity

A **removable discontinuity** occurs when the limit exists but either:

- $f(c)$ is not defined, OR
- $f(c)$ is defined but doesn't equal the limit

The discontinuity is "removable" because you could fix it by (re)defining $f(c)$ to equal the limit.

**Example:** $f(x) = \frac{x^2 - 1}{x - 1}$ at $x = 1$

The limit is:
$$\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = \lim_{x \to 1} \frac{(x+1)(x-1)}{x-1} = \lim_{x \to 1} (x + 1) = 2$$

But $f(1)$ is undefined. If we define $f(1) = 2$, the discontinuity disappears!

!!! quote "Delta Moment"
    "A removable discontinuity is like a pothole in the road. The path is clear—there's just a hole that needs patching. I know exactly where I should be; someone just forgot to put the point there!"

### Jump Discontinuity

A **jump discontinuity** occurs when the left-hand and right-hand limits both exist but are different:

$$\lim_{x \to c^-} f(x) \neq \lim_{x \to c^+} f(x)$$

The function "jumps" from one value to another.

**Example:** The floor function $f(x) = \lfloor x \rfloor$ at any integer.

At $x = 2$:

- $\lim_{x \to 2^-} \lfloor x \rfloor = 1$
- $\lim_{x \to 2^+} \lfloor x \rfloor = 2$

The limits don't match, so there's a jump discontinuity.

### Infinite Discontinuity

An **infinite discontinuity** occurs when the function values grow without bound as $x$ approaches $c$. The limit is infinite (or negative infinite) from at least one side.

**Example:** $f(x) = \frac{1}{x}$ at $x = 0$

- $\lim_{x \to 0^+} \frac{1}{x} = +\infty$
- $\lim_{x \to 0^-} \frac{1}{x} = -\infty$

The function blows up near the discontinuity.

### Essential Discontinuity

An **essential discontinuity** (also called oscillating discontinuity) occurs when the function oscillates infinitely without approaching any limit.

**Example:** $f(x) = \sin\left(\frac{1}{x}\right)$ at $x = 0$

As $x \to 0$, the function oscillates between $-1$ and $1$ infinitely many times. Neither one-sided limit exists.

### Summary Table of Discontinuity Types

| Type | Limit Behavior | Visual Appearance | Fixable? |
|------|---------------|-------------------|----------|
| Removable | Limit exists | Hole in graph | Yes |
| Jump | Left ≠ Right limits | Step/gap in graph | No |
| Infinite | Limit is $\pm\infty$ | Vertical asymptote | No |
| Essential | Limit doesn't exist | Wild oscillation | No |

#### Diagram: Discontinuity Classification

<iframe src="../../sims/discontinuity-types/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Discontinuity Classification MicroSim</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Classify

Learning Objective: Students will classify discontinuities by analyzing limit behavior at specific points.

Visual elements:

- Four panels showing one example of each discontinuity type
- Each panel has: graph, one-sided limit values, discontinuity type label
- Interactive quiz mode: single graph with hidden type
- Classification result display with explanation

Interactive controls:

- Mode selector: "Gallery View" (see all four types) or "Quiz Mode" (identify type)
- In Quiz Mode:
  - "New Function" generates random discontinuity
  - Four buttons for classification: "Removable," "Jump," "Infinite," "Essential"
  - Feedback shows correct answer with explanation
- In Gallery View:
  - Click any panel to see detailed analysis
  - Slider to zoom in on discontinuity point

Behavior:

- Gallery mode provides reference examples for each type
- Quiz mode tests classification skills
- Feedback explains why each answer is correct/incorrect
- Score tracker for quiz attempts

Instructional Rationale: Classification practice reinforces the distinguishing features of each discontinuity type.

Implementation: p5.js with canvas-based controls
</details>

---

## Continuity on Intervals

So far we've talked about continuity at a single point. But we often want to know if a function is continuous on an entire interval.

### Continuity on Open Intervals

A function is **continuous on an open interval $(a, b)$** if it's continuous at every point in that interval.

### Continuity on Closed Intervals

For closed intervals $[a, b]$, we need a slightly different definition because we can only approach the endpoints from one side:

!!! tip "Continuity on $[a, b]$"
    A function $f$ is continuous on $[a, b]$ if:

    1. $f$ is continuous on $(a, b)$
    2. $\lim_{x \to a^+} f(x) = f(a)$ — continuous from the right at $a$
    3. $\lim_{x \to b^-} f(x) = f(b)$ — continuous from the left at $b$

### One-Sided Continuity

A function is:

- **Continuous from the right** at $c$ if $\lim_{x \to c^+} f(x) = f(c)$
- **Continuous from the left** at $c$ if $\lim_{x \to c^-} f(x) = f(c)$

This matters for endpoints and piecewise functions.

---

## Continuous Functions You Know and Love

The good news: most functions you've worked with are continuous on their natural domains. Let's catalog them.

### Polynomials

!!! tip "Continuity of Polynomials"
    Every polynomial function is continuous everywhere (on all of $\mathbb{R}$).

This includes constant functions, linear functions, quadratics, cubics, and so on.

**Why?** For polynomials, direct substitution always works: $\lim_{x \to c} p(x) = p(c)$.

### Rational Functions

!!! tip "Continuity of Rational Functions"
    A rational function $f(x) = \frac{p(x)}{q(x)}$ is continuous everywhere except where $q(x) = 0$.

The "holes" and vertical asymptotes occur precisely where the denominator is zero.

**Example:** $f(x) = \frac{x+1}{x^2 - 4}$ is continuous everywhere except $x = 2$ and $x = -2$.

### Trigonometric Functions

!!! tip "Continuity of Trig Functions"
    - $\sin x$ and $\cos x$ are continuous everywhere
    - $\tan x$, $\sec x$ are continuous except where $\cos x = 0$
    - $\cot x$, $\csc x$ are continuous except where $\sin x = 0$

### Exponential and Logarithmic Functions

!!! tip "Continuity of Exp/Log"
    - $e^x$ and $a^x$ (for $a > 0$) are continuous everywhere
    - $\ln x$ and $\log_a x$ are continuous for $x > 0$

### Summary of Continuous Functions

| Function Type | Continuous On |
|--------------|---------------|
| Polynomial | All real numbers |
| Rational $\frac{p(x)}{q(x)}$ | Wherever $q(x) \neq 0$ |
| $\sin x$, $\cos x$ | All real numbers |
| $\tan x$, $\sec x$ | Wherever $\cos x \neq 0$ |
| $e^x$, $a^x$ | All real numbers |
| $\ln x$, $\log_a x$ | $x > 0$ |
| $\sqrt{x}$ | $x \geq 0$ |
| $\sqrt[n]{x}$ (odd $n$) | All real numbers |

---

## Building Continuous Functions

Continuous functions combine nicely. If $f$ and $g$ are both continuous at $c$, then so are:

- $f + g$ (sum)
- $f - g$ (difference)
- $f \cdot g$ (product)
- $\frac{f}{g}$ (quotient, if $g(c) \neq 0$)
- $k \cdot f$ (constant multiple)

### Continuity of Composite Functions

Here's a powerful result for nested functions:

!!! tip "Continuity of Composites"
    If $g$ is continuous at $c$ and $f$ is continuous at $g(c)$, then $f \circ g$ (that is, $f(g(x))$) is continuous at $c$.

**Example:** Is $h(x) = \sin(x^2 + 1)$ continuous?

- The inner function $g(x) = x^2 + 1$ is a polynomial, so it's continuous everywhere.
- The outer function $f(x) = \sin x$ is continuous everywhere.
- Therefore, $h(x) = f(g(x)) = \sin(x^2 + 1)$ is continuous everywhere.

---

## Piecewise Functions and Continuity

Piecewise functions require special attention at the boundaries between pieces.

### Checking Piecewise Continuity

For a piecewise function to be continuous at a boundary point $c$:

1. Both pieces must approach the same limit as $x \to c$
2. The function value $f(c)$ must equal that common limit

**Example:** Is $f(x) = \begin{cases} x^2 & \text{if } x < 2 \\ 3x - 2 & \text{if } x \geq 2 \end{cases}$ continuous at $x = 2$?

**Step 1:** Find the left-hand limit.
$$\lim_{x \to 2^-} x^2 = 4$$

**Step 2:** Find the right-hand limit.
$$\lim_{x \to 2^+} (3x - 2) = 6 - 2 = 4$$

**Step 3:** Check if they match: $4 = 4$ ✓

**Step 4:** Check the function value: $f(2) = 3(2) - 2 = 4$ ✓

All conditions are met! The function is **continuous at $x = 2$**.

#### Diagram: Piecewise Continuity Explorer

<iframe src="../../sims/piecewise-continuity/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Piecewise Continuity Explorer MicroSim</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Determine

Learning Objective: Students will determine whether piecewise functions are continuous at boundary points by checking all three conditions.

Visual elements:

- Graph of piecewise function with visible boundary point
- Two function pieces shown in different colors
- Boundary point highlighted with:
  - Left-hand limit value (blue dot approaching)
  - Right-hand limit value (orange dot approaching)
  - Actual function value (green dot)
- Checklist showing three conditions with results
- "Continuous" or "Discontinuous" verdict

Interactive controls:

- Two function input fields for left and right pieces
- Boundary point slider (where pieces meet)
- "Evaluate Continuity" button
- Preset examples dropdown:
  - Example 1: Continuous piecewise
  - Example 2: Jump discontinuity
  - Example 3: Removable discontinuity
  - Example 4: Challenge case

Behavior:

- Graphs update in real-time as functions are changed
- Animated approach to boundary from both sides
- Condition checklist animates through verification
- Final verdict displays with explanation

Instructional Rationale: Manipulating the pieces and seeing immediate visual/analytical feedback builds understanding of what makes piecewise functions continuous.

Implementation: p5.js with canvas-based controls
</details>

---

## Removing Discontinuities

Some discontinuities can be "fixed" by carefully defining the function at the problem point.

### Continuous Extension

When a function has a removable discontinuity at $c$, we can create a **continuous extension** by defining:

$$\tilde{f}(x) = \begin{cases} f(x) & \text{if } x \neq c \\ \lim_{x \to c} f(x) & \text{if } x = c \end{cases}$$

This "fills the hole" with the correct value.

**Example:** Create a continuous extension of $f(x) = \frac{x^2 - 9}{x - 3}$ at $x = 3$.

First, find the limit:
$$\lim_{x \to 3} \frac{x^2 - 9}{x - 3} = \lim_{x \to 3} \frac{(x+3)(x-3)}{x-3} = \lim_{x \to 3} (x + 3) = 6$$

The continuous extension is:
$$\tilde{f}(x) = \begin{cases} \frac{x^2 - 9}{x - 3} & \text{if } x \neq 3 \\ 6 & \text{if } x = 3 \end{cases}$$

Or equivalently, just $\tilde{f}(x) = x + 3$ for all $x$.

### Finding Values for Continuity

A common problem type: "Find the value of $k$ that makes the function continuous."

**Example:** For what value of $k$ is $f(x) = \begin{cases} x^2 + k & \text{if } x < 1 \\ 3x & \text{if } x \geq 1 \end{cases}$ continuous?

For continuity at $x = 1$, we need:
$$\lim_{x \to 1^-} (x^2 + k) = \lim_{x \to 1^+} 3x$$

$$1 + k = 3$$

$$k = 2$$

---

## The Intermediate Value Theorem

Now we arrive at one of the most powerful and beautiful results about continuous functions.

### Statement of the IVT

!!! tip "Intermediate Value Theorem (IVT)"
    If $f$ is continuous on $[a, b]$ and $N$ is any number between $f(a)$ and $f(b)$, then there exists at least one $c$ in $(a, b)$ such that $f(c) = N$.

In plain English: a continuous function hits every value between its starting and ending heights.

!!! quote "Delta Moment"
    "If I start at one altitude and end at another without teleporting, I have to pass through every altitude in between. No skipping! That's the IVT."

#### Diagram: Intermediate Value Theorem Visualization

<iframe src="../../sims/ivt-visualization/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Intermediate Value Theorem Visualization MicroSim</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will explain how the Intermediate Value Theorem guarantees the existence of roots for continuous functions.

Visual elements:

- Graph of continuous function on interval [a, b]
- Horizontal line at y = N (the target value)
- Points marked at (a, f(a)) and (b, f(b))
- Intersection point(s) highlighted where f(c) = N
- Delta robot traveling along the curve from a to b
- "Altitude tracker" showing current y-value as Delta travels

Interactive controls:

- Function selector (several continuous functions)
- Sliders for endpoints a and b
- Slider for target value N (constrained between f(a) and f(b))
- Button: "Animate Delta's journey"
- Toggle: "Show all solutions" (for multiple intersections)

Behavior:

- As N slider moves, horizontal line adjusts
- Intersection point(s) update in real-time
- Animation shows Delta traveling and crossing the N-line
- Highlights when Delta reaches altitude N
- If N is outside [f(a), f(b)], displays "N not in range—IVT doesn't apply"

Data Visibility Requirements:

- Stage 1: Show f(a) and f(b) values
- Stage 2: Show target value N between them
- Stage 3: Animate crossing, highlight c where f(c) = N
- Final: Display the guaranteed point (c, N)

Instructional Rationale: Watching Delta travel and necessarily cross every intermediate height makes the theorem intuitive.

Implementation: p5.js with canvas-based controls
</details>

### Using the IVT to Find Roots

The most common application of the IVT: proving that an equation has a solution.

**Example:** Show that $x^3 + x - 1 = 0$ has a solution in $[0, 1]$.

Let $f(x) = x^3 + x - 1$.

**Step 1:** Check that $f$ is continuous on $[0, 1]$.

Yes—it's a polynomial, so it's continuous everywhere.

**Step 2:** Calculate $f(0)$ and $f(1)$.

- $f(0) = 0 + 0 - 1 = -1$
- $f(1) = 1 + 1 - 1 = 1$

**Step 3:** Note that $0$ is between $-1$ and $1$.

**Step 4:** Apply the IVT.

Since $f$ is continuous on $[0, 1]$, $f(0) = -1 < 0$, and $f(1) = 1 > 0$, the IVT guarantees there exists some $c \in (0, 1)$ where $f(c) = 0$.

Therefore, $x^3 + x - 1 = 0$ has at least one solution in $(0, 1)$.

!!! warning "What the IVT Doesn't Tell You"
    The IVT proves existence but not uniqueness. It tells you there's at least one solution, but there could be more. It also doesn't tell you what the solution actually is—just that it exists.

### The IVT and Sign Changes

A useful corollary: if a continuous function changes sign on an interval, it must have a root (zero) in that interval.

This is the basis for the **bisection method** for finding roots numerically:

1. Start with an interval $[a, b]$ where $f(a)$ and $f(b)$ have opposite signs.
2. Check the midpoint $m = \frac{a+b}{2}$.
3. If $f(m) = 0$, you've found the root. Otherwise, the root is in whichever half has the sign change.
4. Repeat with the smaller interval.

Each step cuts the interval in half, so you can get arbitrarily close to the root.

---

## Summary: Continuity Checklist

When analyzing continuity, work through this checklist:

**At a single point $c$:**

1. Is $f(c)$ defined?
2. Does $\lim_{x \to c} f(x)$ exist?
3. Does $\lim_{x \to c} f(x) = f(c)$?

**For piecewise functions at boundaries:**

1. Calculate left-hand and right-hand limits
2. Check if they're equal
3. Check if the function value matches

**For applying the IVT:**

1. Verify the function is continuous on $[a, b]$
2. Compute $f(a)$ and $f(b)$
3. Identify the target value $N$ between them
4. Conclude that some $c$ exists with $f(c) = N$

---

## Key Takeaways

1. **Continuity at a point** requires three conditions: $f(c)$ defined, limit exists, and limit equals $f(c)$.

2. **Types of discontinuities:**
   - Removable: limit exists but doesn't match $f(c)$
   - Jump: left and right limits differ
   - Infinite: function blows up (vertical asymptote)
   - Essential: limit doesn't exist due to oscillation

3. **Most familiar functions are continuous** on their natural domains: polynomials, trig functions, exponentials, logs.

4. **Continuous functions combine nicely:** sums, products, quotients (where defined), and compositions of continuous functions are continuous.

5. **The IVT** guarantees that continuous functions hit all intermediate values—crucial for proving roots exist.

!!! quote "Delta's Pun Corner"
    "I used to find continuity *gaps* in my understanding. But now that I've *filled in* all the holes, I feel like I can go on *forever* without interruption!"

---

## Looking Ahead

You now understand what it means for a function to be continuous and how to prove roots exist. In Chapter 5, we'll explore what happens when functions *aren't* well-behaved—specifically, the world of **asymptotes** and **end behavior**. What happens when $x$ or $f(x)$ goes to infinity?

??? question "Check Your Understanding"
    1. State the three conditions for continuity at a point $c$.
    2. A function has $\lim_{x \to 3^-} f(x) = 5$ and $\lim_{x \to 3^+} f(x) = 5$, but $f(3) = 7$. Is $f$ continuous at 3? What type of discontinuity is this?
    3. Use the IVT to show that $\cos x = x$ has a solution in $[0, 1]$.

??? note "Answers"
    1. The three conditions are: (1) $f(c)$ is defined, (2) $\lim_{x \to c} f(x)$ exists, and (3) $\lim_{x \to c} f(x) = f(c)$.

    2. No, $f$ is not continuous at 3 because $\lim_{x \to 3} f(x) = 5 \neq 7 = f(3)$. This is a **removable discontinuity** because the limit exists; the function value just doesn't match.

    3. Let $g(x) = \cos x - x$. This is continuous (difference of continuous functions). We have $g(0) = \cos(0) - 0 = 1 > 0$ and $g(1) = \cos(1) - 1 \approx 0.54 - 1 = -0.46 < 0$. Since $g$ is continuous and $g(0) > 0 > g(1)$, by the IVT there exists $c \in (0, 1)$ with $g(c) = 0$, meaning $\cos c = c$.
