---
title: Differentiability
description: Exploring when functions are differentiable and the relationship to continuity
generated_by: claude skill chapter-content-generator
date: 2026-02-03 10:45:00
version: 0.03
---

# Differentiability

## Summary

This chapter explores when and where functions are differentiable. Students will learn the conditions for differentiability at a point, understand why corners, cusps, and vertical tangents prevent differentiability, and discover the important relationship between differentiability and continuity. The chapter also covers techniques for estimating derivatives from graphs and tables. After completing this chapter, students will be able to determine where functions are differentiable and use local linearity for approximation.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Differentiability
2. Differentiability Point
3. One-Sided Derivative
4. Non-Differentiable Pts
5. Corner Point
6. Cusp
7. Vertical Tangent Point
8. Derivative from Graph
9. Derivative from Table
10. Symmetric Difference
11. Diff Implies Continuous
12. Continuous Not Implies
13. Local Linearity
14. Tangent Approximation
15. Instantaneous Velocity

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Continuity](../04-continuity/index.md)
- [Chapter 6: The Derivative Concept](../06-derivative-concept/index.md)

---

## Introduction: Where Calculus Breaks Down

In the previous chapter, we defined the derivative and saw how it captures instantaneous rate of change. But here's a crucial question: Does every function have a derivative at every point?

The answer is no. Some functions have points where the derivative simply doesn't exist—places where the curve is "too rough" or "too steep" for a tangent line to make sense. Understanding where and why differentiability fails is just as important as knowing how to find derivatives.

!!! quote "Delta Moment"
    "I was rolling along happily, and then BAM—a sharp corner! I couldn't decide which way to tilt. That's when I learned: not every point on a curve has a well-defined slope."

This chapter explores the conditions for differentiability, the types of non-differentiable points, and the profound relationship between differentiability and continuity.

## What Does Differentiability Mean?

Recall that the derivative at $x = a$ is defined by the limit:

$$f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}$$

A function is **differentiable at a point** $x = a$ if this limit exists and is a finite number. A function is **differentiable on an interval** if it's differentiable at every point in that interval.

When we say the limit "exists," we mean:

- The limit from the left equals the limit from the right
- The common value is a real number (not infinite)

If either condition fails, the function is not differentiable at that point.

## One-Sided Derivatives

Just as we can consider one-sided limits, we can consider **one-sided derivatives**. These measure the slope as we approach a point from just one direction.

The **left-hand derivative** at $x = a$ is:

$$f'_-(a) = \lim_{h \to 0^-} \frac{f(a + h) - f(a)}{h}$$

The **right-hand derivative** at $x = a$ is:

$$f'_+(a) = \lim_{h \to 0^+} \frac{f(a + h) - f(a)}{h}$$

For a function to be differentiable at $x = a$, both one-sided derivatives must exist and be equal:

$$f'_-(a) = f'_+(a)$$

If they're different, the function has different "slopes" on each side of the point, which means there's no single tangent line.

#### Diagram: One-Sided Derivatives Visualizer

<iframe src="../../sims/one-sided-derivatives/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>One-Sided Derivatives Visualizer MicroSim</summary>
Type: microsim

Purpose: Show how left and right secant lines approach a point, demonstrating when they give different or equal limits.

Learning Objective: Students will analyze one-sided derivatives to determine differentiability (Bloom Level 4: Analyze)

Bloom Taxonomy Verb: analyze, compare, distinguish

Visual elements:

- Coordinate plane with a piecewise function (smooth or with a corner)
- Point of interest at $x = a$ marked clearly
- Left secant line (blue) approaching from left
- Right secant line (red) approaching from right
- Display of left-hand slope and right-hand slope values
- Indicator showing whether derivatives match

Interactive controls:

- Slider: Control how close the secant points are to $a$ (value of $|h|$)
- Toggle: Switch between a smooth function and a function with a corner
- Dropdown: Select different test functions
- Display: Left derivative, right derivative, match status

Data Visibility Requirements:

