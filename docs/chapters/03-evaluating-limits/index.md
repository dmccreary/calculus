---
title: Evaluating Limits
description: Techniques for evaluating limits including algebraic manipulation, the Squeeze Theorem, and special trigonometric limits
generated_by: claude skill chapter-content-generator
date: 2026-02-03 14:35:00
version: 0.03
---

# Evaluating Limits

## Summary

This chapter develops techniques for evaluating limits that cannot be solved by direct substitution. Students will learn to recognize and handle indeterminate forms, apply algebraic manipulation techniques such as factoring and rationalization, and use the powerful Squeeze Theorem. Special attention is given to important trigonometric limits. After completing this chapter, students will have a comprehensive toolkit for evaluating limits algebraically, graphically, and numerically.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Indeterminate Form
2. Zero Over Zero Form
3. Infinity Over Infinity
4. Algebraic Limit Technique
5. Factoring for Limits
6. Rationalization
7. Complex Fractions
8. Squeeze Theorem
9. Special Trig Limits
10. Sin x Over x Limit
11. Limit of Composition
12. Limits from Graphs
13. Limits from Tables
14. Numerical Estimation
15. Infinite Limit

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Calculus](../01-foundations-of-calculus/index.md)
- [Chapter 2: Understanding Limits](../02-understanding-limits/index.md)

---

## When Direct Substitution Fails

In Chapter 2, you learned that direct substitution works beautifully for many limits. But sometimes when you plug in the value, you get something weird—like $\frac{0}{0}$. What then?

!!! quote "Delta Moment"
    "I tried to substitute directly and got $\frac{0}{0}$. My circuits are confused! But wait—this doesn't mean the limit doesn't exist. It means I need to dig deeper."

These confusing results are called **indeterminate forms**, and they're actually a signal that something interesting is happening. The limit might exist, but we need smarter techniques to find it.

---

## Indeterminate Forms

### The Zero Over Zero Form

The most common indeterminate form is $\frac{0}{0}$. When direct substitution gives you this, it means both the numerator and denominator are approaching zero simultaneously. The limit could be any real number, infinity, or not exist at all—you can't tell just by looking.

Consider these three limits, all of which give $\frac{0}{0}$ when you try direct substitution:

| Limit | Direct Substitution | Actual Value |
|-------|---------------------|--------------|
| $\lim_{x \to 0} \frac{x}{x}$ | $\frac{0}{0}$ | 1 |
| $\lim_{x \to 0} \frac{x^2}{x}$ | $\frac{0}{0}$ | 0 |
| $\lim_{x \to 0} \frac{x}{x^2}$ | $\frac{0}{0}$ | Does not exist |

Same indeterminate form, three completely different answers! That's why $\frac{0}{0}$ is called "indeterminate"—it doesn't determine the answer by itself.

### Other Indeterminate Forms

You'll encounter more indeterminate forms in calculus:

- $\frac{\infty}{\infty}$ — both numerator and denominator grow without bound
- $0 \cdot \infty$ — zero times infinity
- $\infty - \infty$ — infinity minus infinity
- $0^0$, $1^\infty$, $\infty^0$ — exponential indeterminate forms

For now, we'll focus on $\frac{0}{0}$. You'll learn L'Hôpital's Rule in Chapter 15 to handle these systematically.

---

## Algebraic Techniques for Limits

When you encounter $\frac{0}{0}$, the strategy is to rewrite the expression algebraically so that the problematic factor cancels out. Here are the main techniques.

### Factoring for Limits

If both numerator and denominator equal zero at $x = c$, then $(x - c)$ is a factor of both. Factor it out and cancel!

**Example:** Find $\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$

**Step 1:** Check direct substitution.
$$\frac{3^2 - 9}{3 - 3} = \frac{0}{0} \quad \text{✗ Indeterminate}$$

**Step 2:** Factor the numerator.
$$x^2 - 9 = (x + 3)(x - 3)$$

**Step 3:** Cancel the common factor.
$$\frac{x^2 - 9}{x - 3} = \frac{(x + 3)(x - 3)}{x - 3} = x + 3 \quad \text{for } x \neq 3$$

**Step 4:** Now direct substitution works!
$$\lim_{x \to 3} (x + 3) = 6$$

!!! warning "Important"
    We can cancel $(x - 3)$ because we're finding a *limit* as $x$ approaches 3, not the value at 3. In the limit, $x$ is never exactly 3, so we're never dividing by zero.

#### Diagram: Factoring Technique Visualization

<iframe src="../../sims/factoring-limits/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Factoring Technique Visualization MicroSim</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will explain how factoring and canceling reveals the limit value by removing the apparent discontinuity.

Visual elements:

- Split view: Original function $f(x) = \frac{x^2 - 9}{x - 3}$ on left, simplified $g(x) = x + 3$ on right
- Both graphs shown on same coordinate system
- Open circle (hole) at $(3, 6)$ on original function
- Solid point at $(3, 6)$ on simplified function
- Animated point approaching $x = 3$ from both sides
- Step-by-step algebra display showing factoring process

Interactive controls:

- Slider: x-value approaching 3 (range: 0 to 6)
- Toggle: "Show original function" / "Show simplified function" / "Show both"
- Button: "Animate approach"
- Button: "Show algebra steps"

Behavior:

- When showing original, hole is visible at x = 3
- When showing simplified, the function is complete
- Overlaying both shows they're identical except at x = 3
- Algebra steps animate with highlighting

Data Visibility Requirements:

- Stage 1: Show original function with visible hole
- Stage 2: Display factored form: $(x+3)(x-3)/(x-3)$
- Stage 3: Show cancellation: $(x+3)$ remains
- Stage 4: Highlight that limit = 6

Instructional Rationale: Seeing the original and simplified functions overlaid demonstrates that factoring doesn't change the limit—it just makes the value visible.

Implementation: p5.js with canvas-based controls
</details>

### Rationalization

When the expression contains square roots, **rationalization** often helps. Multiply by the conjugate over itself.

**Example:** Find $\lim_{x \to 0} \frac{\sqrt{x + 4} - 2}{x}$

**Step 1:** Direct substitution gives $\frac{\sqrt{4} - 2}{0} = \frac{0}{0}$. ✗

**Step 2:** Identify the conjugate of $\sqrt{x + 4} - 2$, which is $\sqrt{x + 4} + 2$.

**Step 3:** Multiply by $\frac{\sqrt{x + 4} + 2}{\sqrt{x + 4} + 2}$:

$$\frac{\sqrt{x + 4} - 2}{x} \cdot \frac{\sqrt{x + 4} + 2}{\sqrt{x + 4} + 2} = \frac{(x + 4) - 4}{x(\sqrt{x + 4} + 2)} = \frac{x}{x(\sqrt{x + 4} + 2)}$$

**Step 4:** Cancel $x$:
$$= \frac{1}{\sqrt{x + 4} + 2}$$

**Step 5:** Now substitute $x = 0$:
$$\lim_{x \to 0} \frac{1}{\sqrt{x + 4} + 2} = \frac{1}{\sqrt{4} + 2} = \frac{1}{4}$$

!!! tip "Conjugate Refresher"
    The conjugate of $\sqrt{a} + b$ is $\sqrt{a} - b$. Multiplying them gives $a - b^2$ (no square root!). This is called a "difference of squares."

### Complex Fractions

When you have fractions within fractions, multiply numerator and denominator by the common denominator of all the mini-fractions.

**Example:** Find $\lim_{x \to 2} \frac{\frac{1}{x} - \frac{1}{2}}{x - 2}$

**Step 1:** Direct substitution gives $\frac{\frac{1}{2} - \frac{1}{2}}{0} = \frac{0}{0}$. ✗

**Step 2:** Multiply top and bottom by the LCD of the inner fractions, which is $2x$:

$$\frac{\frac{1}{x} - \frac{1}{2}}{x - 2} \cdot \frac{2x}{2x} = \frac{2 - x}{2x(x - 2)}$$