- Stage 1: Show both secant lines with h = 1
- Stage 2: As h decreases, show slopes converging (or not)
- Stage 3: Display final left and right derivatives
- Stage 4: Show "Differentiable" or "Not Differentiable" based on equality

Behavior:

- For smooth function: both secant lines approach same tangent
- For corner: secant lines approach different slopes
- Clear visual difference between the two cases

Instructional Rationale: Direct visualization of one-sided limits approaching (or not) builds intuition for why corners cause non-differentiability. The side-by-side comparison makes the condition concrete.

Implementation: p5.js with function selection and animated sliders
</details>

## Types of Non-Differentiable Points

There are three main types of points where a function fails to be differentiable:

### Corner Points

A **corner point** occurs where the graph makes a sharp turn. The function is continuous, but the left and right derivatives are different finite values.

The classic example is the absolute value function at $x = 0$:

$$f(x) = |x|$$

At $x = 0$:

- Left-hand derivative: $\lim_{h \to 0^-} \frac{|h| - 0}{h} = \lim_{h \to 0^-} \frac{-h}{h} = -1$
- Right-hand derivative: $\lim_{h \to 0^+} \frac{|h| - 0}{h} = \lim_{h \to 0^+} \frac{h}{h} = 1$

Since $-1 \neq 1$, the function is not differentiable at $x = 0$.

!!! quote "Delta Moment"
    "At a corner, I have to make a choice: tilt left or tilt right? But there's no single direction that matches both sides. I'm stuck!"

### Cusps

A **cusp** is a sharper kind of corner where both one-sided derivatives are infinite but with opposite signs. The graph comes to a sharp point.

Example: $f(x) = x^{2/3}$ at $x = 0$

At a cusp:

- One-sided derivatives are $+\infty$ and $-\infty$
- The curve approaches vertical from both sides but in opposite directions

Cusps are "infinitely sharp" corners—they make regular corners look mild by comparison.

### Vertical Tangent Points

A **vertical tangent** occurs when the tangent line exists but is vertical—meaning the slope is infinite. Both one-sided derivatives go to the same infinity.

Example: $f(x) = \sqrt[3]{x} = x^{1/3}$ at $x = 0$

$$f'(0) = \lim_{h \to 0} \frac{h^{1/3} - 0}{h} = \lim_{h \to 0} \frac{1}{h^{2/3}} = +\infty$$

The function is continuous and has a tangent line—but since the tangent is vertical, the derivative (as a finite number) doesn't exist.

| Type | One-Sided Derivatives | Visual Feature |
|------|----------------------|----------------|
| Corner | Different finite values | Sharp angle |
| Cusp | $+\infty$ and $-\infty$ | Infinitely sharp point |
| Vertical Tangent | Both $+\infty$ or both $-\infty$ | Vertical tangent line |

#### Diagram: Gallery of Non-Differentiable Points

<iframe src="../../sims/non-differentiable-gallery/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Gallery of Non-Differentiable Points MicroSim</summary>
Type: microsim

Purpose: Interactive gallery showing the three types of non-differentiable points with visual examples and animations.

Learning Objective: Students will classify non-differentiable points by type (Bloom Level 4: Analyze)

Bloom Taxonomy Verb: classify, distinguish, compare

Visual elements:

- Three panels, one for each type: Corner, Cusp, Vertical Tangent
- Each panel shows:
  - Graph of example function
  - Animated secant lines from both sides
  - Labels with one-sided derivative values
  - Type name and characteristics

Functions displayed:

- Corner: $f(x) = |x|$ at $x = 0$
- Cusp: $f(x) = x^{2/3}$ at $x = 0$
- Vertical tangent: $f(x) = x^{1/3}$ at $x = 0$

Interactive controls:

- Tabs or buttons to switch between the three types
- Animation: Watch secant lines approach
- Zoom control to see detail near the point

Behavior:

- For each type, secant lines animate toward the point
- Display shows one-sided derivative values updating
- Final state shows why differentiability fails

Instructional Rationale: Side-by-side comparison of all three types helps students build a mental classification system. Seeing the actual secant line behavior makes the abstract definitions concrete.

Implementation: p5.js with three-panel layout
</details>

## Other Points of Non-Differentiability

Besides corners, cusps, and vertical tangents, functions also fail to be differentiable at:

**Discontinuities:** If a function isn't continuous at a point, it can't be differentiable there. The limit defining the derivative requires the function to be defined and continuous at the point.

**Endpoints:** For a function defined on a closed interval $[a, b]$, differentiability at the endpoints is special. We can only compute one-sided derivatives at $x = a$ and $x = b$.

## The Relationship: Differentiability and Continuity

One of the most important theorems in calculus establishes a one-way relationship between differentiability and continuity:

!!! tip "Key Theorem"
    **If $f$ is differentiable at $x = a$, then $f$ is continuous at $x = a$.**

    Equivalently: Differentiability implies continuity.

This makes intuitive sense. If a function has a well-defined tangent line at a point, the graph must be smooth there—no jumps, no holes, no breaks. The function must be continuous.

**Proof:** Suppose $f$ is differentiable at $x = a$. We need to show $\lim_{x \to a} f(x) = f(a)$.

Write: $f(x) - f(a) = \frac{f(x) - f(a)}{x - a} \cdot (x - a)$

Taking the limit as $x \to a$:

$$\lim_{x \to a} [f(x) - f(a)] = \lim_{x \to a} \frac{f(x) - f(a)}{x - a} \cdot \lim_{x \to a}(x - a) = f'(a) \cdot 0 = 0$$

Therefore $\lim_{x \to a} f(x) = f(a)$, so $f$ is continuous at $a$.

### The Converse is FALSE

Here's the crucial point: **Continuity does NOT imply differentiability.**

A function can be continuous at a point without being differentiable there. The absolute value function $f(x) = |x|$ is the classic counterexample:

- $f$ is continuous at $x = 0$ (the limit equals the function value)
- $f$ is NOT differentiable at $x = 0$ (the left and right derivatives differ)

This means continuity is *necessary* for differentiability but not *sufficient*.

| Statement | True or False |
|-----------|---------------|
| Differentiable at $a$ $\Rightarrow$ Continuous at $a$ | TRUE |
| Continuous at $a$ $\Rightarrow$ Differentiable at $a$ | FALSE |
| Not continuous at $a$ $\Rightarrow$ Not differentiable at $a$ | TRUE |
| Not differentiable at $a$ $\Rightarrow$ Not continuous at $a$ | FALSE |

!!! quote "Delta Moment"
    "Think of it this way: to be differentiable, I need to be on a smooth road with a clear direction. But even a bumpy road with corners is still a connected road—that's continuity. Differentiability is the stricter requirement."

#### Diagram: Differentiability vs. Continuity Venn Diagram

<iframe src="../../sims/diff-cont-relationship/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Differentiability vs. Continuity Relationship MicroSim</summary>
Type: infographic

Purpose: Visualize the set relationship between differentiable functions and continuous functions.

Learning Objective: Students will explain why differentiability implies continuity but not vice versa (Bloom Level 2: Understand)

Bloom Taxonomy Verb: explain, interpret, classify

Visual elements:

- Venn diagram showing: Set of differentiable functions is a subset of continuous functions
- Interactive examples that appear in correct region when clicked
- Labels: "Differentiable (smooth curves)", "Continuous but not differentiable (corners, cusps)", "Discontinuous (jumps, holes)"

Interactive elements:

- Click on function examples to see where they belong
- Hover over regions for descriptions
- Example functions:
  - $x^2$ → differentiable (inner region)
  - $|x|$ at $x=0$ → continuous not differentiable (outer ring)
  - Step function → discontinuous (outside both)

Behavior:

- Clicking an example highlights its region
- Mini-graph of function appears
- Explanation text describes why it belongs there

Instructional Rationale: The visual subset relationship makes the logical implication concrete. Interactive examples reinforce categorization skills.

Implementation: p5.js or SVG with clickable regions
</details>

## Estimating Derivatives from Graphs

In real-world applications, you often need to estimate derivatives from graphs rather than formulas. Here's how:

### Reading the Slope

At any point on a curve:

1. Visualize the tangent line at that point
2. Estimate the rise and run over a small interval
3. Calculate $\text{slope} = \frac{\text{rise}}{\text{run}}$

**Signs of the derivative:**

- If the tangent line slopes upward (left to right), $f'(x) > 0$
- If the tangent line slopes downward, $f'(x) < 0$
- If the tangent line is horizontal, $f'(x) = 0$

**Magnitude of the derivative:**

- Steeper tangent = larger $|f'(x)|$
- Flatter tangent = smaller $|f'(x)|$

#### Diagram: Derivative from Graph Estimator

<iframe src="../../sims/derivative-from-graph/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Derivative from Graph Estimator MicroSim</summary>
Type: microsim

Purpose: Practice estimating derivatives by drawing tangent lines on a curve and computing their slopes.

Learning Objective: Students will estimate derivatives graphically by visualizing tangent lines (Bloom Level 3: Apply)

Bloom Taxonomy Verb: estimate, calculate, demonstrate

Visual elements:

- Coordinate plane with a curve (function hidden from user)
- Point marker that user can move along the curve
- Drawing tool: User drags to create tangent line
- Display: User's estimated slope, actual slope, percent error

Interactive controls:

- Draggable point along the curve
- Click and drag to draw tangent line through the point
- "Check Answer" button to reveal actual derivative
- "New Function" button for different curves
- Difficulty: Easy (parabola), Medium (cubic), Hard (trig)

Behavior:

- User positions point, draws estimated tangent
- System calculates slope of user's line
- On check: shows actual tangent and derivative value
- Feedback on accuracy

Instructional Rationale: Active estimation builds graphical intuition. Immediate feedback helps calibrate visual estimates. Multiple functions provide varied practice.

Implementation: p5.js with line-drawing interaction
</details>

## Estimating Derivatives from Tables

When you have data in a table instead of a formula, you can estimate derivatives using **difference quotients**.

### Basic Estimate

For data points $(x_0, y_0)$ and $(x_1, y_1)$:

$$f'(x_0) \approx \frac{y_1 - y_0}{x_1 - x_0}$$

This uses the next point to estimate the derivative—essentially using a secant line slope.

### Symmetric Difference Quotient

A better estimate uses points on *both* sides of the target:

$$f'(x) \approx \frac{f(x + h) - f(x - h)}{2h}$$

This **symmetric difference quotient** typically gives a more accurate estimate because it averages the forward and backward slopes.

**Example:** Estimate $f'(2)$ from this table:

| $x$ | 1 | 2 | 3 |
|-----|---|---|---|
| $f(x)$ | 3 | 5 | 11 |

Using symmetric difference:

$$f'(2) \approx \frac{f(3) - f(1)}{3 - 1} = \frac{11 - 3}{2} = 4$$

Compare to one-sided estimates:

- Forward: $\frac{f(3) - f(2)}{1} = \frac{11 - 5}{1} = 6$
- Backward: $\frac{f(2) - f(1)}{1} = \frac{5 - 3}{1} = 2$

The symmetric estimate (4) is the average of the forward (6) and backward (2) estimates.

| Method | Formula | Use When |
|--------|---------|----------|
| Forward difference | $\frac{f(x+h) - f(x)}{h}$ | Only future data available |
| Backward difference | $\frac{f(x) - f(x-h)}{h}$ | Only past data available |
| Symmetric difference | $\frac{f(x+h) - f(x-h)}{2h}$ | Data on both sides (most accurate) |

## Local Linearity and Tangent Approximation

Here's a powerful idea: If you zoom in far enough on a differentiable function at a point, it looks almost like a straight line. This property is called **local linearity**.

The tangent line is the linear function that best approximates $f$ near the point of tangency. We can use this for approximation:

$$f(x) \approx f(a) + f'(a)(x - a)$$

This is called the **tangent line approximation** or **linear approximation**.

**Example:** Approximate $\sqrt{4.1}$ using the tangent line to $f(x) = \sqrt{x}$ at $x = 4$.