**Step 3:** Notice that $2 - x = -(x - 2)$:
$$= \frac{-(x - 2)}{2x(x - 2)} = \frac{-1}{2x}$$

**Step 4:** Now substitute:
$$\lim_{x \to 2} \frac{-1}{2x} = \frac{-1}{4}$$

---

## The Squeeze Theorem

Sometimes algebraic manipulation isn't enough. That's when we bring in one of calculus's most elegant tools: the **Squeeze Theorem** (also called the Sandwich Theorem or Pinching Theorem).

### Statement of the Squeeze Theorem

!!! tip "The Squeeze Theorem"
    If $g(x) \leq f(x) \leq h(x)$ for all $x$ near $c$ (except possibly at $c$ itself), and:

    $$\lim_{x \to c} g(x) = \lim_{x \to c} h(x) = L$$

    Then:

    $$\lim_{x \to c} f(x) = L$$

In other words, if a function is trapped between two other functions that both approach the same limit, then the middle function must approach that limit too.

!!! quote "Delta Moment"
    "Imagine I'm walking through a narrow canyon. The walls on my left and right are both heading toward the same point. Where am I going to end up? The same place they are! I'm squeezed into it."

#### Diagram: Squeeze Theorem Visualization

<iframe src="../../sims/squeeze-theorem/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Squeeze Theorem Visualization MicroSim</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Illustrate

Learning Objective: Students will illustrate how the Squeeze Theorem forces a function to a specific limit value.

Visual elements:

- Coordinate plane with three functions plotted:
  - Lower bound $g(x)$ in blue
  - Middle function $f(x)$ in green (the one we're finding the limit of)
  - Upper bound $h(x)$ in red
- Shaded region between $g(x)$ and $h(x)$ showing the "squeeze zone"
- Dashed vertical line at target x-value
- Delta character trapped between the bounds
- Limit value highlighted where all three converge

Interactive controls:

- Example selector with 3 preset squeeze scenarios:
  - Example 1: $x^2 \sin(1/x)$ squeezed by $\pm x^2$
  - Example 2: Custom oscillating function
  - Example 3: Trigonometric squeeze
- Slider: x-value approaching target
- Toggle: "Show bounds" / "Hide bounds"
- Button: "Animate squeeze"

Behavior:

- As x approaches target, the shaded region narrows
- All three functions visibly converge to the same point
- Delta gets "squeezed" tighter and tighter
- Final limit value displayed when sufficiently close

Data Visibility Requirements:

- Stage 1: Show wide squeeze zone with x far from target
- Stage 2: Show narrowing zone as x approaches
- Stage 3: Show functions nearly touching at limit point
- Final: Display the squeeze forces f(x) to limit L

Instructional Rationale: Animating the narrowing squeeze zone makes the theorem's logic viscerally clear—there's nowhere else for the middle function to go.

Implementation: p5.js with canvas-based controls
</details>

### Classic Application: $\lim_{x \to 0} x^2 \sin\left(\frac{1}{x}\right)$

This limit seems impossible at first. The $\sin(1/x)$ term oscillates wildly as $x \to 0$. But watch what happens when we apply the Squeeze Theorem.

We know that $-1 \leq \sin\left(\frac{1}{x}\right) \leq 1$ for all $x \neq 0$.

Multiply all parts by $x^2$ (which is positive, so inequalities don't flip):
$$-x^2 \leq x^2 \sin\left(\frac{1}{x}\right) \leq x^2$$

Now take limits as $x \to 0$:

- $\lim_{x \to 0} (-x^2) = 0$
- $\lim_{x \to 0} x^2 = 0$

By the Squeeze Theorem:
$$\lim_{x \to 0} x^2 \sin\left(\frac{1}{x}\right) = 0$$

The oscillations don't matter—they're being squeezed to zero!

---

## Special Trigonometric Limits

Two limits involving trigonometric functions appear so often that they deserve special attention. You'll use these constantly in calculus.

### The Fundamental Trig Limit: $\lim_{x \to 0} \frac{\sin x}{x} = 1$

This is arguably the most important limit in calculus. It's the foundation for differentiating sine and cosine.

!!! tip "The Fundamental Trig Limit"
    $$\lim_{x \to 0} \frac{\sin x}{x} = 1$$

    (where $x$ is in **radians**)

**Why is this true?** The geometric proof uses a clever squeeze argument comparing the areas of triangles and sectors, but the intuition is simpler: for very small angles, $\sin x \approx x$. As $x$ gets tiny, the ratio approaches 1.

| $x$ (radians) | $\sin x$ | $\frac{\sin x}{x}$ |
|---------------|----------|-------------------|
| 0.5 | 0.4794 | 0.9589 |
| 0.1 | 0.0998 | 0.9983 |
| 0.01 | 0.00999983 | 0.99998 |
| 0.001 | 0.0009999998 | 0.999999 |

The pattern is clear: as $x \to 0$, the ratio $\to 1$.

#### Diagram: Sin x Over x Visualization

<iframe src="../../sims/sinx-over-x/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Sin x Over x Visualization MicroSim</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will explain why $\lim_{x \to 0} \frac{\sin x}{x} = 1$ using both geometric and numerical evidence.

Visual elements:

- Unit circle on left side
- Graph of $y = \frac{\sin x}{x}$ on right side
- On unit circle: arc of length x, vertical line showing sin(x)
- Visual comparison: arc length vs. vertical height
- Numerical readout showing x, sin(x), and sin(x)/x
- Hole at x = 0 with limit value 1 highlighted

Interactive controls:

- Slider: x-value (from -2 to 2, excluding 0)
- Toggle: "Show unit circle" / "Show graph" / "Show both"
- Button: "Zoom in to x = 0"
- Table toggle: "Show numerical values"

Behavior:

- As x approaches 0, unit circle zooms in to show arc ≈ vertical
- Graph shows smooth approach to y = 1
- Numerical display shows ratio approaching 1
- Zoom feature magnifies behavior near origin

Data Visibility Requirements:

- Stage 1: x = 1, show significant difference between arc and sin
- Stage 2: x = 0.5, show closer values
- Stage 3: x = 0.1, show very close values
- Final: x = 0.01, demonstrate ratio ≈ 1

Instructional Rationale: The dual visualization (geometric and graphical) gives two ways to understand why the limit equals 1.

Implementation: p5.js with canvas-based controls
</details>

### Using the Fundamental Trig Limit

This limit is your key to evaluating many trigonometric limits.

**Example 1:** Find $\lim_{x \to 0} \frac{\sin(3x)}{x}$

**Strategy:** We need $\frac{\sin(\text{something})}{\text{same thing}}$. Multiply and divide by 3:

$$\lim_{x \to 0} \frac{\sin(3x)}{x} = \lim_{x \to 0} \frac{\sin(3x)}{x} \cdot \frac{3}{3} = \lim_{x \to 0} 3 \cdot \frac{\sin(3x)}{3x}$$

Let $u = 3x$. As $x \to 0$, we have $u \to 0$:

$$= 3 \cdot \lim_{u \to 0} \frac{\sin u}{u} = 3 \cdot 1 = 3$$

**Example 2:** Find $\lim_{x \to 0} \frac{\sin(5x)}{\sin(2x)}$

Rewrite as a product:
$$\frac{\sin(5x)}{\sin(2x)} = \frac{\sin(5x)}{5x} \cdot \frac{5x}{2x} \cdot \frac{2x}{\sin(2x)}$$

$$= \frac{\sin(5x)}{5x} \cdot \frac{5}{2} \cdot \frac{2x}{\sin(2x)}$$

Taking the limit as $x \to 0$:
$$= 1 \cdot \frac{5}{2} \cdot 1 = \frac{5}{2}$$

### A Related Trig Limit: $\lim_{x \to 0} \frac{1 - \cos x}{x} = 0$

This limit follows from the fundamental one:

$$\lim_{x \to 0} \frac{1 - \cos x}{x} = 0$$

The proof uses the identity $1 - \cos x = 2\sin^2(x/2)$ and algebraic manipulation.

---

## Limits from Graphs and Tables

Not every limit requires algebraic computation. Often you can estimate limits directly from graphs or numerical tables.

### Reading Limits from Graphs

When you have a graph of $f(x)$, finding $\lim_{x \to c} f(x)$ means asking: "What y-value is the function approaching as I move along the x-axis toward $c$?"

Key points for reading limits graphically:

- Look at where the curve is *heading*, not where the point is (if there's even a point there)
- Check both sides—if they disagree, the two-sided limit doesn't exist
- Open circles indicate holes (removable discontinuities)
- Vertical asymptotes indicate infinite limits

#### Diagram: Limits from Graphs Practice

<iframe src="../../sims/limits-from-graphs/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Limits from Graphs Practice MicroSim</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Determine

Learning Objective: Students will determine limit values from graphical representations by analyzing function behavior near target points.

Visual elements:

- Graph display area with coordinate grid
- Various function graphs with discontinuities, holes, and asymptotes
- Traceable point that follows the curve
- Y-value readout as x approaches target
- Display for user's answer
- Feedback indicator (correct/incorrect)

Interactive controls:

- "New Graph" button generates different limit scenarios
- Difficulty selector: "Basic" (continuous), "Intermediate" (holes), "Challenge" (jumps, asymptotes)
- X-value slider to trace along the curve
- Input fields for: Left limit, Right limit, Two-sided limit
- "Check Answer" button
- "Show Solution" button

Graph types included:

- Continuous functions (limit = function value)
- Functions with removable discontinuities (limit ≠ function value)
- Piecewise functions with jump discontinuities (left ≠ right)
- Functions with vertical asymptotes (infinite limits)
- Oscillating functions near the target

Behavior:

- Slider moves point along curve
- Y-value updates in real-time
- Different colors indicate approach from left (blue) vs right (orange)
- Immediate feedback on submitted answers

Instructional Rationale: Active practice reading graphs builds the visual intuition that complements algebraic skills.

Implementation: p5.js with canvas-based controls and randomized graph generation
</details>

### Numerical Estimation from Tables

When you have function values but no formula, you can estimate limits numerically.

**Example:** Given this table, estimate $\lim_{x \to 2} f(x)$:

| $x$ | $f(x)$ |
|-----|--------|
| 1.9 | 4.61 |
| 1.99 | 4.9601 |
| 1.999 | 4.996001 |
| 2.001 | 5.004001 |
| 2.01 | 5.0401 |
| 2.1 | 5.41 |

From the left: $f(x) \to 5$ as $x \to 2^-$
From the right: $f(x) \to 5$ as $x \to 2^+$

Both sides agree, so $\lim_{x \to 2} f(x) = 5$.

!!! warning "Numerical Estimation Caveats"
    Tables can only suggest what the limit might be—they can't prove it. Always look for patterns, but be aware that functions can behave unexpectedly between the values you've computed.

---

## Limits of Composite Functions

When functions are nested inside each other, we can often evaluate limits by working from the inside out.

### The Composition Limit Law

!!! tip "Limit of Composition"
    If $\lim_{x \to c} g(x) = L$ and $f$ is continuous at $L$, then:

    $$\lim_{x \to c} f(g(x)) = f\left(\lim_{x \to c} g(x)\right) = f(L)$$

In other words, if the inner function approaches $L$ and the outer function is "nice" at $L$, you can bring the limit inside.

**Example:** Find $\lim_{x \to 0} \cos\left(\frac{\sin x}{x}\right)$

We know $\lim_{x \to 0} \frac{\sin x}{x} = 1$, and $\cos$ is continuous at 1.

Therefore:
$$\lim_{x \to 0} \cos\left(\frac{\sin x}{x}\right) = \cos(1) \approx 0.5403$$

---

## Infinite Limits (Preview)

When a function's values grow without bound as $x$ approaches some value, we say the limit is infinite.

**Example:** What is $\lim_{x \to 0} \frac{1}{x^2}$?

As $x$ gets close to 0, $x^2$ becomes very small and positive. Dividing 1 by a tiny positive number gives a huge positive number. We write:

$$\lim_{x \to 0} \frac{1}{x^2} = \infty$$

This doesn't mean the limit "equals infinity" (infinity isn't a number). It means the function grows without bound—there's no finite limit.

We'll explore infinite limits and their connection to asymptotes thoroughly in Chapter 5.

---

## Summary: Choosing a Technique

When you encounter a limit, here's your game plan:

1. **Try direct substitution first.** If it works, you're done!

2. **If you get $\frac{0}{0}$**, look for ways to simplify:
   - **Factor** if you have polynomials
   - **Rationalize** if you have square roots
   - **Simplify complex fractions** if you have fractions within fractions
   - **Use the Squeeze Theorem** if the function is bounded and oscillating

3. **For trigonometric limits**, try to use the fundamental limit $\lim_{x \to 0} \frac{\sin x}{x} = 1$.

4. **If you get $\frac{\text{nonzero}}{0}$**, the limit may be infinite—investigate one-sided behavior.

5. **When in doubt**, make a table of values or sketch a graph to estimate.

| If Direct Substitution Gives... | Try This Technique |
|--------------------------------|-------------------|
| A number | That's the limit! |
| $\frac{0}{0}$ | Factor, rationalize, or simplify |
| $\frac{\text{nonzero}}{0}$ | Investigate infinite limit |
| Trigonometric mess | Use special trig limits |
| Bounded oscillation | Squeeze Theorem |

!!! quote "Delta's Pun Corner"
    "These indeterminate forms really had me *up in the air* at first. But now I realize they're just *opportunities in disguise*. ...Okay, that one wasn't even a pun. I'll try harder."

---

## Key Takeaways

1. **Indeterminate forms** like $\frac{0}{0}$ don't tell you what the limit is—they signal that you need algebraic techniques.

2. **Factoring** eliminates common factors that cause the $\frac{0}{0}$ form.

3. **Rationalization** multiplies by the conjugate to eliminate troublesome square roots.

4. **Complex fractions** simplify when you multiply by the LCD.

5. **The Squeeze Theorem** pins down limits of functions trapped between two others.

6. **The fundamental trig limit** $\lim_{x \to 0} \frac{\sin x}{x} = 1$ is essential for calculus.

7. **Limits can be estimated** from graphs and tables when algebraic methods aren't available.

---

## Looking Ahead

You now have a solid toolkit for evaluating limits. In Chapter 4, we'll use these skills to study **continuity**—what it means for a function to have no gaps, jumps, or breaks. Continuity connects limits to function values and unlocks powerful theorems like the Intermediate Value Theorem.

??? question "Check Your Understanding"
    1. What does the indeterminate form $\frac{0}{0}$ tell you about a limit?
    2. Find $\lim_{x \to 4} \frac{x^2 - 16}{x - 4}$ using factoring.
    3. Why is $\lim_{x \to 0} \frac{\sin x}{x} = 1$ only true when $x$ is measured in radians?

??? note "Answers"
    1. The form $\frac{0}{0}$ tells you that both numerator and denominator approach zero, but it doesn't tell you what the limit is. The limit could be any real number, infinity, or might not exist. You need to use algebraic techniques to find out.

    2. Factor: $\frac{x^2 - 16}{x - 4} = \frac{(x+4)(x-4)}{x-4} = x + 4$ for $x \neq 4$. So $\lim_{x \to 4} \frac{x^2 - 16}{x - 4} = 4 + 4 = 8$.

    3. The limit $\lim_{x \to 0} \frac{\sin x}{x} = 1$ relies on the relationship between arc length and the sine function on the unit circle. This geometric relationship only works when angles are measured in radians. In degrees, the limit would be $\frac{\pi}{180}$.

[See Annotated References](./references.md)