- $f(4) = 2$
- $f'(x) = \frac{1}{2\sqrt{x}}$, so $f'(4) = \frac{1}{4}$

Linear approximation:

$$\sqrt{4.1} \approx f(4) + f'(4)(4.1 - 4) = 2 + \frac{1}{4}(0.1) = 2.025$$

The actual value is $\sqrt{4.1} \approx 2.0248...$, so our estimate is quite good!

!!! tip "When Linear Approximation Works Best"
    Linear approximation is most accurate when:

    - $x$ is close to $a$ (the point of tangency)
    - The function doesn't curve too sharply (small second derivative)

#### Diagram: Local Linearity Zoom

<iframe src="../../sims/local-linearity/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Local Linearity Zoom MicroSim</summary>
Type: microsim

Purpose: Demonstrate how curves appear linear when zoomed in sufficiently, illustrating the foundation of tangent approximation.

Learning Objective: Students will explain why differentiable functions appear linear at small scales (Bloom Level 2: Understand)

Bloom Taxonomy Verb: explain, interpret, demonstrate

Visual elements:

- Coordinate plane with a curve and its tangent line at a chosen point
- Zoom indicator showing current scale
- Side-by-side comparison at different zoom levels
- Error measurement: difference between curve and tangent

Interactive controls:

- Slider: Zoom level (1x to 1000x magnification)
- Slider: Choose point of tangency
- Dropdown: Select function
- Toggle: Show/hide tangent line
- Display: Zoom factor, visible error

Behavior:

- As zoom increases, curve and tangent become visually indistinguishable
- Error display shows how approximation improves at smaller scales
- At high zoom, even clearly curved functions look linear

Instructional Rationale: Seeing the curve "straighten out" under zoom builds intuition for why linear approximation works. The error measurement connects the visual to quantitative accuracy.

Implementation: p5.js with dynamic scaling
</details>

## Instantaneous Velocity: A Key Application

The concept of instantaneous velocity perfectly illustrates differentiability in a physical context.

If $s(t)$ represents position as a function of time, then:

- **Average velocity** over $[t_1, t_2]$ is $\frac{s(t_2) - s(t_1)}{t_2 - t_1}$
- **Instantaneous velocity** at time $t$ is $v(t) = s'(t) = \lim_{h \to 0} \frac{s(t+h) - s(t)}{h}$

Instantaneous velocity is the derivative of position with respect to time.

**Example:** A ball dropped from a building has position $s(t) = -16t^2 + 100$ feet after $t$ seconds.

Find the instantaneous velocity at $t = 2$ seconds:

$$v(t) = s'(t) = -32t$$
$$v(2) = -32(2) = -64 \text{ feet per second}$$

The negative sign indicates the ball is moving downward (in the negative direction).

| Physical Quantity | Mathematical Concept |
|-------------------|---------------------|
| Position | Function $s(t)$ |
| Average velocity | Average rate of change |
| Instantaneous velocity | Derivative $s'(t)$ |
| Speed | Absolute value $|s'(t)|$ |

!!! quote "Delta Moment"
    "Position tells me WHERE I am. Velocity tells me HOW FAST I'm going and in what direction. It's the derivative of position—my rate of change through space!"

## Checking for Differentiability

To determine if a function is differentiable at a point $x = a$:

1. **Check continuity first.** If $f$ is not continuous at $a$, stop—$f$ is not differentiable.

2. **Look for obvious problems:** corners, cusps, vertical tangents.

3. **For piecewise functions:** Check if left and right derivatives match at the boundary.

4. **Compute the derivative** using the limit definition if needed.

**Example:** Is $f(x) = |x - 2|$ differentiable at $x = 2$?

For $x < 2$: $f(x) = -(x-2) = -x + 2$, so $f'(x) = -1$
For $x > 2$: $f(x) = x - 2$, so $f'(x) = 1$

Left derivative at $x = 2$: $-1$
Right derivative at $x = 2$: $1$

Since $-1 \neq 1$, the function is NOT differentiable at $x = 2$.

#### Diagram: Differentiability Checker

<iframe src="../../sims/differentiability-checker/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Differentiability Checker MicroSim</summary>
Type: microsim

Purpose: Step-through tool for checking differentiability at a point, guiding students through the process.

Learning Objective: Students will apply a systematic process to determine differentiability (Bloom Level 3: Apply)

Bloom Taxonomy Verb: apply, execute, implement

Visual elements:

- Graph of the function
- Point being tested highlighted
- Step-by-step checklist with pass/fail indicators
- Final verdict: "Differentiable" or "Not Differentiable (reason)"

Interactive controls:

- Function input or selection from preset list
- Input: Point to test for differentiability
- Button: "Step Through Check" or "Auto Check"

Steps displayed:

1. Is $f(a)$ defined? [Check mark or X]
2. Is $f$ continuous at $a$? [Check mark or X]
3. Compute $f'_-(a)$ = [value or DNE]
4. Compute $f'_+(a)$ = [value or DNE]
5. Are they equal and finite? [Check mark or X]
6. Conclusion: [Differentiable / Not differentiable because...]

Behavior:

- Each step reveals in sequence
- Animations show relevant quantities being computed
- Clear explanation of why differentiability fails (if it does)

Instructional Rationale: Breaking the check into explicit steps builds procedural knowledge and helps students internalize the definition. Immediate feedback corrects misconceptions.

Implementation: p5.js with step-through controls
</details>

## Summary: The Differentiability Landscape

Let's put together what we've learned about when functions are differentiable:

**Differentiable functions have:**

- Well-defined tangent lines at every point
- Continuous graphs (no jumps or holes)
- Smooth curves (no corners or cusps)
- Finite slopes (no vertical tangents)

**Non-differentiable points occur at:**

- Discontinuities (jumps, removable holes, infinite discontinuities)
- Corner points (different one-sided derivatives)
- Cusps (infinite derivatives with opposite signs)
- Vertical tangents (infinite derivatives)

**Key relationships:**

- Differentiable $\Rightarrow$ Continuous (always true)
- Continuous $\Rightarrow$ Differentiable (NOT always true)

!!! quote "Delta's Pun Corner"
    "Why did the continuous function go to therapy? It had no direction in life—continuous but not differentiable!"

## Key Takeaways

- A function is **differentiable at a point** if the limit $\lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$ exists and is finite

- **One-sided derivatives** must exist and be equal for differentiability

- **Three types of non-differentiable points:**
  - Corners (different finite one-sided derivatives)
  - Cusps (infinite one-sided derivatives, opposite signs)
  - Vertical tangents (infinite one-sided derivatives, same sign)

- **Differentiability implies continuity** but continuity does NOT imply differentiability

- To **estimate derivatives from graphs:** visualize the tangent line and calculate its slope

- The **symmetric difference quotient** $\frac{f(x+h) - f(x-h)}{2h}$ gives better table estimates

- **Local linearity:** Differentiable functions look linear when zoomed in

- **Tangent approximation:** $f(x) \approx f(a) + f'(a)(x - a)$

- **Instantaneous velocity** is the derivative of position: $v(t) = s'(t)$

??? question "Check Your Understanding: At which points is $f(x) = |x^2 - 4|$ not differentiable?"
    First, identify where the expression inside the absolute value is zero:

    $x^2 - 4 = 0$ when $x = \pm 2$

    At these points, the function $|x^2 - 4|$ has corners (the graph bounces off the x-axis).

    Let's verify at $x = 2$:

    - For $x$ slightly less than 2: $f(x) = -(x^2 - 4) = -x^2 + 4$, so $f'(x) = -2x$, giving $f'(2^-) = -4$
    - For $x$ slightly greater than 2: $f(x) = x^2 - 4$, so $f'(x) = 2x$, giving $f'(2^+) = 4$

    Since $-4 \neq 4$, the function is not differentiable at $x = 2$.

    By similar reasoning, the function is not differentiable at $x = -2$.

    **Answer:** $f$ is not differentiable at $x = -2$ and $x = 2$.
